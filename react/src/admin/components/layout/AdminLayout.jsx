import React, { useState } from "react";

import { ConfigProvider, Layout, Menu, theme } from "antd";
import vi_VN from "antd/locale/vi_VN";

import Sidebar from "../sidebar/Sidebar";
import HeaderAdmin from "../Header";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const AdminLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        horizontalItemSelectedColor: "#E05265",
                        itemSelectedColor: "#E05265",
                    },
                },
                token: {
                    colorPrimary: "#E05265",
                },
            }}
            locale={vi_VN}
        >
            <Layout
                style={{
                    minHeight: "100vh",
                }}
            >
                <Sidebar />
                <Layout>
                    <HeaderAdmin />

                    <Content
                        style={{
                            margin: "0 16px",
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                marginTop: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: "center",
                        }}
                    >
                       Trang quản trị Dịch vụ chăm sóc sức khỏe Sakura Spa ©2025 Created by Sakura Spa
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
export default AdminLayout;
