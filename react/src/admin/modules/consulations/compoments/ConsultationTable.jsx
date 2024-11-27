import React from "react";
import { Table, Button, Dropdown, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ConsultationTable = ({
    consultationsData,
    onClick,
    pagination,
    onchangePage,
    loading,
}) => {
    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chấp nhận Cuộc gọi Video </Button>,
        },
    ];

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            render: (text) => text?.full_name,
        },
        {
            title: "Nhân viên",
            dataIndex: "staff_id",
            key: "staff_id",
            render: (text) => text?.fullname,
        },
        {
            title: "Dịch vụ",
            dataIndex: "customer",
            key: "phone",
            render: (text) => text?.phone,
        },
        {
            title: "Kế hoạch tư vấn",
            dataIndex: "treatment_plan",
            key: "treatment_plan",
        },
        {
            title: "Tình trạng da",
            dataIndex: "skin_condition",
            key: "skin_condition",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (status === 1 ? "Đang chờ xác nhận" : ""),
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
            columns={columns}
            dataSource={consultationsData}
            loading={loading}
            rowKey={(record) => record.key}
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
        />
    );
};

export default ConsultationTable;
