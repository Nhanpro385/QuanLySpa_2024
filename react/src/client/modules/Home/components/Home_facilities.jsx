import React from "react";
import { Button, Col, Row } from "antd";
import Slider from "react-slick";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "../Styles/Home_facilities.scss"; // Import SCSS

import cosovatchat2 from "../../../assets/images/cosovatchat2.jpg";
import cosovatchat3 from "../../../assets/images/cosovatchat3.jpg";
import cosovatchat4 from "../../../assets/images/cosovatchat4.jpg";
import cosovatchat5 from "../../../assets/images/cosovatchat5.jpg";
import cosovatchat6 from "../../../assets/images/cosovatchat6.jpg";
import cosovatchat7 from "../../../assets/images/cosovatchat7.jpg";


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

const imgData = [
    {
        url: cosovatchat2
    },
    {
        url: cosovatchat3
    },
    {
        url: cosovatchat4
    },
    {
        url: cosovatchat5
    },
    {
        url: cosovatchat6
    },
    {
        url: cosovatchat7
    },
]

const sliderRef = React.createRef();

const Home_facilities = () => {
    return (
        <section className="facilities-section">
            <h1 className="facilities-title">
                Cơ sở vật chất hiện đại, phòng sang trọng, chuẩn y khoa
            </h1>
            <div className="container">
                <Slider ref={sliderRef} {...settings}>
                    {imgData.map((item, index) => (
                        <div key={index}>
                            <img
                                className="facility-image"
                                src={item.url}
                                alt="img"
                                height={'290px'}
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
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
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
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
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
                    {/* <Col xl={4} lg={4} md={4} sm={4} xs={24}>
                        <Button block type="text" className="view-more-button">
                            Xem thêm cơ sở vật chất
                        </Button>
                    </Col> */}
                </Row>
            </div>
        </section>
    );
};

export default Home_facilities;
