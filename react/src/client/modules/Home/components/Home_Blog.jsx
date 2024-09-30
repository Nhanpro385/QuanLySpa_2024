import React from "react";
import { Badge, Button, Card, Divider, Row, Tag } from "antd";
import Slider from "react-slick";
import "../Styles/Home_Blog.scss"; // Đưa phần CSS vào một file riêng

const { Meta } = Card;

const settings = {
    arrows: false,
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

const Home_Blog = () => {
    return (
        <section className="blog-section">
            <Divider orientation="left">
                <h1 className="blog-title">Chia sẻ kiến thức về chăm sóc da</h1>
            </Divider>
            <Slider {...settings}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <Card
                        key={index}
                        className="blog-card"
                        hoverable={true}
                        cover={
                            <Badge.Ribbon
                                text={Date.now() % 2 === 0 ? "Mới" : "Hot"}
                            >
                                <img
                                    alt="example"
                                    src="https://tamanhhospital.vn/wp-content/uploads/2023/10/mun-noi-tiet-o-vung-ma.jpg"
                                    className="blog-image"
                                    width={"100%"}
                                />
                            </Badge.Ribbon>
                        }
                    >
                        <Row justify={"center"} align={"middle"}>
                            <div className="blog-tag">Chăm sóc da</div>
                        </Row>

                        <Meta
                            title="Mụn đầu đen"
                            description="Tìm hiểu về cách chăm sóc da để ngăn ngừa mụn đầu đen."
                        />
                        <div className="m-3 float-start">
                            <span className="blog-tags">
                                <Tag color="#E05265">Tip trị mụn</Tag>
                            </span>
                        </div>
                    </Card>
                ))}
            </Slider>
            <Row justify={"center"} align={"middle"} className="mt-3">
                <Button size="large" type="primary">Xem thêm bài viết</Button>
            </Row>
        </section>
    );
};

export default Home_Blog;
