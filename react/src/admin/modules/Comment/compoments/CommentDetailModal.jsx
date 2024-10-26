import React from "react";
import { Modal, Rate } from "antd";

const CommentDetailModal = ({ visible, onOk, onCancel, commentDetails }) => {
    return (
        <Modal
            title="Chi tiết bình luận"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <p>
                <strong>Tên người dùng:</strong> {commentDetails.username}
            </p>
            <p>
                <strong>Sản phẩm:</strong> {commentDetails.product}
            </p>
            <p>
                <strong>Nội dung:</strong> {commentDetails.content}
            </p>
            <p>
                <strong>Đánh giá:</strong>{" "}
                <Rate value={commentDetails.rate} disabled />
            </p>
            <p>
                <strong>Thời gian:</strong> {commentDetails.time}
            </p>
        </Modal>
    );
};

export default CommentDetailModal;
