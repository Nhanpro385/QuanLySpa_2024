import React from "react";
import { Table, Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
        key: "3",
        label: <Button block> Lịch sử làm việc </Button>,
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

const StaffTable = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    handlePageChange,
}) => {
    const navigate = useNavigate(); // Ensure `useNavigate` is called correctly

    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key); // Ensure `record.key` is unique
                break;
            case "2":
                navigate(`/admin/nhanvien/${record.key}`);
                break;
            case "3":
                navigate(`/admin/nhanvien/${record.key}/history`);
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
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
            key: "fullname",
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
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: (e) => onClick({ key: e.key, record }),
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
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.key} // Use rowKey to ensure unique keys for each row
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

export default StaffTable;
