import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Divider, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import style from "../style/ForgotPasswordPage.module.scss";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const { authForgotClient } = useAuthActions();

    const onSubmit = async (data) => {
        setLoading(true); // Set loading state to true when the request starts
        try {
            const res = await authForgotClient(data);
            setLoading(false); // Set loading state to false when the request completes

            if (res.payload.status === "error") {
                api.error({
                    message: "Lỗi",
                    description: res.payload.messages,
                    duration: 3,
                });
                return;
            }
            api.success({
                message: "Thành công",
                description: res.payload.message || "Gửi yêu cầu thành công",
                duration: 3,
            });
        } catch (error) {
            setLoading(false); // Ensure loading is stopped if there is an error
            api.error({
                message: "Lỗi",
                description: "Đã xảy ra lỗi trong quá trình gửi yêu cầu.",
                duration: 3,
            });
        }
    };

    return (
        <Row justify="center" align="middle" className={style.container}>
            {contextHolder}
            <Col
                xs={22}
                sm={16}
                md={12}
                lg={8}
                xl={6}
                className={style.boxForm}
            >
                <h2>Quên mật khẩu</h2>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Nhập email" />
                            )}
                        />
                    </Form.Item>

                    {/* Phone Input */}
                    <Form.Item
                        label="Số điện thoại"
                        validateStatus={errors.phone ? "error" : ""}
                        help={errors.phone?.message}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập số điện thoại",
                                pattern: {
                                    value: /^[0-9]{10,11}$/,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Nhập số điện thoại"
                                />
                            )}
                        />
                    </Form.Item>

                    <Divider />
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading} // Add loading state here
                        >
                            GỬI YÊU CẦU
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="link"
                            variant="outlined"
                            onClick={() => navigate("/dangnhap")}
                            block
                        >
                            Quay lại đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default ForgotPasswordPage;
