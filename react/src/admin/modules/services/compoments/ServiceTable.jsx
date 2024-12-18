import React from "react";
import { Table, Button, Dropdown, Space, Modal, Tag, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ServiceActions from "./ServiceActions";

const ServiceTable = ({
    dataSource,
    onEdit,
    onDelete,
    onViewDetails,
    pagination,
    handleChangepage,
    loading,
    onAddproduct,
    onEditproduct,
}) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        { title: "Tên dịch vụ", dataIndex: "name", key: "name" },

        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) => (
                <span>{parseInt(record.price).toLocaleString()} VNĐ</span>
            ),
        },
        { title: "Thời gian dự kiến", dataIndex: "duration", key: "duration" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span>
                    {record.status == 1 ? (
                        <Tag color="green">Hoạt động</Tag>
                    ) : (
                        <Tag color="red">Không hoạt động</Tag>
                    )}
                </span>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: (
                                    <Button
                                        block
                                        onClick={() => onEdit(record)}
                                    >
                                        Sửa
                                    </Button>
                                ),
                            },
                            {
                                key: "2",
                                label: (
                                    <Button
                                        block
                                        onClick={() => onViewDetails(record)}
                                    >
                                        Chi tiết
                                    </Button>
                                ),
                            },
                            {
                                key: "3",
                                label: (
                                    <Button
                                        block
                                        onClick={() => onAddproduct(record)}
                                    >
                                        Thêm sản phẩm Dịch vụ
                                    </Button>
                                ),
                            },
                            {
                                key: "4",
                                label: (
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        onConfirm={() => onDelete(record)}
                                        okText="Có"
                                        cancelText="Không"
                                    >
                                        <Button block danger>
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                ),
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary">
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,

                pageSizeOptions: ["5", "10", "20", "50"],
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: handleChangepage,
            }}
        />
    );
};

export default ServiceTable;
