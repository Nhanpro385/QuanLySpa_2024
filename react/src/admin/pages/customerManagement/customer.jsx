import React, { useEffect, useState } from "react";
import { Button, Card, Input, Row, Col, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalEditCustomer from "../../modules/Customer/compoment/CustomerModalEdit";
import useModal from "../../modules/appointments/hooks/openmodal";
import CustomerTable from "../../modules/Customer/compoment/CustomerTable";
import useCustomerActions from "../../modules/Customer/hooks/useCustomerActions";
import CustomerDetail from "../../modules/Customer/compoment/CustomerDetail";

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
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleCancel: handleCancel2,
    } = useModal();

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

            if (resultAction.meta.requestStatus === "fulfilled") {
                setCurrentCustomer(resultAction.payload.data);
                showModal();
            } else {
                message.error("Không thể tìm thấy khách hàng");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            message.success("Khách hàng đã được xóa");
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa khách hàng");
        }
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
                status: 1,
            };
            console.log(payload);

            const resultAction = await updateCustomer(payload);
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

    const handleSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };

    const handlePageChange = (page, Pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: Pagination }));
    };

    const handleActionClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                handleDetailCustomer(record.id);
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
    const handleDetailCustomer = async (id) => {
        try {
            const resultAction = await getCustomerById(id);
            if (!customers.loading) {
                if (resultAction.meta.requestStatus === "fulfilled") {
                    showModal2();
                } else {
                    message.error("Không thể tìm thấy khách hàng");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Card
        extra={
            <Button
                type="primary"
                onClick={() => getCustomer()}
                loading={customers.loading}
            >
                Làm mới
            </Button>
        }
        >
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
                onClick={handleActionClick}
                loading={customers.loading}
                handelPageChange={handlePageChange}
                pagination={pagination}
            />

            {/* Modal */}
            <ModalEditCustomer
                isModalOpen={isModalOpen}
                handleOk={handleEditSubmit}
                customer={currentCustomer}
                handleCancel={handleCancel}
                formErrors={customers.error}
            />
            <CustomerDetail
                isOpen={isModalOpen2}
                onClose={handleCancel2}
                selectedCustomer={customers.customer.data}
            />
        </Card>
    );
}

export default Customer;
