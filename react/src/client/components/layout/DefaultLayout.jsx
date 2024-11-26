import React from "react";
import HeaderComponents from "../Header/HeaderComponents";
import { Layout, ConfigProvider } from "antd";
const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        horizontalItemSelectedColor: "#E05265",
                        itemSelectedColor: "#E05265",
                    },
                    // Table: {
                    //     colorBgContainer: "#FFDCDC",
                    //     colorBorder: "#fff",
                    //     headerBg: "#E05265",
                    //     headerColor: "white",
                    // },
                },
                token: {
                    colorPrimary: "#E05265",
                },
            }}
        >
            <Layout style={{
                backgroundColor: "#fff",
            }}
            >
                <HeaderComponents />
                <Content>{children}</Content>
            </Layout>
        </ConfigProvider>
    );
};

export default DefaultLayout;
