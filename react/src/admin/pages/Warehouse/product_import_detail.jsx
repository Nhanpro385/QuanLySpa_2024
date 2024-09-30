import { Button, Card, Table } from "antd";
import React from "react";
const ProductImportDetail = () => {
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng tồn của sản phẩm cũ",
            dataIndex: "old_quantity",
            key: "old_quantity",
        },
        {
            title: "Số lượng nhập của sản phẩm",
            dataIndex: "import_quantity",
            key: "import_quantity",
        },
        {
            title: "Giá nhập của sản phẩm cũ",
            dataIndex: "old_import_price",
            key: "old_import_price",
        },
        {
            title: "Giá nhập của sản phẩm mới",
            dataIndex: "new_import_price",
            key: "new_import_price",
        },
        {
            title:"Đơn giá",
            dataIndex:"price",
            key:"price"

        }
    ];
    const dataSource = [
        {
            key: "1",
            name: "Mặt nạ y tế",
            old_quantity: 100,
            import_quantity: 50,
            old_import_price: 100000,
            new_import_price: 150000,
            price: 150000
        },
    ];
    return (
        <Card title="Chi tiết nhập sản phẩm : #123213">
            <Table columns={columns} dataSource={dataSource} />
            <Button
                type="primary"
                className="mt-2"
                onClick={() => {
                    window.history.back();
                }}
            >
                Quay lại
            </Button>
        </Card>
    );
};
export default ProductImportDetail;
