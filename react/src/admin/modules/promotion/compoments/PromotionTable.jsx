import React from "react";
import { Table, Button, Tag, Popconfirm } from "antd";

const PromotionTable = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    loading,
    handlePageChange,
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
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button variant="outlined"  danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </span>
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
                showTotal: (total) => `Tổng ${total} khuyến mãi`,
            }}
        />
    );
};

export default PromotionTable;
