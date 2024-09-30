import React from "react";
import { Card, Button, Row, Divider, Tooltip } from "antd";
import { FieldTimeOutlined, MoneyCollectFilled } from "@ant-design/icons";
import Slider from "react-slick";
import anh4 from "../../../assets/images/image4.png";
import styles from "../Styles/HomeService.module.scss";

const listService = [
    {
        id: "1",
        name: "Điều trị mụn (lẻ / trọn gói)",
        description: [
            "Điều trị cho mọi cấp độ mụn.",
            "Kết hợp dùng thuốc (thuốc uống, thuốc bôi), chăm sóc da và điều trị thâm, sẹo rỗ do mụn.",
        ],
        time: "60 phút",
        price: "1.000.000 - 2.000.000",
    },
    {
        id: "2",
        name: "Chăm sóc da chuyên sâu",
        description: [
            "Chăm sóc da mặt và toàn thân với liệu trình phù hợp.",
            "Sử dụng sản phẩm chất lượng cao và kỹ thuật hiện đại.",
        ],
        time: "90 phút",
        price: "1.500.000 - 3.000.000",
    },
    {
        id: "3",
        name: "Chăm sóc da chống lão hóa",
        description: [
            "Chăm sóc da giúp giảm dấu hiệu lão hóa.",
            "Sử dụng sản phẩm và kỹ thuật tiên tiến.",
        ],
        time: "75 phút",
        price: "1.200.000 - 2.500.000",
    },
    {
        id: "4",
        name: "Tẩy tế bào chết toàn thân",
        description: [
            "Tẩy tế bào chết giúp làn da mềm mịn.",
            "Sử dụng sản phẩm chất lượng cao.",
        ],
        time: "45 phút",
        price: "800.000 - 1.500.000",
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
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

const Home_service = () => {
    return (
        <section className={styles.container}>
            <Divider className={styles.divider} orientation="left">
                <h1>Dịch vụ nổi bật</h1>
            </Divider>
            <div className="container">
                <Slider {...settings}>
                    {listService.map((item) => (
                        <Card
                            key={item.id}
                            title={item.name}
                            extra={<Button type="primary">Xem</Button>}
                            className={styles.card}
                        >
                            <img
                                className={styles.cardImage}
                                src={anh4}
                                alt="service"
                            />
                            <p className={styles.cardContent}>
                                {item.description[0]}
                            </p>
                            <Tooltip
                                trigger="click"
                                title={`Thời gian điều trị: ${item.time}`}
                            >
                                <Button className={styles.tooltipButton}>
                                    <FieldTimeOutlined />
                                    <strong>Thời gian điều trị</strong>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                trigger="click"
                                title={`Chi phí dự kiến: ${item.price}`}
                            >
                                <Button className={styles.tooltipButton}>
                                    <MoneyCollectFilled />
                                    <strong>Chi phí dự kiến</strong>
                                </Button>
                            </Tooltip>
                        </Card>
                    ))}
                </Slider>
                <Row justify={"center"} align={"middle"}>
                    <Button type="primary" className={styles.showMoreButton}>
                        Xem thêm dịch vụ
                    </Button>
                </Row>
            </div>
        </section>
    );
};

export default Home_service;
