import React, { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    message,
    List,
    Image,
    Typography,
    Input,
    Row,
    Col,
    Tag,
    notification,
    Card,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../../utils";
import { URL_IMAGE } from "../../../config/appConfig";
const { Text } = Typography;

const ReplyCommentEdit = ({ visible, onClose, onSubmit, comment }) => {
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (visible && comment) {
            // Gán dữ liệu cũ khi modal mở
            reset({
                description: comment.comment || "", // Nội dung cũ
            });
        }
    }, [visible, comment, reset]);
    console.log(comment);

    const handleFormSubmit = (data) => {
        const payload = {
            id: comment?.id,
            service_id: comment?.service_id,
            customer_id: comment?.customer_id,
            parent_comment_id: comment?.id,
            comment: data.description.trim(),
            rate: comment?.rate,
            status: true,
        };
        setLoading(true);
        onSubmit(payload)
            .finally(() => setLoading(false))
            .catch(() => {
                api.error({
                    message: "Gửi trả lời thất bại!",
                    description: "Vui lòng thử lại sau.",
                    duration: 3,
                });
            });
    };

    return (
        <Modal
            title={`Trả lời bình luận`}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(handleFormSubmit)}
                    loading={loading}
                >
                    sửa
                </Button>,
            ]}
            width={800}
        >
            {contextHolder}
            <Card bordered={false}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text strong>Người bình luận:</Text>
                        <p>{comment?.created_by?.full_name}</p>
                        <Text strong>Vai trò:</Text>
                        <p>{comment?.created_by?.role}</p>
                    </Col>
                    <Col span={12}>
                        <Text strong>Ngày tạo:</Text>
                        <p>{comment?.created_at}</p>
                        <Text strong>Trạng thái:</Text>
                        <Tag color={comment?.status ? "green" : "red"}>
                            {comment?.status ? "Hoạt động" : "Ẩn"}
                        </Tag>
                    </Col>
                </Row>

                <Text strong>Nội dung bình luận:</Text>
                <p>{comment?.comment}</p>

                <Text strong>Hình ảnh đính kèm:</Text>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={comment?.image_url}
                    renderItem={(item) => (
                        <List.Item>
                            <Image src={`${URL_IMAGE}/comment/${item}`}
                             alt="comment attachment" />
                        </List.Item>
                    )}
                />
            </Card>

            <Form layout="vertical">
                <Form.Item label="Trả lời">
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: "Nội dung trả lời không được để trống!",
                        }}
                        render={({ field }) => (
                            <Input.TextArea
                                {...field}
                                placeholder="Nhập nội dung trả lời"
                                rows={4}
                                onBlur={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                    {errors.description && (
                        <p style={{ color: "red" }}>
                            {errors.description.message}
                        </p>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReplyCommentEdit;
