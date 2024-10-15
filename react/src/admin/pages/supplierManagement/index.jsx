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
    Space,
} from "antd";
import React, { useEffect, useState,useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";

import { useSelector } from "react-redux";
import ModalEditSupplier from "../../modules/SuppliersManagement/compoment/SuppliersModalEdit";
import useModal from "../../modules/appointments/hooks/openmodal";
import { DownOutlined } from "@ant-design/icons";
import SupplierForm from "../../modules/SuppliersManagement/compoment/SupplierForm";
import SupplierTable from "../../modules/SuppliersManagement/compoment/SupplierTable";
import useSupplierActions from "../../modules/SuppliersManagement/hooks/useSupplierActions";
const SupplierManagement = () => {
    const {
        addSupplier,
        getSupplier,
        updateSupplier,
        deleteSupplier,
        getSupplierById,
    } = useSupplierActions();

    const { Suppliers, loading, error, Supplier } = useSelector(
        (state) => state.Suppliers
    );

    // Modal handling
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [errorEdit, setErrorEdit] = useState(null);
    // Form handling
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    // Fetch suppliers on mount
    useEffect(() => {
        getSupplier();
    }, []);

    // Prepare data for table
    const dataSource = (Suppliers.data || []).map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        country: supplier.country,
        contact_email: supplier.contact_email,
        code: supplier.code,
    }));

    // Define table columns
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Nhà cung cấp",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Địa chỉ Email",
            dataIndex: "contact_email",
            key: "contact_email",
        },
        {
            title: "Mã số",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: (e) => onClick({ key: e.key, record }),
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary" onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    // Dropdown items
    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "4",
            label: (
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];

    // Handle form submission for adding new supplier
    const onSubmit = async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            country: data.country,
            contact_email: data.contact_email,
            code: data.code,
            status: true,
        };

        try {
            const response = await addSupplier(payload);
          
            if (response.meta.requestStatus === "fulfilled") {
                messageApi.success("Thêm nhà cung cấp thành công!");
                reset();
            } else {
                // Hiện thông báo lỗi từ server
                const errors = response.payload.errors;
                Object.keys(errors).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: errors[key][0],
                    });
                });
                messageApi.error("Thêm nhà cung cấp thất bại.");
            }
        } catch (error) {
            messageApi.error("Có lỗi xảy ra khi thêm nhà cung cấp.");
        }
    };

    // Handle edit action
    const handleEdit = async (record) => {
        try {
            const response = await getSupplierById(record.id);
            if (response.meta.requestStatus === "fulfilled") {
                showModal();
            }
        } catch {
            messageApi.error("Có lỗi xảy ra khi tải nhà cung cấp.");
        }
    };

    // Handle form submission for editing supplier
    const handleSubmitEdit = async (data) => {
        try {
            const resultAction = await updateSupplier(data);
            
            
            if (resultAction.meta.requestStatus === "fulfilled") {
                messageApi.success("Cập nhật nhà cung cấp thành công!");
                handleCancel();
                
            } else {
                setErrorEdit(resultAction.payload);
                console.log(resultAction.payload);
            }
        } catch {
            messageApi.error("Có lỗi xảy ra khi cập nhật nhà cung cấp.");
        }
    };
    // Handle delete action
    const handleDelete = async (id) => {
        try {
            const response = await deleteSupplier(id);
            if (response.meta.requestStatus === "fulfilled") {
                messageApi.success("Xóa nhà cung cấp thành công!");
                getSupplier();
            } else {
                console.log(response.payload);
            }
        } catch {
            messageApi.error("Có lỗi xảy ra khi xóa nhà cung cấp.");
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
                navigate(`/admin/khachhang/lichsugiaodich/${record.id}`);
                break;
            case "4":
                handleDelete(record.id);
                break;
            default:
                break;
        }
    };

    return (
        <>
            {contextHolder} {/* Message context holder */}
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
                    <Card title="Danh sách Nhà cung cấp">
                        <SupplierTable
                            dataSource={dataSource}
                            columns={columns}
                            loading={loading}
                        />
                    </Card>
                </Col>
            </Row>
            <ModalEditSupplier
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                supplier={Supplier}
                handleUpdate={handleSubmitEdit}
                errors={errorEdit}
            />
        </>
    );
};

export default SupplierManagement;
