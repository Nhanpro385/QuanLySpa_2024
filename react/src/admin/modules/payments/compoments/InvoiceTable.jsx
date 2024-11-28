import React from "react";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const InvoiceTable = ({ data, onActionClick }) => {
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
            dataIndex: "name",
            key: "name",

            render: (text) => text || "Chưa có",
        },

        { title: "Tổng tiền", dataIndex: "total_amount", key: "total_amount" },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment_type",
            key: "payment_type",
            render: (text) => (text == 1 ? "Tiền mặt" : "Chuyển khoản"),
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
                                label: <Button block>Thanh Toán</Button>,
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

    return <Table columns={columns} dataSource={data} rowKey="key" />;
};

export default InvoiceTable;
