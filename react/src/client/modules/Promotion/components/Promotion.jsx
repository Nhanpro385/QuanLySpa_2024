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
    Image,
    Modal,

} from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FrownOutlined } from "@ant-design/icons";
import usepromotionAction from "../../../../admin/modules/promotion/hooks/usepromotionAction"
import { URL_IMAGE } from "../../../../admin/config/appConfig";
import style from "../../Promotion/style/Promotion.module.scss";
import dayjs from "dayjs";
dayjs.locale("vi");
const { Text, Title } = Typography;

const Promotion = () => {
    const navigate = useNavigate();
    const { getClientPromotions } = usepromotionAction();
    const [promotion, setPromotion] = useState([]);
    const [loading, setLoading] = useState(true);

    const promotions = useSelector((state) => state.promotions);

    const [selectedPromotion, setSelectedPromotion] = useState(null); // State để lưu khuyến mãi được chọn
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        try {
            return dayjs(dateString).format("DD/MM/YYYY");
        } catch (error) {
            console.error("Định dạng ngày thất bại:", error);
            return "Không hợp lệ";
        }
    };

    const handleClickPromotion = (item) => {
        setSelectedPromotion(item); // Lưu thông tin khuyến mãi được chọn
        setIsModalOpen(true); // Hiển thị modal
    };

    const handleCloseModal = () => {
        setSelectedPromotion(null); // Xóa thông tin khuyến mãi
        setIsModalOpen(false); // Ẩn modal
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
                                <List.Item style={{ height: "100%" }}>
                                    <Row justify={"center"} gutter={[24, 24]}>
                                        <Col xl={24} xs={24}>
                                            <div
                                                onClick={() => handleClickPromotion(item)}>
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
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: item.description || "Không có mô tả",
                                                        }}>
                                                        </p>
                                                    </div>
                                                    <div className={style.boxServicesItemPrice}>
                                                        <p>
                                                            Giảm Giá:{" "}
                                                            {item.discount_percent
                                                                ? `${parseInt(item.discount_percent).toLocaleString()}
                                                        ${item.promotion_type === "Percent" ? " %" : "VNĐ"}`
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
                                            </div>

                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>

            {/* Modal hiển thị chi tiết khuyến mãi */}
            <Modal
                title="Chi Tiết Khuyến Mãi"
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" type="primary" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
                width={'1000px'}
            >
                {selectedPromotion && (
                    <div>
                        <Image
                            src={`${URL_IMAGE}/promotions/${selectedPromotion.image_url}`}
                            alt={selectedPromotion.name}
                            style={{ marginBottom: "16px", width: "100%" }}
                        />
                        <Title level={3} style={{ marginTop: '20px' }}>Mã: {selectedPromotion.name}</Title>
                        <Text style={{ fontWeight: '400', fontSize: '20px' }} >
                            <div dangerouslySetInnerHTML={{
                                __html: selectedPromotion.description || "Không có mô tả",
                            }}></div>
                        </Text>

                        <div style={{ marginTop: "16px" }}>
                            <p style={{ fontSize: '18px', color: 'red', fontWeight: '500' }}>
                                Giảm giá:{" "}
                                {selectedPromotion.discount_percent
                                    ? `${parseInt(selectedPromotion.discount_percent).toLocaleString()} ${selectedPromotion.promotion_type === "Percent" ? "%" : "VNĐ"
                                    }`
                                    : "Liên hệ"}
                            </p>
                            <p style={{ fontSize: '16px' }}>
                                <b>Ngày bắt đầu:</b> {formatDate(selectedPromotion.start_date)}
                            </p>
                            <p style={{ fontSize: '16px' }}>
                                <b>Ngày kết thúc:</b> {formatDate(selectedPromotion.end_date)}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Promotion;