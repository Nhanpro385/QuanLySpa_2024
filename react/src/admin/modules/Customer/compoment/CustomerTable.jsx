import React from "react";
import { Table, Button, Dropdown, Space, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CustomerTable = ({
    customers,
    loading,
    handelPageChange,
    pagination,
    handleDelete,
    handleDetailCustomer,
    handleEdit,
}) => {
    const Navigate = useNavigate();
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },

        {
            title: "Thao Tác",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <Button
                                        block
                                        onClick={() =>
                                            handleDetailCustomer(record.id)
                                        }
                                    >
                                        Xem chi tiết
                                    </Button>
                                ),
                                key: "detail",
                            },
                            {
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleEdit(record)}
                                    >
                                        Sửa
                                    </Button>
                                ),
                                key: "edit",
                            },
                            {
                                label: (
                                    <Button
                                        block
                                        onClick={() => {
                                            Navigate(
                                                `/admin/khachhang/lichsutrilieu/${record.id}`
                                            );
                                        }}
                                    >
                                        Xem thông tin trị liệu
                                    </Button>
                                ),
                                key: "streatment",
                            },
                            {
                                label: (
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        onConfirm={() =>
                                            handleDelete(record.id)
                                        }
                                    >
                                        <Button block type="primary">
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                ),
                                key: "delete",
                            },
                        ],
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

    return (
        <Table
            style={{ overflowX: "auto" }}
            dataSource={customers}
            columns={columns}
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: handelPageChange,
                showTotal: (total) => `Tổng ${total} khách hàng`,
            }}
        />
    );
};

export default CustomerTable;
