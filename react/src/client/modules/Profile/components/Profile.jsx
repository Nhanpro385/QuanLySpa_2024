import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "antd";
import {
    UserOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    AppstoreOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import style from "../style/Profile.module.scss";
import MenuProfile from "./MenuProfile";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// React Hook Form
import { useForm, Controller } from "react-hook-form";

const { SubMenu } = Menu;

const Profile = () => {
    const { authGetmeClient } = useAuthActions();
    const authCustomer = useSelector((state) => state.auth);
    const [customer, setCustomer] = useState({});

    const { control, handleSubmit, setValue } = useForm();

    useEffect(() => {
        authGetmeClient();
    }, []);

    useEffect(() => {
        if (authCustomer?.user?.data) {
            console.log(authCustomer?.user?.data);

            setCustomer(authCustomer?.user?.data);
        }
    }, [authCustomer]);
    useEffect(() => {
        if (customer) {
            // Set form values with user data
            setValue("name", authCustomer?.user?.data?.full_name || "");
            setValue("phone", authCustomer?.user?.data?.phone || "");
            setValue("email", authCustomer?.user?.data?.email || "");
            setValue("address", authCustomer?.user?.data?.address || "");
            setValue("gender", authCustomer?.user?.data?.gender || 0);
            setValue("address", authCustomer?.user?.data?.address || "");
            setValue("status", authCustomer?.user?.data?.status || true);
            setValue(
                "date_of_birth",
                dayjs(authCustomer?.user?.data?.date_of_birth) || ""
            );
        }
    }, [customer]);
    const onSubmit = async (data) => {
        try {
            const payload = {
                full_name: data.name,
                gender: data.gender,
                email: data.email,
                phone: data.phone,
                date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD"),
                address: data.address,
                status: data.status,
            };
        } catch (e) {
            console.log(e);
        }

        // Xử lý lưu trữ dữ liệu khi form submit (ví dụ: gửi lên API)
    };

    return (
        <Row className={style.container} gutter={[16, 16]}>
            {/* Sidebar Menu */}
            <Col xs={24} sm={6} lg={6} className={style.sidebar}>
                <MenuProfile />
            </Col>

            {/* Profile Content */}
            <Col xs={24} sm={18} lg={18} className={style.profileContent}>
                <Row justify="center" align="middle" className={style.header}>
                    <Col xs={6} className={style.boxAvatar}>
                        <Avatar
                            size={100}
                            icon={<UserOutlined />}
                            className={style.avatar}
                        />
                        <div className={style.avatarActions}>
                            <Button className={style.avatarBtn}>
                                Thay Đổi
                            </Button>
                            <Button danger className={style.avatarBtn}>
                                Xóa Bỏ
                            </Button>
                        </div>
                    </Col>
                    <Col xs={18} className={style.boxTitleProfile}>
                        <h2>Quản lý thông tin cá nhân</h2>
                    </Col>
                </Row>

                {/* Form and Details */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={16}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={style.profileForm}
                        >
                            <Row className={style.formInput} gutter={[16, 16]}>
                                <Col span={24}>
                                    <label htmlFor="name">Họ Và Tên</label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="phone">Số Điện Thoại</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                addonBefore="+84"
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col span={24}>
                                    <label htmlFor="email">Email</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
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
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                style={{ width: "100%" }}
                                            />
                                        )}
                                    />
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
                                <Col span={24}>
                                    <label htmlFor="status">Trạng Thái</label>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checkedChildren="Hoạt động"
                                                unCheckedChildren="Khóa"
                                                defaultChecked
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                            </Row>

                            <Row
                                justify="center"
                                className={style.actionButtons}
                            >
                                <Button className={style.cancelButton}>
                                    Hủy Bỏ
                                </Button>
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

                    <Col xs={24} lg={8}>
                        <div className={style.pointsBox}>
                            <label>Tích Điểm Đổi Thưởng:</label>
                            <div className={style.points}>
                                <span>Điểm Thưởng:</span>
                                <strong>300 Point</strong>
                                <Button className={style.exchangeButton}>
                                    Đổi Quà
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Profile;
