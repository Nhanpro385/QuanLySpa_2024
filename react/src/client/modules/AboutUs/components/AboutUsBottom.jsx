import React from "react";
import { Row, Col, Button } from "antd";
import style from "../style/AboutUsBottom.module.scss";
import bannerDoctor from "../../../assets/images/bacsi3.jpg";
import shield from "../../../assets/images/health-insurance.png";


const AboutUsBottom = () => {
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
                    className={style.contentCol}
                >
                    <div className={style.textContent}>
                        {/* <p className={style.breadcrumb}>Trang chủ » Về chúng tôi</p> */}
                        <h1 className={style.title}>
                            Triết Lý Kinh Doanh
                        </h1>
                        <div className={style.boxContentTop}>
                            <img src={shield} alt="" width={'40px'} /><h2>Trị Mụn Chuẩn Y Khoa:</h2>
                        </div>
                        <p className={style.description}>
                            Phác đồ điều trị của Sakura Spa được xây dựng dựa trên phác đồ chuẩn của ngành da liễu. Đồng thời, bác sĩ điều trị sẽ điều chỉnh phù hợp với từng khách hàng đảm bảo đạt kết quả tối ưu và an toàn tối đa.
                        </p>
                        <div className={style.boxContentTop}>
                            <img src={shield} alt="" width={'40px'} /><h2>Phòng Ngừa Tái Phát:</h2>
                        </div>
                        <p className={style.description}>
                            Sau khi điều trị mụn thành công tại Sakura Spa, khách hàng sẽ được hướng dẫn chăm sóc da tại nhà khoa học và cách lựa chọn sản phẩm phù hợp. Nhờ vậy giúp duy trì kết quả lâu dài, ngăn ngừa mụn tái phát.
                        </p>
                        <div className={style.boxContentTop}>
                            <img src={shield} alt="" width={'40px'} /><h2>Tiết Kiệm Chi Phí:</h2>
                        </div>
                        <p className={style.description}>
                            Khi khách hàng được điều trị mụn đúng đắn ngay từ đầu tại Sakura Spa sẽ giúp tránh các biến chứng có hại cho da và tiết kiệm tiền bạc, thời gian.
                        </p>
                    </div>
                </Col>
                {/* Cột hình ảnh */}
                <Col
                    xs={24}
                    sm={24}
                    md={10}
                    lg={12}
                    xl={12}
                    className={style.imageCol}
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

export default AboutUsBottom;
