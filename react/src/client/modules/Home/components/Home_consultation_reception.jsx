import React from "react";
import { Card, Col, Row, Form, Input, Button, Checkbox, Image } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import "../styles/Home_consultation_reception.scss"; // Import SCSS

const { Meta } = Card;
const options = [
    {
        label: "Mụn Đầu Đen",
        value: "1",
        url: "https://tamanhhospital.vn/wp-content/uploads/2023/11/hinh-anh-mun-dau-den-o-ma.jpg",
    },
    {
        label: "Mụn Đầu Trắng",
        value: "2",
        url: "https://images-1.eucerin.com/~/media/eucerin/local/vn/tre-so-sinh-noi-mun-dau-trang/20210609093614404456mundautrangmax1800x1800.jpg?la=vi-vn",
    },
    {
        label: "Mụn Đỏ",
        value: "3",
        url: "https://www.vietskin.vn/wp-content/uploads/2019/07/mun-sung-do.jpg",
    },
    {
        label: "Mụn Mủ",
        value: "4",
        url: "https://www.vietskin.vn/wp-content/uploads/2019/06/mun-mu.jpg",
    },
    {
        label: "Mụn Nang",
        value: "5",
        url: "https://medlatec.vn/media/12795/content/20201203_mun-nang-2.jpg",
    },
    {
        label: "Mụn Bọc",
        value: "6",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcKJWetN0uyCdQwSIGqRDoVsZaZjrWVr7zA&s",
    },
    {
        label: "Mụn Viêm",
        value: "7",
        url: "https://images-1.eucerin.com/~/media/eucerin/local/vn/mun-viem/mun-viem-new-1.jpg?la=vi-vn",
    },
    {
        label: "Mụn Cystic",
        value: "8",
        url: "https://khoahoclanda.com/wp-content/uploads/2017/01/MUN-TRUNG-CA-NANG.jpg",
    },
    {
        label: "Mụn Sinh Lý",
        value: "9",
        url: "https://vinmec-prod.s3.amazonaws.com/images/20190529_075246_910718_mun-rop-sinh-duc.max-800x800.jpg",
    },
];

const Home_consultation_reception = () => {
    return (
        <section className="consultation-section">
            <h1 className="section-title">
                “các vấn đề về mụn mà bạn đang gặp phải”
            </h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Row gutter={[16, 16]}>
                        {options.map((item, index) => (
                            <Col xs={12} md={8} key={index}>
                                <Card
                                    hoverable
                                    cover={
                                        <Image
                                            alt="example"
                                            src={item.url}
                                            height={200}
                                        />
                                    }
                                >
                                    <Meta title={item.label} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={24} lg={12} className="form-container">
                    <Form layout="vertical">
                        <h3 className="form-title">
                            bạn đang gặp những vấn đề nào ?
                        </h3>
                        <p className="form-description">
                            Đừng để những mụn làm bạn mất tự tin. Hãy liên hệ
                            với Sakura Spa để khắc phục ngay.
                        </p>
                        <Form.Item>
                            <Checkbox
                                style={{
                                    padding: "10px 0",
                                }}
                            >
                                Mụn đầu đen
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Họ và tên của bạn *"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                        placeholder="Email của bạn *"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Input
                                        size="large"
                                        prefix={<PhoneOutlined />}
                                        placeholder="Số điện thoại của bạn *"
                                    />
                                </Col>
                            </Row>
                            <Checkbox className="checkbox-video-call">
                                Bạn có muốn gọi Video trực tiếp với chuyên gia?
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                className="submit-button"
                            >
                                Đăng ký tư vấn
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </section>
    );
};

export default Home_consultation_reception;
