import React from "react";
import { Table, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CustomerTable = ({ customers, onClick, loading }) => {
    const dataSource = (customers.data || []).map((item) => ({
        ...item,
        key: item.id,
    }));

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Năm Sinh",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: "Tuổi",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Thao Tác",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: (e) => onClick({ key: e.key, record }),
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

    const items = [
        { key: "1", label: <Button block> Sửa </Button> },
        { key: "2", label: <Button block> Chi tiết </Button> },
        { key: "3", label: <Button block> Lịch sử giao dịch </Button> },
        {
            key: "4",
            label: (
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <Table
        style={{ overflowX: "auto" }}
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default CustomerTable;
