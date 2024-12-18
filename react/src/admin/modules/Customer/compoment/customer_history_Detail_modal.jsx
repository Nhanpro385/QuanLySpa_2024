import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Image, Descriptions, Tag } from "antd";

function Customer_history_Detail_modal({ open, onOk, onCancel, appoitmentData }) {
    const [payload, setPayload] = useState({});
    

    useEffect(() => {
        if (appoitmentData) {
            setPayload(appoitmentData);
        }
    }, [appoitmentData]);
    return (
        <Modal open={open} onOk={onOk} onCancel={onCancel} width={1000}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <h1 className="text-center">Chi tiết lịch hẹn</h1>

                    <h4>Thông tin lịch hẹn: </h4>
                    <Descriptions
                        layout="vertical"
                        bordered
                        style={{ marginTop: "20px" }}
                    >
                        <Descriptions.Item label="Tên khách hàng">
                            {payload.customer?.full_name || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email khách hàng">
                            {payload.customer?.email || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại khách hàng">
                            {payload.customer?.phone || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nhân viên thực hiện">
                            {payload.users?.[0]?.full_name || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày thực hiện">
                            {payload.appointment_date || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú">
                            {payload.note || "Không có ghi chú"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag
                                color={
                                    payload.status === "Đã hoàn thành."
                                        ? "green"
                                        : payload.status === "Đang thực hiện"
                                        ? "blue"
                                        : "red"
                                }
                            >
                                {payload.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                    <h4
                        style={{
                            marginTop: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        Dịch vụ sử dụng:
                    </h4>
                    {payload.services?.map((service, index) => (
                        <Descriptions key={index} bordered>
                            <Descriptions.Item label="Tên dịch vụ">
                                {service.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá">
                                {parseInt(service.price).toLocaleString()} VNĐ
                            </Descriptions.Item>
                            <Descriptions.Item label="Thời gian">
                                {service.duration}
                            </Descriptions.Item>
                            <Descriptions.Item label="Sản phẩm sử dụng">
                                {service.products?.map((product, idx) => (
                                    <div key={idx}>
                                        {product.name} - {product.quantity_used}{" "}
                                        đơn vị
                                    </div>
                                ))}
                            </Descriptions.Item>
                        </Descriptions>
                    ))}
                </Col>
            </Row>
        </Modal>
    );
}

export default Customer_history_Detail_modal;
