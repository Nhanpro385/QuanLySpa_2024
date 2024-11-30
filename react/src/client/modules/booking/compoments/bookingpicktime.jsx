import React, { useState, useEffect } from "react";
import { Row, Col, Button, Divider } from "antd";
import Slider from "react-slick";

const settingstimedate = {
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const BookingPickTime = ({ activeDate, setActiveDate, styles }) => {
    // Generate the next 7 days starting from today
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const today = new Date();
        const next7Days = [];

        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            next7Days.push(nextDay);
        }

        setDates(next7Days);
    }, []);

    return (
        <Row justify="center" align="middle" style={{ marginTop: "30px" }}>
            <Col
                span={20}
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Row align="middle" justify="start">
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <Divider orientation="left">
                            <strong>4. Chọn thời gian</strong>
                        </Divider>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16}>
                        <Row align="middle" justify="start">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#E05265",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Đã chọn</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#838383",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Đã đặt</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#bef3d9",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Còn trống</span>
                            </div>
                        </Row>
                    </Col>
                </Row>

                <div style={{ padding: "20px" }}>
                    <Slider {...settingstimedate}>
                        {dates.map((date, index) => (
                            <div key={index} className="p-3 text-center">
                                <div
                                    style={{
                                        boxShadow:
                                            "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        borderRadius: "10px",
                                        padding: "10px",
                                    }}
                                    className={activeDate === index ? styles.active : ""}
                                    onClick={() => {
                                        setActiveDate(index);
                                    }}
                                >
                                    <div>
                                        <span>
                                            <strong>
                                                {date.toLocaleDateString("vi-VN", {
                                                    weekday: "short",
                                                })}
                                            </strong>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {date.toLocaleDateString("vi-VN")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    <Row gutter={[8, 8]}>
                        {[...Array(9)].map((_, index) => {
                            const startHour = 9; // Bắt đầu từ 9:00
                            const interval = 30; // Khoảng cách thời gian là 30 phút
                            const time = new Date();

                            time.setHours(startHour + Math.floor((index * interval) / 60));
                            time.setMinutes((index * interval) % 60);

                            const timeString = time.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <Col xs={12} sm={8} md={8} lg={8} xl={8} key={index}>
                                    <div
                                        style={{
                                            backgroundColor: "#E05265",
                                            color: "#fff",
                                            padding: "10px 30px",
                                            borderRadius: "5px",
                                            textAlign: "center",
                                            fontSize: "20px",
                                        }}
                                    >
                                        <div>{timeString}</div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>

                <Row justify="center" align="middle" gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                        <Button
                            type="primary"
                            style={{
                                width: "100%",
                            }}
                            size="large"
                        >
                            Thanh Toán Dịch Vụ
                        </Button>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                        <Button
                            type="primary"
                            style={{
                                width: "100%",
                            }}
                            ghost
                            size="large"
                        >
                            Thêm Dịch vụ
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default BookingPickTime;
