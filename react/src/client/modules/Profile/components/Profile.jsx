import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import {
    Row,
    Col,
    Button,
    Input,
    Avatar,
    Menu,
    Select,
    Switch,
    DatePicker,
    Card,
    notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import style from "../style/Profile.module.scss";
import MenuProfile from "./MenuProfile";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// React Hook Form
import { useForm, Controller } from "react-hook-form";

const Profile = () => {
    const navigate = useNavigate();
    const {
        authGetmeClient,
        authEditProfileClient,
        authChangePasswordClient,
        authLogoutClient,
    } = useAuthActions();
    const authCustomer = useSelector((state) => state.auth);
    const [customer, setCustomer] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
        reset,
    } = useForm();

    useEffect(() => {
        authGetmeClient();
    }, []);

    useEffect(() => {
        if (authCustomer?.user?.data) {
            setCustomer(authCustomer?.user?.data);
        }
    }, [authCustomer]);
    useEffect(() => {
        if (customer) {
            // Set form values with user data
            setValue("full_name", authCustomer?.user?.data?.full_name || "");
            setValue("phone", authCustomer?.user?.data?.phone || "");
            setValue(
                "email",
                authCustomer?.user?.data?.email ||
                    authCustomer?.user?.data?.contact_email ||
                    ""
            );
            setValue("address", authCustomer?.user?.data?.address || "");
            setValue("gender", authCustomer?.user?.data?.gender || 0);
            setValue("address", authCustomer?.user?.data?.address || "");
            // setValue("status", authCustomer?.user?.data?.status || true);
            setValue(
                "date_of_birth",
                dayjs(authCustomer?.user?.data?.date_of_birth) || ""
            );
        }
    }, [customer]);
    const onSubmit = async (data) => {
        try {
            const payload = {
                full_name: data.full_name || "Chưa cập nhật",
                gender: data.gender || 0,
                email: data.email || "Chưa cập nhật",
                phone: data.phone || "Chưa cập nhật",
                date_of_birth:
                    dayjs(data.date_of_birth).format("YYYY-MM-DD") ||
                    "1999-01-01",
                address: data.address || "Chưa cập nhật",
                status: 0,
            };
            const res = await authEditProfileClient({
                id: authCustomer?.user?.data?.id,
                data: payload,
            });
            if (
                res.payload.status == 422 &&
                Object.keys(res.payload.errors).length > 0
            ) {
                Object.keys(res.payload.errors).map((key) => {
                    setError(key, {
                        type: "manual",
                        message: res.payload.errors[key][0],
                    });
                });
                return;
            }
            if (res.payload.status === "success") {
                // if (data.email !== authCustomer?.user?.data?.email) {
                //     authLogoutClient();
                //     localStorage.removeItem("tokenClient");

                //     api.success({
                //         message:
                //             res.payload.message ||
                //             "Cập nhật thông tin thành công!",
                //         description: "Vui lòng đăng nhập lại!",
                //         duration: 2,
                //     });
                //
                //     return;
                // }

                api.success({
                    message:
                        res.payload.message || "Cập nhật thông tin thành công!",
                    duration: 2,
                });
            }
        } catch (e) {
            console.log(e);
        }

        // Xử lý lưu trữ dữ liệu khi form submit (ví dụ: gửi lên API)
    };
    const handlePasswordChange = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            api.error({
                message: "Vui lòng nhập đầy đủ thông tin!",
                duration: 2,
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            api.error({
                message: "Mật khẩu mới không trùng khớp!",
                duration: 2,
            });
            return;
        }
        try {
            const payload = {
                current_password: oldPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            };
            const res = await authChangePasswordClient({
                id: authCustomer?.user?.data?.id,
                data: payload,
            });
            console.log(res);

            if (res.payload.status === "success") {
                api.success({
                    message: res.payload.message || "Đổi mật khẩu thành công!",
                    description: "Vui lòng đăng nhập lại!",
                    duration: 2,
                });
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                if (
                    Object.keys(res.payload.error).length > 0 &&
                    typeof res.payload.error === "object"
                ) {
                    console.log(res.payload.error);

                    Object.keys(res.payload.error).map((key) => {
                        api.error({
                            message: res.payload.error[key][0],
                            duration: 2,
                        });
                    });
                    return;
                }
                api.error({
                    message: res.payload.message || "Đổi mật khẩu thất bại!",
                    duration: 2,
                });
            }
        } catch (e) {
            console.error(e);
            api.error({
                message: "Đã xảy ra lỗi!",
                duration: 2,
            });
        }
    };

    return (
        <Row className={style.container} gutter={[16, 16]}>
            {contextHolder}

            {/* Profile Content */}
            <Col
                xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className={style.profileContent}
            >
                <Row justify="center" align="middle" className={style.header}>
                    <Col
                        xxl={24}
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        className={style.boxTitleProfile}
                    >
                        <h2>Quản lý thông tin cá nhân</h2>
                    </Col>
                    <Col
                        xxl={24}
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        className={style.boxTitleProfile}
                    >
                        <h4>Xin chào, {customer?.full_name || "Khách hàng"}</h4>
                    </Col>
                </Row>

                {/* Form and Details */}
                <Row gutter={[16, 16]} className="container">
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={style.profileForm}
                        >
                            <Row className={style.formInput} gutter={[16, 16]}>
                                <Col span={24}>
                                    <label htmlFor="full_name">Họ Và Tên</label>
                                    <Controller
                                        name="full_name"
                                        control={control}
                                        rules={{
                                            required:
                                                "Họ và tên không được để trống",
                                        }}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                    {errors.full_name && (
                                        <p className={style.error}>
                                            {errors.full_name.message}
                                        </p>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="phone">Số Điện Thoại</label>
                                    <Controller
                                        name="phone"
                                        rules={{
                                            required:
                                                "Số điện thoại không được để trống",
                                        }}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                addonBefore="+84"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.phone && (
                                        <p className={style.error}>
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="email">Email</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required:
                                                "Email không được để trống",
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                message: "Email không hợp lệ",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                    {errors.email && (
                                        <p className={style.error}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="gender">Giới Tính</label>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Chọn giới tính"
                                                style={{ width: "100%" }}
                                            >
                                                <Select.Option
                                                    value={0}
                                                    key={0}
                                                >
                                                    Nam
                                                </Select.Option>
                                                <Select.Option
                                                    value={1}
                                                    key={1}
                                                >
                                                    Nữ
                                                </Select.Option>
                                                <Select.Option
                                                    value={2}
                                                    key={2}
                                                >
                                                    Khác
                                                </Select.Option>
                                            </Select>
                                        )}
                                    />
                                </Col>{" "}
                                <Col span={24}>
                                    <label htmlFor="date_of_birth">
                                        Ngày Sinh
                                    </label>
                                    <Controller
                                        name="date_of_birth"
                                        control={control}
                                        rules={{
                                            required:
                                                "Ngày sinh không được để trống",
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                style={{ width: "100%" }}
                                            />
                                        )}
                                    />
                                    {errors.date_of_birth && (
                                        <p className={style.error}>
                                            {errors.date_of_birth.message}
                                        </p>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="address">Địa chỉ</label>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <Input.TextArea
                                                {...field}
                                                rows={3}
                                            />
                                        )}
                                    />
                                </Col>{" "}
                                {/* <Col span={24}>
                                    <label htmlFor="status">Trạng Thái</label>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                className="w-100"
                                                defaultValue={1}
                                                {...field}
                                            >
                                                <Select.Option value={0}>
                                                    Không hoạt động
                                                </Select.Option>
                                                <Select.Option value={1}>
                                                    Hoạt động
                                                </Select.Option>
                                            </Select>
                                        )}
                                    />
                                </Col> */}
                            </Row>

                            <Row
                                justify="center"
                                className={style.actionButtons}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={style.updateButton}
                                >
                                    Cập Nhật
                                </Button>
                            </Row>
                        </form>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Card title="Đổi Mật Khẩu" className={style.card}>
                            <Row gutter={[16, 16]}>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Input.Password
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        placeholder="Mật khẩu cũ"
                                        className={style.inputPassword}
                                    />
                                </Col>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Input.Password
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="Mật khẩu mới"
                                        className={style.inputPassword}
                                    />
                                </Col>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Input.Password
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="Nhập lại mật khẩu mới"
                                        className={style.inputPassword}
                                    />
                                </Col>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Button
                                        type="primary"
                                        onClick={handlePasswordChange}
                                        className={style.updateButton}
                                    >
                                        Đổi Mật Khẩu
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Profile;
