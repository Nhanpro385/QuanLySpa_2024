import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "@admin/modules/authen/styles/LoginPage.module.scss";
import useAuthActions from "../../modules/authen/hooks/useAuth";
import Wellcome from "../../assets/images/loginimg.jpg";
import clsx from "clsx";
import axios from "axios";
const LoginPage = () => {
    // useEffect(() => {
    //     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    //     console.log("đây là token", csrfToken);
    //     axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    // }, []);
    const { authLogin } = useAuthActions();
    const [loading, setLoading] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            placement: "topRight",
        });
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        const res = await authLogin(email, password);
        console.log(res);

        if (res.meta.requestStatus === "fulfilled") {
            openNotification(
                "success",
                "Đăng nhập thành công",
                "Chuyển hướng đến trang quản trị..."
            );
            setTimeout(() => {
                setLoading(false);
                navigate("/admin");
            }, 1000);
        } else {
            openNotification("error", "Đăng nhập thất bại do thông tin tài khoản không chính xác.");
        }
    };

    return (
        <div className={clsx(styles.login_wrapper)}>
            <Row className={clsx(styles.container)}>
                <Col xs={24} md={12} className={clsx(styles.overlay_container)}>
                    <div className={clsx(styles.overlay_panel)}>
                        <img
                            src={Wellcome}
                            alt="wellcome"
                            width={"60%"}
                            style={{
                                filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))",
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} md={12} className={clsx(styles.form_container)}>
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        className={clsx(styles.login_form)}
                    >
                        <h1 className={clsx(styles.title)}>
                            Đăng nhập hệ thống
                        </h1>
                        <Form.Item>
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
                        <Form.Item>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Vui lòng nhập mật khẩu" }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Mật khẩu"
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
                        <a
                            style={{ fontSize: "17px" }}
                            onClick={() => navigate("/admin/quenmatkhau")}
                            className={clsx(styles.forgotlink)}
                        >
                            Quên mật khẩu?
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
                            Đăng nhập
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
