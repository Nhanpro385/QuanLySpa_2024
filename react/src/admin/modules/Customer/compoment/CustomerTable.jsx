import React from "react";
import { Table, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CustomerTable = ({
    customers,
    onClick,
    loading,
    handelPageChange,
    pagination,
}) => {
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
        {
            key: "2",
            label: (
                <Button block disabled>
                    {" "}
                    Chi tiết (Chưa hoàn thành){" "}
                </Button>
            ),
        },
        { key: "3", label: <Button block disabled> Lịch sử trị liệu  (Chưa hoàn thành) </Button> },
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
            dataSource={customers}
            columns={columns}
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: handelPageChange,
                showTotal: (total) => `Tổng ${total} khách hàng`,
            }}
        />
    );
};

export default CustomerTable;
