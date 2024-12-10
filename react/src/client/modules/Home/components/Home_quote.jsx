import React from "react";
import { Col, Row } from "antd";
import anh5 from "../../../assets/images/anh5.png";
import styles from "../styles/HomeQuote.module.scss";

const statistics = [
    { id: "1", number: "200+", description: "Khách hàng mỗi ngày" },
    { id: "2", number: "20+", description: "Bác sĩ da liễu, tay nghề cao" },
    { id: "3", number: "50+", description: "Chuyên viên xuất sắc" },
    { id: "4", number: "500+", description: "Liệu trình hoàn thành" },
];

const Home_quote = () => {
    return (
        <section className={styles.container}>
            <div className="container p-5">
                <Row justify={"center"} align={"middle"}>
                    <Col span={18}>
                        <p className={styles.quoteText}>
                            "Thấu hiểu những lo lắng này, Sakura Spa đã ra đời
                            với dịch vụ điều trị mụn <br />
                            chuẩn y khoa, cung cấp những giải pháp thiết thực
                            giúp khách hàng vượt qua những khó khăn trong quá
                            trình điều trị mụn"
                        </p>
                        <Row gutter={[16, 16]}>
                            {statistics.map((item) => (
                                <Col
                                    xl={6}
                                    lg={6}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    key={item.id}
                                    className={styles.statisticItemContainer}
                                >
                                    <div className={styles.statisticItem}>
                                        <h1>{item.number}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col
                        xl={6}
                        lg={6}
                        md={0}
                        sm={0}
                        xs={0}
                        className={styles.imgContainer}
                    >
                        <img src={anh5} alt="tori" />
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Home_quote;
