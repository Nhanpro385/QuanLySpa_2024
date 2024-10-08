import { Button, Card, Col, ConfigProvider, Form, Input, Row, Tag } from "antd";
import React from "react";
import "../../modules/authen/styles/LoginPage.scss";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E05265",
                },
            }}
        >
            <div className="login-wrapper">
                <Row
                    justify="center" // Centers the content horizontally
                    align="middle" // Centers the content vertically
                    style={{ height: "100vh" }} // Takes full viewport height
                    className="container"
                >
                    <Col span={12}>
                        <Card className="sign-in-container">
                            <Form>
                                <h1>Đăng nhập Quản trị viên</h1>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        type="email"
                                        placeholder="Nhập email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                </Form.Item>

                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    Đăng nhập
                                </Button>
                                <a
                                    onClick={() => navigate("/admin/forgot")}
                                    className="mt-2 forgotlink"
                                >
                                    Quên mật khẩu
                                </a>
                            </Form>
                        </Card>
                    </Col>

                    <Col span={12} className="overlay-container">
                        <div className="overlay-panel">
                            <h1>Xin Chào !</h1>
                            <p>
                                Đây là trang quản trị của hệ thống quản lý
                                Sakura Spa
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
};

export default LoginPage;
