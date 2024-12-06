// ServiceCategoryTable.jsx
import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ServiceCategoryTable = ({
    dataSource,
    loading,
    editCate,
    deleteCate,
    pagination,
    handlePageChange,
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
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
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
                        <Button color="primary" variant="outlined">
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            rowKey="key" // Use the unique id for rowKey
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "50", "100"],
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: handlePageChange,
            }}
        />
    );
};

export default ServiceCategoryTable;
