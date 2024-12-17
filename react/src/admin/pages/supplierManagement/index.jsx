import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Button,
    Table,
    message,
    Dropdown,
    notification,
    Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { Snowflake } from "@theinternetfolks/snowflake";

import { useSelector } from "react-redux";
import ModalEditSupplier from "../../modules/SuppliersManagement/compoment/SuppliersModalEdit";
import useModal from "../../modules/appointments/hooks/openmodal";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import SupplierForm from "../../modules/SuppliersManagement/compoment/SupplierForm";
import SupplierTable from "../../modules/SuppliersManagement/compoment/SupplierTable";
import useSupplierActions from "../../modules/SuppliersManagement/hooks/useSupplierActions";
// import debounce from "lodash/debounce";
import { generateSnowflakeId } from "../../utils";

const SupplierManagement = () => {
    const {
        addSupplier,
        getSupplier,
        updateSupplier,
        deleteSupplier,
        getSupplierById,
        searchSupplier,
    } = useSupplierActions();

    const Suppliers = useSelector((state) => state.supplier);

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    const [api, contextHolder] = notification.useNotification();
    const [SupplierData, setSupplierData] = useState([]);
    const [editSupplier, setEditSupplier] = useState(null);
    const [errorEdit, setErrorEdit] = useState(null);
    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();

    const pagination = Suppliers?.Suppliers?.meta || {};

    useEffect(() => {
        getSupplier();
    }, []);

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchSupplier(searchQuery);
        } else {
            getSupplier();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (Suppliers?.Suppliers?.data && !Suppliers.loading) {
            setSupplierData(
                Suppliers?.Suppliers?.data.map((item) => ({
                    key: item.id,
                    ...item,
                }))
                // Suppliers.data.map((supplier) => ({
                //     id: supplier.id,
                //     name: supplier.name,
                //     country: supplier.country,
                //     contact_email: supplier.contact_email,
                //     code: supplier.code,
                // }))
            );
        }
    }, [Suppliers?.Suppliers?.data]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    // Handle
    const handleEdit = async (record) => {
        try {
            const response = await getSupplierById(record.id);
            if (response.meta.requestStatus === "fulfilled") {
                setEditSupplier(() => response.payload.data);
                showModal();
            }
        } catch {
            api.error({
                message: "Có lỗi xảy ra",
                description: "Không thể lấy thông tin nhà cung cấp",
            });
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await deleteSupplier(id);
            if (response.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Xóa nhà cung cấp thành công",
                    description: response.payload.message || "",
                });

                getSupplier();
            } else {
                console.log(response.payload);
            }
        } catch {
            api.error({
                message: "Có lỗi xảy ra",
                description: "Không thể xóa nhà cung cấp",
            });
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            id: generateSnowflakeId(),
            name: data.name,
            country: data.country,
            contact_email: data.contact_email,
            code: data.code,
            status: true,
        };

        try {
            const response = await addSupplier(payload);
            console.log(response);

            if (response.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm nhà cung cấp thành công",
                    description: response.payload.message || "",
                });
                reset();
            } else {
                api.error({
                    message: "Có lỗi xảy ra",
                    description: response.payload.message || "",

                    duration: 3,
                });
                // Hiện thông báo lỗi từ server
                const errors = response?.payload?.errors;
                Object.keys(errors).forEach((key) => {
                    if (
                        ["name", "country", "contact_email", "code"].includes(
                            key
                        )
                    ) {
                        setError(key, {
                            type: "manual",
                            message: errors[key][0],
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Modal handling

    // Handle form submission for editing supplier
    const handleSubmitEdit = async (data) => {
        try {
            data.status = true
            const resultAction = await updateSupplier(data);

            if (resultAction.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Cập nhật nhà cung cấp thành công",
                    description: resultAction.payload.message || "",
                });

                handleCancel();
            } else {
                setErrorEdit(resultAction.payload);
                api.error({
                    message: "Có lỗi xảy ra",
                    description: resultAction.payload.message || "",
                });
            }
        } catch {
            api.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật nhà cung cấp",
            });
        }
    };

    // handel dropdown
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                navigate(`/admin/user/Detail/${record.id}`);
                break;
            case "3":
                navigate(`/admin/khachhang/lichsutrilieu/${record.id}`);
                break;
            case "4":
                handleDelete(record.id);
                break;
            default:
                break;
        }
    };

    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };

    const handlePageChange = (page, pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: pagination }));
    };

    return (
        <>
            <h1 className="text-center">Quản Lý Nhà Cung Cấp</h1>
            {contextHolder}
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Danh mục Nhà cung cấp">
                        <SupplierForm
                            control={control}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            errors={errors}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        title="Danh sách Nhà cung cấp"
                        extra={
                            <Button
                                loading={Suppliers.loading}
                                icon={<LoadingOutlined />}
                                type="primary"
                                onClick={() => getSupplier()}
                            >
                                Làm mới
                            </Button>
                        }
                    >
                        <Row className="mb-2">
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={24}
                            >
                                <Input.Search
                                    placeholder="Tìm kiếm nhà cung cấp theo : tên, số điện thoại, email, ngày"
                                    allowClear
                                    enterButton="Tìm kiếm"
                                    onSearch={onSearch}
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <SupplierTable
                            loading={Suppliers.loading}
                            onClick={onClick}
                            dataSource={SupplierData}
                            pagination={pagination}
                            handlePageChange={handlePageChange}
                        // handleEdit={handleEdit}
                        // handleDelete={handleDelete}
                        />
                    </Card>
                </Col>
            </Row>
            <ModalEditSupplier
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                supplier={editSupplier}
                handleUpdate={handleSubmitEdit}
                errors={errorEdit}
            />
        </>
    );
};

export default SupplierManagement;
