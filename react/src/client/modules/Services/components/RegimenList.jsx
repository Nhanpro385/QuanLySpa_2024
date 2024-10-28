import React from "react";
import { Row, Col, Button } from "antd";
import style from "../style/RegimenList.module.scss";

const RegimenList = () => (
    <div className={style.container}>
        <Row justify={"center"}>
            <Col className={style.boxTitleRegimenTop} xl={18} lg={16} md={18} sm={22} xs={24}>
                <h1>Phác Đồ Chuyên Biệt Hiệu Quả Lâu Dài</h1>
            </Col>
        </Row>
        <div className={style.boxTitleRegimen}>
            <Row justify={"center"}>
                <Col xl={18} lg={16} md={18} sm={22} xs={24}>
                    <h4 >
                        Tại Sakura Spa, bạn sẽ được tư vấn - thăm khám - điều trị mụn trực tiếp cùng bác sĩ da liễu vững vàng chuyên môn,
                        dày dặn kinh nghiệm, mang đến hiệu quả nhanh chóng và giúp bạn tránh được các rủi ro khi tự điều trị tại nhà.
                    </h4>
                </Col>
            </Row>
        </div>
        <div className={style.boxRegimenList}>
            <Row>
                <Col className="" span={24}>
                    <Row justify={"center"} gutter={[24, 24]}>
                        <Col xl={8} xs={24}>
                            <div className={style.boxRegimenItem}>
                                <div className={style.boxRegimenItemTop}>
                                    <p>Hiệu quả tối ưu</p>
                                </div>
                                <div className={style.boxRegimenItemBottom}>
                                    Đội ngũ bác sĩ Da liễu Sakura Spa có nhiều năm kinh nghiệm thăm khám và điều trị mụn chuyên sâu, giúp bạn xác định tình trạng và nguyên nhân gây mụn, thiết lập phác đồ điều trị phù hợp, điều trị đúng ngay từ đầu và sớm mang lại hiệu quả
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxRegimenItem}>
                                <div className={style.boxRegimenItemTop}>
                                    <p>Phác đồ trị mụn chuyên biệt, an toàn</p>
                                </div>
                                <div className={style.boxRegimenItemBottom}>
                                    Phác đồ cá nhân hóa được thiết kế phù hợp với từng làn da, tình trạng mụn và cơ địa của Khách hàng, giúp trị mụn hiệu quả và tránh các biến chứng do mụn như thâm, sẹo rỗ…
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxRegimenItem}>
                                <div className={style.boxRegimenItemTop}>
                                    <p>Ngăn ngừa mụn tái phát hiệu quả</p>
                                </div>
                                <div className={style.boxRegimenItemBottom}>
                                    Sau khi điều trị mụn thành công, bạn sẽ được Bác sĩ và dược sĩ hướng dẫn quy trình chăm sóc da tại nhà tối giản, tư vấn lựa chọn sản phẩm phù hợp, giúp ngừa mụn tái phát hiệu quả.
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxRegimenItem}>
                                <div className={style.boxRegimenItemTop}>
                                    <p>Tiết kiệm thời gian và chi phí</p>
                                </div>
                                <div className={style.boxRegimenItemBottom}>
                                    Sakura Spa thiết kế liệu trình điều trị cá nhân hóa, chỉ tư vấn sản phẩm cần thiết, không chèo kéo nhằm giúp khách hàng tiết kiệm chi phí và công sức, đặc biệt phù hợp học sinh – sinh viên.
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxRegimenItem}>
                                <div className={style.boxRegimenItemTop}>
                                    <p>Hiểu sâu và có kiến thức chăm sóc làn da</p>
                                </div>
                                <div className={style.boxRegimenItemBottom}>
                                    Sakura Spa đồng hành và sẵn sàng tư vấn cặn kẽ, cung cấp cho khách hàng kiến thức đúng về nguyên nhân gây ra mụn, cũng như cách kiểm soát và ngăn ngừa chúng tái phát sau này.
                                </div>
                            </div>
                        </Col>{" "}
                    </Row>
                </Col>
            </Row>
        </div>

    </div>
)

export default RegimenList;
