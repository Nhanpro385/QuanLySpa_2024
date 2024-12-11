import React from "react";
import { Table } from "antd";

const ShiftTable = ({
    dataSource,
    columns,
    onChangePage,
    pagination,
    loading,
}) => {
    

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
                showTotal: (total) => `Tổng ${total} ca làm việc`,  
            }}
        />
    );
};

export default ShiftTable;
