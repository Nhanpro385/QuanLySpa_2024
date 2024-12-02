import React from "react";
import { Table, Button, Dropdown, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AppointmentsTable = ({
    dataSource,
    onEdit,
    onViewDetail,
    pagination,
    loading,
    handleDelete,
    handlePageChange,
}) => {
    console.log(dataSource);

    const items = [
        {
            key: "1",
            label: (
                <Button block onClick={(e) => e.preventDefault()}>
                    Sửa
                </Button>
            ),
        },
        {
            key: "2",
            label: (
                <Button block onClick={(e) => e.preventDefault()}>
                    Chi tiết
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button
                    block
                    danger
                    onClick={(e) => {
                        e.preventDefault(); // Prevent event propagation
                        handleDelete(); // Pass the appropriate delete logic here
                    }}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Dịch Vụ",
            dataIndex: "service_name",
            key: "service_name",
        },
        {
            title: "Tên Khách Hàng",
            dataIndex: "customer_id",
            key: "customer_id",
        },
        {
            title: "Tên Nhân Viên",
            dataIndex: "employee_name",
            key: "employee_name",
        },
        {
            title: "Thời Gian Bắt Đầu",
            dataIndex: "start",
            key: "start",
        },
        {
            title: "Ngày Hẹn",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                return (
                    <Tag
                        color={
                            record.status === "Đã đặt lịch hẹn."
                                ? "blue" // Đặt lịch hẹn
                                : record.status === "Đang thực hiện."
                                ? "green" // Đang thực hiện
                                : record.status === "Đã hoàn thành."
                                ? "gold" // Đã hoàn thành
                                : record.status === "Đã hủy lịch hẹn."
                                ? "red" // Đã hủy
                                : "default" // Trạng thái mặc định nếu không khớp với các giá trị trên
                        }
                    >
                        {record.status}
                    </Tag>
                );
            },
        },
        {
            title: "Chi Tiết",
            key: "action",
            render: (text, record) => (
                <span>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (e) => {
                                const key = e.key;
                                console.log(key);

                                if (key == "3") {
                                    handleDelete(record); // Pass record to handleDelete
                                }
                                if (key == "1") onEdit(record.key);
                                if (key == "2") onViewDetail(record.key);
                            },
                        }}
                        trigger={["click"]}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                Hành Động
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
            loading={loading}
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

export default AppointmentsTable;
