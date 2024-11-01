import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table,
} from "antd";
import React, { useState } from "react";
import "./../../modules/warehouse/styles/ProductImport.scss";

const WarehouseImport = () => {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const addProduct = () => {
        setProducts([
            ...products,
            {
                key: products.length + 1,
                id: "",
                name: "",
                quantity: 1,
                cost: 0,
                total: 0,
            },
        ]);
    };

    const searchProduct = (value) => {
        const datafakeapi = [
            { id: 1, name: "Sản phẩm 1" },
            { id: 2, name: "Sản phẩm 2" },
            { id: 3, name: "Sản phẩm 3" },
        ];
        const data = datafakeapi.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(data);
    };

    const updateProduct = (index, fieldValues) => {
        const updatedProducts = [...products];
        const { id, name, quantity, cost } = fieldValues;

        const existingProductIndex = products.findIndex(
            (product) => product.id === id
        );

        if (
            id &&
            existingProductIndex !== -1 &&
            existingProductIndex !== index
        ) {
            updatedProducts[existingProductIndex].quantity += quantity || 1;
            updatedProducts[existingProductIndex].total =
                updatedProducts[existingProductIndex].quantity *
                (updatedProducts[existingProductIndex].cost || 0);
            updatedProducts.splice(index, 1);
        } else {
            updatedProducts[index] = {
                ...updatedProducts[index],
                ...fieldValues,
            };
            updatedProducts[index].total =
                (updatedProducts[index].quantity || 1) *
                (updatedProducts[index].cost || 0);
        }
        setProducts(updatedProducts);
    };

    const removeProduct = (index) => {
        const newProducts = products.filter((_, idx) => idx !== index);
        const updatedProducts = newProducts.map((product, idx) => ({
            ...product,
            key: idx + 1,
        }));
        setProducts(updatedProducts);
    };
    const submitProduct = () => {
        const payload = {
            id_User: 13123123213,
            description: "Nhập hàng",
            total: products
                .reduce((acc, curr) => acc + curr.total, 0)
                .toLocaleString(),
            products: products || [],
        };
        console.log(payload);
        
    };
    const columns = [
        { title: "STT", dataIndex: "key", key: "key" },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            key: "name",
            render: (_, product, index) => (
                <Select
                    className="w-100"
                    size="large"
                    showSearch
                    placeholder="Nhập tên sản phẩm"
                    filterOption={false}
                    options={searchResults.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                    onChange={(value, option) =>
                        updateProduct(index, {
                            id: value,
                            name: option.label,
                            quantity: 1,
                        })
                    }
                    onSearch={searchProduct}
                />
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, product, index) => (
                <InputNumber
                    min={1}
                    size="large"
                    value={product.quantity}
                    onChange={(value) =>
                        updateProduct(index, { quantity: value })
                    }
                />
            ),
        },
        {
            title: "Giá nhập",
            dataIndex: "cost",
            key: "cost",
            render: (_, product, index) => (
                <InputNumber
                    min={1}
                    size="large"
                    value={product.cost}
                    onChange={(value) => updateProduct(index, { cost: value })}
                />
            ),
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            key: "total",
            render: (_, product) => product.total.toLocaleString(),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, product, index) => (
                <Button danger onClick={() => removeProduct(index)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div className="warehouse-import">
            <h1 className="text-center">Nhập hàng</h1>
            <Card title="Nhập sản phẩm : #123456789">
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xl={16} md={16} sm={24} xs={24}>
                            <Card
                                title="Danh sách nhập hàng"
                                className="mt-3 bg-light"
                                extra={
                                    <Button type="primary" onClick={addProduct}>
                                        Thêm sản phẩm
                                    </Button>
                                }
                            >
                                <Table
                                    columns={columns}
                                    dataSource={products}
                                    pagination={false}
                                />
                            </Card>
                        </Col>
                        <Col xl={8} md={8} sm={24} xs={24}>
                            <Card className="bg-light">
                                <Form.Item label="Nhân viên nhập">
                                    <Input
                                        size="large"
                                        value={"Trần Phi Hào"}
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <Input.TextArea />
                                </Form.Item>
                                <h3>
                                    Tổng tiền :{" "}
                                    {products
                                        .reduce(
                                            (acc, curr) => acc + curr.total,
                                            0
                                        )
                                        .toLocaleString()}
                                </h3>
                                <Button type="primary" className="w-100 mt-3" onClick={submitProduct}>
                                    Nhập hàng
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default WarehouseImport;
