import React from "react";
import { Button, Card, Col, Form, Input, Typography } from "antd";
import { navigate } from "@reach/router";

const OtpPage = () => {
    return (
        <Col span={12}>
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
                        <Title level={5}>With formatter (Upcase)</Title>
                        <Input.OTP formatter={(str) => str.toUpperCase()} />
                        <p className="mt-2">
                            Gồm 6 ký tự, đã gửi OTP qua email
                        </p>
                    </Form.Item>
                    <Button size="large" type="primary" htmlType="submit" block>
                        Gửi yêu cầu
                    </Button>
                    <a
                        onClick={() => navigate("/admin/dangnhap")}
                        className="mt-2 forgotlink"
                    >
                        Quay lại đăng nhập
                    </a>
                </Form>
            </Card>
        </Col>
    );
};
export default OtpPage;
