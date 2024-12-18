import React, { useEffect, useState } from "react";
import style from "../style/servicesDetailbyid.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";
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
    Result,
} from "antd";
import {
    MessageOutlined,
    LoadingOutlined,
    PlusOutlined,
    FrownOutlined,
    FundOutlined,
    SmileOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SafetyOutlined,
    DollarCircleOutlined,
} from "@ant-design/icons";
import usecommentsActions from "../../../../admin/modules/Comment/hooks/usecomment";
import { URL_IMAGE } from "../../../../admin/config/appConfig";
const ServicesDetailById = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState({});
    const [expandedKeys, setExpandedKeys] = useState({});
    const { getServicesDetailClient } = useServicesActions();
    const { getServiceCategoriesClientById } = useServiceCategoriesActions();
    const { addcommentsClient, replycommentsClient } = usecommentsActions();
    const services = useSelector((state) => state.services);
    const comments = useSelector((state) => state.comments);
    const categories = useSelector((state) => state.serviceCategories);
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
    useEffect(() => {
        if (service?.service_category_id?.id) {
            getServiceCategoriesClientById(service?.service_category_id?.id);
        }
    }, [service]);

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
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${item.customer.id}`,
        // description: "Phản hồi từ khách hàng.",
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
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${
                            reply?.type == 1 ? reply?.customer?.id : 1232
                        }`}
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
                        <Image
                            src={`${URL_IMAGE}/services/special/${service?.image_url}`}
                            alt={service?.name || "Không có hình ảnh"}
                            style={{
                                width: "100%",
                                minHeight: "300px",
                                maxHeight: "300px",
                                borderRadius: "8px",
                            }}
                        />

                        {service?.serviceImages?.length > 0 && (
                            <List
                                className="mt-4"
                                grid={{
                                    gutter: 16,
                                    column: 4,
                                    xs: 2,
                                    sm: 2,
                                    md: 2,
                                    lg: 2,
                                    xl: 2,
                                    xxl: 3,
                                }}
                                pagination={{
                                    pageSize: 3,
                                    showSizeChanger: false,
                                    align: "left",
                                }}
                                dataSource={service?.serviceImages || []}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Image
                                            src={`${URL_IMAGE}/services/${item?.image_url}`}
                                            alt={
                                                item?.name ||
                                                "Không có hình ảnh"
                                            }
                                            style={{
                                                width: "100%",
                                                minHeight: "100px",
                                                maxHeight: "100px",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
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

                                <Descriptions.Item label="Trung bình số sao">
                                    {service?.comments &&
                                    service.comments.length > 0 ? (
                                        <>
                                            {/* Hiển thị số sao bằng Rate */}
                                            <Rate
                                                allowHalf
                                                disabled
                                                value={
                                                    service.comments.reduce(
                                                        (sum, comment) =>
                                                            sum + comment.rate,
                                                        0
                                                    ) / service.comments.length
                                                }
                                            />
                                            (
                                            {(
                                                service.comments.reduce(
                                                    (sum, comment) =>
                                                        sum + comment.rate,
                                                    0
                                                ) / service.comments.length
                                            ).toFixed(1)}
                                            )
                                        </>
                                    ) : (
                                        "Chưa có đánh giá"
                                    )}
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                block
                                type="primary"
                                style={{ marginTop: "20px" }}
                                onClick={() => {
                                    navigate(
                                        `/datlichhen?dichvu=${service?.id}`
                                    );
                                }}
                            >
                                Đặt lịch
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Card>
            {service?.products && service?.products.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                    <Divider orientation="left">
                        Sản phẩm được sử dụng trong dịch vụ
                    </Divider>
                    <List
                        grid={{
                            gutter: 16,
                            xxl: 4,
                            xl: 4,
                            lg: 4,
                            md: 2,
                            sm: 1,
                        }}
                        pagination={{
                            pageSize: 4,
                            showSizeChanger: false,
                        }}
                        loading={services?.loading}
                        dataSource={service?.products}
                        renderItem={(product) => (
                            <List.Item>
                                <Card
                                    title={
                                        product?.name ||
                                        "Sản phẩm không xác định"
                                    }
                                    bordered={true}
                                    className={style.cardProduct}
                                >
                                    <Row gutter={[16, 16]} align="middle">
                                        <Col span={5}>
                                            <Image
                                                src={`${URL_IMAGE}/products/${product?.image_url}`}
                                                height={50}
                                            />
                                        </Col>
                                        <Col span={19}>
                                            <span>
                                                Số lượng sử dụng:{" "}
                                                {product?.quantity_used ||
                                                    "Chưa xác định"}
                                            </span>
                                        </Col>
                                    </Row>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            )}

            <div className={style.benefits}>
                <h1 className={style.benefit_title}>
                    <strong>Lợi Ích Khi Khám Mụn Với Bác Sĩ Da Liễu</strong>
                </h1>
                <p className="text-center">
                    Đừng trì hoãn việc khám mụn chuẩn Y khoa với bác sĩ Da liễu,
                    bởi việc này sẽ mang đến cho bạn rất nhiều lợi ích và tránh
                    được nhiều rủi ro biến chứng.
                </p>
                <List
                    className="benefits-list"
                    grid={{ gutter: 16, column: 3 }} // Tạo layout dạng lưới
                    dataSource={[
                        {
                            icon: (
                                <SmileOutlined
                                    style={{ fontSize: 40, color: "#1890ff" }}
                                />
                            ),
                            title: "Giúp bạn hiểu đúng nguyên nhân gây mụn",
                            description:
                                "Các nguyên nhân gây mụn khá phức tạp và đa yếu tố. Qua thăm khám, bác sĩ sẽ tìm ra nguyên nhân chính xác và giúp bạn kiểm soát tốt các yếu tố này, góp phần điều trị mụn hiệu quả.",
                        },
                        {
                            icon: (
                                <HeartOutlined
                                    style={{ fontSize: 40, color: "#eb2f96" }}
                                />
                            ),
                            title: "Điều trị mụn đúng cách từ bước đầu tiên",
                            description:
                                "Thay vì dành thời gian và tiền bạc để thử nhiều phương pháp trị mụn mà không rõ kết quả, bạn nên khám mụn với bác sĩ để tìm ra giải pháp đúng đắn ngay từ đầu, đảm bảo hiệu quả cao.",
                        },
                        {
                            icon: (
                                <CheckCircleOutlined
                                    style={{ fontSize: 40, color: "#52c41a" }}
                                />
                            ),
                            title: "Ngăn ngừa mụn tái phát hiệu quả",
                            description:
                                "Việc khám mụn chuẩn Y khoa và điều trị với phác đồ cá nhân hóa sẽ mang lại hiệu quả lâu dài, đồng thời bạn sẽ biết cách giảm thiểu các tác nhân xấu và ngăn mụn quay trở lại.",
                        },
                        {
                            icon: (
                                <ClockCircleOutlined
                                    style={{ fontSize: 40, color: "#faad14" }}
                                />
                            ),
                            title: "Rút ngắn thời gian điều trị",
                            description:
                                "Khi khám và điều trị mụn tại cơ sở uy tín, bạn sẽ hình dung rõ hơn về quá trình điều trị, áp dụng đúng phương pháp với mục tiêu rõ ràng, nhờ vậy bạn sẽ tiết kiệm thời gian đáng kể.",
                        },
                        {
                            icon: (
                                <SafetyOutlined
                                    style={{ fontSize: 40, color: "#13c2c2" }}
                                />
                            ),
                            title: "Ngừa mụn tiến triển nặng để lại sẹo thâm",
                            description:
                                "Khám và điều trị mụn chuẩn Y khoa sẽ giúp kiểm soát tốt tình trạng mụn, ngăn ngừa mụn tiến triển, giảm thiểu các vấn đề sau mụn như thâm sẹo và tránh những tác động xấu về tâm lý.",
                        },
                        {
                            icon: (
                                <DollarCircleOutlined
                                    style={{ fontSize: 40, color: "#d46b08" }}
                                />
                            ),
                            title: "Tiết kiệm chi phí tối ưu",
                            description:
                                "Bác sĩ Da liễu sẽ tư vấn cho bạn các phương pháp và sản phẩm điều trị thực sự cần thiết, phù hợp tình trạng của bạn, đạt hiệu quả mà vẫn đảm bảo chi phí tối ưu, phù hợp tài chính.",
                        },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <div className="benefit-item">
                                <div className="benefit-content">
                                    <h3 className={style.benefit_title}>
                                        <div className="benefit-icon">
                                            {item.icon}
                                        </div>
                                        {item.title}
                                    </h3>
                                    <p className={style.benefit_description}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
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
                                    text={item?.clientReplies?.length || 0}
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
                                avatar={
                                    <Avatar size="large" src={item?.avatar} />
                                }
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
                                        <Col
                                            xxl={3}
                                            xl={3}
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            key={index}
                                        >
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
                                <div className="mt-3">
                                    {renderReplies(item.clientReplies)}
                                </div>
                            )}
                        </List.Item>
                    )}
                />
                {loadMore}
            </Card>
            <Divider
                orientation="left"
                style={{ marginTop: "40px", marginBottom: "40px" }}
            >
                Dịch vụ cùng danh mục
            </Divider>

            <List
                loading={categories?.loading}
                className="mt-4"
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
                    showSizeChanger: false,
                }}
                dataSource={categories?.category?.data?.service || []}
                locale={{
                    emptyText: (
                        <Result
                            icon={<FrownOutlined />}
                            title="Không Tìm thấy dịch vụ"
                            extra={
                                <p>
                                    Hãy thử tải lại trang hoặc liên hệ với chúng
                                    tôi để được hỗ trợ
                                </p>
                            }
                        />
                    ),
                }}
                renderItem={(item) => (
                    <List.Item>
                        <div className={style.boxServicesItemDetail}>
                            <div className={style.boxServicesDetailItemTop}>
                                <Image
                                    src={
                                        `${URL_IMAGE}/services/special/` +
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
                                <p>{item.title}</p>
                            </div>
                            <div className={style.boxServicesItemBottom}>
                                <p>{item.name}</p>
                            </div>
                            <div className={style.boxServicesItemPrice}>
                                <p>
                                    Giá:{" "}
                                    {item.price
                                        ? `${parseInt(
                                              item.price
                                          ).toLocaleString()} VNĐ`
                                        : "Liên hệ"}
                                </p>
                            </div>
                            <Row justify="center" gutter={[8, 8]}>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Button
                                        block
                                        onClick={() =>
                                            navigate(`/dichvu/${item.id}`)
                                        }
                                        danger
                                        variant="outlined"
                                        className={style.btnServicesDetail}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Col>
                                <Col
                                    xxl={24}
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Button
                                        block
                                        onClick={() =>
                                            navigate(
                                                `/datlichhen?dichvu=${item.id}`
                                            )
                                        }
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
        </div>
    );
};

export default ServicesDetailById;
