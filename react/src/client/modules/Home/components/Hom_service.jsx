import React, { useEffect, useState } from "react";
import { Card, Button, Row, Divider, Tooltip, Image } from "antd";
import {
    CarryOutFilled,
    FieldTimeOutlined,
    MoneyCollectFilled,
} from "@ant-design/icons";
import Slider from "react-slick";
import anh4 from "../../../assets/images/image4.png";
import styles from "../Styles/HomeService.module.scss";
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
import { useNavigate } from "react-router-dom";
import { URL_IMAGE } from "../../../../admin/config/appConfig";
const settings = {
    dots: false,
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
import { useSelector } from "react-redux";

const Home_service = () => {
    const navigate = useNavigate();
    const { getServicesClient } = useServicesActions();
    const services = useSelector((state) => state.services);
    const [servicesClient, setServicesClient] = useState([]);
    useEffect(() => {
        getServicesClient(10);
    }, []);
    useEffect(() => {
        if (services?.services?.data?.length > 0 && !services?.loading) {
            setServicesClient(services?.services?.data);
        }
    }, [services]);

    return (
        <section className={styles.container}>
            <div className="container p-5">
                <Divider className={styles.divider} orientation="left">
                    <h1>Dịch vụ nổi bật</h1>
                </Divider>
                <div className="container">
                    <Slider {...settings}>
                        {servicesClient.map((item, index) => (
                            <Card
                                key={index}
                                title={item.name}
                                className={styles.card}
                                cover={
                                    <Image
                                        fallback={anh4}
                                        src={
                                            `${URL_IMAGE}/services/special/` +
                                            item.image_url
                                        }
                                        style={{
                                            // padding: "10px",
                                            width: "100%",
                                            height: "200px",
                                            overflow: "hidden",
                                        }}
                                        alt="service"
                                    />
                                }
                            >
                                <p className={styles.cardContent}>
                                    {item.description}
                                </p>
                                <Tooltip
                                    trigger="click"
                                    title={`Thời gian điều trị: ${item.duration}`}
                                >
                                    <Button className={styles.tooltipButton}>
                                        <FieldTimeOutlined />
                                        <strong>Thời gian điều trị</strong>
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    trigger="click"
                                    title={`Chi phí dự kiến: ${parseInt(
                                        item.price
                                    ).toLocaleString()} VNĐ`}
                                >
                                    <Button className={styles.tooltipButton}>
                                        <MoneyCollectFilled />
                                        <strong>Chi phí dự kiến</strong>
                                    </Button>
                                </Tooltip>
                                <Button
                                    className={styles.tooltipButton}
                                    onClick={() => {
                                        navigate(
                                            `/datlichhen?dichvu=${item.id}`
                                        );
                                    }}
                                >
                                    <CarryOutFilled />
                                    <strong>Đặt lịch</strong>
                                </Button>
                            </Card>
                        ))}
                    </Slider>
                    <Row justify={"center"} align={"middle"}>
                        <Button
                            type="primary"
                            className={styles.showMoreButton}
                            onClick={() => {
                                navigate("/dichvu");
                            }}
                        >
                            Xem thêm dịch vụ
                        </Button>
                    </Row>
                </div>
            </div>
        </section>
    );
};

export default Home_service;
