import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, notification } from "antd";
import { useForm } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";
import useModal from "../../../modules/appointments/hooks/openmodal";
import PositionsModalEdit from "../../../modules/staffManagement/compoments/PositionsModalEdit";
import { useSelector } from "react-redux";
import PositionsForm from "../../../modules/staffManagement/compoments/PositionsForm";
import PositionsTable from "../../../modules/staffManagement/compoments/PositionsTable";
import usePositionsActions from "../../../modules/staffManagement/hooks/usePositionsAction";
import debounce from "lodash/debounce";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const Positions = () => {
    useEffect(() => {
        document.title = "Quản lý chức vụ";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const {
        addPositions,
        getPositions,
        updatePositions,
        deletePositions,
        getPositionsById,
        searchPositions,
    } = usePositionsActions();

    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const Positions = useSelector((state) => state.positions);
    const [PositionData, setPositionData] = useState([]);
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
    useEffect(() => {
        if (Positions.Positions.data && !Positions.loading) {
            setPositionData(
                Positions.Positions.data.map((Position) => ({
                    key: Position.id,
                    name: Position.name,
                    wage: Position.wage,
                    note: Position.note,
                }))
            );
        }
    }, [Positions]);

    const pagination = Positions.Positions.meta || {};

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
                api.success({
                    message: "Thêm mới vị trí thành công!",
                    duration: 3,
                });

                reset();
                getPositions(); // Cập nhật danh sách sau khi thêm
            } else if (resultAction.meta.requestStatus === "rejected") {
                const errorPayload = resultAction.payload;
                if (errorPayload?.errors) {
                    // Loop through validation errors and display messages
                    Object.keys(errorPayload.errors).forEach((key) => {
                        if (["name", "wage"].includes(key)) {
                            setError(key, {
                                type: "manual",
                                message: errorPayload.errors[key][0],
                            });
                        } else {
                            api.error({
                                message: "Có lỗi xảy ra",
                                description: errorPayload.errors[key][0],
                                duration: 3,
                            });
                        }
                    });
                } else {
                    // General error message
                    api.error({
                        message: "Có lỗi xảy ra",
                        description:
                            resultAction.payload.message ||
                            "Thêm mới vị trí không thành công",
                    });
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            api.error({
                message: "Có lỗi xảy ra",
                description: "Thêm mới vị trí không thành công",
            });
        }
    };

    const editCate = async (record) => {
        if (!record.key) {
            api.error({
                message: "ID không hợp lệ.",
                duration: 3,
            });
            return;
        }

        try {
            const resultAction = await getPositionsById(record.key);

            // Check if the request was successful and payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload.data
            ) {
                showModal();
            } else {
                api.error({
                    message: "Có lỗi xảy ra khi lấy thông tin.",
                    duration: 3,
                });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            api.error({
                message: "Có lỗi xảy ra khi lấy thông tin.",
                duration: 3,
            });
        }
    };

    const deleteCate = async (record) => {
        if (!record.key) {
            api.error({
                message: "ID không hợp lệ.",
                duration: 3,
            });
            return;
        }

        try {
            const resultAction = await deletePositions(record.key);
            // Check if the request was successful and the payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload
            ) {
                api.success({
                    message: "Xoá vị trí thành công!",
                    duration: 3,
                });

                getPositions(); // Cập nhật danh sách sau khi xóa
            } else {
                api.error({
                    message: "Có lỗi xảy ra khi xoá vị trí.",
                    description: resultAction.payload.message || "",
                    duration: 3,
                });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            api.error({
                message: "Có lỗi xảy ra khi xoá vị trí.",
                duration: 3,
            });
        }
    };

    const handleEditSubmit = async (data) => {
        if (!data || !data.id) {
            api.error({
                message: "ID không hợp lệ.",
                duration: 3,
            });
            return;
        }

        try {
            const resultAction = await updatePositions(data);
            console.log(resultAction);

            // Check if the request was successful and the payload is valid
            if (
                resultAction?.meta?.requestStatus === "fulfilled" &&
                resultAction.payload
            ) {
                api.success({
                    message: "Cập nhật vị trí thành công!",
                    duration: 3,
                });

                handleCancel(); // Close the modal after successful update
                getPositions(); // Refresh the positions list after updating
            } else if (resultAction?.payload?.errors) {
                Object.keys(resultAction.payload.errors).forEach((key) => {
                    if (["name", "wage"].includes(key)) {
                        setError(key, {
                            type: "manual",
                            message: resultAction.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: resultAction.payload.errors[key][0],
                        });
                    }
                });
            } else {
                api.error({
                    message: "Có lỗi xảy ra khi cập nhật vị trí.",
                    description: resultAction.payload?.message || "",
                });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            api.error({
                message: "Có lỗi xảy ra khi cập nhật vị trí.",
                description: "Cập nhật vị trí không thành công",
            });
        }
    };

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchPositions(searchQuery);
        } else {
            getPositions();
        }
    }, [searchQuery]);

    const getSearch = (e) => {
        setSearchQuery({ ...searchQuery, search: e });
    };

    const handleChangePage = (page, pagination) => {
        setSearchQuery({ ...searchQuery, page, per_page: pagination });
    };

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
                    <Card
                        title="Danh sách Chức vụ"
                        extra={
                            <Button
                                icon={<Loading3QuartersOutlined />}
                                type="primary"
                                onClick={() => getPositions()}
                                loading={Positions.loading}
                            >
                                Làm mới
                            </Button>
                        }
                    >
                        <Row className="mb-3" gutter={[16, 16]}>
                            <Col xs={24} sm={24} xxl={4} xl={4} lg={4} md={12}>
                                <Input.Search
                                    placeholder="Tìm kiếm chức vụ"
                                    type="text"
                                    name="search"
                                    onSearch={getSearch}
                                    onChange={(e) => {
                                        getSearch(e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                        <PositionsTable
                            dataSource={PositionData}
                            loading={Positions.loading}
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
                        Position={Positions.Position}
                        handleEditSubmit={handleEditSubmit}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Positions;
