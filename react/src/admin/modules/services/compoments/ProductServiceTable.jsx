import React, { useEffect } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductServiceTable = ({
    productSelected,
    dataSource,
    loading,
    handleEditProduct,
    handleDeleteProduct,
    pagination,
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
            title: "Số lượng",
            dataIndex: "quantity_used",
            key: "quantity_used",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => {
                // Kiểm tra nếu record trùng với productSelected
                const isSelected = productSelected.some(
                    (item) => item.id === record.id
                );

                return (
                    <Space>
                        <Button
                            type={isSelected ? "primary" : ""} // Thay đổi loại nút
                            danger
                            variant="outlined"
                            onClick={() => handleEditProduct(record)}
                        >
                            <EditOutlined />
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => handleDeleteProduct(record.id)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Space>
                );
            },
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
