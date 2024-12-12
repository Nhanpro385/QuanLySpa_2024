import React, { useEffect } from "react";
import { Row, Col, Button, Form, Input, Divider, notification } from "antd";

import style from "../style/AboutUs.module.scss";
import bannerDoctor from "../../../assets/images/anhbacsi2.jpg";
import iconTarget from "../../../assets/images/target.png";
import binocular from "../../../assets/images/binocular.png";
import healthcare from "../../../assets/images/healthcare.png";
import doctor from "../../../assets/images/doctor.png";
import health from "../../../assets/images/health-insurance.png";


const AboutUs = () => {
    return (
        <div className={style.container}>
            <Row justify="center" style={{ width: '100%' }}>
                <Col className={style.aboutContent}
                    xs={24}
                    sm={24}
                    md={14}
                    lg={16}
                    xl={18}>
                    <div className={style.boxContentLeft}>
                        <div className={style.boxContentTop}>
                            <img src={binocular} alt="" width={'55px'} /><h2 className={style.title}>Tầm Nhìn</h2>
                        </div>

                        <p className={style.textContent}>Đến năm 2030, Sakura Spa trở thành hệ thống phòng khám da liễu chuyên trị mụn hàng đầu Việt Nam, mỗi ngày tiếp nhận và giúp đỡ cho hơn 10.000 bạn trẻ được trị mụn chuẩn Y khoa.</p>
                    </div>
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={iconTarget} alt="" width={'45px'} /><h2 className={style.title}>Sứ mệnh</h2>
                        </div>
                        <p className={style.textContent}>Giúp các bạn trẻ được trị mụn chuẩn y khoa và chủ động phòng ngừa tái phát để tự tin trong giao tiếp, thăng tiến, từ đó thành công và hạnh phúc hơn.</p>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <Col
                    className={style.boxTitleAbout}
                    xl={24}
                    lg={16}
                    md={14}
                    sm={24}
                    xs={24}
                >
                    <h1>Giá Trị Cốt Lõi </h1>
                </Col>
            </Row>
            {/* <Row justify="center" style={{ width: '100%' }}>
                <Col className={style.aboutContentMiddle}
                    xs={24}
                    sm={24}
                    md={14}
                    lg={16}
                    xl={18}>
                    <div className={style.boxContentLeft}>
                        <div className={style.boxImg}>
                            <img

                                src={bannerDoctor} alt="" />
                        </div>
                    </div>

                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={healthcare} alt="" width={'40px'} /><h2 className={style.title}>Luôn Trung Thực</h2>
                        </div>
                        <p className={style.textContent}>Giá trị cốt lõi hàng đầu của Sakura Spa là trung thực với khách hàng. Phòng khám cam kết tư vấn trung thực về hiệu quả điều trị, đồng thời chỉ tư vấn phương pháp và sản phẩm thực sự cần thiết cho khách hàng.</p>
                    </div>
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={doctor} alt="" width={'40px'} /><h2 className={style.title}>Chuẩn Y Khoa</h2>
                        </div>
                        <p className={style.textContent}>Sakura Spa theo đuổi phương châm điều trị dựa trên căn cứ y học và bằng chứng lâm sàng. Vì thế, tất cả các phương pháp và sản phẩm trị mụn được chọn lựa sử dụng tại Sakura Spa đều đảm bảo chuẩn y khoa, an toàn và hiệu quả cho khách hàng.</p>
                    </div>
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={health} alt="" width={'40px'} /><h2 className={style.title}>Liên Tục Cải Tiến</h2>
                        </div>
                        <p className={style.textContent}>Góp ý từ khách hàng là những điều Sakura Spa thật sự trân trọng. Đây là động lực để phòng khám không ngừng cập nhật, đổi mới phương pháp điều trị mụn tiên tiến, chuẩn y khoa nhằm nâng cao chất lượng dịch vụ ngày một tốt hơn.</p>
                    </div>
                </Col>
            </Row> */}
            <Row justify="center" align="middle" style={{ width: '100%' }} className={style.aboutContentMiddle}>
                {/* Bên trái */}
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={10}
                    xl={8}
                    className={style.aboutContentLeft}
                    flex="1"
                >
                    <div className={style.boxContentLeft}>
                        <div className={style.boxImg}>
                            <img src={bannerDoctor} alt="" />
                        </div>
                    </div>
                </Col>

                {/* Bên phải */}
                <Col
                    xs={24}
                    sm={24}
                    md={16}
                    lg={12}
                    xl={10}
                    className={style.aboutContentRight}
                    flex='1'
                >
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={healthcare} alt="" width="40px" />
                            <h2 className={style.title}>Luôn Trung Thực</h2>
                        </div>
                        <p className={style.textContent}>
                            Giá trị cốt lõi hàng đầu của Sakura Spa là trung thực với khách hàng.
                            Phòng khám cam kết tư vấn trung thực về hiệu quả điều trị, đồng thời chỉ
                            tư vấn phương pháp và sản phẩm thực sự cần thiết cho khách hàng.
                        </p>
                    </div>
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={doctor} alt="" width="40px" />
                            <h2 className={style.title}>Chuẩn Y Khoa</h2>
                        </div>
                        <p className={style.textContent}>
                            Sakura Spa theo đuổi phương châm điều trị dựa trên căn cứ y học và bằng
                            chứng lâm sàng. Vì thế, tất cả các phương pháp và sản phẩm trị mụn được
                            chọn lựa sử dụng tại Sakura Spa đều đảm bảo chuẩn y khoa, an toàn và
                            hiệu quả cho khách hàng.
                        </p>
                    </div>
                    <div className={style.boxContentRight}>
                        <div className={style.boxContentTop}>
                            <img src={health} alt="" width="40px" />
                            <h2 className={style.title}>Liên Tục Cải Tiến</h2>
                        </div>
                        <p className={style.textContent}>
                            Góp ý từ khách hàng là những điều Sakura Spa thật sự trân trọng. Đây là
                            động lực để phòng khám không ngừng cập nhật, đổi mới phương pháp điều
                            trị mụn tiên tiến, chuẩn y khoa nhằm nâng cao chất lượng dịch vụ ngày
                            một tốt hơn.
                        </p>
                    </div>
                </Col>
            </Row>


        </div>
    )
}

export default AboutUs;
