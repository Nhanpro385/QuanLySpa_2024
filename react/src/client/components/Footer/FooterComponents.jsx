import React from "react";
import { Col, Row, Layout, Drawer, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/images/iconlogo.png";
import Icontori from "../../assets/images/tori.png";
import style from "./FooterComponents.module.scss"

import telephone from "../../assets/images/telephone.png";
import mail from "../../assets/images/mail.png";
import facebook from "../../assets/images/facebook.png";
import youtube from "../../assets/images/youtube.png";
import social from "../../assets/images/social.png";
import pin from "../../assets/images/pin.png";


const FooterComponents = () => {
    return (
        <div className={style.container}>
            <Row justify="center" style={{ width: '100%' }}>

                <Col className={style.footerContent}
                    xs={24}
                    sm={24}
                    md={14}
                    lg={16}
                    xl={18}>
                    <div className={style.boxLeft}>
                        <div className={style.boxTitle}>
                            <img src={logo} alt="" />
                            <h1>Sakura Spa</h1>
                        </div>
                        <div className={style.boxContent}>
                            <h3>CÔNG TY CỔ PHẦN THẨM MỸ SAKURA SPA</h3>
                            <p className={style.boxBusinessNumber}>Giấy Chứng Nhận Đăng Ký Kinh Doanh Số: 0229385112</p>

                            <div className={style.boxContact}>
                                <img src={telephone} alt="" />
                                <p>1600 2407</p>
                            </div>
                            <div className={style.boxContact}>
                                <img src={mail} alt="" />
                                <p>sakuraspa2025@gmail.com</p>
                            </div>
                        </div>
                        {/* <div className={style.boxSocial}>
                            <img src={facebook} alt="" />
                            <img src={youtube} alt="" />
                            <img src={social} alt="" />
                        </div> */}
                    </div>
                    <div className={style.boxMiddle}>
                        <div className={style.boxNameLocation}>
                            <h2>Địa Chỉ Phòng Khám</h2>
                        </div>
                        <div className={style.boxLocationItem}>
                            <div className={style.boxLocationItemName}>
                                <img src={pin} alt="" />
                                <h3>Cần Thơ</h3>
                            </div>
                            <p>14B1 Trương Vĩnh Nguyên, Thường Thạnh, Cái Răng, Cần Thơ</p>
                        </div>
                        <div className={style.boxLocationItem}>
                            <div className={style.boxLocationItemName}>
                                <img src={pin} alt="" />
                                <h3>TP.HCM</h3>
                            </div>
                            <p>31/3 Điện Biên Phủ, Phường 15, Quận Bình Thạnh.</p>
                        </div>
                        <div className={style.boxLocationItem}>
                            <div className={style.boxLocationItemName}>
                                <img src={pin} alt="" />
                                <h3>Bến Tre</h3>
                            </div>
                            <p>Võ Nguyên Giáp QL60, Ấp 1, Bến Tre, Việt Nam</p>
                        </div>
                        <div className={style.boxLocationItem}>
                            <div className={style.boxLocationItemName}>
                                <img src={pin} alt="" />
                                <h3>Phú Quốc</h3>
                            </div>
                            <p>D. Đông - Cửa Cạn, TT. Dương Đông, Phú Quốc, Kiên Giang, Việt Nam</p>
                        </div>
                        <div className={style.boxLocationItem}>
                            <div className={style.boxLocationItemName}>
                                <img src={pin} alt="" />
                                <h3>Sóc Trăng</h3>
                            </div>
                            <p>70-128 Nguyễn Trung Trực, Phường 2, Sóc Trăng, Việt Nam</p>
                        </div>
                    </div>
                    <div className={style.boxRight}>
                        <div className={style.boxPolicyName}>
                            <h2>Hỗ Trợ Khách Hàng</h2>
                        </div>
                        <div className={style.boxPolicyItem}>
                            <p>Chính Sách Giao Hàng</p>
                            <p>Chính Sách Đổi Trả Hàng</p>
                            <p>Quy Trình Đổi Trả Hàng</p>
                            <p>Liên Hệ Hỗ Trợ</p>
                            <p>Tuyển Dụng</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default FooterComponents;
