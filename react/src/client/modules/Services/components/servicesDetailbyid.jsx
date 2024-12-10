import React, { useEffect, useState } from "react";
import style from "../style/servicesDetailbyid.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
import { useSelector } from "react-redux";
import { generateSnowflakeId } from "../../../../admin/utils";
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
    Avatar,
    List,
    Space,
    Rate,
    Input,
    Form,
    Upload,
    notification,
} from "antd";
import {
    MessageOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import usecommentsActions from "../../../../admin/modules/Comment/hooks/usecomment";
import { URL_IMAGE } from "../../../../admin/config/appConfig";
const ServicesDetailById = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState({});
    const [expandedKeys, setExpandedKeys] = useState({});
    const { getServicesDetailClient } = useServicesActions();
    const { addcommentsClient, replycommentsClient } = usecommentsActions();
    const services = useSelector((state) => state.services);
    const comments = useSelector((state) => state.comments);
    const [form] = Form.useForm();
    const [formReply] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [keyreply, setKeyReply] = useState(null);
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
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`,
        description: "Phản hồi từ khách hàng.",
        content: item?.comment || "Không có",
        time: item?.created_at || "Không có",
        images: item?.image_url || [],
        rating: item.rate || 0,
        id: item.id,
        type: item.type,
        ...item,
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
    console.log(keyreply);

    const handleFinish = async (values) => {
        try {
            const { rate, comment } = values;
            const images = fileList.map((file) => file.originFileObj); // Lấy file gốc
            const payload = {
                id: generateSnowflakeId(),
                service_id: service.id,
                customer_id: JSON.parse(localStorage.getItem("user"))?.id,
                comment: comment,
                image_url: images,
                rate: rate,
            };
            const result = await addcommentsClient(payload);
            if (result.payload.status === "success") {
                api.success({
                    message: "Bình luận thành công",
                    description: "Bình luận của bạn đã được gửi thành công",
                });
                form.resetFields();
                setFileList([]);
                getServicesDetailClient(id);
            } else {
                api.error({
                    message: "Bình luận thất bại",
                    description: result.payload.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinishFailed = (errorInfo) => {
        // Xử lý khi form không hợp lệ
        console.log("Lỗi form:", errorInfo);
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const handleFinishReply = async (values) => {
        try {
            const { comment, idparent } = values;
            console.log(values);

            const payload = {
                id: generateSnowflakeId(),
                service_id: service.id,
                rate: 1,
                customer_id: JSON.parse(localStorage.getItem("user"))?.id,
                comment: comment,
            };
            const result = await replycommentsClient({
                parent_comment_id: idparent,
                data: payload,
            });
            if (result.payload.status === "success") {
                api.success({
                    message: "Phản hồi thành công",
                    description: "Phản hồi của bạn đã được gửi thành công",
                });
                formReply.resetFields();
                getServicesDetailClient(id);
            } else {
                api.error({
                    message: "Phản hồi thất bại",
                    description: result.payload.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderReplies = (replies) => {
        return replies.map((reply, index) => (
            <div
                key={reply.key}
                className="bg-light p-3 mb-3 rounded border"
                style={{ marginLeft: "20px" }}
            >
                <div className="d-flex align-items-center mb-2">
                    <Avatar
                        src={
                            "https://api.dicebear.com/7.x/miniavs/svg?seed=" +
                            index
                        }
                        size="large"
                        className="mr-3"
                    />
                    <div>
                        <h5 className="mb-0">
                            {`${reply?.customer?.full_name || "Không tên"} - ${
                                reply?.type === 0
                                    ? "Quản trị viên"
                                    : "Khách hàng"
                            }`}
                        </h5>
                        <Button
                            type="link"
                            onClick={() => setKeyReply(reply.id)}
                            style={{ marginLeft: "20px" }}
                        >
                            trả lời
                        </Button>
                    </div>
                </div>
                <p>{reply.comment}</p>
                <p style={{ fontSize: "12px", color: "#666" }}>{reply?.time}</p>

                {reply.clientReplies && reply.clientReplies.length > 0 && (
                    <div className="ml-4">
                        {renderReplies(reply.clientReplies)}
                    </div>
                )}

                {keyreply === reply.id && (
                    <Form
                        form={formReply}
                        layout="vertical"
                        onFinish={(values) =>
                            handleFinishReply({ ...values, idparent: reply.id })
                        }
                        initialValues={{ parent_id: reply.id }}
                    >
                        <div className="mb-3">
                            <span>Phản hồi của bạn: </span>
                        </div>
                        <div className="mb-3">
                            <Form.Item
                                name="comment"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập phản hồi",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Nhập phản hồi của bạn"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="mt-2"
                            >
                                Gửi phản hồi
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        ));
    };

    return (
        <div className="container" style={{ padding: "20px" }}>
            {contextHolder}
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
                                src={`${URL_IMAGE}/services/special/${service?.image_url}`}
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
            <Card className="mt-4" title="Danh sách bình luận và đánh giá">
                <List
                    locale={{ emptyText: "Chưa có bình luận nào" }}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 3,
                        showSizeChanger: false,
                    }}
                    header={
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            onFinishFailed={handleFinishFailed}
                        >
                            <Row gutter={[16, 16]} align="middle">
                                <Col span={24}>
                                    <h3>Bình luận và đánh giá</h3>
                                </Col>
                                <Col span={24}>
                                    <span>Đánh giá của bạn: </span>
                                    <Form.Item
                                        name="rate"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng chọn số sao đánh giá",
                                            },
                                        ]}
                                    >
                                        <Rate
                                            style={{ marginBottom: "10px" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <span>Bình luận của bạn: </span>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="comment"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập bình luận",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            placeholder="Nhập bình luận của bạn"
                                            autoSize={{
                                                minRows: 2,
                                                maxRows: 6,
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <span>Hình ảnh của bạn: </span>
                                    <Form.Item name="images">
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            beforeUpload={() => false}
                                            onChange={handleUploadChange}
                                            multiple
                                            maxCount={5}
                                        >
                                            {fileList.length >= 5 ? null : (
                                                <div>
                                                    <PlusOutlined />
                                                    <div
                                                        style={{ marginTop: 8 }}
                                                    >
                                                        Tải lên
                                                    </div>
                                                </div>
                                            )}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginTop: "10px" }}
                                    >
                                        Gửi bình luận
                                    </Button>
                                </Col>
                                <Col span={24}>
                                    <Button
                                        shape="round"
                                        icon={<LoadingOutlined />}
                                        onClick={() => {
                                            getServicesDetailClient(id);
                                        }}
                                        style={{ marginTop: "10px" }}
                                    >
                                        làm mới
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    }
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
                            <p style={{ fontSize: "12px", color: "#666" }}>
                                {item?.time}
                            </p>
                            {item.images.length > 0 && (
                                <Row gutter={[16, 16]}>
                                    {item.images.map((image, index) => (
                                        <Col span={6} key={index}>
                                            <Image
                                                width={100}
                                                src={
                                                    `${URL_IMAGE}/comments/` +
                                                    image.image_url
                                                }
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                            {expandedKeys[item.key] && (
                                <div>{renderReplies(item.clientReplies)}</div>
                            )}
                        </List.Item>
                    )}
                />
                {loadMore}
            </Card>
        </div>
    );
};

export default ServicesDetailById;
