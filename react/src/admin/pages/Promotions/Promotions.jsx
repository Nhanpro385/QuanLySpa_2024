import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Progress, List } from "antd";
import {
    EllipsisOutlined,
    ClockCircleOutlined,
    FireOutlined,
} from "@ant-design/icons";
import fire from "../../assets/images/icons8-fire.gif";
import PromotionTable from "../../modules/promotion/compoments/PromotionTable";
import { useNavigate } from "react-router-dom";
import usePromotionActions from "../../modules/promotion/hooks/usepromotionAction";
import { useSelector } from "react-redux";
function Promotions() {
    useEffect(() => {
        document.title = "Quản lý chương trình khuyến mãi";
    }, []);
    const navigate = useNavigate();
    const { getPromotions, deletePromotions } = usePromotionActions();
    const [PromotionsData, setPromotionsData] = useState([]);
    const promotions = useSelector((state) => state.promotions);
    useEffect(() => {
        getPromotions();
    }, []);
    useEffect(() => {
        console.log(promotions.promotions.data);

        if (promotions.promotions.data && !promotions.loading) {
            setPromotionsData(
                promotions.promotions.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
    }, [promotions]);

    const handleEdit = (key) => {
        navigate(`/admin/khuyenmai/chinhsua/${key}`);
    };

    const handleDelete = async (key) => {
        try {
            const res = await deletePromotions(key);
            if (res.meta.requestStatus === "fulfilled") {
                getPromotions();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleAdd = () => {
        navigate("/admin/khuyenmai/them");
    };

    return (
        <div>
            <h1 className="text-center">Quản lý chương trình khuyến mãi</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h2>Danh Sách Chương Trình Khuyến Mãi</h2>
                <Button type="primary" onClick={handleAdd}>
                    <FireOutlined />
                    Thêm mới chương trình
                </Button>
            </div>

            {/* Promotion Table */}
            <PromotionTable
                dataSource={PromotionsData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Promotion Cards */}
            <List
                locale={{
                    emptyText: "Không có chương trình khuyến mãi nào",
                }}
                grid={{ gutter: 16, column: 3 }} // You can adjust the number of columns here
                dataSource={PromotionsData}
                pagination={{
                    pageSize: 6, // You can adjust the number of items per page here
                }}
                renderItem={(promotion) => {
                    // Tính toán tiến độ
                    const currentDate = new Date();
                    const startDate = new Date(promotion.start_date);
                    const endDate = new Date(promotion.end_date);

                    // Tính tổng thời gian và thời gian đã trôi qua
                    const totalDuration = endDate - startDate;
                    const timeElapsed = currentDate - startDate;

                    // Tính phần trăm tiến độ (đảm bảo không vượt quá 100% hoặc dưới 0%)
                    const progressPercent = Math.min(
                        Math.max((timeElapsed / totalDuration) * 100, 0),
                        100
                    );

                    return (
                        <List.Item key={promotion.id}>
                            <Card
                                bordered={false}
                                actions={[<EllipsisOutlined key="ellipsis" />]}
                                style={{
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <div>
                                    <h4>{promotion.name}</h4>
                                    {promotion.promotion_type === "Cash"
                                        ? `Hóa đơn từ ${parseInt(
                                              promotion.min_order_amount
                                          ).toLocaleString()} VNĐ trở lên sẽ được giảm giá`
                                        : `Giảm ${promotion.discount_percent}%`}
                                    <Progress
                                        percent={progressPercent} // Sử dụng progress tính từ ngày
                                        showInfo={false}
                                        strokeColor={{
                                            "0%": "#108ee9",
                                            "100%": "#87d068",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "12px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div>
                                        <img
                                            src={fire}
                                            alt="promotion"
                                            width="24px"
                                        />
                                        <span
                                            style={{
                                                fontSize: "19px",
                                                marginLeft: "8px",
                                            }}
                                        >
                                            {promotion.promotion_type === "Cash"
                                                ? `Giảm ${parseInt(
                                                      promotion.discount_percent
                                                  ).toLocaleString()} VNĐ`
                                                : `Giảm ${promotion.discount_percent}%`}
                                        </span>
                                    </div>
                                    <div>
                                        Số lượng: {promotion.min_quantity}
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
}

export default Promotions;
