import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "../styles/Home_about.module.scss"; // Import SCSS module
import anh4 from "../../../assets/images/image4.png";
import anh4_1 from "../../../assets/images/anh4_1.jpg";

import icons from "../../../assets/images/iconlogo.png";

const Home_about = () => {
    const navigate = useNavigate();

    return (
        <section className="container p-5">
            <Divider orientation="left">
                <h2>Giới thiệu về Sakura Spa</h2>
            </Divider>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={24} md={12}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <img src={anh4} alt="tori" width="100%" />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className={styles["image-text"]}>
                                Sakura Spa chú trọng tạo môi trường thư giãn,
                                với công nghệ y khoa hiện đại. Khách hàng có thể
                                mong đợi sự chăm sóc cá nhân hóa, kỹ thuật tiên
                                tiến và tập trung vào vẻ đẹp tự nhiên.
                            </p>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <p className={styles["image-text"]}>
                                Với máy móc hiện đại và tay nghề xuất sắc,
                                Sakura Spa cam kết mang lại sự hài lòng cho
                                khách hàng.
                            </p>
                        </Col>
                        <Col xs={24} md={12}>
                            <img src={anh4_1} alt="tori" width="100%" />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Row justify={"center"} align={"middle"}>
                        <Col span={24} className={styles.logo}>
                            <img src={icons} alt="logo" />
                            <h1 className={styles["spa-name"]}>Sakura Spa</h1>
                        </Col>
                        <Button
                            type="primary"
                            className={styles["button-container"]}
                            onClick={() => navigate("/gioithieu")}
                        >
                            Tìm hiểu về Sakura Spa <ArrowRightOutlined />
                        </Button>
                    </Row>
                </Col>
            </Row>
        </section>
    );
};

export default Home_about;
