import React, { useEffect, useState } from "react";
import { Row, Col, List, Empty, Image, Button } from "antd";
import style from "../style/ServicesDetail.module.scss";
import { useNavigate } from "react-router-dom";

const ServicesDetail = ({ listservices }) => {
    const [cateService, setCateService] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("listservices", listservices);

        if (listservices?.service) {
            setCateService(listservices.service);
        } else {
            setCateService([]);
        }
    }, [listservices]);

    return (
        <div>
            <Row justify="center">
                <Col
                    className={style.boxTitleServicesDetailTop}
                    xl={18}
                    lg={16}
                    md={18}
                    sm={22}
                    xs={24}
                >
                    <h1>Danh sách dịch vụ</h1>
                </Col>
            </Row>
            <div className={style.boxServicesDetail}>
                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={[24, 24]}>
                            <List
                                grid={{
                                    gutter: 16,
                                    column: 4,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 4,
                                    xl: 4,
                                    xxl: 4,
                                }}
                                pagination={{
                                    pageSize: 6,
                                    position: "bottom",
                                    align: "center",
                                }}
                                dataSource={cateService}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            description="Không có dịch vụ nào vui lòng chọn loại dịch vụ khác."
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                    ),
                                }}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div className={style.boxServicesItemDetail}>
                                            <div className={style.boxServicesDetailItemTop}>
                                                <Image
                                                    src={
                                                        "http://127.0.0.1:8000/storage/uploads/services/special/" +
                                                        item.image_url
                                                    }
                                                    alt={item.name || "Dịch vụ"}
                                                    preview={false}
                                                    className={style.image}
                                                    onError={(e) => e.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"} // Thay thế hình ảnh khi lỗi
                                                />
                                            </div>
                                            <div className={style.boxServicesItemMiddle}>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className={style.boxServicesItemBottom}>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className={style.boxServicesItemPrice}>
                                                <p>
                                                    Giá:{" "}
                                                    {item.price
                                                        ? `${parseInt(item.price).toLocaleString()} VNĐ`
                                                        : "Liên hệ"}
                                                </p>
                                            </div>
                                            <Row justify="center" gutter={[8, 8]}>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Button
                                                        block
                                                        onClick={() => navigate(`/dichvu/${item.id}`)}
                                                        danger
                                                        variant="outlined"
                                                        className={style.btnServicesDetail}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        Xem chi tiết
                                                    </Button>
                                                </Col>
                                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Button
                                                        block
                                                        onClick={() => navigate(`/datlichhen?dichvu=${item.id}`)}
                                                        type="primary"
                                                        className={style.btnServicesDetail}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        Đặt lịch
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ServicesDetail;
