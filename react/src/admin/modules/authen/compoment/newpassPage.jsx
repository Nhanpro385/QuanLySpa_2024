import { Button, Col, Form, Input, Row, Spin, notification,Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
// import "@admin/modules/authen/styles/LoginPage.scss";
import Wellcome from "@admin/assets/images/loginimg.jpg";

const Newpassword = () => {
    const navigate = useNavigate();

    return (
        <div className="login-wrapper">
            <Row className="container">
                {/* Overlay Container */}
                <Col span={12} className="overlay-container">
                    <div className="overlay-panel">
                        <img
                            src={Wellcome}
                            alt="wellcome"
                            width={300}
                            style={{
                                filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))",
                            }}
                        />
                    </div>
                </Col>

                {/* Form Container */}
                <Col span={12} className="form-container">
                    <Row justify="center" align="middle">
                        <Col span={24} className="text-center">
                            
                                <h1>Đổi mật khẩu</h1>
                                <Form>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập mật khẩu mới!",
                                            },
                                            {
                                                min: 6,
                                                message: "Mật khẩu phải ít nhất 6 ký tự!",
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
                                                message: "Vui lòng nhập lại mật khẩu!",
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
                                        className="buttonlogin"
                                        block
                                    >
                                        Xác nhận thay đổi
                                    </Button>

                                    <a
                                        onClick={() => navigate("/admin/dangnhap")}
                                        className="mt-2 forgotlink"
                                    >
                                        Quay lại đăng nhập
                                    </a>
                                </Form>
                         
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Newpassword;
