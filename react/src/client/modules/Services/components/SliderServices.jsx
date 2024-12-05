import React from "react";
import { Row, Col, Button, Carousel } from "antd";

import style from "../style/SliderServices.module.scss";

import bannerDoctor from "../../../assets/images/bannerdoctor.png";

const contentStyle = {
    width: "100%",
    position: "relative",
};

const SliderServices = () => (
    <div style={contentStyle}>
        <Carousel autoplay>
            <Row justify={"center"}>
                <Col xl={24} lg={20} md={22} sm={24} xs={24}>
                    <div>
                        <div
                            style={{
                                width: "100%",
                                minHeight: "550px",
                                backgroundColor: "#FFDCDC",
                            }}
                        ></div>
                        <div className={style.boxBannerLeft}>
                            {/* <p className={style.boxBannerLeftTitle}>Trang chủ {">>"} Dịch Vụ Điều Trị Mụn Chuẩn Y Khoa</p> */}
                            <p className={style.boxBannerLeftText}>
                                Dịch Vụ Điều Trị Mụn Chuẩn Y Khoa
                            </p>
                            <Button type="primary" href="/trangchu#tuvan"
                            style={{
                                textDecoration: "none",
                            }}
                            >
                                Nhận tư vấn ngay
                            </Button>
                        </div>
                        <div className={style.boxBannerRight}>
                            <img
                                style={{ width: "100%" }}
                                src={bannerDoctor}
                                alt="bannerDoctor"
                            />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <img style={{ width: "100%" }} src={baner1} alt="baner1" /> */}
            {/* <div>
        <div style={{ width: "100%", height: "500px", backgroundColor: "#FFDCDC" }}></div>
        <div className={style.boxBannerLeft}>
          <p className={style.boxBannerLeftTitle}>Trang chủ {">>"} Dịch Vụ Điều Trị Mụn Chuẩn Y Khoa</p>
          <p className={style.boxBannerLeftText}>Dịch Vụ Điều Trị Mụn Chuẩn Y Khoa</p>
          <button className={style.boxBannerLeftBtn}>Nhận tư vấn ngay</button>
        </div>
        <div className={style.boxBannerRight}>
          <img style={{ width: "100%" }} src={bannerDoctor} alt="bannerDoctor" />
        </div>
      </div> */}
        </Carousel>
    </div>
);

export default SliderServices;
