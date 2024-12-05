import React from "react";
import { Table, Button, Tag } from "antd";

const PromotionTable = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    handlePageChange
}) => {
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Điều kiện",
            dataIndex: "promotion_type",
            key: "promotion_type",
            render: (text, record) => {
                const discount = parseInt(record.discount_percent || 0, 10); // Đảm bảo giá trị luôn là số
                if (text == "Cash") {
                    return (
                        <>
                            <Tag color="green">Giảm Tiền mặt </Tag>
                        </>
                    );
                }
                return (
                    <>
                        <Tag color="blue">Giảm phần trăm</Tag>
                    </>
                );
            },
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "start_date",
            key: "start_date",
            render: (text) => {
                return new Date(text).toLocaleDateString();
            },
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "end_date",
            key: "end_date",
            render: (text) => {
                return new Date(text).toLocaleDateString();
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDelete(record.key)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                pageSizeOptions: ["5", "10", "20", "50"],
                responsive: true,
                onChange: handlePageChange,
            }}
        />
    );
};

export default PromotionTable;
