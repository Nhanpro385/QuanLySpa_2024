import React from "react";
import { Table, Button, Dropdown, Space, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ServiceActions from "./ServiceActions";

const ServiceTable = ({
    dataSource,
    onEdit,
    onDelete,
    onViewDetails,
    pagination,
    handleChangepage,
    loading,
    onAddproduct,
    onEditproduct,
}) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        { title: "Tên dịch vụ", dataIndex: "name", key: "name" },

        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) => (
                <span>
                    {Number(record.price).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            ),
        },
        { title: "Thời gian dự kiến", dataIndex: "duration", key: "duration" },

        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <ServiceActions
                            record={record}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddproduct={onAddproduct}
                            onViewDetails={onViewDetails}
                            onEditproduct={onEditproduct}
                        />
                    }
                    trigger={["click"]}
                >
                    <Button type="primary">
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
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,

                pageSizeOptions: ["5", "10", "20", "50"],
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: handleChangepage,
            }}
        />
    );
};

export default ServiceTable;
