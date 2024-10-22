import {
  Card,
  Table,
  Avatar,
  Rate,
  Button,
  Space,
  Popconfirm,
  Modal,
  Typography,
} from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import useModal from "../../modules/appointments/hooks/openmodal";

const { Text } = Typography;

// Modal content component
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
        <strong>Đánh giá:</strong> <Rate value={commentDetails.rate} disabled />
      </p>
      <p>
        <strong>Thời gian:</strong> {commentDetails.time}
      </p>
    </Modal>
  );
};

const CommentManagement = () => {
  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
  const [selectedComment, setSelectedComment] = useState(null); // State to hold selected comment details

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} icon={<UserOutlined />} />,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Sản phẩm bình luận",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <Rate value={rate} disabled />,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, { key, username, ...record }) => (
        <Space>
          <Button    onClick={() => handleViewDetail(record)} type="primary">
            Xem chi tiết
          </Button>
          <Popconfirm
            title={`Bạn có chắc chắn muốn xóa bình luận của ${username} không?`}
            onConfirm={() => handleDelete(key)}
            okText="Có"
            cancelText="Không"
          >
            <Button  ghost danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    console.log("Xóa bình luận với ID:", key);
    // Implement delete functionality
  };

  const handleViewDetail = (comment) => {
    setSelectedComment(comment); // Set selected comment details
    showModal(); // Show modal
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
    },
    {
      key: "2",
      avatar: "https://example.com/avatar2.jpg",
      username: "Nguyễn Văn B",
      product: "Sản phẩm B",
      content: "Sản phẩm tốt nhưng cần cải thiện đóng gói.",
      rate: 4,
      time: "5 giờ trước",
    },
  ];

  return (
    <div>
      <h1 className="text-center">Quản lý bình luận</h1>
      <Card title="Quản lý bình luận" style={{ margin: "20px" }}>
        {dataSource.length === 0 ? (
          <Text type="secondary">Không có bình luận nào.</Text>
        ) : (
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
      {selectedComment && ( // Render modal only if a comment is selected
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
