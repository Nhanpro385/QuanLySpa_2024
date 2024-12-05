import React from "react";
import { Col, Modal, Rate, Row, List, Avatar, Card } from "antd";

const CommentDetailModal = ({ visible, onOk, onCancel, commentDetails }) => {

    
    const data = commentDetails.replies || [];

    return (
        <Modal
            title="Chi tiết bình luận"
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={800}
        >
            <Row>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <p>
                        <strong>Tên người dùng:</strong>{" "}
                        {commentDetails.customer_id}
                    </p>
                    <p>
                        <strong>Dịch vụ:</strong> {commentDetails.service_id}
                    </p>
                    <p>
                        <strong>Nội dung:</strong> {commentDetails.comment}
                    </p>
                    <p>
                        <strong>Đánh giá:</strong>{" "}
                        <Rate value={commentDetails.rate} disabled />
                    </p>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    
                    <Card title="Các bình luận khác của người dùng">
                        <List
                            pagination={{
                                position: "bottom",
                                align: "center",
                                pageSize: 5,
                                showSizeChanger: false,
                                hideOnSinglePage: true,
                            }}
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                            />
                                        }
                                        title={
                                            <a href="https://ant.design">
                                                {item.title}
                                            </a>
                                        }
                                        description={(
                                            <p>
                                                {item.comment}
                                            </p>
                                        )}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
};

export default CommentDetailModal;
