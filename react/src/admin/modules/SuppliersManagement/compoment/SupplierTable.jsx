import React from "react";
import { Table } from "antd";

const SupplierTable = ({ dataSource, columns, loading }) => {
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            loading={loading}
        />
    );
};
export default SupplierTable;
