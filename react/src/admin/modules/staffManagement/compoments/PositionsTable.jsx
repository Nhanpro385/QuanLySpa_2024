import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PositionsTable = ({ dataSource, loading, editCate, deleteCate, pagination, onChangePage }) => {

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Lương theo giờ",
            dataIndex: "wage",
            key: "wage",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => editCate(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button danger onClick={() => deleteCate(record.id)}>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            loading={loading}
            style={{ overflowX: "auto" }}
            dataSource={dataSource}
            columns={columns}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: onChangePage,
                pageSizeOptions:['5','10','50','100'],
                showTotal: (total) => `Tổng ${total} mục`,
            }}
            rowKey="id"

        />
    );
};

export default PositionsTable;
