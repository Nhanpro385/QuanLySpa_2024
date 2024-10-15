import React from "react";
import { Button, Col, Form, Input, Row, Spin, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../modules/authen/styles/LoginPage.scss"; // Use the updated CSS file
import { loginAction } from "../../modules/authen/actions/authActions";
import Wellcome from "../../assets/images/loginimg.jpg";
const LoginPage = () => {
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
        <div className="login-wrapper">
            <Row className="container">
                <Col span={12} className="overlay-container">
                    <div className="overlay-panel">
                        <img
                            src={Wellcome}
                            alt="wellcome"
                            width={300}
                            style={{
                                filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))", // Shadow effect around the image
                            }}
                        />
                    </div>
                </Col>
                <Col span={12} className="form-container">
                    <Spin spinning={loading}>
                        <Row justify="center" align="middle">
                            <Col span={24} className="text-center">
                                <Form onFinish={handleSubmit(onSubmit)}>
                                    <h1>Đăng nhập hệ thống</h1>
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
                                    <Form.Item>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập mật khẩu",
                                            }}
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
                                    style={{
                                        fontSize: "17px",
                                    }}
                                        onClick={() =>
                                            navigate("/admin/quenmatkhau")
                                        }
                                        className="forgotlink"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                    <br />
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="buttonlogin"
                                        block
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Spin>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
