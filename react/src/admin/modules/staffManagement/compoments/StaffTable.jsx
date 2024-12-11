import React from "react";
import { Table, Button, Dropdown, Space, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// const items = [
//     {
//         key: "1",
//         label: <Button block> Sửa </Button>,
//     },
//     {
//         key: "2",
//         label: (
//             <Button block >

//                 Chi tiết
//             </Button>
//         ),
//     },
//     {
//         key: "3",
//         label: (
//             <Button block disabled>
//                 {" "}
//                 Lịch sử làm việc (Chưa hoàn thành)
//             </Button>
//         ),
//     },
//     {
//         key: "4",
//         label: (
//             <Button block danger>
//                 Xóa
//             </Button>
//         ),
//     },
// ];

const StaffTable = ({
    dataSource,
    handleEdit,
    handleDelete,
    pagination,
    handlePageChange,
    loading,
}) => {
    const navigate = useNavigate(); // Ensure `useNavigate` is called correctly

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
                        items: [
                            {
                                key: "1",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleEdit(record.key)}
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
                                            navigate(
                                                `/admin/nhanvien/${record.key}`
                                            )
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
                                        title="Bạn có chắc chắn muốn xóa nhân viên này không?"
                                        onConfirm={() =>
                                            handleDelete(record.key)
                                        }
                                    >
                                        <Button block danger>
                                            {" "}
                                            Xóa{" "}
                                        </Button>
                                    </Popconfirm>
                                ),
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
            loading={loading}
            scroll={{ x: 768 }}
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.key} // Use rowKey to ensure unique keys for each row
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
        />
    );
};

export default StaffTable;
