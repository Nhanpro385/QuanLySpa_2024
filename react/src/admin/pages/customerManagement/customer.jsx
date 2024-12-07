import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Input,
    Row,
    Col,
    Dropdown,
    Space,
    Select,
    message,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalEditCustomer from "../../modules/Customer/compoment/CustomerModalEdit";
import useModal from "../../modules/appointments/hooks/openmodal";
import CustomerTable from "../../modules/Customer/compoment/CustomerTable";
import useCustomerActions from "../../modules/Customer/hooks/useCustomerActions";

function Customer() {
    const {
        addCustomer,
        getCustomer,
        updateCustomer,
        deleteCustomer,
        getCustomerById,
    } = useCustomerActions(); // Use the customer actions hook

    const { customers, loading } = useSelector((state) => state.customers);
    
    const navigate = useNavigate();
    const { isModalOpen, showModal, handleCancel } = useModal();
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getCustomer(); // Fetch customers when the component mounts
    }, []);

    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                navigate(`/admin/khachhang/chitiet/${record.id}`);
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

    const handleEdit = (record) => {
        setCurrentCustomer(record);
        showModal();
    };

    const handleEditSubmit = async (updatedCustomer) => {
        try {
            const resultAction = await updateCustomer(updatedCustomer); // Use customer update action
            console.log(resultAction);

            if (resultAction.meta.requestStatus === "fulfilled") {
                message.success("Khách hàng đã được cập nhật");
                handleCancel();
            } else {
                setFormErrors(resultAction.payload.errors);
                message.error("Cập nhật khách hàng không thành công");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi cập nhật khách hàng");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id); // Use customer delete action
            message.success("Khách hàng đã được xóa");
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa khách hàng");
        }
    };

    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết </Button>,
        },
        {
            key: "3",
            label: <Button block> Lịch sử giao dịch </Button>,
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

    return (
        <Card>
            <h1 className="text-center mb-4">
                Quản lý khách hàng
            </h1>
            <Row gutter={[16, 16]} className="mb-3">
                <Col xl={21} md={18} sm={12} xs={24}>
                    <h2>Danh Sách Người Dùng</h2>
                </Col>
                <Col xl={3} md={6} sm={12} xs={24}>
                    <Link to="/admin/khachhang/them">
                        <Button block type="primary">
                            <PlusOutlined />
                            Thêm mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xl={4} md={6} sm={12} xs={24}>
                    <Select className="mb-3 w-100" placeholder="Giới tính">
                        <Select.Option value="nam">Nam</Select.Option>
                        <Select.Option value="nu">Nữ</Select.Option>
                    </Select>
                </Col>
                <Col xl={4} md={6} sm={12} xs={24}>
                    <Input.Search placeholder="Tìm kiếm......" />
                </Col>
            </Row>

            <CustomerTable
                customers={customers}
                onClick={onClick}
                loading={loading}
            />

            <ModalEditCustomer
                isModalOpen={isModalOpen}
                handleOk={handleEditSubmit}
                customer={currentCustomer}
                handleCancel={handleCancel}
                formErrors={formErrors} // Truyền lỗi tới modal
            />
        </Card>
    );
}

export default Customer;
