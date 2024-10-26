import React from "react";
import { Table, Avatar, Rate, Button, Space, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const CommentTable = ({
    dataSource,
    handleViewDetail,
    handleDelete,
    handleEdit,
    handleReplyClick,
}) => {
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
                                        onClick={() => handleReplyClick(record.key)}
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
            pagination={{ pageSize: 5 }}
        />
    );
};

export default CommentTable;
