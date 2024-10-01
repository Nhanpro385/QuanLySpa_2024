import React from "react";
import { Button, Col, Row } from "antd";
import Slider from "react-slick";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import anh4 from "../../../assets/images/image4.png";
import "../Styles/Home_facilities.scss"; // Import SCSS

const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
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

const sliderRef = React.createRef();

const Home_facilities = () => {
    return (
        <section className="facilities-section">
            <h1 className="facilities-title">
                Cơ sở vật chất hiện đại, phòng sang trọng, chuẩn y khoa
            </h1>
            <div className="container">
                <Slider ref={sliderRef} {...settings}>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index}>
                            <img
                                className="facility-image"
                                src={anh4}
                                alt="tori"
                            />
                        </div>
                    ))}
                </Slider>
                <Row
                    justify={"center"}
                    align={"middle"}
                    className="slider-controls"
                >
                    <Col span={24}>
                        <Row
                            justify={"center"}
                            align={"middle"}
                            gutter={[16, 16]}
                        >
                            <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                <Button
                                    block
                                    type="text"
                                    className="slider-button"
                                    onClick={() =>
                                        sliderRef.current.slickPrev()
                                    }
                                >
                                    <ArrowLeftOutlined />
                                </Button>
                            </Col>
                            <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                <Button
                                    block
                                    type="text"
                                    className="slider-button"
                                    onClick={() =>
                                        sliderRef.current.slickNext()
                                    }
                                >
                                    <ArrowRightOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4} xs={24}>
                        <Button block type="text" className="view-more-button">
                            Xem thêm cơ sở vật chất
                        </Button>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Home_facilities;
