import React, { useEffect, useState } from "react";
import { Card, Typography, notification } from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";
import CommentDetailModal from "../../modules/Comment/compoments/CommentDetailModal";
import CommentTable from "../../modules/Comment/compoments/CommentTable";
import ReplyComment from "../../modules/Comment/compoments/ReplyComment";
import { useSelector } from "react-redux";
import usecommentsActions from "../../modules/Comment/hooks/usecomment";
import debounce from "lodash/debounce";
const { Text } = Typography;

const CommentManagement = () => {
    const [api, contextHolder] = notification.useNotification();
    const { getcomments, replycomments, searchcomments } = usecommentsActions();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [selectedComment, setSelectedComment] = useState(null); // State to hold selected comment details
    const [isReplyModalOpen, setReplyModalOpen] = useState(false); // State for reply modal
    const [dataSource, setDataSource] = useState([]);
    const { comments } = useSelector((state) => state.comments);
    const pagination = comments?.meta || {};
    const [searchquery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    useEffect(() => {
        getcomments();
    }, []);

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
        console.log("Replying to comment:", comment);

        setSelectedComment(comment); // Set selected comment for reply
        setReplyModalOpen(true); // Open reply modal
    };

    const handleReplySubmit = async (replyContent) => {
        try {
            const response = await replycomments(replyContent);
            if (response.payload.status == "success") {
                api.success({
                    message: "Trả lời bình luận thành công",
                    placement: "topRight",
                    description: "Bình luận đã được trả lời.",
                });

                getcomments(); // Refresh comments
            } else {
                api.error({
                    message: "Trả lời bình luận thất bại",
                    placement: "topRight",
                    description: "Vui lòng thử lại sau.",
                });
            }
        } catch (error) {
            console.error("Reply error:", error);
        }
        // setReplyModalOpen(false); // Close reply modal
        // setSelectedComment(null); // Clear selected comment
    };

    const handlePageChange = (page, pagination) => {
        console.log("Page change:", page, pagination);

        setSearchQuery({ ...searchquery, page: page, per_page: pagination });
    };
    useEffect(() => {
        setDataSource(
            comments?.data.map((comment, index) => ({
                ...comment,
                index: index + 1,
            }))
        );
    }, [comments]);
    useEffect(() => {
        if (
            (searchquery.search !== "" || searchquery.page !== 1,
            searchquery.per_page !== 5)
        ) {
            searchcomments(searchquery);
        } else {
            getcomments();
        }
    }, [searchquery]);
    return (
        <div>
            {contextHolder}
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
                        pagination={pagination}
                        handleReplyClick={handleReplyClick} // Pass reply handler
                        handlePageChange={handlePageChange}
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
