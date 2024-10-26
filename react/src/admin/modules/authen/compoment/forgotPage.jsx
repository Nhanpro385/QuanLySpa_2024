import React from "react";
import { Button, Col, Form, Input, Row, Spin, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "@admin/modules/authen/styles/LoginPage.module.scss";

import { loginAction } from "../actions/authActions";
import Wellcome from "../../../assets/images/rb_1123.png";
const ForgotPage = () => {
    const [loading, setLoading] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    // Function to display notifications
    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            placement: "topRight", // Can be adjusted: 'topLeft', 'bottomRight', etc.
        });
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const { email, password } = data;
        const res = await loginAction(email, password);
        console.log(res);

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
        <div className={styles.forgot_wrapper}>
            <Row className={styles.container}> 
                <Col xs={24} md={12} className={styles.overlay_container}>
                    <div className={styles.overlay_panel}>
                        <img
                            src={Wellcome}
                            alt="wellcome"
                            width={500}
                            style={{
                                filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))",
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} md={12} className={styles.form_container}>
                    <Form onFinish={handleSubmit(onSubmit)}  className={styles.forgot_form}>
                        <h1>Quên mật khẩu</h1>
                        <Form.Item>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập email",
                                }}
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

                        <a
                            style={{
                                fontSize: "17px",
                            }}
                            onClick={() => navigate("/admin/dangnhap")}
                            className={styles.forgotlink}
                        >
                            Quay lại đăng nhập
                        </a>
                        <br />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="buttonlogin"
                            block
                        >
                            Gửi yêu cầu
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ForgotPage;
