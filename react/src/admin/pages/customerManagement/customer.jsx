import React, { useEffect, useState } from "react";
import { Button, Card, Input, Row, Col, notification } from "antd";
import { Loading3QuartersOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalEditCustomer from "../../modules/Customer/compoment/CustomerModalEdit";
import useModal from "../../modules/appointments/hooks/openmodal";
import CustomerTable from "../../modules/Customer/compoment/CustomerTable";
import useCustomerActions from "../../modules/Customer/hooks/useCustomerActions";


function Customer() {
    // Hooks and Actions
    const {
        getCustomerById,
        getCustomer,
        updateCustomer,
        deleteCustomer,
        searchCustomer,
    } = useCustomerActions();
    const customers = useSelector((state) => state.customers);
    useEffect(() => {
        document.title = "Quản lý khách hàng";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    const [CustomerData, setCustomerData] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { isModalOpen, showModal, handleCancel } = useModal();
 

    // Pagination meta
    const pagination = customers.customers.meta || {};

    // Effects
    useEffect(() => {
        getCustomer();
    }, []);

    useEffect(() => {
        if (
            searchQuery.search !== "" ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchCustomer(searchQuery);
        } else {
            getCustomer();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (customers.customers.data && !customers.loading) {
            setCustomerData(
                customers.customers.data.map((item) => ({
                    key: item.id,
                    ...item,
                }))
            );
        }
    }, [customers.customers.data]);

    // Handlers
    const handleEdit = async (record) => {
        try {
            const resultAction = await getCustomerById(record.id);

            if (resultAction.payload.status == "success") {
                setCurrentCustomer(resultAction.payload.data);
                showModal();
            } else {
                api.error({
                    message: "Không thể tìm thấy khách hàng",
                    description:
                        resultAction.payload.message || "Vui lòng thử lại sau",
                    duration: 3,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteCustomer(id);
            console.log(res);
            if (res.payload.status == "success") {
                api.success({
                    message: "Xóa khách hàng thành công",
                    duration: 3,
                });
                getCustomer();
            } else {
                api.error({
                    message: "Xóa khách hàng không thành công",
                    description: res.payload.message || "Vui lòng thử lại sau",
                    duration: 3,
                });
            }
        } catch (error) {}
    };

    const handleEditSubmit = async (updatedCustomer) => {
        try {
            const payload = {
                id: updatedCustomer.id,
                full_name: updatedCustomer.full_name,
                address: updatedCustomer.address,
                gender: updatedCustomer.gender,
                phone: updatedCustomer.phone,
                date_of_birth:
                    updatedCustomer.date_of_birth.format("YYYY-MM-DD"),
                email: updatedCustomer.email,
                status: updatedCustomer.status,
            };

            const resultAction = await updateCustomer(payload);

            if (resultAction.payload.status == "success") {
                api.success({
                    message: "Cập nhật khách hàng thành công",
                    duration: 3,
                });
                handleCancel();
            } else {
                api.error({
                    message: "Cập nhật khách hàng không thành công",
                    description:
                        resultAction.payload.message || "Vui lòng thử lại sau",
                    duration: 3,
                });
                if (resultAction.payload.errors) {
                    setFormErrors(() => resultAction.payload.errors);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };

    const handlePageChange = (page, Pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: Pagination }));
    };

    const handleDetailCustomer = async (id) => {
        try {
            console.log(id);
            navigate(`/admin/khachhang/chitiet/${id}`);
            
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Card
            extra={
                <Button
                    type="primary"
                    icon={<Loading3QuartersOutlined />}
                    onClick={() => getCustomer()}
                    loading={customers.loading}
                >
                    Làm mới
                </Button>
            }
        >
            {contextHolder}
            <h1 className="text-center mb-4">Quản lý khách hàng</h1>

            {/* Header */}
            <Row gutter={[16, 16]} className="mb-3">
                <Col xl={21} md={18} sm={12} xs={24}>
                    <h2>Danh Sách Người Dùng</h2>
                </Col>
                <Col xl={3} md={6} sm={12} xs={24}>
                    <Link to="/admin/khachhang/them">
                        <Button block type="primary">
                            <PlusOutlined /> Thêm mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Search */}
            <Row gutter={[16, 16]} className="mb-3">
                <Col xl={12} md={12} sm={12} xs={24}>
                    <Input.Search
                        placeholder="Tìm kiếm..."
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
            </Row>

            {/* Customer Table */}
            <CustomerTable
                customers={CustomerData}
                loading={customers.loading}
                handelPageChange={handlePageChange}
                pagination={pagination}
                handleEdit={handleEdit}
                handleDetailCustomer={handleDetailCustomer}
                handleDelete={handleDelete}
            />

            {/* Modal */}
            <ModalEditCustomer
                isModalOpen={isModalOpen}
                handleOk={handleEditSubmit}
                customer={currentCustomer}
                handleCancel={handleCancel}
                formErrors={formErrors}
            />
           
        </Card>
    );
}

export default Customer;
