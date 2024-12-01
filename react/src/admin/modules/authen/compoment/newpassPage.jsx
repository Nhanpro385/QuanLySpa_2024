import { Button, Col, Form, Input, Row, notification } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/LoginPage.module.scss";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import imgcover from "@admin/assets/images/rb_3875.png";
import useAuthActions from "../hooks/useAuth";

const NewPassword = () => {
    const { authReset } = useAuthActions();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlToken = params.get("token");
        if (urlToken) {
            setToken(urlToken);
        } else {
            navigate("/admin/quenmatkhau");
        }
    }, [location]);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: "topRight",
        });
    };

    const onSubmit = async (data) => {
        if (!token) {
            openNotification("error", "Token không hợp lệ");
            return;
        }

        if (data.password !== data.password_confirmation) {
            openNotification("error", "Mật khẩu không khớp");
            return;
        }

        const payload = {
            ...data,
            token: token,
        };

        try {
            setLoading(true);
            const res = await authReset(payload);

            if (res.meta.requestStatus === "rejected") {
                if (res.payload?.status === 422) {
                    Object.keys(res.payload?.error).forEach((key) => {
                        if (
                            [
                                "email",
                                "password",
                                "password_confirmation",
                            ].includes(key)
                        ) {
                            setError(key, {
                                type: "manual",
                                message: res.payload?.error[key][0],
                            });
                        } else {
                            openNotification(
                                "error",
                                res.payload?.error[key][0]
                            );
                        }
                    });
                }
            } else if (res.meta.requestStatus === "fulfilled") {
                openNotification("success", "Cập nhật mật khẩu thành công");
                navigate("/admin/dangnhap");
            }
        } catch (err) {
            openNotification("error", "Có lỗi xảy ra, vui lòng thử lại sau");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login_wrapper}>
            <Row className={styles.container}>
                {/* Overlay Container */}
                <Col
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={0}
                    xs={0}
                    className={styles.overlay_container}
                >
                    <div className="overlay-panel">
                        <img
                            src={imgcover}
                            alt="wellcome"
                            width={300}
                            style={{
                                filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))",
                            }}
                        />
                    </div>
                </Col>

                {/* Form Container */}
                <Col
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={0}
                    xs={0}
                    className={styles.form_container}
                >
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        className={clsx(styles.login_form)}
                        layout="vertical"
                    >
                        <h1 className={clsx(styles.title)}>Đổi mật khẩu mới</h1>
                        <Form.Item label="Email">
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Vui lòng nhập email" }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Email"
                                        className="w-100"
                                        size="large"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>
                                    {errors.email.message}
                                </p>
                            )}
                        </Form.Item>
                        <Form.Item label="Mật khẩu mới">
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Vui lòng nhập password" }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                        className="w-100"
                                        size="large"
                                    />
                                )}
                            />
                            {errors.password && (
                                <p style={{ color: "red" }}>
                                    {errors.password.message}
                                </p>
                            )}
                        </Form.Item>
                        <Form.Item label="Nhập lại mật khẩu">
                            <Controller
                                name="password_confirmation"
                                control={control}
                                rules={{ required: "Vui lòng nhập mật khẩu" }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Nhập lại mật khẩu"
                                        size="large"
                                    />
                                )}
                            />
                            {errors.password_confirmation && (
                                <p style={{ color: "red" }}>
                                    {errors.password_confirmation.message}
                                </p>
                            )}
                        </Form.Item>
                        <a
                            style={{ fontSize: "17px" }}
                            onClick={() => navigate("/admin/dangnhap")}
                            className={clsx(styles.forgotlink)}
                        >
                            Đăng nhập
                        </a>
                        <br />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="buttonlogin"
                            block
                            loading={loading}
                            size="large"
                        >
                            Câp nhật mật khẩu
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default NewPassword;
