import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PositionsTable = ({
    dataSource,
    loading,
    editCate,
    deleteCate,
    pagination,
    onChangePage,
}) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Lương theo giờ",
            dataIndex: "wage",
            key: "wage",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => editCate(record)}>
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => deleteCate(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                    <Button danger>
                        <DeleteOutlined />
                    </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            loading={loading}
            scroll={{ x: 768 }}
            dataSource={dataSource}
            columns={columns}
            rowKey="key"
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: onChangePage,
                pageSizeOptions: ["5", "10", "50", "100"],
                showTotal: (total) => `Tổng ${total} mục`,
            }}
        />
    );
};

export default PositionsTable;
