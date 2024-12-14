import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Progress, Input, notification } from "antd";
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
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        document.title = "Quản lý chương trình khuyến mãi";
    }, []);
    const navigate = useNavigate();
    const { getPromotions, deletePromotions, searchPromotions } =
        usePromotionActions();
    const [PromotionsData, setPromotionsData] = useState([]);
    const promotions = useSelector((state) => state.promotions);

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    const pagination = promotions.promotions.meta || {};

    useEffect(() => {
        getPromotions();
    }, []);

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchPromotions(searchQuery);
        } else {
            getPromotions();
        }
    }, [searchQuery]);

    useEffect(() => {
        console.log(promotions.promotions.data);

        if (promotions.promotions.data && !promotions.loading) {
            setPromotionsData(
                promotions?.promotions?.data.map((item) => ({
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
                api.success({
                    message: "Xóa chương trình khuyến mãi thành công",
                    description: res.payload.message || "",
                });
                getPromotions();
            } else {
                api.error({
                    message: "Xóa chương trình khuyến mãi thất bại",
                    description: res.payload.message || "",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleAdd = () => {
        navigate("/admin/khuyenmai/them");
    };

    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };

    const handlePageChange = (page, pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: pagination }));
    };

    return (
        <div>
            {contextHolder}
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
            <div style={{ width: "600px" }} className="mb-3">
                <Input.Search
                    placeholder="Tìm kiếm khuyến mãi theo tên"
                    allowClear
                    enterButton="Tìm kiếm"
                    onSearch={onSearch}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            {/* Promotion Table */}
            <PromotionTable
                loading={Promotions.loading}
                dataSource={PromotionsData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                pagination={pagination}
                handlePageChange={handlePageChange}
            />

            {/* Promotion Cards */}
            <Row gutter={[16, 16]}>
                {PromotionsData.map((promotion) => {
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
                        <Col xl={8} md={12} sm={24} xs={24} key={promotion.id}>
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
                                        ? `hóa đơn từ
                                                 ${parseInt(
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
                                        Sản phẩm tối thiểu:{" "}
                                        {promotion.min_quantity}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Promotions;
