import React, { useEffect, useState } from "react";
import {
    Col,
    Divider,
    Row,
    Table,
    Collapse,
    Badge,
    Tag,
    Typography,
    Button,
    Card,
    List,
    Result,
    Space,
    Image
} from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FrownOutlined } from "@ant-design/icons";
import usepromotionAction from "../../../../admin/modules/promotion/hooks/usepromotionAction"
import { URL_IMAGE } from "../../../../admin/config/appConfig";
import style from "../../Promotion/style/Promotion.module.scss";
import dayjs from "dayjs";
dayjs.locale("vi");

const Promotion = () => {
    const navigate = useNavigate();
    const { getClientPromotions } = usepromotionAction();
    const [promotion, setPromotion] = useState([]);
    const [loading, setLoading] = useState(true);

    const promotions = useSelector((state) => state.promotions);

    useEffect(() => {
        getClientPromotions(50);
    }, []);

    useEffect(() => {

        if (promotions.promotions?.data) {
            const data = promotions.promotions.data || [];

            setPromotion(
                data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
        setLoading(false);
    }, [promotions]);

    console.log(promotion);

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        try {
            return dayjs(dateString).format("DD/MM/YYYY");
        } catch (error) {
            console.error("Định dạng ngày thất bại:", error);
            return "Không hợp lệ";
        }
    };

    return (
        <div>
            <div className={style.boxServicesDetail}>
                <Divider orientation="center">
                    <h1
                        style={{
                            fontFamily: "Anton, sans-serif",
                            fontSize: "4rem",
                        }}
                    >
                        Các Mã Khuyến Mãi
                    </h1>
                </Divider>
                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <List
                            grid={{
                                gutter: 16,
                                column: 4,
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 4,
                                xxl: 4,
                            }}
                            pagination={{
                                pageSize: 8,
                                position: "bottom",
                                align: "center",
                            }}
                            dataSource={promotion}
                            locale={{
                                emptyText: (
                                    <Result
                                        icon={<FrownOutlined />}
                                        title="Không Tìm Thấy Khuyến Mãi"
                                        extra={<p>
                                            Hãy thử tải lại trang hoặc liên hệ với chúng tôi để được hỗ trợ
                                        </p>}
                                    />
                                ),
                            }}
                            renderItem={(item) => (
                                <List.Item>
                                    <div className={style.boxServicesItemDetail}>
                                        <div className={style.boxServicesDetailItemTop}>
                                            <Image
                                                src={
                                                    `${URL_IMAGE}/promotions/` +
                                                    item.image_url
                                                }

                                                alt={item.name || "Dịch vụ"}
                                                preview={false}
                                                className={style.image}
                                                onError={(e) =>
                                                (e.target.src =
                                                    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
                                                } // Thay thế hình ảnh khi lỗi
                                            />
                                        </div>
                                        <div className={style.boxServicesItemMiddle}>
                                            <p>Mã: {item.name}</p>
                                        </div>
                                        <div className={style.boxServicesItemBottom}>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={style.boxServicesItemPrice}>
                                            <p>
                                                Giá giảm:{" "}
                                                {item.discount_percent
                                                    ? `${parseInt(item.discount_percent).toLocaleString()}
                                            ${item.promotion_type === "Percent" ? "%" : "VNĐ"}`
                                                    : "Liên hệ"}
                                            </p>
                                        </div>
                                        <div className={style.boxDate}>
                                            <p>
                                                Ngày bắt đầu: {formatDate(item.start_date)}
                                            </p>
                                            <p>
                                                Ngày kết thúc: {formatDate(item.end_date)}
                                            </p>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Promotion;