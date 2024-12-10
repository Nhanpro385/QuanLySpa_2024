import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

import style from "../style/SliderAboutUs.module.scss";
import bannerDoctor from "../../../assets/images/anhbacsi1.jpg";
import clsx from "clsx";
const SliderAboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <Row justify="center" align="middle" className={style.banner}>
                {/* Cột nội dung */}
                <Col
                    xs={24}
                    sm={24}
                    md={14}
                    lg={12}
                    xl={12}
                    className={clsx(style.contentCol, "container")}
                >
                    <div className={style.textContent}>
                        <p className={style.breadcrumb}>Trang chủ » Về chúng tôi</p>
                        <h1 className={style.title}>
                            Giới Thiệu Phòng Khám Da Liễu Sakura Spa
                        </h1>
                        <p className={style.description}>
                            Nhận thấy nhiều bạn trẻ tự điều trị mụn sai cách, luôn phải chật
                            vật với nỗi lo lắng về làn da kém thẩm mỹ, Sakura Spa đã ra đời với
                            mong muốn giúp các bạn được điều trị mụn hiệu quả và khoa học.
                        </p>
                        <p className={style.description}>
                            Tháng 2/2015, Phòng Khám Sakura Spa được Sở Y tế cấp phép hoạt động
                            và trở thành địa chỉ tiên phong Chuyên điều trị mụn chuẩn Y khoa.
                            Sau hơn 9 năm theo đuổi sứ mệnh, Sakura Spa đã giúp cho hơn 489.000
                            Khách hàng được điều trị mụn thành công và tự tin hơn trong cuộc
                            sống.
                        </p>
                        <Button className={style.ctaButton} type="primary" size="large" onClick={() => navigate("/datlichhen")}>
                            Đặt Lịch Ngay →
                        </Button>
                    </div>
                </Col>
                {/* Cột hình ảnh */}
                <Col
                    xs={24}
                    sm={24}
                    md={10}
                    lg={12}
                    xl={12}
                    className={clsx(style.imageCol, "mt-4", "p-4")}
                >
                    <div className={style.imageWrapper}>
                        <img
                            src={bannerDoctor}
                            alt="Banner Doctor"
                            className={style.bannerImage}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SliderAboutUs;
