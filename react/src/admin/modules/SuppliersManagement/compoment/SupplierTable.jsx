import React from "react";
import { Table, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const SupplierTable = ({
    dataSource,
    onClick,
    loading,
    pagination,
    handlePageChange,
}) => {
    
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Nhà cung cấp",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ",
            dataIndex: "country",
            key: "country",
        },
        {
            title: "Địa chỉ Email",
            dataIndex: "contact_email",
            key: "contact_email",
        },
        {
            title: "Mã số",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Hành động",
            dataIndex: "action",
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
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
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
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: handlePageChange,
                showTotal: (total) => `Tổng ${total} nhà cung cấp`,
            }}
        />
    );
};

export default SupplierTable;
