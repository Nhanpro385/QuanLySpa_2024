import React from "react";
import Slider from "react-slick";
import { Card, Row, Col, Button, Divider } from "antd";
import styles from "../styles/HomeDoctor.module.scss";

const { Meta } = Card;

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

const Home_doctor = () => {
    return (
        <section className={styles.container}>
            <Divider orientation="center">
                <h2 className={styles.heading}>
                    Hơn <strong>32+</strong> bác sĩ có chuyên môn về da liễu và
                    tâm huyết với nghề
                </h2>
            </Divider>
            <div className="container">
                <Slider className={styles.slider} {...settings}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index}>
                            <Card
                                hoverable
                                className={styles.card}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://img.freepik.com/free-photo/smiling-asian-male-doctor-pointing-upwards_1262-18321.jpg?uid=R106360279&semt=ais_hybrid"
                                    />
                                }
                            >
                                <Meta
                                    title="Bác sĩ Nguyễn Văn A"
                                    description="chuyên khoa da liệu tại Sakura Spa"
                                />
                            </Card>
                        </div>
                    ))}
                </Slider>
                <Row justify="center" style={{ marginTop: "20px" }}>
                    <Button type="primary" className={styles.button}>
                        Xem thêm bác sĩ
                    </Button>
                </Row>
            </div>
        </section>
    );
};

export default Home_doctor;
