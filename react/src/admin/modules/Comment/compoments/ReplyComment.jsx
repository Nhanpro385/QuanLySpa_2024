import React, { useState, useEffect, useRef } from "react";
import {
    Modal,
    Button,
    Form,
    message,
    Row,
    Rate,
    Col,
    Typography,
    Card,
} from "antd";
import JoditEditor from "jodit-react";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../../utils/snowflakeID";
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

    const handleFormSubmit = (data) => {
        const replyContent = data.description?.trim();
        if (!replyContent) {
            message.error("Nội dung trả lời không được để trống!");
            return;
        }
        const payload = {
            id: generateSnowflakeId(),
            service_id: comment.service_id,
            customer_id: comment.customer_id,
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
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Người bình luận">
                            <Text strong>{comment.customer_id}</Text>
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
                            <JoditEditor
                                ref={editor}
                                value={field.value}
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
