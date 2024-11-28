import React from "react";
import { Table, Avatar, Rate, Button, Space, Dropdown, Typography } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CommentTable = ({
    dataSource,
    handleViewDetail,
    handleDelete,
    handleEdit,
    pagination,
    handleReplyClick,
    handlePageChange,
}) => {
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên người dùng",
            dataIndex: "customer_id",
            key: "customer_id",
        },
        {
            title: "Sản phẩm bình luận",
            dataIndex: "service_id",
            key: "service_id",
        },
        {
            title: "Nội dung",
            dataIndex: "comment",
            key: "comment",
        },
        {
            title: "Đánh giá",
            dataIndex: "rate",
            key: "rate",
            render: (rate) => <Rate value={rate} disabled />,
        },
        {
            title: "Trạng thái",
            dataIndex: "admin_reply",
            key: "admin_reply",
            render: (admin_reply) => (
                <Text type={admin_reply ? "success" : "danger"}>
                    {admin_reply ? "Đã trả lời" : "Chưa trả lời"}
                </Text>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleEdit(record)}
                                    >
                                        Sửa
                                    </Button>
                                ),
                            },
                            {
                                key: "view",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleViewDetail(record)}
                                    >
                                        Chi tiết
                                    </Button>
                                ),
                            },
                            {
                                key: "reply",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleReplyClick(record)}
                                    >
                                        Trả lời
                                    </Button>
                                ),
                            },
                            {
                                key: "delete",
                                label: (
                                    <Button
                                        block
                                        danger
                                        onClick={() => handleDelete(record.key)}
                                    >
                                        Xóa
                                    </Button>
                                ),
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary">
                        <Space>
                            Hành Động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                pageSizeOptions: ["5", "10", "20", "50"],
                responsive: true,
                onChange: handlePageChange,
            }}
        />
    );
};

export default CommentTable;
