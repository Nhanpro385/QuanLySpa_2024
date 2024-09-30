import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Table,
    Empty,
    Typography,
} from "antd";
import React, { useState } from "react";
import "./../../modules/warehouse/styles/ProductImport.scss";

const WarehouseImport = () => {
    const [products, setProducts] = useState([
        { quantity: 0, cost: 0, total: 0 },
    ]);

    // Hàm tính tổng tiền cho từng sản phẩm
    const handleTotalAmount = (index, quantity, cost) => {
        const newProducts = [...products];
        newProducts[index].total = quantity * cost;
        setProducts(newProducts);
    };

    // Hàm thêm sản phẩm mới
    const handleAddProduct = () => {
        setProducts([...products, { quantity: 0, cost: 0, total: 0 }]);
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
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Giá nhập",
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

    const dataSource = products.map((product, index) => ({
        key: index + 1,
        name: `Sản phẩm ${index + 1}`,
        quantity: product.quantity,
        cost: product.cost,
        total: product.total,
    }));

    const removeitem = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    return (
        <div className="warehouse-import">
            {" "}
            {/* Apply the CSS class here */}
            <Card title="Nhập sản phẩm : #123456789">
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={16}>
                            <Row gutter={[16, 16]}>
                                {products.length === 0 ? (
                                    <Col span={24}>
                                        <Empty
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <Typography.Text>
                                                    Không có sản phẩm nào
                                                </Typography.Text>
                                            }
                                        >
                                            <Button
                                                type="primary"
                                                className="mt-3"
                                                onClick={handleAddProduct}
                                            >
                                                Thêm sản phẩm
                                            </Button>
                                        </Empty>
                                    </Col>
                                ) : (
                                    products.map((product, index) => (
                                        <Col span={24} key={index}>
                                            <Card
                                                title={`Sản phẩm ${index + 1}`}
                                            >
                                                <Row gutter={[16, 16]}>
                                                    <Col span={12}>
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

                                                    <Col span={12}>
                                                        <Form.Item label="Nhà phân phối">
                                                            <Select
                                                                size="large"
                                                                showSearch
                                                                placeholder="Chọn nhà phân phối"
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
                                                                        label: "Nhà phân phối 1",
                                                                    },
                                                                    {
                                                                        value: "2",
                                                                        label: "Nhà phân phối 2",
                                                                    },
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={12}>
                                                        <Form.Item label="Số lượng">
                                                            <InputNumber
                                                                className="w-100"
                                                                size="large"
                                                                min={1}
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
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={12}>
                                                        <Form.Item label="Giá nhập">
                                                            <InputNumber
                                                                className="w-100"
                                                                size="large"
                                                                min={0}
                                                                value={
                                                                    product.cost
                                                                }
                                                                formatter={(
                                                                    value
                                                                ) =>
                                                                    `₫ ${value}`.replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        ","
                                                                    )
                                                                }
                                                                parser={(
                                                                    value
                                                                ) =>
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
                                                                    ].cost =
                                                                        value;
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

                                                    <Button
                                                        danger
                                                        onClick={() =>
                                                            removeitem(index)
                                                        }
                                                    >
                                                        Xóa
                                                    </Button>
                                                </Row>
                                            </Card>
                                        </Col>
                                    ))
                                )}
                            </Row>

                            <Divider />
                            {products.length > 0 && (
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        className="mt-3"
                                        onClick={handleAddProduct}
                                    >
                                        Thêm sản phẩm
                                    </Button>
                                </Form.Item>
                            )}

                            <Card title="Danh sách nhập hàng" className="mt-3">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card>
                                <Col span={24}>
                                    <Form.Item label="Nhân viên nhập">
                                        <Input
                                            size="large"
                                            value={"Trần Phi Hào"}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả">
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <h3>
                                    Tổng tiền :{" "}
                                    {`${products
                                        .reduce(
                                            (acc, curr) => acc + curr.total,
                                            0
                                        )
                                        .toLocaleString()}`}
                                </h3>
                                <Button type="primary" className="w-100 mt-3">
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
