import React, { useRef } from "react";
import { Card, Button, Row, Col, Image } from "antd";
import Slider from "react-slick";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import anh4 from "../../../assets/images/image4.png";

// Cấu hình cho Slider

const BookingListService = ({
    activeService,
    setActiveService,
    service,
    setService,
    ServicesCategories,
}) => {
    const sliderRef = useRef();
    const settingsservice = {
        dots: true,
        speed: 500,
        slidesToShow:
            ServicesCategories.length > 4 ? 4 : ServicesCategories.length, // Dynamically adjust based on categories length
        slidesToScroll: 4,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow:
                        ServicesCategories.length > 4
                            ? 4
                            : ServicesCategories.length, // Adjust for screen sizes
                    slidesToScroll: 4,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };
    const settings = {
        arrows: false,
        dots: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false, // Ngừng vòng lặp cho các mục ít
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
        ],
    };
    const Apptab = () => {
        return (
            <div
                className="slider-container"
                style={{ width: "100%", textAlign: "center" }}
            >
                <Slider ref={sliderRef} {...settings}>
                    {ServicesCategories[activeService]?.service.map(
                        (item, index) => (
                            <div key={index} className="p-3">
                                <Card
                                    style={{
                                        boxShadow:
                                            "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    }}
                                    cover={
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "150px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Image
                                                alt="example"
                                                src={
                                                    "http://127.0.0.1:8000/storage/uploads/services/special/" +
                                                    item.image_url
                                                }
                                                onError={(e) => e.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} // Thay thế hình ảnh khi lỗi
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain", // Fix the image distortion issue
                                                }}
                                            />
                                        </div>
                                    }
                                >
                                    <Card.Meta title={item.name} />
                                    <div className="m-2">
                                        Giá:{" "}
                                        <strong style={{ color: "#E05265" }}>
                                            {parseInt(
                                                item.price
                                            ).toLocaleString()}{" "}
                                            VNĐ{" "}
                                        </strong>
                                    </div>
                                    <Button
                                        type={
                                            service
                                                .map((item) => item.id)
                                                .includes(item.id)
                                                ? "primary"
                                                : "default"
                                        }
                                        style={{
                                            width: "100%",
                                        }}
                                        onClick={() => {
                                            if (
                                                service
                                                    .map((item) => item.id)
                                                    .includes(item.id)
                                            ) {
                                                setService(
                                                    service.filter(
                                                        (service) =>
                                                            service.id !==
                                                            item.id
                                                    )
                                                );
                                            } else {
                                                setService([
                                                    ...service,
                                                    {
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        quantity: 1,
                                                    },
                                                ]);
                                            }
                                        }}
                                    >
                                        {service
                                            .map((item) => item.id)
                                            .includes(item.id)
                                            ? "Đã chọn"
                                            : "Chọn"}
                                    </Button>
                                </Card>
                            </div>
                        )
                    )}
                </Slider>
                <Row
                    justify="center"
                    align="middle"
                    style={{ marginTop: "20px" }}
                >
                    <Col span={24}>
                        <Row justify="center" align="middle" gutter={[16, 16]}>
                            <Col
                                xs={{ span: 4 }}
                                sm={{ span: 3 }}
                                md={{ span: 2 }}
                                lg={{ span: 2 }}
                                xl={{ span: 2 }}
                            >
                                <Button
                                    block
                                    type="primary"
                                    style={{
                                        fontSize: "20px",
                                        color: "#fff",
                                    }}
                                    onClick={() =>
                                        sliderRef.current.slickPrev()
                                    }
                                >
                                    <ArrowLeftOutlined />
                                </Button>
                            </Col>
                            <Col
                                xs={{ span: 4 }}
                                sm={{ span: 3 }}
                                md={{ span: 2 }}
                                lg={{ span: 2 }}
                                xl={{ span: 2 }}
                            >
                                <Button
                                    block
                                    type="primary"
                                    style={{
                                        fontSize: "20px",
                                        color: "#fff",
                                    }}
                                    onClick={() =>
                                        sliderRef.current.slickNext()
                                    }
                                >
                                    <ArrowRightOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <Row style={{ width: "100%" }}>
            <Col span={24} className="p-2 mb-5">
                <Slider {...settingsservice}>
                    {ServicesCategories.map((item, index) => (
                        <div className="p-2" key={index}>
                            <Button
                                shape="round"
                                icon={item.icon}
                                block
                                onClick={() => setActiveService(index)}
                                type={
                                    activeService === index
                                        ? "primary"
                                        : "default"
                                }
                            >
                                <span>{item.name}</span>
                            </Button>
                        </div>
                    ))}
                </Slider>
            </Col>
            <Col span={24}>
                <Apptab />
            </Col>
        </Row>
    );
};

export default BookingListService;
