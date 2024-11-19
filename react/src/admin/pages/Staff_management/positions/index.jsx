import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, message } from "antd";
import { useForm } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";
import useModal from "../../../modules/appointments/hooks/openmodal";
import PositionsModalEdit from "../../../modules/staffManagement/compoments/PositionsModalEdit";
import { useSelector } from "react-redux";
import PositionsForm from "../../../modules/staffManagement/compoments/PositionsForm";
import PositionsTable from "../../../modules/staffManagement/compoments/PositionsTable";
import usePositionsActions from "../../../modules/staffManagement/hooks/usePositionsAction";
import debounce from "lodash/debounce";

const Positions = () => {
    const {
        addPositions,
        getPositions,
        updatePositions,
        deletePositions,
        getPositionsById,
        searchPositions,
    } = usePositionsActions();

    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const { Positions, loading, error, Position } = useSelector(
        (state) => state.Positions
    );

    useEffect(() => {
        getPositions();
    }, []);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            wage: 0,
            note: "",
        },
    });
    console.log(Positions);

    const pagination = Positions.meta || [];

    const dataSource = (Positions && Positions.data) || [];

    const onSubmit = async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            status: 1,
            wage: data.wage,
            note: data.note,
        };

        try {
            const resultAction = await addPositions(payload);
            if (resultAction.meta.requestStatus === "fulfilled") {
                messageApi.success("Thêm vị trí thành công!");
                reset();
                getPositions(); // Cập nhật danh sách sau khi thêm
            } else if (resultAction.meta.requestStatus === "rejected") {
                const errorPayload = resultAction.payload;
                if (errorPayload?.errors) {
                    // Loop through validation errors and display messages
                    Object.keys(errorPayload.errors).forEach((key) => {
                        setError(key, {
                            type: "server",
                            message: errorPayload.errors[key][0], // Error message from server
                        });
                        messageApi.error(errorPayload.errors[key][0]);
                    });
                } else {
                    // General error message
                    messageApi.error("Dữ liệu đầu vào không hợp lệ.");
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi thêm mới vị trí.");
        }
    };

    const editCate = async (id) => {
        if (!id) {
            messageApi.error("ID không hợp lệ.");
            return;
        }

        try {
            const resultAction = await getPositionsById(id);

            // Check if the request was successful and payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload
            ) {
                const { name, wage, note } = resultAction.payload;

                // Additional safety checks before setting form values
                setValue("name", name || ""); // Ensure it's a string
                setValue("wage", typeof wage === "number" ? wage : 0); // Default to 0 if wage is invalid
                setValue("note", note || "");

                showModal();
            } else {
                messageApi.error("Không thể lấy thông tin vị trí.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi lấy thông tin.");
        }
    };

    const deleteCate = async (id) => {
        if (!id) {
            messageApi.error("ID không hợp lệ.");
            return;
        }

        try {
            const resultAction = await deletePositions(id);

            // Check if the request was successful and the payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload
            ) {
                messageApi.success("Xoá vị trí thành công!");
                getPositions(); // Cập nhật danh sách sau khi xóa
            } else {
                messageApi.error("Có lỗi xảy ra khi xoá vị trí.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi xoá vị trí.");
        }
    };

    const handleEditSubmit = async (data) => {
        if (!data || !data.id) {
            messageApi.error("Dữ liệu hoặc ID không hợp lệ.");
            return;
        }

        try {
            const resultAction = await updatePositions(data);

            // Check if the request was successful and the payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload
            ) {
                messageApi.success("Cập nhật vị trí thành công!");
                handleCancel(); // Close the modal after successful update
                getPositions(); // Refresh the positions list after updating
            } else if (resultAction?.payload?.errors) {
                Object.keys(resultAction.payload.errors).forEach((key) => {
                    messageApi.error(resultAction.payload.errors[key][0]);
                });
            } else {
                messageApi.error("Có lỗi xảy ra khi cập nhật.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi cập nhật vị trí.");
        }
    };

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5
    })

    useEffect(() => {
        if (searchQuery.search || searchQuery.page !== 1 || searchQuery.per_page){
            searchPositions(searchQuery)
        } else {
            console.log(2);
            
        }
    }, [searchQuery])
    console.log(searchQuery);


    const getSearch = (e) => {
        setSearchQuery({ ...searchQuery, search: e });
    }
    console.log(searchQuery);

    const handleChangePage = (page, pagination) => {

        setSearchQuery({ ...searchQuery, page, per_page: pagination })
    }

    return (
        <>
            <h1 className="text-center">Quản lý chức vụ</h1>
            {contextHolder}
            <Row gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card title="Danh mục Chức vụ">
                        <PositionsForm
                            onSubmit={handleSubmit(onSubmit)}
                            control={control}
                            errors={errors}
                        />
                    </Card>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card title="Danh sách Chức vụ">
                        <Row>
                            <Col xs={24} sm={24} xxl={4} xl={4} lg={4} md={12}>
                                <Input.Search
                                    placeholder="Tìm kiếm chức vụ"
                                    type="text"
                                    name="search"
                                    onSearch={getSearch}
                                    onChange={(e) => { getSearch(e.target.value) }}
                                />
                            </Col>
                        </Row>
                        <PositionsTable
                            dataSource={dataSource}
                            loading={loading}
                            editCate={editCate}
                            deleteCate={deleteCate}
                            pagination={pagination}
                            onChangePage={handleChangePage}
                        />
                    </Card>
                    <PositionsModalEdit
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        Position={Position}
                        handleEditSubmit={handleEditSubmit}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Positions;
