import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Typography, notification } from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";
import CommentDetailModal from "../../modules/Comment/compoments/CommentDetailModal";
import CommentTable from "../../modules/Comment/compoments/CommentTable";
import ReplyComment from "../../modules/Comment/compoments/ReplyComment";
import { useSelector } from "react-redux";
import usecommentsActions from "../../modules/Comment/hooks/usecomment";
import debounce from "lodash/debounce";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import ReplyCommentEdit from "../../modules/Comment/compoments/ReplyCommentEdit";

const { Text } = Typography;

const CommentManagement = () => {
    const [api, contextHolder] = notification.useNotification();
    const {
        getcomments,
        replycomments,
        searchcomments,
        deletecomments,
        updatecomments,
    } = usecommentsActions();

    // Modal states
    const [selectedComment, setSelectedComment] = useState(null); // State to hold selected comment details
    const [activeModal, setActiveModal] = useState(null); // Manage which modal is active ('detail', 'reply', 'edit')

    const [dataSource, setDataSource] = useState([]);
    const commentSlice = useSelector((state) => state.comments);
    const pagination = commentSlice.comments?.meta || {};

    const [searchquery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        getcomments(); // Initial fetch
    }, []);

    useEffect(() => {
        if (
            searchquery.search ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 5
        ) {
            searchcomments(searchquery);
        } else {
            getcomments();
        }
    }, [searchquery]);

    useEffect(() => {
        setDataSource(
            commentSlice.comments?.data.map((comment, index) => ({
                ...comment,
                key: index + 1,
            }))
        );
    }, [commentSlice]);

    const handleDelete = async (key) => {
        try {
            const response = await deletecomments(key.id);
            if (response?.payload?.status == "success") {
                api.success({
                    message: response?.payload?.message,
                    description: "Bình luận đã được xóa.",
                    duration: 2,
                });
                getcomments();
            } else {
                api.error({
                    message: response?.payload?.message,
                    description: "Vui lòng thử lại sau.",
                    duration: 2,
                });
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
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
            console.error("Error replying to comment:", error);
        }
        setActiveModal(null); // Close modal
    };
    const handleEditComment = async (replyContent) => {
        try {
            const response = await updatecomments({
                id: replyContent.id,
                data: replyContent,
            });
            if (response.payload.status == "success") {
                api.success({
                    message: response.payload.message,
                    description: "Bình luận đã Cập nhật",
                    duration: 2,
                });
                getcomments();
                return true;
            } else {
                api.error({
                    message: response.payload.message,
                    description: "Vui lòng thử lại sau.",
                    duration: 2,
                });
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (page, pageSize) => {
        setSearchQuery({ ...searchquery, page, per_page: pageSize });
    };

    return (
        <div>
            {contextHolder}
            <h1 className="text-center">Quản lý bình luận</h1>
            <Card
                title="Quản lý bình luận"
                style={{ margin: "20px" }}
                extra={
                    <Button
                        icon={<Loading3QuartersOutlined />}
                        type="primary"
                        onClick={() => getcomments()}
                    >
                        Làm mới
                    </Button>
                }
            >
                <Row>
                    <Col xxl={4} xl={4} lg={4} md={4} sm={24} xs={24}>
                        <Input.Search
                            placeholder="Tìm kiếm bình luận"
                            onChange={(e) =>
                                setSearchQuery({
                                    ...searchquery,
                                    search: e.target.value,
                                })
                            }
                            style={{ marginBottom: "10px" }}
                        />
                    </Col>
                </Row>
                <CommentTable
                    loading={commentSlice.loading}
                    dataSource={dataSource}
                    handleViewDetail={(comment) => {
                        setSelectedComment(() => comment);
                        setActiveModal("detail");
                    }}
                    handleDelete={handleDelete}
                    handleReplyClick={(comment) => {
                        setSelectedComment(() => comment);
                        setActiveModal("reply");
                    }}
                    handleEdit={(comment) => {
                        setSelectedComment(() => comment);
                        setActiveModal("edit");
                    }}
                    pagination={pagination}
                    handlePageChange={handlePageChange}
                />
            </Card>

            {activeModal == "detail" && selectedComment && (
                <CommentDetailModal
                    visible={true}
                    onOk={() => setActiveModal(null)}
                    onCancel={() => {
                        setActiveModal(null);
                        setSelectedComment(null);
                    }}
                    commentDetails={selectedComment}
                />
            )}

            {activeModal == "reply" && selectedComment && (
                <ReplyComment
                    visible={true}
                    onClose={() => setActiveModal(null)}
                    onSubmit={handleReplySubmit}
                    comment={selectedComment}
                />
            )}

            {activeModal == "edit" && selectedComment && (
                <ReplyCommentEdit
                    visible={true}
                    onClose={() => {
                        setActiveModal(null);
                        setSelectedComment(null);
                    }}
                    onSubmit={handleEditComment}
                    comment={selectedComment}
                />
            )}
        </div>
    );
};

export default CommentManagement;
