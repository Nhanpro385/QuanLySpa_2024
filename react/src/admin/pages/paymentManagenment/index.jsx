import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Row,
    Modal,
    Space,
    Table,
    Tag,
    Dropdown,
    Form,
    Input,
    Select,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import useModal from "../../modules/appointments/hooks/openmodal";


const PaymentManagement = () => {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
        showModal: showModal2,
    } = useModal();
    const {
        isModalOpen: isPaymentModalOpen,
        showModal: showPaymentModal,
        handleOk: handlePaymentOk,
        handleCancel: handlePaymentCancel,
    } = useModal();

    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [form] = Form.useForm();

    const invoices = [
        {
            id: "HD001",
            name: "Nguyễn Văn A",
            date: "01/01/2021",
            amount: "100.000 VNĐ",
            details: [
                { service: "Dịch vụ A", price: "50.000 VNĐ" },
                { service: "Sản phẩm B", price: "30.000 VNĐ" },
                { service: "Dịch vụ C", price: "20.000 VNĐ" },
            ],
        },
        {
            id: "HD002",
            name: "Nguyễn Văn B",
            date: "02/01/2021",
            amount: "200.000 VNĐ",
            details: [
                { service: "Dịch vụ D", price: "100.000 VNĐ" },
                { service: "Sản phẩm E", price: "100.000 VNĐ" },
            ],
        },
    ];

    const data = [
        {
            key: "1",
            appointmentId: "HD001",
            name: "Nguyễn Văn A",
            total: "100.000 VNĐ",
            paymentMethod: "Thẻ tín dụng",
            date: "01/01/2021",
            tags: ["Đã thanh toán"],
        },
        {
            key: "2",
            appointmentId: "HD002",
            name: "Nguyễn Văn B",
            total: "200.000 VNĐ",
            paymentMethod: "Tiền mặt",
            date: "02/01/2021",
            tags: ["Đã thanh toán"],
        },
    ];


    const items = [
        {
            key: "1",
            label: (
                <Button
                    block
                    onClick={() => {
                        console.log("Sửa");
                    }}
                >
                    Sửa
                </Button>
            ),
        },
        {
            key: "2",
            label: (
                <Button
                    block
                    onClick={() => {
                        showModal2();
                        setSelectedInvoice(invoices[0]);
                    }}
                >
                    Chi tiết
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button block onClick={showPaymentModal}>
                    Thanh Toán
                </Button>
            ),
        }, // Show payment modal
    ];

    const columns = [
        {
            title: "#",
            key: "id",
            dataIndex: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "appointmentId",
            key: "appointmentId",
        },
        { title: "Họ tên", dataIndex: "name", key: "name" },
        { title: "Tổng tiền", dataIndex: "total", key: "total" },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        { title: "Ngày thanh toán", dataIndex: "date", key: "date" },
        {
            title: "Trạng thái",
            key: "tags",
            dataIndex: "tags",
            render: (tags) =>
                tags.map((tag) => (
                    <Tag
                        key={tag}
                        color={tag === "Đã thanh toán" ? "green" : "volcano"}
                    >
                        {tag}
                    </Tag>
                )),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
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

    const detailsColumns = [
        { title: "Dịch vụ", dataIndex: "service", key: "service" },
        { title: "Giá", dataIndex: "price", key: "price" },
    ];

    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate("/admin/user/Detail/1");
                break;
            case "3":
                navigate("/admin/user/history/4");
                break;
            default:
                break;
        }
    };

    const handlePaymentSubmit = (values) => {
        console.log("Payment Submitted:", values);
        handlePaymentOk();
        form.resetFields();
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card
                    title="Các hóa đơn chưa thanh toán"
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <Row gutter={[16, 16]}>
                        {invoices.map((invoice) => (
                            <Col span={6} key={invoice.id}>
                                <Card
                                    className="bg-light"
                                    extra={
                                        <Button
                                            type="primary"
                                            onClick={showPaymentModal}
                                        >
                                            Thanh Toán
                                        </Button>
                                    }
                                    title={`#${invoice.id}`}
                                    hoverable
                                >
                                    <p>
                                        Mã hóa đơn:{" "}
                                        <strong>{invoice.id}</strong>
                                    </p>
                                    <p>
                                        Họ tên: <strong>{invoice.name}</strong>
                                    </p>
                                    <p>
                                        Ngày tạo:{" "}
                                        <strong>{invoice.date}</strong>
                                    </p>
                                    <p>
                                        Tổng tiền:{" "}
                                        <strong>{invoice.amount}</strong>
                                    </p>
                                    <Button
                                        danger
                                        onClick={() => {
                                            showModal();
                                            setSelectedInvoice(invoice);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Modal hiển thị chi tiết hóa đơn */} 
                    {selectedInvoice && (
                        <Modal
                            title={`Chi tiết hóa đơn ${selectedInvoice.id}`}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="close" onClick={handleCancel}>
                                    Đóng
                                </Button>,
                            ]}
                        >
                            <p>
                                Mã hóa đơn:{" "}
                                <strong>{selectedInvoice.id}</strong>
                            </p>
                            <p>
                                Họ tên: <strong>{selectedInvoice.name}</strong>
                            </p>
                            <p>
                                Ngày tạo:{" "}
                                <strong>{selectedInvoice.date}</strong>
                            </p>
                            <p>
                                Tổng tiền:{" "}
                                <strong>{selectedInvoice.amount}</strong>
                            </p>
                            <Table
                                columns={detailsColumns}
                                dataSource={selectedInvoice.details}
                                pagination={false}
                                rowKey="service"
                            />
                        </Modal>
                    )}
                </Card>
            </Col>

            <Col span={24}>
                <Card
                    title="Lịch sử thanh toán"
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <Row gutter={[16, 16]} className="mb-3">
                        <Col span={4}>
                            <Select
                                placeholder="Sắp xếp"
                                className="w-100"
                                defaultValue="newest"
                            >
                                <Select.Option value="newest">
                                    Mới nhất
                                </Select.Option>
                                <Select.Option value="oldest">
                                    Cũ nhất
                                </Select.Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="Lọc theo"
                                className="w-100"
                                defaultValue="all"
                            >
                                <Select.Option value="all">
                                    Tất cả
                                </Select.Option>
                                <Select.Option value="paid">
                                    Đã thanh toán
                                </Select.Option>
                                <Select.Option value="unpaid">
                                    Chưa thanh toán
                                </Select.Option>
                            </Select>
                        </Col>
                        <Col span={9}>
                            <Input.Search placeholder="Tìm kiếm theo mã hóa đơn hoạc tên khách hàng" />
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={data} />
                    <Modal
                        title="Chi tiết hóa đơn"
                        open={isModalOpen2}
                        onOk={handleOk2}
                        onCancel={handleCancel2}
                    >
                        <Card title="Chi tiết hóa đơn">
                            <p>
                                Mã hóa đơn:{" "}
                                <strong>
                                    {selectedInvoice?.id || "HD001"}
                                </strong>
                            </p>
                            <p>
                                Tên khách hàng:{" "}
                                <strong>
                                    {selectedInvoice?.name || "Nguyễn Văn A"}
                                </strong>
                            </p>
                            <p>
                                Ngày tạo:{" "}
                                <strong>
                                    {selectedInvoice?.date || "01/01/2021"}
                                </strong>
                            </p>
                            <Table
                                columns={detailsColumns}
                                dataSource={selectedInvoice?.details || []}
                                pagination={false}
                                rowKey="service"
                            />
                        </Card>
                    </Modal>
                </Card>
            </Col>

            {/* Modal thanh toán */}
            <Modal
                title="Thanh Toán"
                open={isPaymentModalOpen}
                onOk={handlePaymentOk}
                onCancel={handlePaymentCancel}
                footer={[
                    <Button key="cancel" onClick={handlePaymentCancel}>
                        Hủy
                    </Button>,
                    <Button
                        form="paymentForm"
                        key="submit"
                        htmlType="submit"
                        type="primary"
                    >
                        Thanh Toán
                    </Button>,
                ]}
            >
                <Form
                    id="paymentForm"
                    form={form}
                    layout="vertical"
                    onFinish={handlePaymentSubmit}
                >
                    <Form.Item
                        label="Phương thức thanh toán"
                        name="paymentMethod"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn phương thức thanh toán!",
                            },
                        ]}
                    >
                        <Select placeholder="Chọn phương thức">
                            <Select.Option value="creditCard">
                                Thẻ tín dụng
                            </Select.Option>
                            <Select.Option value="cash">Tiền mặt</Select.Option>
                            <Select.Option value="bankTransfer">
                                Chuyển khoản
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số tiền"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số tiền!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số tiền" />
                    </Form.Item>
                    <Form.Item
                        label="Tiền khách hàng trả"
                        name="customerPaid"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số tiền!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số tiền khách hàng trả" />
                    </Form.Item>
                    <Form.Item label="Ghi chú" name="note">
                        <Input.TextArea placeholder="Nhập ghi chú (nếu có)" />
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    );
};

export default PaymentManagement;
