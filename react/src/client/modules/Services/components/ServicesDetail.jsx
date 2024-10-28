import React from "react";
import { Row, Col } from "antd";
import style from "../style/ServicesDetail.module.scss";

import imgItems from "../../../assets/images/peel-da-spa.jpg";

const ServicesDetail = () => (
    <div className={style.container}>
        <Row justify={"center"}>
            <Col xl={18} lg={16} md={18} sm={22} xs={24}>
                <div className={style.boxTopTitle}>
                    <div className={style.boxServicesDetailTitle}>
                        <h2>Các Dịch Vụ Điều Trị Mụn Tại Sakura Spa</h2 >
                        <p className={style.titleDescription}>Sakura Spa tiên phong phương pháp điều trị mụn thỏa mãn đồng thời 3 điều kiện</p>
                        <div>Có căn cứ y học về hiệu quả</div>
                        <div>An toàn cho làn da</div>
                        <div>Đáp ứng tốt trên lâm sàn</div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row justify={"center"}>
            <Col className={style.boxTitleServicesDetailTop} xl={18} lg={16} md={18} sm={22} xs={24}>
                <h1>Dịch Vụ Điều Trị Mụn Chuẩn Y Khoa Cơ Bản</h1>
            </Col>
        </Row>
        <div className={style.boxServicesDetail}>
            <Row>
                <Col className="" span={24}>
                    <Row justify={"center"} gutter={[24, 24]}>
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Khám mụn chuẩn y khoa</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Dịch vụ khám mụn chuẩn Y khoa giúp ngăn ngừa mụn tiến triển nặng, hạn chế thâm, sẹo rỗ.</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Lấy Nhân Mụn Chuẩn Y Khoa</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Lấy nhân mụn chuẩn Y khoaO2 SKIN áp dụng quy trình lấy nhân mụn chuẩn Y khoa, hạn chế tổn thương da, ngăn ngừa hình thành sẹo rỗ, sẹo xấu.</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá niêm yết: 350.000 VNĐ (vùng mặt) - 650.000 (vùng cơ thể)Giá HSSV: 320.000 (vùng mặt) - 590.000 (vùng cơ thể)Giá niêm yết: 350.000 VNĐ (vùng mặt) - 650.000 (vùng cơ thể)Giá HSSV: 320.000 (vùng mặt) - 590.000 (vùng cơ thể)</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Chiếu Ánh Sáng Sinh Học Trị Mụn</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Dịch vụ hỗ trợ rút ngắn thời gian điều trị mụn, đảm bảo an toàn, không đau và không gây tác dụng phụ.</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá: 100.000 VNĐ</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Mặt Nạ Điều Trị Mụn Và Kiểm Soát Nhờn</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Mặt nạ giúp lỗ chân lông thông thoáng, cải thiện tình trạng bóng nhờn, hỗ trợ trị mụn hiệu quả</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá: 100.000 VNĐ (vùng mặt) - 200.000 VNĐ (vùng cơ thể)</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Peal Da Trị Mụn</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Đẩy nhanh quá trình tái tạo da, giúp gom khô cồi mụn, cải thiện tình trạng dày sừng, kiềm nhờn, trị mụn hiệu quả.</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá niêm yết: 957.000 VNĐ (vùng mặt), 1.430.000 - 2.750.000 (vùng cơ thể)
                                        Giá HSSV: 847.000 (vùng mặt), 1.320.000 - 2.640.000 (vùng cơ thể)</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                        <Col xl={7} xs={24}>
                            <div className={style.boxServicesItemDetail}>
                                <div className={style.boxServicesDetailItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemMiddle}>
                                    <p>Chiếu Ánh Sáng Và Điện Di Điều Trị Mụn</p>
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Dịch vụ kết hợp serum trị mụn, giảm nhờn chính hãng giúp da tăng cường thẩm thấu, ngừa mụn mới.</p>
                                </div>
                                <div className={style.boxServicesItemPrice}>
                                    <p>Giá niêm yết: 390.000 VNĐ (vùng mặt) - 550.000 VNĐ (vùng cơ thể)Giá HSSV: 340.000 (vùng mặt - 500.000 (vùng cơ thể)</p>
                                </div>
                                <a href="#">Xem chi tiết</a>
                            </div>
                        </Col>{" "}
                    </Row>
                </Col>
            </Row>
        </div>

    </div>
)

export default ServicesDetail;
