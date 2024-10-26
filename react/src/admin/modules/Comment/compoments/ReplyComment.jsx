import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, message } from "antd";

const ReplyComment = ({ visible, onClose, onSubmit, comment }) => {
    const [replyContent, setReplyContent] = useState("");
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = () => {
        if (!replyContent.trim()) {
            message.error("Nội dung trả lời không được để trống!");
            return;
        }

        setLoading(true); // Set loading state to true
        // Call the onSubmit function passed as a prop
        onSubmit(comment.key, replyContent).finally(() => {
            setLoading(false); // Reset loading state
            setReplyContent(""); // Clear the input field
            onClose(); // Close the modal
        });
    };

    // Focus the TextArea when the modal opens
    useEffect(() => {
        if (visible) {
            setReplyContent(""); // Reset reply content when the modal opens
        }
    }, [visible]);

    return (
        <Modal
            title={`Trả lời bình luận của ${comment?.username}`} // Display username
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
                    Gửi
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Nội dung trả lời">
                    <Input.TextArea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={4}
                        autoFocus // Automatically focus the TextArea
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReplyComment;
