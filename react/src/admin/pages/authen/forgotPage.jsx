import { Button, Card, Col, ConfigProvider, Form, Input, Row, Tag } from "antd";
import React from "react";
import "../../modules/authen/styles/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/skeleton/Title";
const ForgotPage = () => {
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
                    {/* <Col span={12}>
                        <Card className="sign-in-container">
                            <Form>
                                <h1>Quên mật khẩu</h1>
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

                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    Gửi yêu cầu
                                </Button>
                                <a
                                    onClick={() => navigate("/admin/login")}
                                    className="mt-2 forgotlink"
                                >
                                    Quay lại đăng nhập
                                </a>
                            </Form>
                        </Card>
                    </Col> */}
                    {/* <Col span={12}>
                        <Card className="sign-in-container">
                            <Form>
                                <h1>Xác thực OTP </h1>

                                <Form.Item
                                    name="otp"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your OTP!",
                                        },
                                    ]}
                                    className="text-center"
                                >
                                    <Title level={5}>
                                        With formatter (Upcase)
                                    </Title>
                                    <Input.OTP
                                        formatter={(str) => str.toUpperCase()}
                                    />
                                    <p className="mt-2">
                                        Gồm 6 ký tự, đã gửi OTP qua email
                                    </p>
                                </Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    Gửi yêu cầu
                                </Button>
                                <a
                                    onClick={() => navigate("/admin/login")}
                                    className="mt-2 forgotlink"
                                >
                                    Quay lại đăng nhập
                                </a>
                            </Form>
                        </Card>
                    </Col> */}
                    <Col span={12}>
                        <Card className="sign-in-container">
                            <Form>
                                <h1>Đổi mật khẩu</h1>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập mật khẩu mới!",
                                        },
                                        {
                                            min: 6,
                                            message:
                                                "Mật khẩu phải ít nhất 6 ký tự!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Mật khẩu mới"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập lại mật khẩu!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                </Form.Item>

                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    block
                                >
                                    Xác nhận thay đổi
                                </Button>
                                <a
                                    onClick={() => navigate("/admin/login")}
                                    className="mt-2 forgotlink"
                                >
                                    Quay lại đăng nhập
                                </a>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12} className="overlay-container">
                        <div className="overlay-panel">
                            <h1>Xin Chào !</h1>
                            <p>Xác thực OTP để lấy lại mật khẩu</p>
                            <h4>Chú ý:</h4>
                            <strong>Không chia sẻ mã OTP cho người khác</strong>
                        </div>
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
};

export default ForgotPage;
