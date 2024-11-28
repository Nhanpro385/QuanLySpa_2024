import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Input, Avatar, Menu } from "antd";
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
        console.log(authCustomer?.user?.data);
        if (authCustomer?.user?.data) {
            setCustomer(authCustomer?.user?.data);
            // Set form values with user data
            setValue("name", authCustomer?.user?.data?.full_name || "");
            setValue("phone", authCustomer?.user?.data?.phone || "");
            setValue("email", authCustomer?.user?.data?.email || "");
            setValue("address", authCustomer?.user?.data?.address || "");
        }
    }, [authCustomer.user, setValue]);

    const onSubmit = (data) => {
        console.log(data);
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
                            <Row className={style.formInput}>
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
                            </Row>

                            <Row className={style.formInput}>
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
                            </Row>

                            <Row className={style.formInput}>
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
                            </Row>

                            <Row className={style.formInput}>
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
