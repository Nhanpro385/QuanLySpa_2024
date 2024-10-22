import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Table,
} from "antd";
import React, { useState } from "react";

const WarehouseExport = () => {
    const [products, setProducts] = useState([
        { quantity: 0, availableStock: 100, cost: 0, total: 0 },
    ]);

    // Hàm tính tổng tiền cho từng sản phẩm xuất kho
    const handleTotalAmount = (index, quantity, cost) => {
        const newProducts = [...products];
        newProducts[index].total = quantity * cost;
        setProducts(newProducts);
    };

    // Hàm thêm sản phẩm mới vào danh sách xuất kho
    const handleAddProduct = () => {
        setProducts([
            ...products,
            { quantity: 0, availableStock: 100, cost: 0, total: 0 },
        ]);
    };

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
            title: "Số lượng xuất",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Giá xuất",
            dataIndex: "cost",
            key: "cost",
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => <Button danger>Xóa</Button>,
        },
    ];
    const options = [
        {
            label: "Xuất bán",
            value: "service",
        },
        {
            label: "Xuất để sử dụng",
            value: "use",
        },
    ];
    const dataSource = products.map((product, index) => ({
        key: index + 1,
        name: `Sản phẩm ${index + 1}`,
        quantity: product.quantity,
        cost: product.cost,
        total: product.total,
    }));

    return (
        <>
        <h1 className="text-center">Xuất kho</h1>
            <Card>
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xl={16} md={24} sm={24} xs={24}>
                            <Row gutter={[16, 16]}>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <Card>
                                        {products.map((product, index) => (
                                            <Row gutter={[16, 16]} key={index}>
                                                <Col
                                                    xl={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Form.Item label="Sản phẩm">
                                                        <Select
                                                            size="large"
                                                            showSearch
                                                            placeholder="Chọn sản phẩm"
                                                            filterOption={(
                                                                input,
                                                                option
                                                            ) =>
                                                                (
                                                                    option?.label ??
                                                                    ""
                                                                )
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        input.toLowerCase()
                                                                    )
                                                            }
                                                            options={[
                                                                {
                                                                    value: "1",
                                                                    label: "Sản phẩm 1",
                                                                },
                                                                {
                                                                    value: "2",
                                                                    label: "Sản phẩm 2",
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col
                                                    xl={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Form.Item label="Số lượng xuất">
                                                        <InputNumber
                                                            className="w-100"
                                                            size="large"
                                                            min={1}
                                                            max={
                                                                product.availableStock
                                                            }
                                                            value={
                                                                product.quantity
                                                            }
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                const newProducts =
                                                                    [
                                                                        ...products,
                                                                    ];
                                                                newProducts[
                                                                    index
                                                                ].quantity =
                                                                    value;
                                                                setProducts(
                                                                    newProducts
                                                                );
                                                                handleTotalAmount(
                                                                    index,
                                                                    value,
                                                                    product.cost
                                                                );
                                                            }}
                                                        />
                                                        <div>
                                                            <small>
                                                                Có sẵn:{" "}
                                                                {
                                                                    product.availableStock
                                                                }
                                                            </small>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xl={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Form.Item label="Giá xuất">
                                                        <InputNumber
                                                            className="w-100"
                                                            size="large"
                                                            min={0}
                                                            value={product.cost}
                                                            formatter={(
                                                                value
                                                            ) =>
                                                                `₫ ${value}`.replace(
                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                    ","
                                                                )
                                                            }
                                                            parser={(value) =>
                                                                value.replace(
                                                                    /\₫\s?|(,*)/g,
                                                                    ""
                                                                )
                                                            }
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                const newProducts =
                                                                    [
                                                                        ...products,
                                                                    ];
                                                                newProducts[
                                                                    index
                                                                ].cost = value;
                                                                setProducts(
                                                                    newProducts
                                                                );
                                                                handleTotalAmount(
                                                                    index,
                                                                    product.quantity,
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card>
                                </Col>
                            </Row>

                            <Divider />
                            <Form.Item>
                                <Button
                                    type="primary"
                                    className="mt-3"
                                    onClick={handleAddProduct}
                                >
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>

                            <Card title="Danh sách xuất kho" className="mt-3">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                            </Card>
                        </Col>
                        <Col xl={8} md={24} sm={24} xs={24}>
                            <Card>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <Form.Item label="Nhân viên xuất">
                                        <Input
                                            size="large"
                                            value={"Nguyễn Văn B"}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <Form.Item label="Mô tả">
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <Radio.Group
                                        options={options}
                                        defaultValue="service"
                                        optionType="button"
                                    />
                                </Col>
                                <Divider />
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <h3>
                                        Tổng tiền :
                                        {`${products
                                            .reduce(
                                                (acc, curr) => acc + curr.total,
                                                0
                                            )
                                            .toLocaleString()}`}
                                    </h3>
                                </Col>
                                <Divider />

                                <Button type="primary" className="w-100 mt-3">
                                    Xuất kho
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default WarehouseExport;
