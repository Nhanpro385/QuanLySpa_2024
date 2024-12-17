import React, { useState } from "react";
import { Col, Row, Layout, Drawer, Menu, Dropdown, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons"; // Importing the icon
import logo from "../../assets/images/iconlogo.png";
import Icontori from "../../assets/images/tori.png";
import { useAuth } from "../../config/AuthContext";

const { Header } = Layout;

const HeaderComponents = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const AppMenu = ({ isInline = false }) => {
        const menuItems = [
            {
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/"
                    >
                        Trang Chủ
                    </Link>
                ),
                key: "home",
            },
            {
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/gioithieu"
                    >
                        Giới Thiệu
                    </Link>
                ),
                key: "about",
            },
            {
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/dichvu"
                    >
                        Dịch Vụ
                    </Link>
                ),
                key: "service",
            },
            {
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/pricing"
                    >
                        Bảng Giá
                    </Link>
                ),
                key: "price",
            },
            {
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/khuyenmai"
                    >
                        Khuyến Mãi
                    </Link>
                ),
                key: "promotion",
            },
            {
                label: (
                    <button
                        style={{
                            backgroundColor: "#E05265",
                            color: "#fff",
                            borderRadius: "5px",
                            padding: "5px 15px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.6rem",
                        }}
                        onClick={() => navigate("/datlichhen")}
                    >
                        Đặt Lịch Ngay
                        <span style={{ marginLeft: "10px" }}>
                            <img
                                src={Icontori}
                                alt="tori"
                                style={{ width: "20px" }}
                            />
                        </span>
                    </button>
                ),
                key: "contact",
            },
        ];

        // User Menu for logged-in state
        const userMenu = (
            <Menu>
                <Menu.Item key="profile">
                    <Button variant="outlined" block>
                        <Link
                            style={{
                                textDecoration: "none",
                            }}
                            to="/thongtincanhan"
                        >
                            Thông Tin Cá Nhân
                        </Link>
                    </Button>
                </Menu.Item>
                <Menu.Item key="booking">
                    <Button variant="outlined" block>
                        <Link
                            style={{
                                textDecoration: "none",
                            }}
                            to="/thongtincanhan/tuvandatlich"
                        >
                            Lịch Sử Tư Vấn
                        </Link>
                    </Button>
                </Menu.Item>
                <Menu.Item key="serviceHistory">
                    <Button variant="outlined" block>
                        <Link
                            style={{
                                textDecoration: "none",
                            }}
                            to="/thongtincanhan/lichsudichvu"
                        >
                            Lịch Sử Dịch Vụ
                        </Link>
                    </Button>
                </Menu.Item>
                {/* <Menu.Item key="treatmentHistory">
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/thongtincanhan/lichsudieutri"
                    >
                        Lịch Sử Điều Trị
                    </Link>
                </Menu.Item> */}
                <Menu.Item key="logout" onClick={logout}>
                    <Button variant="outlined" danger block>
                        Đăng Xuất
                    </Button>
                </Menu.Item>
            </Menu>
        );

        // Add user menu or login menu depending on login status
        if (isLoggedIn) {
            menuItems.push({
                label: (
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                        <a
                            className="ant-dropdown-link"
                            style={{
                                textDecoration: "none",
                            }}
                            onClick={(e) => e.preventDefault()}
                        >
                            <UserOutlined style={{ marginRight: "8px" }} />{" "}
                            {/* Add icon here */}
                            Xin chào,{" "}
                            <strong style={{ color: "#E05265" }}>
                                {user?.name}
                            </strong>
                        </a>
                    </Dropdown>
                ),
                key: "user",
            });
        } else {
            menuItems.push({
                label: (
                    <Link
                        style={{
                            textDecoration: "none",
                        }}
                        to="/dangnhap"
                    >
                        Đăng Nhập
                    </Link>
                ),
                key: "login",
            });
        }

        return (
            <Menu
                mode={isInline ? "horizontal" : "inline"}
                style={{
                    justifyContent: isInline ? "space-around" : "flex-start",
                    fontSize: "1.6rem",
                    lineHeight: "64px",
                    padding: isInline ? 0 : "0 16px",
                }}
                triggerSubMenuAction="click"
                items={menuItems}
            />
        );
    };

    return (
        <Header
            style={{
                backgroundColor: "#fff",
                padding: "0 50px",
                width: "100vw",
                position: "fixed",
                zIndex: 2
            }}

        >
            <div
                className="container"
            >

                <Row align="middle" gutter={[16, 16]}>
                    <Col xs={20} sm={20} md={20} lg={20} xl={4} xxl={4}>
                        <Row align="middle" justify="middle">
                            <Col xs={3} sm={3} md={2} lg={2} xl={3} xxl={4}>
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{ width: "3.5rem", cursor: "pointer" }}
                                    onClick={() => navigate("/")}
                                />
                            </Col>
                            <Col xs={21} sm={21} md={22} lg={22} xl={21} xxl={20}>
                                <h1
                                    style={{
                                        fontSize: "2.5rem",
                                        color: "#E05265",
                                        fontWeight: 500,
                                        margin: "0",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate("/")}
                                >
                                    Sakura Spa
                                </h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={20} xxl={20}>
                        <AppMenu isInline={true} />
                    </Col>
                    <Col
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={0}
                        style={{ textAlign: "right" }}
                    >
                        <MenuOutlined
                            onClick={() => setVisible(true)}
                            style={{
                                fontSize: "25px",
                                color: "#E05265",
                            }}
                        />
                    </Col>
                </Row>
                <Drawer
                    open={visible}
                    closable={() => setVisible(false)}
                    onClose={() => setVisible(false)}
                    placement="right"
                    width={350}
                >
                    <AppMenu />
                </Drawer>
            </div>
        </Header>
    );
};

export default HeaderComponents;
