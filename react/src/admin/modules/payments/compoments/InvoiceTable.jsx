import React from "react";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const InvoiceTable = ({
    data,
    onActionClick,
    loading,
    pagination,
    OnchangePage,
}) => {
    const columns = [
        {
            title: "#",
            key: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ tên",
            dataIndex: ["appointment_id", "customer", "full_name"],
            key: "full_name",

            render: (text) => text || "Chưa có",
        },

        {
            title: "Tổng tiền",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (text) => parseInt(text).toLocaleString() + " VNĐ",
        },

        {
            title: "Phương thức thanh toán",
            dataIndex: "payment_type",
            key: "payment_type",
            render: (text) => (text == 0 ? "Tiền mặt" : "Chuyển khoản"),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) =>
                status == 1 ? (
                    <Tag color="green">Đã thanh toán</Tag>
                ) : (
                    <Tag color="red">Chưa thanh toán</Tag>
                ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "2",
                                label: <Button block>Chi tiết</Button>,
                            },
                            {
                                key: "3",
                                label: (
                                    <Button block disabled={record.status == 1}>
                                        {record.status == 1
                                            ? "Đã thanh toán"
                                            : "Thanh toán"}
                                    </Button>
                                ),
                            },
                        ],
                        onClick: (e) => onActionClick(e, record),
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
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                pageSizeOptions: ["5", "10", "20", "50"],
                responsive: true,
                onChange: OnchangePage,
            }}
            rowKey="key"
        />
    );
};

export default InvoiceTable;
