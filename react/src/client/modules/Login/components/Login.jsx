import React from "react";
import { Row, Col, Button, Form, Input, Divider, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import style from "../style/Login.module.scss";
import { useNavigate } from "react-router-dom";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const { authLoginClient } = useAuthActions();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await authLoginClient(data.email, data.password);
            console.log("API response:", response); // Check the structure of the response

            if (response.payload.status == 422) {
                // Loop through errors object and set each field error
                Object.keys(response.payload.errors).forEach((key) => {
                    // Access the error message correctly from the `errors` object
                    console.log(
                        `Setting error for field ${key}:`,
                        response.payload.errors[key][0]
                    ); // Debug log
                    setError(key, {
                        type: "manual",
                        message: response.payload.errors[key][0], // Access the first error message
                    });
                });
            } else if (response.payload.access_token) {
                // Handle successful login
                navigate("/"); // Redirect to the home page or another page
            } else {
                // Handle other errors
                api.error({
                    message: "Đã có lỗi xảy ra",
                    description: "Vui lòng thử lại sau",
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
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
                <h2>Đăng nhập</h2>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Email">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Vui lòng nhập email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Nhập email"
                                    status={errors.email ? "error" : ""}
                                />
                            )}
                        />
                        {errors.email && (
                            <p className={style.errorMessage}>
                                {errors.email.message}
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Mật khẩu"
                                    status={errors.password ? "error" : ""}
                                />
                            )}
                        />
                        {errors.password && (
                            <p className={style.errorMessage}>
                                {errors.password.message}
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <a onClick={() => navigate("/quenmatkhau")}>
                            Quên mật khẩu?
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            ĐĂNG NHẬP
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <p>
                    Bạn chưa có tài khoản?{" "}
                    <a onClick={() => navigate("/dangky")}>Đăng ký ngay</a>
                </p>
                <p>Hoặc</p>
                <Button block className={style.btnLoginGoogle}>
                    ĐĂNG NHẬP VỚI GOOGLE
                </Button>
            </Col>
        </Row>
    );
};

export default Login;
