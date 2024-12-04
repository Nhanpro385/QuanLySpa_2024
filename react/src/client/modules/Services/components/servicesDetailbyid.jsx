import React, { useEffect, useState } from "react";
import style from "../style/servicesDetailbyid.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
import { useSelector } from "react-redux";
import {
    Divider,
    Card,
    Descriptions,
    Image,
    Row,
    Col,
    Tag,
    Spin,
    Button,
    Select,
    Avatar,
    List,
    Space,
    Rate,
    Input,
} from "antd";
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

const ServicesDetailById = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState({});
    const [expandedKeys, setExpandedKeys] = useState({});
    const { getServicesDetailClient } = useServicesActions();
    const services = useSelector((state) => state.services);

    useEffect(() => {
        getServicesDetailClient(id);
    }, [id]);

    useEffect(() => {
        if (services.service?.data) {
            setService(services?.service?.data);
        } else {
            setService({});
        }
    }, [services]);

    const toggleReplies = (key) => {
        setExpandedKeys((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (!service || Object.keys(service).length === 0) {
        return (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                />
            </div>
        );
    }

    const data = service.comments.map((item, index) => ({
        key: index,
        title: item?.customer?.full_name || "Khách hàng không xác định",
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}` || "",
        description: "Phản hồi từ khách hàng.",
        content: item?.comment || "Không có",
        time: item?.created_at || "Không có",
        rating: item.rate || 0,
        replies: item?.replies?.map((reply, replyIndex) => ({
            key: `${index}-${replyIndex}`,
            title: reply?.customer?.full_name || "Người dùng không xác định",
            avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${replyIndex}`,
            description: "Phản hồi từ nhân viên.",
            content: reply?.comment || "Không có",
            time: reply?.created_at || "Không có",
        })),
    }));

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const loadMore = service?.comments.length > 3 && (
        <div
            style={{
                textAlign: "center",
                marginTop: 12,
                height: 32,
                lineHeight: "32px",
            }}
        >
            <Button onClick={"onLoadMore"}>Xem thêm</Button>
        </div>
    );

    return (
        <div className="container" style={{ padding: "20px" }}>
            <Divider orientation="left">Chi tiết dịch vụ</Divider>
            <h1
                className="title"
                style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    textTransform: "uppercase",
                }}
            >
                {service?.name || "Tên dịch vụ không có sẵn"}
            </h1>
            <Card>
                <Row gutter={[16, 16]}>
                    <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>
                        <Card
                            bordered={false}
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Image
                                src={`http://127.0.0.1:8000/storage/uploads/services/special/${service?.image_url}`}
                                alt={service?.name || "Không có hình ảnh"}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                }}
                            />
                        </Card>
                        <Button
                            block
                            type="primary"
                            style={{ marginTop: "20px" }}
                            onClick={() => {
                                navigate(`/datlichhen?dichvu=${service?.id}`);
                            }}
                        >
                            Đặt lịch
                        </Button>
                    </Col>
                    <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
                        <Card bordered={false}>
                            <Descriptions
                                title="Thông tin dịch vụ"
                                layout="vertical"
                            >
                                <Descriptions.Item label="Mô tả">
                                    {service?.description ||
                                        "Thông tin không có sẵn"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Giá">
                                    {service?.price
                                        ? `${parseInt(
                                              service?.price
                                          ).toLocaleString()} VNĐ`
                                        : "Liên hệ"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Thời gian thực hiện">
                                    {service?.duration || "Chưa xác định"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Danh mục">
                                    {service?.service_category_id?.name ||
                                        "Chưa xác định"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Tag
                                        color={
                                            service?.status === 1
                                                ? "green"
                                                : "red"
                                        }
                                    >
                                        {service?.status === 1
                                            ? "Hoạt động"
                                            : "Không hoạt động"}
                                    </Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Card>
            {service?.products && service?.products.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                    <Divider orientation="left">
                        Sản phẩm được sử dụng trong dịch vụ
                    </Divider>
                    <Row gutter={[16, 16]}>
                        {service?.products.map((product, index) => (
                            <Col key={index} span={8}>
                                <Card
                                    title={
                                        product?.name ||
                                        "Sản phẩm không xác định"
                                    }
                                    bordered={true}
                                    className={style.cardProduct}
                                >
                                    <p>
                                        Số lượng sử dụng:{" "}
                                        {product?.quantity_used ||
                                            "Chưa xác định"}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            <Card className="mt-4" title="Danh sách bình luận và đánh giá">
                <List
                    locale={{ emptyText: "Chưa có bình luận nào" }}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            className={style.commentItem}
                            key={item.title}
                            actions={[
                                <Rate value={item?.rating} disabled />,
                                <IconText
                                    icon={MessageOutlined}
                                    text={item?.replies?.length}
                                    key="list-vertical-message"
                                />,
                                <Button
                                    type="link"
                                    danger
                                    onClick={() => toggleReplies(item.key)}
                                >
                                    {expandedKeys[item.key]
                                        ? "Ẩn phản hồi"
                                        : "Hiện phản hồi"}
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item?.avatar} />}
                                title={item?.title}
                                description={item?.description}
                            />
                            <p
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                {item?.content}
                            </p>
                            <p
                                style={{
                                    fontSize: "12px",
                                    color: "#666",
                                }}
                            >
                                {item.time}
                            </p>

                            {expandedKeys[item.key] && (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={item?.replies}
                                    locale={{
                                        emptyText: "Không có phản hồi nào",
                                    }}
                                    renderItem={(reply) => (
                                        <List.Item
                                            key={reply.key}
                                            className="bg-light"
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src={reply?.avatar}
                                                    />
                                                }
                                                title={reply?.title}
                                                description={reply?.description}
                                            />
                                            {reply.content}
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#666",
                                                }}
                                            >
                                                {reply?.time}
                                            </p>
                                        </List.Item>
                                    )}
                                />
                            )}
                        </List.Item>
                    )}
                    loadMore={loadMore}
                    header={
                        <Row gutter={[16, 16]} align={"middle"}>
                            <Col
                                xxl={24}
                                xl={24}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                            >
                                <h3>Bình luận và đánh giá</h3>
                            </Col>
                            <Col
                                xxl={24}
                                xl={24}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                            >
                                <span>Đánh giá của bạn: </span>
                                <Rate
                                    style={{ marginBottom: "10px" }}
                                    defaultValue={0}
                                />
                            </Col>
                            <Input.TextArea
                                placeholder="Nhập bình luận của bạn"
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                            <Button
                                type="primary"
                                style={{ marginTop: "10px" }}
                            >
                                Gửi bình luận
                            </Button>
                        </Row>
                    }
                />
            </Card>
        </div>
    );
};

export default ServicesDetailById;
