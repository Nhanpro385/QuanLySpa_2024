// ServiceCategoryTable.jsx
import React from "react";
import { Table, Space, Button } from "antd";
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
                    <Button type="primary" onClick={() => editCate(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => deleteCate(record.id)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            rowKey="id" // Use the unique id for rowKey
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: handlePageChange,
            }}
        />
    );
};

export default ServiceCategoryTable;
