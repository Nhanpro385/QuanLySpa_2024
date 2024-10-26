import React, { useState } from "react";
import {
    Layout,
    Menu,
    Badge,
    Popover,
    Row,
    Col,
    Avatar,
    notification,
    Drawer,
    Button,
} from "antd";
import {
    UserOutlined,
    SettingOutlined,
    NotificationOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import styles from "@admin/modules/Notification/notification.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { logoutAction } from "@admin/modules/authen/actions/authActions";
const { Header } = Layout;

const HeaderAdmin = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const showDrawer = () => {
        setOpen2(true);
    };
    const onClose = () => {
        setOpen2(false);
    };
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            user: "Nguyễn Văn A",
            message: "Đặt lịch hẹn",
            time: "16 phút trước",
            type: "appointment",
            read: false,
        },
        {
            id: 2,
            user: "Trần Thị B",
            message: "Để lại bình luận",
            time: "30 phút trước",
            type: "comment",
            read: false,
        },
        {
            id: 3,
            user: "Lê Văn C",
            message: "Đặt lịch hẹn",
            time: "45 phút trước",
            type: "appointment",
            read: true,
        },
        {
            id: 4,
            user: "Nguyễn Thị D",
            message: "Để lại bình luận",
            time: "1 giờ trước",
            type: "comment",
            read: true,
        },
    ]);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);

        // Mark all notifications as read when the popover is opened
        if (!newOpen) {
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );
        }
    };

    const notificationContent = (
        <div style={{ width: "600px", height: "300px", overflowY: "scroll" }}>
            <div style={{ marginBottom: "20px" }}>
                <h4>Thông báo đặt lịch</h4>
                <Row gutter={[0, 8]}>
                    {notifications
                        .filter(
                            (notification) =>
                                notification.type === "appointment"
                        )
                        .map((notification, index) => (
                            <Col
                                span={24}
                                className={clsx(
                                    styles.notification,
                                    styles.noti_appointment,
                                    { [styles.read]: notification.read }
                                )}
                                key={notification.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Row align={"middle"}>
                                    <Col span={2}>
                                        <Avatar
                                            shape="square"
                                            icon={<UserOutlined />}
                                            size="large"
                                        />
                                    </Col>
                                    <Col span={22} style={{ padding: 10 }}>
                                        <div>
                                            <p style={{ margin: 0 }}>
                                                <strong>
                                                    {notification.user}
                                                </strong>{" "}
                                                {notification.message}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    margin: 0,
                                                }}
                                            >
                                                {notification.time}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                </Row>
            </div>
            <div>
                <h4>Thông báo bình luận</h4>
                <Row gutter={[0, 8]}>
                    {notifications
                        .filter(
                            (notification) => notification.type === "comment"
                        )
                        .map((notification, index) => (
                            <Col
                                span={24}
                                className={clsx(
                                    styles.notification,
                                    styles.noti_comment,
                                    { [styles.read]: notification.read }
                                )}
                                key={notification.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Row align={"middle"}>
                                    <Col span={2}>
                                        <Avatar
                                            shape="square"
                                            icon={<UserOutlined />}
                                            size="large"
                                        />
                                    </Col>
                                    <Col span={22} style={{ padding: 10 }}>
                                        <div>
                                            <p style={{ margin: 0 }}>
                                                <strong>
                                                    {notification.user}
                                                </strong>{" "}
                                                {notification.message}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    margin: 0,
                                                }}
                                            >
                                                {notification.time}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );

    // Cấu trúc Menu sử dụng items
    const menuItems = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: (
                <Link to="/admin/consultant">Quản lý Tư vấn trực tuyến</Link>
            ),
        },
        {
            key: "2",
            icon: <SettingOutlined />,
            label: "Cài đặt",
        },
        {
            key: "3",
            icon: <NotificationOutlined />,
            label: (
                <Popover
                    content={notificationContent}
                    title="Thông báo"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Badge
                        offset={[10, -5]}
                        count={
                            notifications.filter(
                                (notification) => !notification.read
                            ).length
                        }
                    >
                        Thông báo
                    </Badge>
                </Popover>
            ),
        },
        {
            key: "4",
            icon: <SettingOutlined />,
            label: "Đăng xuất",
            onClick: () => {
                const logout = async () => {
                    try {
                        const res = await logoutAction();
                        if (res.success) {
                            notification.success({
                                message: "Đăng xuất thành công",
                                description:
                                    "Chuyển hướng đến trang đăng nhập...",
                                placement: "topRight",
                            });
                            // Redirect to login page after logout
                            setTimeout(() => {
                                window.location.href = "/admin/dangnhap";
                            }, 1000);
                        } else {
                            notification.error({
                                message: "Đăng xuất thất bại",
                                description: "Đã xảy ra lỗi. Vui lòng thử lại.",
                                placement: "topRight",
                            });
                        }
                    } catch (error) {
                        notification.error({
                            message: "Lỗi hệ thống",
                            description:
                                "Không thể đăng xuất. Vui lòng thử lại sau.",
                            placement: "topRight",
                        });
                    }
                };
                logout();
            },
        },
    ];

    return (
        <Header
            className="site-layout-background"
            style={{ padding: 0, background: "#fff" }}
        >
            <Row align={"middle"}>
                <Col xl={24} lg={24} md={24} sm={0} xs={0}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        style={{ lineHeight: "64px" }}
                        items={menuItems}
                    />
                </Col>
                <Col xl={0} lg={0} md={0} sm={20} xs={20}>
                    <h1 className="m-4">Sakura Spa </h1>
                </Col>
                <Col xl={0} lg={0} md={0} sm={4} xs={4}>
                    <Button
                        type="primary"
                        className="float-end m-4"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                    />
                </Col>
            </Row>

            <Drawer onClose={onClose} open={open2}>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                    items={menuItems}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderAdmin;
