import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Image, Descriptions, Tag } from "antd";
import { URL_IMAGE_2 } from "../../../config/appConfig";
function ModalStreatmentDetail({ open, onOk, onCancel, selectStreatment }) {
    const [payload, setPayload] = useState({});

    useEffect(() => {
        if (selectStreatment) {
            setPayload(selectStreatment);
        }
    }, [selectStreatment]);

    return (
        <Modal open={open} onOk={onOk} onCancel={onCancel} width={1000}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <h3 className="text-center">Ảnh trước</h3>
                    <Image
                        src={
                            `${URL_IMAGE_2}/${payload.image_before}` ||
                            "https://via.placeholder.com/300x200"
                        }
                        alt="Before"
                        width="100%"
                        height={200}
                        style={{ objectFit: "cover" }}
                    />
                </Col>
                <Col span={12}>
                    <h3 className="text-center">Ảnh sau</h3>
                    <Image
                        src={
                            `${URL_IMAGE_2}/${payload.image_after}` ||
                            "https://via.placeholder.com/300x200"
                        }
                        alt="After"
                        width="100%"
                        height={200}
                        style={{ objectFit: "cover" }}
                    />
                </Col>
                <Col span={24}>
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
                        <Descriptions.Item label="Nhân viên thực hiện">
                            {payload.staff?.full_name || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày thực hiện">
                            {payload.appointment?.appointment_date ||
                                "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú">
                            {payload.note || "Không có ghi chú"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Góp ý của khách hàng">
                            {payload.feedback || "Chưa có góp ý"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag
                                color={
                                    payload.status === 1
                                        ? "green"
                                        : payload.status === 0
                                        ? "blue"
                                        : "red"
                                }
                            >
                                {payload.status === 1
                                    ? "Hoàn thành"
                                    : payload.status === 0
                                    ? "Đang thực hiện"
                                    : "Hủy"}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Modal>
    );
}

export default ModalStreatmentDetail;
