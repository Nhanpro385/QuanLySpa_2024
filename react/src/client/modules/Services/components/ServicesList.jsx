import React from "react";

import { Row, Col, Button } from "antd";
import style from "../style/ServicesList.module.scss";

import imgItems from "../../../assets/images/peel-da-spa.jpg";

const Services_List = () => (
    <div className={style.container}>
        <Row justify={"center"}>
            <Col className={style.boxTitleServicesTop} xl={18} lg={16} md={18} sm={22} xs={24}>
                <h1 >Các Dịch Vụ Điều Trị Tại Sakura Spa</h1>
            </Col>
        </Row>
        <div className={style.boxServicesList}>
            <Row>
                <Col className="" span={24}>
                    <Row justify={"center"} gutter={[16, 16]}>
                        <Col xl={8} xs={24}>
                            <div className={style.boxServicesItem}>
                                <div className={style.boxServicesItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Điều trị mụn</p>
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxServicesItem}>
                                <div className={style.boxServicesItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Điều trị thâm mụn</p>
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxServicesItem}>
                                <div className={style.boxServicesItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Phục hồi da</p>
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxServicesItem}>
                                <div className={style.boxServicesItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Điều trị sẹo rỗ</p>
                                </div>
                            </div>
                        </Col>{" "}
                        <Col xl={8} xs={24}>
                            <div className={style.boxServicesItem}>
                                <div className={style.boxServicesItemTop}>
                                    <img src={imgItems} alt="" />
                                </div>
                                <div className={style.boxServicesItemBottom}>
                                    <p>Chăm sóc da sau điều trị mụn</p>
                                </div>
                            </div>
                        </Col>{" "}
                    </Row>
                </Col>
            </Row>
        </div>
    </div>
)

export default Services_List;
