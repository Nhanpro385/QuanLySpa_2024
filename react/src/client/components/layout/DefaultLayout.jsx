import React from "react";
import HeaderComponents from "../Header/HeaderComponents";
import FooterComponents from "../Footer/FooterComponents";
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
                <div
                    style={{
                        position: "relative",
                        // marginTop: "50px"
                    }}
                >

                    <HeaderComponents

                    />
                    <Content
                        style={{
                            marginTop: "50px"
                        }}
                    >{children}</Content>
                    <FooterComponents />
                </div>


            </Layout>
        </ConfigProvider>
    );
};

export default DefaultLayout;
