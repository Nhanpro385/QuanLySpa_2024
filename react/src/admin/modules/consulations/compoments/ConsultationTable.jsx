import React from "react";
import { Table, Button, Dropdown, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ConsultationTable = ({
    consultationsData = [],
    onClick,
    pagination = { current_page: 1, per_page: 10, total: 0 },
    onchangePage,
    loading = false,
}) => {
    const columns = [
        {
            title: "#",
            key: "index",
            align: "center",
            width: "5%",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            width: "10%",
            ellipsis: true,
            render: (text) => text?.full_name || "Không tìm thấy",
        },
        {
            title: "Nhân viên",
            dataIndex: "staff_id",
            key: "staff_id",
            width: "10%",
            ellipsis: true,
            render: (text) => text?.fullname || "Không tìm thấy",
        },
        {
            title: "Số điện thoại",
            dataIndex: "customer",
            key: "phone",
            width: "10%",
            align: "center",
            render: (text) => text?.phone || "Không tìm thấy",
        },
        {
            title: "Nội dung tư vấn",
            dataIndex: "treatment_plan",
            key: "treatment_plan",
            width: "15%",
            ellipsis: true,
            render: (plan) => plan || "Không tìm thấy",
        },
        {
            title: "Tình trạng da",
            dataIndex: "skin_condition",
            key: "skin_condition",
            width: "15%",
            ellipsis: true,
            render: (condition) => condition || "Không tìm thấy",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: "20%",
            align: "center",
            render: (status) =>
                status === 0 ? (
                    <Tag color="warning">Đang chờ xác nhận</Tag>
                ) : status === 1 ? (
                    <Tag color="processing"> Đã xác nhận đang chờ tư vấn</Tag>
                ) : (
                    <Tag color="success">Hoàn thành</Tag>
                ),
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            width: "15%",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: <Button block>Sửa</Button>,
                            },
                            {
                                key: "2",
                                label: (
                                    <Button
                                        {...(record.status === 3
                                            ? { disabled: true }
                                            : {})}
                                        block
                                    >
                                        {record.status === 1
                                            ? "Vào tư vấn"
                                            : record.status === 0
                                            ? "Xác nhận"
                                            : "Hoàn thành"}
                                    </Button>
                                ),
                            },
                        ],
                        onClick: (e) => onClick({ key: e.key, record }),
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary" onClick={(e) => e.stopPropagation()}>
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
            columns={columns}
            dataSource={consultationsData}
            loading={loading}
            rowKey={(record) => record.id || record.key}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                pageSizeOptions: ["5", "10", "20", "50"],
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: onchangePage,
                showTotal: (total) => `Tổng ${total} khách hàng`,
            }}
            scroll={{ x: "100%" }}
        />
    );
};

export default ConsultationTable;
