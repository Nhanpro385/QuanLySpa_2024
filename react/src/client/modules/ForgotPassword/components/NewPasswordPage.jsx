import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import style from "../style/ForgotPasswordPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";

const NewPasswordPage = () => {
    const { authResetClient } = useAuthActions();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            navigate("/quenmatkhau");
        }
    }, [location, navigate]);

    const onSubmit = async (data) => {
        if (data.password !== data.password_confirmation) {
            // If passwords do not match, show error and return
            api.error({
                message: "Lỗi",
                description: "Mật khẩu và mật khẩu nhập lại không khớp",
            });
            return;
        }

        const payload = {
            ...data,
            token: token,
        };
        setLoading(true); // Set loading to true

        const res = await authResetClient(payload);
        
        // Reset loading state after the request
        setLoading(false);

        if (res.payload.status == "This password reset token is invalid.") {
            api.error({
                message: "Lỗi",
                description: "Token không hợp lệ",
            });
            return;
        }
        if (
            res.payload.status ===
            "We can't find a user with that email address."
        ) {
            api.error({
                message: "Lỗi",
                description: "Không tìm thấy người dùng với email này",
            });
            return;
        }
        console.log(res);
        api.success({
            message: "Thành công",
            description: res.payload.message || "Cập nhật mật khẩu thành công",
        });
        setTimeout(() => {
            navigate("/dangnhap");
        }, 2000);
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
                <h2>Mật khẩu mới</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className={style.formInput}>
                        <label htmlFor="email">Email</label>
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
                        {errors.email && (
                            <span
                                style={{
                                    display: "block",
                                    color: "red",
                                    marginTop: "5px",
                                }}
                            >
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* New Password Input */}
                    <div className={style.formInput}>
                        <label htmlFor="password">Mật khẩu mới</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập mật khẩu mới",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Nhập mật khẩu mới"
                                />
                            )}
                        />
                        {errors.password && (
                            <span
                                style={{
                                    display: "block",
                                    color: "red",
                                    marginTop: "5px",
                                }}
                            >
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Confirm New Password Input */}
                    <div className={style.formInput}>
                        <label htmlFor="password_confirmation">
                            Nhập lại mật khẩu mới
                        </label>
                        <Controller
                            name="password_confirmation"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập lại mật khẩu mới",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Mật khẩu không khớp",
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                            )}
                        />
                        {errors.password_confirmation && (
                            <span
                                style={{
                                    display: "block",
                                    color: "red",
                                    marginTop: "5px",
                                }}
                            >
                                {errors.password_confirmation.message}
                            </span>
                        )}
                    </div>

                    {/* Login Link */}
                    <div className={style.formInput}>
                        <a href="/login">Quay lại đăng nhập</a>
                    </div>

                    {/* Submit Button */}
                    <div className={style.formInput}>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            CẬP NHẬT MẬT KHẨU
                        </Button>
                    </div>
                </form>
            </Col>
        </Row>
    );
};

export default NewPasswordPage;
