import React, { useState } from "react";
import {
    Layout,
    Menu,
    Drawer,
    Button,
    notification,
    Row,
    Col,
} from "antd";
import {
    SettingOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import NotificationModule from "../../modules/Notification/NotificationModule";
import useAuthActions from "../../modules/authen/hooks/useAuth";

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
            label: <NotificationModule />,
        },
        {
            key: "2",
            icon: <SettingOutlined />,
            label: "Đăng xuất",
            onClick: async () => {
                try {
                    const res = await authLogout();
                    if (res.meta.requestStatus === "fulfilled") {
                        notification.success({
                            message: "Đăng xuất thành công",
                            description: "Chuyển hướng đến trang đăng nhập...",
                            placement: "topRight",
                        });
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
                } catch {
                    notification.error({
                        message: "Lỗi hệ thống",
                        description: "Không thể đăng xuất. Vui lòng thử lại sau.",
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
