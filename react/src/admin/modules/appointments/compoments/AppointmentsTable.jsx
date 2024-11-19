// src/components/AppointmentsTable.js
import React from "react";
import { Table, Button, Dropdown, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AppointmentsTable = ({
    dataSource,
    onEdit,
    onViewDetail,
    pagination,
    handlePageChange,
}) => {
    const items = [
        {
            key: "1",
            label: (
                <Button block onClick={onEdit}>
                    Sửa
                </Button>
            ),
        },
        {
            key: "2",
            label: (
                <Button block onClick={onViewDetail}>
                    Chi tiết
                </Button>
            ),
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
                                if (key === "1") onEdit(record.key);
                                if (key === "2") onViewDetail(record.key);
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
            scroll={{
                y: 500, //
            }}
        />
    );
};

export default AppointmentsTable;
