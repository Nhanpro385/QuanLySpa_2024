import React, { useRef, useEffect } from "react";
import { Card, Button, Row, Col, Image, List } from "antd";

import style from "../styles/bookingListService.module.scss";
import { URL_IMAGE } from "../../../../admin/config/appConfig";
// Cấu hình cho Slider
const BookingListService = ({
    activeService,
    setActiveService,
    service,
    setService,
    ServicesCategories,
}) => {
    const serviceButtonsRefs = useRef([]); // Mảng lưu refs của các nút dịch vụ

    // Đảm bảo có thể tham chiếu tới từng nút dịch vụ
    // useEffect(() => {
    //     if (serviceButtonsRefs.current[activeService]) {
    //         // Cuộn đến phần tử dịch vụ được chọn
    //         serviceButtonsRefs.current[activeService].scrollIntoView({
    //             behavior: "smooth",
    //             block: "center", // Cuộn đến vị trí ở giữa phần tử
    //         });
    //     }
    // }, [activeService]); // Mỗi khi activeService thay đổi, sẽ cuộn đến dịch vụ đó

    const Apptab = () => {
        return (
            <div className="container">
                <List
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    pagination={{
                        pageSize: 4,
                        responsive: true,
                        showSizeChanger: false,
                        hideOnSinglePage: true,
                    }}
                    dataSource={ServicesCategories[activeService]?.service}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                style={{
                                    boxShadow:
                                        "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}
                                cover={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            alt="example"
                                            src={
                                                `${URL_IMAGE}/services/special/` +
                                                item.image_url
                                            }
                                            onError={(e) =>
                                                (e.target.src =
                                                    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
                                            } // Thay thế hình ảnh khi lỗi
                                        />
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={
                                        <div
                                            className={style.cardServicesTitle}
                                        >
                                            {item.name}
                                        </div>
                                    }
                                />
                                <div className="m-2">
                                    Giá:{" "}
                                    <strong style={{ color: "#E05265" }}>
                                        {parseInt(item.price).toLocaleString()}{" "}
                                        VNĐ{" "}
                                    </strong>
                                </div>
                                <Button
                                    type={
                                        service
                                            .map((item) => item.id)
                                            .includes(item.id)
                                            ? "primary"
                                            : "default"
                                    }
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        if (
                                            service
                                                .map((item) => item.id)
                                                .includes(item.id)
                                        ) {
                                            setService(
                                                service.filter(
                                                    (service) =>
                                                        service.id !== item.id
                                                )
                                            );
                                        } else {
                                            setService([
                                                ...service,
                                                {
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    quantity: 1,
                                                },
                                            ]);
                                        }
                                    }}
                                >
                                    {service
                                        .map((item) => item.id)
                                        .includes(item.id)
                                        ? "Đã chọn"
                                        : "Chọn"}
                                </Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    };

    return (
        <Row style={{ width: "100%" }}>
            <Col span={24} className="p-2 mb-5">
                <List
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    pagination={{
                        pageSize: 4,
                        responsive: true,
                        showSizeChanger: false,
                        hideOnSinglePage: true,
                    }}
                    dataSource={ServicesCategories}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Button
                                ref={(el) =>
                                    (serviceButtonsRefs.current[index] = el)
                                }
                                shape="round"
                                icon={item.icon}
                                block
                                onClick={() => setActiveService(index)}
                                type={
                                    activeService === index
                                        ? "primary"
                                        : "default"
                                }
                            >
                                {item.name}
                            </Button>
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={24}>
                <Apptab />
            </Col>
        </Row>
    );
};

export default BookingListService;
