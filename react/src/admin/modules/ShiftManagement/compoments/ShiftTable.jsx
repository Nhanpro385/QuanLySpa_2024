import React from "react";
import { Table } from "antd";

const ShiftTable = ({
    dataSource,
    columns,
    onChangePage,
    pagination,
    loading,
}) => {
    console.log(dataSource);

    return (
        <Table
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.key}
            pagination={{
                current: pagination.current_page,
                pageSize: pagination.per_page,
                total: pagination.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: onChangePage,
                showTotal: (total) => `Tổng ${total} khách hàng`,
            }}
        />
    );
};

export default ShiftTable;
