import React from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "@admin/modules/authen/styles/LoginPage.module.scss";
import { loginAction } from "../../modules/authen/actions/authActions";
import Wellcome from "../../assets/images/loginimg.jpg";
import clsx from "clsx";
const LoginPage = () => {
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
        setLoading(true);
        const { email, password } = data;
        const res = await loginAction(email, password);

        if (res.success) {
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
            openNotification(
                "error",
                "Đăng nhập thất bại",
                res.error.response.data.message
            );
            setLoading(false);
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
                            width={300}
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
                            Đăng nhập hệ thống</h1>
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
