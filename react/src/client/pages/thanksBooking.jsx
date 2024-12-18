import React, { useEffect, useState } from "react";
import {
    Col,
    Divider,
    Row,
    Steps,
    Table,
    Button,
    Typography,
    notification,
    Result,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
const { Paragraph, Text } = Typography;
import baner from "../assets/images/banerbookinginfo.png";
import { useNavigate } from "react-router-dom";

const ThanksBooking = () => {
    document.title = "Cảm ơn";
    const navigate = useNavigate();

    return (
        <div className="container">
            <Row justify="center" align="middle">
                <Col span={12}>
                    <Steps
                        size="small"
                        current={3}
                        style={{
                            marginTop: "30px",
                        }}
                        items={[
                            {
                                title: "Đặt Lịch",
                            },
                            {
                                title: "Thông Tin Đặt Lịch",
                            },
                            {
                                title: "Xác Nhận Đặt Lịch",
                            },
                        ]}
                    />
                </Col>
            </Row>

            <section className="container">
                <Result
                    status="success"
                    title="CẢM ƠN BẠN ĐÃ SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI"
                    subTitle="Lịch hẹn của bạn đã được gửi đi, hãy đến đúng giờ để được phục vụ tốt nhất"
                    extra={[
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => navigate("/datlichhen")}
                        >
                            Tiếp tục đặt lịch
                        </Button>,
                        <Button
                            key="buy"
                            onClick={() => navigate("/thongtincanhan/lichsudichvu")}
                        >
                            Xem lịch hẹn
                        </Button>,
                    ]}
                />
            </section>
        </div>
    );
};
export default ThanksBooking;
