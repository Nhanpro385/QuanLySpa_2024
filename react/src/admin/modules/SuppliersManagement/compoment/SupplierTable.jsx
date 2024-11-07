import React from "react";
import { Table } from "antd";

const SupplierTable = ({
    dataSource,
    columns,
    loading,
    pagination,
    handlePageChange,
}) => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: handlePageChange,
                showTotal: (total) => `Tổng ${total} nhà cung cấp`,
            }}
        />
    );
};
export default SupplierTable;
