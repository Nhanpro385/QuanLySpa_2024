import React, { useState, useEffect, useRef } from "react";
import {
    Modal,
    Button,
    Form,
    message,
    notification,
    Row,
    Rate,
    Col,
    Typography,
    Card,
    Input,
} from "antd";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../../utils";
const { Text } = Typography;

const ReplyComment = ({ visible, onClose, onSubmit, comment }) => {
    const editor = useRef(null);
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [api, contextHolder] = notification.useNotification();

    const handleFormSubmit = (data) => {
        const replyContent = data.description?.trim();
        if (!replyContent) {
            api.error({
                message: "Nội dung trả lời không được để trống!",
                description: "Vui lòng nhập nội dung trả lời trước khi gửi.",
                duration: 3,
            });
            return;
        }
        const payload = {
            id: generateSnowflakeId(),
            service_id: comment.service_id,
            customer_id: comment.customer?.id,
            parent_comment_id: comment.id,
            comment: replyContent,
            rate: comment.rate,
            status: true,
        };

        onSubmit(payload);
    };

    useEffect(() => {
        if (visible) {
            setValue("description", ""); // Reset the JoditEditor content when modal opens
        }
    }, [visible, setValue]);

    return (
        <Modal
            title={`Trả lời bình luận của ${comment?.id}`}
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
                    Gửi
                </Button>,
            ]}
            width={800}
        >
            {contextHolder}
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Người bình luận">
                            <Text strong>{comment?.customer?.full_name}</Text>
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Đánh giá">
                            <Rate disabled defaultValue={comment.rate} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Nội dung của khách hàng">
                    <Card>
                        <Text>{comment.comment}</Text>
                    </Card>
                </Form.Item>
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
                                tabIndex={1}
                                onBlur={(newContent) => {
                                    field.onChange(newContent);
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

export default ReplyComment;
