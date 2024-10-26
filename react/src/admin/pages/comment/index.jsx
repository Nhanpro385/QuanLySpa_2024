import React, { useState } from "react";
import { Card, Typography } from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";
import CommentDetailModal from "../../modules/Comment/compoments/CommentDetailModal";
import CommentTable from "../../modules/Comment/compoments/CommentTable";
import ReplyComment from "../../modules/Comment/compoments/ReplyComment";

const { Text } = Typography;

const CommentManagement = () => {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [selectedComment, setSelectedComment] = useState(null); // State to hold selected comment details
    const [isReplyModalOpen, setReplyModalOpen] = useState(false); // State for reply modal

    const handleViewDetail = (comment) => {
        setSelectedComment(comment); // Set selected comment details
        showModal(); // Show detail modal
    };

    const handleEdit = (comment) => {
        console.log("Editing comment:", comment);
        // Implement edit functionality (e.g., show edit modal)
    };

    const handleDelete = (key) => {
        console.log("Deleting comment with ID:", key);
        // Implement delete functionality
    };

    const handleReplyClick = (comment) => {
        setSelectedComment(comment); // Set selected comment for reply
        setReplyModalOpen(true); // Open reply modal
    };

    const handleReplySubmit = (commentKey, replyContent) => {
        console.log("Replying to comment with ID:", commentKey);
        console.log("Reply content:", replyContent);
        // Implement the functionality to save the reply
        setReplyModalOpen(false); // Close reply modal
        setSelectedComment(null); // Clear selected comment
    };

    const dataSource = [
        {
            key: "1",
            avatar: "https://example.com/avatar1.jpg",
            username: "Trịnh Trần Phương Tuấn",
            product: "Sản phẩm A",
            content: "Rất hài lòng với sản phẩm này!",
            rate: 5,
            time: "2 giờ trước",
            replies: [
                {
                    key: "1-1",
                    username: "Admin",
                    content: "Cảm ơn bạn đã phản hồi!",
                    time: "1 giờ trước",
                },
            ],
        },
        {
            key: "2",
            avatar: "https://example.com/avatar2.jpg",
            username: "Nguyễn Văn B",
            product: "Sản phẩm B",
            content: "Sản phẩm tốt nhưng cần cải thiện đóng gói.",
            rate: 4,
            time: "5 giờ trước",
            replies: [],
        },
    ];

    return (
        <div>
            <h1 className="text-center">Quản lý bình luận</h1>
            <Card title="Quản lý bình luận" style={{ margin: "20px" }}>
                {dataSource.length === 0 ? (
                    <Text type="secondary">Không có bình luận nào.</Text>
                ) : (
                    <CommentTable
                        dataSource={dataSource}
                        handleViewDetail={handleViewDetail}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleReplyClick={handleReplyClick} // Pass reply handler
                    />
                )}
            </Card>

            {isReplyModalOpen &&
                selectedComment && ( // Render reply modal if it's open and a comment is selected
                    <ReplyComment
                        visible={isReplyModalOpen}
                        onClose={() => setReplyModalOpen(false)} // Close reply modal
                        onSubmit={handleReplySubmit}
                        comment={selectedComment}
                    />
                )}

            {selectedComment && ( // Render detail modal only if a comment is selected
                <CommentDetailModal
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={() => {
                        handleCancel();
                        setSelectedComment(null); // Clear selected comment on modal close
                    }}
                    commentDetails={selectedComment} // Pass comment details to modal
                />
            )}
        </div>
    );
};

export default CommentManagement;
