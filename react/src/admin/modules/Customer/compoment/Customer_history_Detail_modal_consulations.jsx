import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Descriptions, Tag } from "antd";

function Customer_history_Detail_modal_consulations({
    open,
    onOk,
    onCancel,
    appoitmentData,
}) {
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

                    <h4>Thông tin lịch hẹn:</h4>
                    <Descriptions
                        layout="vertical"
                        bordered
                        style={{ marginTop: "20px" }}
                    >
                        <Descriptions.Item label="Mã lịch hẹn">
                            {payload?.id || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên khách hàng">
                            {payload?.customer?.full_name || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại khách hàng">
                            {payload?.customer?.phone || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email khách hàng">
                            {payload?.customer?.email || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nhân viên phụ trách">
                            {payload?.staff_id?.fullname || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Điều kiện da">
                            {payload?.skin_condition || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Kế hoạch điều trị">
                            {payload?.treatment_plan || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={payload?.status === 2 ? "green" : "red"}>
                                {payload?.status === 2
                                    ? "Đã hoàn thành"
                                    : "Chưa hoàn thành"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {payload?.created_at || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người tạo">
                            {payload?.created_by?.fullname || "Chưa cập nhật"} -{" "}
                            {payload?.created_by?.role || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày cập nhật">
                            {payload?.updated_at || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người cập nhật">
                            {payload?.updated_by?.fullname || "Chưa cập nhật"} -{" "}
                            {payload?.updated_by?.role || "Chưa cập nhật"}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Modal>
    );
}

export default Customer_history_Detail_modal_consulations;
