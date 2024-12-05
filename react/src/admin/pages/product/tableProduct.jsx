import React from "react";
import { Table, Button, Dropdown, Space, Popconfirm, Image } from "antd";

import { DownOutlined } from "@ant-design/icons";
const TableProduct = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    handlePageChange,
    handleDetail,
    loading,
}) => {
    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết </Button>,
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
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                handleDetail(record.key);
                break;
            case "3":
                break;
            case "4":
                handleDelete(record.key);
                break;
            default:
                break;
        }
    };
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh",
            dataIndex: "image_url",
            key: "image_url",
            render: (text, record) => (
                <Image
                    width={50}
                    src={`http://127.0.0.1:8000/storage/uploads/products/${record.image_url}`}
                    alt={record.name}
                    fallback="https://via.placeholder.com/50"
                    preview={false}
                />
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) => (
                <span>
                    {parseInt(record?.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }) || "Dữ liệu không có"}
                </span>
            ),
        },

        {
            title: "Dung tích",
            dataIndex: "capacity",
            key: "capacity",
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (e) => onClick({ key: e.key, record }),
                        }}
                        trigger={["click"]}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                Hành động
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </span>
            ),
        },
    ];
    return (
        <Table
            style={{ overflowX: "auto" }}
            dataSource={dataSource}
            columns={columns}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                showQuickJumper: true,
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: handlePageChange,
            }}
            loading={loading}
        />
    );
};
export default TableProduct;
