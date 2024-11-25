// src/modules/product/components/ProductServiceTable.jsx

import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductServiceTable = ({
    dataSource,
    loading,
    handleEditProduct,
    handleDeleteProduct,
    pagination,
}) => {
    console.log(dataSource);
    
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
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEditProduct(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button type="danger" onClick={() => handleDeleteProduct(record.id)}>
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
                showQuickJumper: true,
                showSizeChanger: true,

                showTotal: (total) => `Tổng ${total} danh mục`,
            }}
        />
    );
};

export default ProductServiceTable;
