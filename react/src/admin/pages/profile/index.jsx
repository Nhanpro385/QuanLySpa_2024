import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Divider, Form, Row } from "antd";
import style from "@admin/modules/profile/style/profile.module.scss";
import { useForm, Controller } from "react-hook-form";
import useAuthActions from "../../modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
const Profile = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
        clearErrors,
    } = useForm();
    const { authGetmeAdmin } = useAuthActions();
    const [UserData, setUserData] = useState({});
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        authGetmeAdmin();
    }, []);
    useEffect(() => {
        if (auth.user && auth.user.data) {
            setUserData(auth.user.data);
            console.log(auth.user.data);

            reset(auth.user.data);
        }
    }, [auth]);
    useEffect(() => {
        if (UserData) {
            setValue("name", UserData.full_name || "");
        }
    }, [UserData]);
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Card>
                        <Avatar
                            className={style.avatar}
                            shape={"circle"}
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                        />
                        <Divider />

                        <h5 className={style.title}>Thông tin nghiệp vụ</h5>
                        <p>
                            <strong>Tên:</strong> {UserData?.full_name}
                        </p>
                        <p>
                            <strong>Chức vụ:</strong> {UserData?.position?.name}
                        </p>
                        <p>
                            <strong>Mức lương theo giờ :</strong>{" "}
                            {parseInt(UserData?.position?.wage).toLocaleString()}{" "}
                            VNĐ
                        </p>
                    </Card>
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card>
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit((data) => console.log(data))}
                        >
                            <Row gutter={[16, 16]}>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Form.Item label="Name">
                                        <Controller
                                            control={control}
                                            name="name"
                                            rules={{
                                                required: "Name is required",
                                            }}
                                            render={({ field }) => (
                                                <input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Form.Item label="Email">
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: "Email is required",
                                            }}
                                            render={({ field }) => (
                                                <input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Form.Item label="Password">
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{
                                                required:
                                                    "Password is required",
                                            }}
                                            render={({ field }) => (
                                                <input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Form.Item label="Phone">
                                        <Controller
                                            control={control}
                                            name="phone"
                                            rules={{
                                                required: "Phone is required",
                                            }}
                                            render={({ field }) => (
                                                <input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary">
                                    Cập nhật thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Profile;
