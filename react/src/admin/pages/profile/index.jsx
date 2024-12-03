import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Select,
} from "antd";
import style from "@admin/modules/profile/style/profile.module.scss";
import { useForm, Controller } from "react-hook-form";
import useAuthActions from "../../modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

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
            setValue("email", UserData.email || "");
            setValue("phone", UserData.phone || "");

            // Set the date_of_birth with proper formatting using dayjs
            if (UserData.date_of_birth) {
                setValue("date_of_birth", dayjs(UserData.date_of_birth)) || "";
            }

            setValue(
                "gender",
                UserData.gender === "Nữ" ? 1 : UserData.gender === "Nam" ? 2 : 0
            );
        }
    }, [UserData]);
    useEffect(() => {
        console.log(getValues("date_of_birth"));
    }, [getValues("date_of_birth")]);

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xxl={10} xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Card className={style.card}>
                        <Avatar
                            size={300}
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
                            {parseInt(
                                UserData?.position?.wage
                            ).toLocaleString()}{" "}
                            VNĐ
                        </p>
                    </Card>
                </Col>
                <Col xxl={14} xl={14} lg={14} md={14} sm={14} xs={14}></Col>
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
                                    <Form.Item label="Tên đầy đủ">
                                        <Controller
                                            control={control}
                                            name="name"
                                            rules={{
                                                required: "Name is required",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
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
                                    <Form.Item label="Số điện thoại">
                                        <Controller
                                            control={control}
                                            name="phone"
                                            rules={{
                                                required: "Phone is required",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Form.Item label="Giới tính">
                                        <Controller
                                            control={control}
                                            name="gender"
                                            rules={{
                                                required:
                                                    "Vui lòng chọn giới tính",
                                            }}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <Option value={2}>
                                                        Nam
                                                    </Option>
                                                    <Option value={1}>
                                                        Nữ
                                                    </Option>
                                                    <Option value={0}>
                                                        Khác
                                                    </Option>
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Form.Item label="Ngày sinh">
                                        <Controller
                                            control={control}
                                            name="date_of_birth"
                                            rules={{
                                                required:
                                                    "Vui lòng chọn ngày sinh",
                                            }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    // {...field}
                                                    style={{ width: "100%" }}
                                                />
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
                                    <Form.Item label="Địa chỉ">
                                        <Controller
                                            control={control}
                                            name="address"
                                            rules={{
                                                required:
                                                    "Vui lòng nhập địa chỉ",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
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
                                    <Form.Item label="Ghi chú">
                                        <Controller
                                            control={control}
                                            name="note"
                                            rules={{
                                                required:
                                                    "Vui lòng nhập ghi chú",
                                            }}
                                            render={({ field }) => (
                                                <Input.TextArea {...field} />
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
