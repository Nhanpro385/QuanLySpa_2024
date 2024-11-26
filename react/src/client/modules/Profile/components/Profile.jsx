import React from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Button, Input, Avatar, Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined, StarOutlined, AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import style from "../style/Profile.module.scss";
import MenuProfile from "./MenuProfile";

const { SubMenu } = Menu;

const Profile = () => (
    <Row className={style.container} gutter={[16, 16]}>
        {/* Sidebar Menu */}
        <Col xs={24} sm={6} lg={6} className={style.sidebar}> 
            <MenuProfile />
        </Col>

        {/* Profile Content */}
        <Col xs={24} sm={18} lg={18} className={style.profileContent}>
            <Row justify="center" align="middle" className={style.header}>
                <Col xs={6} className={style.boxAvatar}>
                    <Avatar size={100} icon={<UserOutlined />} className={style.avatar} />
                    <div className={style.avatarActions}>
                        <Button className={style.avatarBtn}>Thay Đổi</Button>
                        <Button danger className={style.avatarBtn}>Xóa Bỏ</Button>
                    </div>
                </Col>
                <Col xs={18} className={style.boxTitleProfile}>
                    <h2>Quản lý thông tin cá nhân</h2>
                </Col>
            </Row>


            {/* Form and Details */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <div className={style.profileForm}>
                        <Row className={style.formInput}>
                            <Col span={24}>
                                <label htmlFor="name">Họ Và Tên</label>
                                <Input value={"Nguyễn Thái Dương"} />
                            </Col>
                        </Row>

                        <Row className={style.formInput}>
                            <Col span={24}>
                                <label htmlFor="phone">Số Điện Thoại</label>
                                <Input addonBefore="+84" value={"978648720"} />
                            </Col>
                        </Row>

                        <Row className={style.formInput}>
                            <Col span={24}>
                                <label htmlFor="email">Email</label>
                                <Input value={"duongt22@gmail.com"} />
                            </Col>
                        </Row>

                        <Row className={style.formInput}>
                            <Col span={24}>
                                <label htmlFor="address">Địa chỉ</label>
                                <Input.TextArea
                                    value={"14b1 Trương Vĩnh Nguyên, Thượng Thạnh, Cái Răng, Cần Thơ"}
                                    rows={3}
                                />
                            </Col>
                        </Row>

                        <Row justify="center" className={style.actionButtons}>
                            <Button className={style.cancelButton}>Hủy Bỏ</Button>
                            <Button className={style.updateButton}>Cập Nhật</Button>
                        </Row>
                    </div>
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

export default Profile;

