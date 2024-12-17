import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, notification, Row, Col } from "antd";
import {
    SettingOutlined,
    MenuOutlined,
    UserOutlined,
    SelectOutlined,
    StarOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import NotificationModule from "../../modules/Notification/compoments/NotificationModule";
import useAuthActions from "../../modules/authen/hooks/useAuth";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderAdmin = () => {
    const { authLogout } = useAuthActions();
    const [openDrawer, setOpenDrawer] = useState(false);



    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const menuItems = [
        {
            key: "1",
            icon: <VideoCameraAddOutlined />,
            label: (
                <Link
                    to="/admin/tuvankhachhang"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 500
                        }}
                    >  Yêu cầu tư vấn</p>
                </Link>
            ),
        },

        {
            key: "2",
            label: <NotificationModule />,
        },
        {
            key: "3",
            icon: <UserOutlined />,
            label: (
                <Link
                    to="/admin/thongtincanhan"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 500
                        }}
                    > Thông tin cá nhân</p>
                </Link >
            ),
        },
        {
            key: "4",
            icon: <SelectOutlined />,
            label: <p>Đăng Xuất</p>,
            onClick: async () => {
                try {
                    const res = await authLogout();

                    notification.success({
                        message: "Đăng xuất thành công",
                        description: "Chuyển hướng đến trang đăng nhập...",
                        placement: "topRight",
                    });
                    setTimeout(() => {
                        window.location.href = "/admin/dangnhap";
                    }, 1000);
                } catch {
                    notification.error({
                        message: "Lỗi hệ thống",
                        description:
                            "Không thể đăng xuất. Vui lòng thử lại sau.",
                        placement: "topRight",
                    });
                }
            },
        },
    ];

    return (
        <Header style={{ padding: 0, background: "#fff" }}>
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

            <Drawer onClose={onCloseDrawer} open={openDrawer}>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderAdmin;
