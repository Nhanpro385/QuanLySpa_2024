import React from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function Products() {
    const navigation = useNavigate();
    const dataSource = [
        {
            key: "1",
            name: "Serum trị mụn",
            image_url: "Ảnh 1",
            price: "500.000",
            quantity: "10",
            capacity: "15ml",
            date: "10/10/2024",
            status: "Còn hàng",
        },
    ];

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh",
            dataIndex: "image_url",
            key: "image_url",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Dung tích",
            dataIndex: "capacity",
            key: "capacity",
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Button
                    type="primary"
                    style={{
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                        color: "#fff",
                    }}
                    disabled
                >
                    {status}
                </Button>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDelete(record.key)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    const handleEdit = (key) => {
        console.log("Edit", key);
    };

    const handleDelete = (key) => {
        console.log("Delete", key);
    };

    const handleAdd = () => {
        navigation("/admin/products/add");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h2>Danh Sách Sản Phẩm</h2>
                <Button type="primary" onClick={() => handleAdd()}>
                    <PlusOutlined />
                    Thêm sản phẩm mới
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default Products;
