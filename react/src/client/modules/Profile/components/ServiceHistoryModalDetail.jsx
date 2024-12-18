import React from "react";
import { Modal, Descriptions, Badge, Table, Card, Col, Row, Button } from "antd";

const ServiceHistoryModalDetail = ({
    isModalOpen,
    handleOk,
    handleCancel,
    appointmentData,
}) => {
    // Define columns for the services table
    const columns = [
        {
            title: "Dịch Vụ",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div>
                    <strong>{text}</strong>
                    <br />
                    {record.products?.map((product, idx) => (
                        <div key={idx}>
                            {product.name} x {product.quantity_used}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Số Lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text) => `${parseInt(text).toLocaleString()} VNĐ`,
        },
    ];

    // Prepare data for the table
    const servicesData = appointmentData?.services?.map((service, index) => ({
        key: index,
        name: service.name,
        quantity: service.quantity,
        price: service.price,
        products: service.products,
    }));

    return (
        <Modal
            title="Chi Tiết Lịch Hẹn"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1200}
            className="container"
            footer={null}  // Disable the default footer
        >
            <Row gutter={[16, 16]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Descriptions title="Thông Tin Lịch Hẹn" bordered>
                        {/* Customer Info */}
                        <Descriptions.Item label="Tên Khách Hàng">
                            {appointmentData?.customer?.full_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số Điện Thoại">
                            {appointmentData?.customer?.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {appointmentData?.customer?.email}
                        </Descriptions.Item>

                        {/* Appointment Info */}
                        <Descriptions.Item label="Ngày Lịch">
                            {appointmentData?.appointment_date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời Gian">
                            {appointmentData?.start_time} -{" "}
                            {appointmentData?.expected_time}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">
                            <Badge
                                status={
                                    appointmentData?.status ===
                                    "Đã đặt lịch hẹn."
                                        ? "processing"
                                        : appointmentData?.status ===
                                          "Đang thực hiện."
                                        ? "success"
                                        : appointmentData?.status ===
                                          "Đã hoàn thành."
                                        ? "default"
                                        : "error"
                                }
                                text={appointmentData?.status}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi Chú">
                            {appointmentData?.note}
                        </Descriptions.Item>

                        {/* Shift Info */}
                        <Descriptions.Item label="Ca">
                            {appointmentData?.shift?.start_time} -{" "}
                            {appointmentData?.shift?.end_time}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày Ca">
                            {appointmentData?.shift?.shift_date}
                        </Descriptions.Item>

                        {/* Services Info (Table) */}

                        {/* Total Price */}
                        <Descriptions.Item label="Tổng Giá">
                            {parseInt(
                                appointmentData?.total_price_services
                            ).toLocaleString()}{" "}
                            VNĐ
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card>
                        <Table
                            columns={columns}
                            dataSource={servicesData}
                            pagination={false}
                            bordered
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Custom Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mt-4">
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                    Hủy
                </Button>
                <Button onClick={handleOk} type="primary">
                    Xác Nhận
                </Button>
            </div>
        </Modal>
    );
};

export default ServiceHistoryModalDetail;
