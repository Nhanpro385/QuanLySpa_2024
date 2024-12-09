import React from "react";
import { Row, Col, Button, Form, Input, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "../style/Register.module.scss";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useAuth } from "../../../config/AuthContext";
const Register = () => {
    const { authRegisterClient } = useAuthActions();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();
    const { login } = useAuth();
    // Lấy giá trị mật khẩu để so sánh
    const password = watch("password", "");

    const onSubmit = async (data) => {
        try {
            const res = await authRegisterClient(data);
            console.log(res);

            if (res.payload.status == 422) {
                // Loop through errors object and set each field error
                Object.keys(res.payload.errors).forEach((key) => {
                    // Access the error message correctly from the `errors` object
                    console.log(
                        `Setting error for field ${key}:`,
                        res.payload.errors[key][0]
                    ); // Debug log
                    setError(key, {
                        type: "manual",
                        message: res.payload.errors[key][0], // Access the first error message
                    });
                });
            }
            if (res.payload.access_token) {
                api.success({
                    message: "Đăng ký thành công",
                    description: "Chào mừng bạn mới ",
                    duration: 3,
                });
                login(res.payload.access_token);
                setTimeout(() => {
                    navigate("/"); // Redirect to the home page or another page
                }, 1500);
            } else {
                // Handle other errors
                api.error({
                    message: "Đã có lỗi xảy ra",
                    description: "Vui lòng thử lại sau",
                });
            }
        } catch (error) {
            console.log("error", error);
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
                <h2>Đăng ký</h2>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Họ và tên">
                        <Controller
                            name="full_name"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Vui lòng nhập họ và tên" }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Họ và tên"
                                    status={errors.full_name ? "error" : ""}
                                />
                            )}
                        />
                        {errors.full_name && (
                            <p className={style.errorMessage}>
                                {errors.full_name.message}
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item label="Emai:">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Vui lòng nhập email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "email không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="email"
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
                    <Form.Item label="Số điện thoại">
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Vui lòng nhập số điện thoại",
                                pattern: {
                                    value: /^[0-9]{10,11}$/,

                                    message: "Số điện thoại không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    maxLength={11}
                                    min={10}
                                    type="number"
                                    {...field}
                                    placeholder="Số điện thoại"
                                    status={errors.phone ? "error" : ""}
                                />
                            )}
                        />
                        {errors.phone && (
                            <p className={style.errorMessage}>
                                {errors.phone.message}
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
                                    value: 8,
                                    message: "Mật khẩu phải có ít nhất 8 ký tự",
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
                    <Form.Item label="Nhập lại mật khẩu">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Vui lòng nhập lại mật khẩu",
                                validate: (value) =>
                                    value === password || "Mật khẩu không khớp",
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Nhập lại mật khẩu"
                                    status={
                                        errors.confirmPassword ? "error" : ""
                                    }
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <p className={style.errorMessage}>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            ĐĂNG KÝ
                        </Button>
                    </Form.Item>
                </Form>
                <p className={style.registerText}>
                    Bạn đã có tài khoản?{" "}
                    <a onClick={() => navigate("/dangnhap")}>Đăng nhập</a>
                </p>
            </Col>
        </Row>
    );
};

export default Register;
