import React from "react";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const PaymentTable = ({ data, onActionClick }) => {
    const items = [
        {
            key: "1",
            label: (
                <Button
                    block
                    onClick={() => {
                        console.log("Sửa");
                    }}
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
                    onClick={() => {
                        console.log("Chi tiết");
                    }}
                >
                    Chi tiết
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button block onClick={() => console.log("Thanh Toán")}>
                    Thanh Toán
                </Button>
            ),
        },
    ];

    const columns = [
        {
            title: "#",
            key: "id",
            dataIndex: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "appointmentId",
            key: "appointmentId",
        },
        { title: "Họ tên", dataIndex: "name", key: "name" },
        { title: "Tổng tiền", dataIndex: "total", key: "total" },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        { title: "Ngày thanh toán", dataIndex: "date", key: "date" },
        {
            title: "Trạng thái",
            key: "tags",
            dataIndex: "tags",
            render: (tags) =>
                tags.map((tag) => (
                    <Tag
                        key={tag}
                        color={tag === "Đã thanh toán" ? "green" : "volcano"}
                    >
                        {tag}
                    </Tag>
                )),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: (e) => onActionClick({ key: e.key, record }),
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary" onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default PaymentTable;
