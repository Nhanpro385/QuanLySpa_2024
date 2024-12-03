import React, { useState } from "react";
import { Col, Row, Layout, Drawer, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
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
        return (
            <Menu
                mode={isInline ? "horizontal" : "inline"}
                style={{
                    justifyContent: isInline ? "space-around" : "flex-start",
                    fontSize: "1.6rem",
                    lineHeight: "64px",
                    padding: isInline ? 0 : "0 16px",
                }}
                triggerSubMenuAction={"click"}
                items={[
                    {
                        label: (
                            <Link to="/" style={{ textDecoration: "none" }}>
                                Trang Chủ
                            </Link>
                        ),
                        key: "home",
                        style: { padding: "0 10px" },
                    },
                    {
                        label: "Giới Thiệu",
                        key: "about",
                        style: { padding: "0 10px" },
                        children: [
                            {
                                label: (
                                    <Link
                                        to="/about-us"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Về Chúng Tôi
                                    </Link>
                                ),
                                key: "about-us",
                            },
                            {
                                label: (
                                    <Link
                                        to="/store"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Hệ Thống Cửa Hàng
                                    </Link>
                                ),
                                key: "store",
                            },
                            {
                                label: (
                                    <Link
                                        to="/recruitment"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Tuyển Dụng
                                    </Link>
                                ),
                                key: "recruitment",
                            },
                        ],
                    },
                    {
                        label: (
                            <Link
                                to="/dichvu"
                                style={{ textDecoration: "none" }}
                            >
                                Dịch Vụ
                            </Link>
                        ),
                        key: "service",
                        style: { padding: "0 10px" },
                    },
                    {
                        label: (
                            <Link
                                to="/pricing"
                                style={{ textDecoration: "none" }}
                            >
                                Bảng Giá
                            </Link>
                        ),
                        key: "price",
                        style: { padding: "0 10px" },
                    },
                    {
                        label: (
                            <Link
                                to="/promotion"
                                style={{ textDecoration: "none" }}
                            >
                                Khuyến Mãi
                            </Link>
                        ),
                        key: "promotion",
                        style: { padding: "0 10px" },
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
                                className="btn btn-primary"
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
                        style: { padding: "0 10px" },
                    },
                    // Hiển thị thông tin cá nhân và đăng xuất nếu đã đăng nhập
                    isLoggedIn
                        ? {
                              label: (
                                  <span>
                                      Xin chào, <strong
                                        style={{ color: "#E05265" }}
                                      >{user?.name}</strong>
                                      <UserOutlined
                                          style={{ marginLeft: "10px" }}
                                      />
                                  </span>
                              ),
                              key: "user",
                              style: { padding: "0 10px" },
                              children: [
                                  {
                                      label: (
                                          <Link
                                              to="/thongtincanhan"
                                              style={{ textDecoration: "none" }}
                                          >
                                              Thông Tin Cá Nhân
                                          </Link>
                                      ),
                                      key: "profile",
                                  },
                                  {
                                      label: (
                                          <Link
                                              onClick={logout}
                                              style={{ textDecoration: "none" }}
                                          >
                                              Đăng Xuất
                                          </Link>
                                      ),
                                      key: "logout",
                                  },
                              ],
                          }
                        : {
                              label: (
                                  <Link
                                      to="/dangnhap"
                                      style={{ textDecoration: "none" }}
                                  >
                                      Đăng Nhập
                                  </Link>
                              ),
                              key: "login",
                              style: { padding: "0 10px" },
                          },
                ]}
            />
        );
    };

    return (
        <Header
            style={{
                backgroundColor: "#fff",
                padding: "0 16px",
                width: "100%",
            }}
            className="container"
        >
            <Row align="middle" gutter={[16, 16]}>
                <Col xs={8} sm={6} md={4}>
                    <Row align="middle" justify="middle">
                        <Col xs={0} sm={0} md={0} lg={6}>
                            <img
                                src={logo}
                                alt="logo"
                                style={{ width: "3.5rem" }}
                            />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={18}>
                            <h1
                                style={{
                                    fontSize: "2.5rem",
                                    color: "#E05265",
                                    fontWeight: 500,
                                    margin: "0",
                                }}
                            >
                                Sakura Spa
                            </h1>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={18}>
                    <AppMenu isInline={true} />
                </Col>
                <Col
                    xs={16}
                    sm={24}
                    md={24}
                    lg={0}
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
        </Header>
    );
};

export default HeaderComponents;
