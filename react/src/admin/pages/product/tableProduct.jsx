import React from "react";
import { Table, Button, Dropdown, Space, Popconfirm, Image } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { URL_IMAGE } from "../../config/appConfig";
const TableProduct = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    handlePageChange,
    handleDetail,
    loading,
}) => {
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
                    src={`${URL_IMAGE}/products/${record.image_url}`}
                    alt={record.name}
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
                    {parseInt(record?.price).toLocaleString() + " VNĐ" ||
                        "Dữ liệu không có"}
                </span>
            ),
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
                            items: [
                                {
                                    key: "1",
                                    label: (
                                        <Button
                                            block
                                            onClick={() =>
                                                handleEdit(record.key)
                                            }
                                        >
                                            {" "}
                                            Sửa{" "}
                                        </Button>
                                    ),
                                },
                                {
                                    key: "2",
                                    label: (
                                        <Button
                                            block
                                            onClick={() =>
                                                handleDetail(record.key)
                                            }
                                        >
                                            {" "}
                                            Chi tiết{" "}
                                        </Button>
                                    ),
                                },
                                {
                                    key: "4",
                                    label: (
                                        <Popconfirm
                                            title="Bạn có chắc chắn muốn xóa?"
                                            onConfirm={() =>
                                                handleDelete(record.key)
                                            }
                                            okText="Có"
                                            cancelText="Không"
                                        >
                                            <Button block danger>
                                                Xóa
                                            </Button>
                                        </Popconfirm>
                                    ),
                                },
                            ],
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
            scroll={{ x: 768 }}
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
