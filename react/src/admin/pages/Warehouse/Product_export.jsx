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
    notification,
    message,
} from "antd";
import React, { useState, useEffect } from "react";
import "./../../modules/warehouse/styles/ProductImport.scss";
import useproductActions from "../../modules/product/hooks/useProduct";

import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
const WarehouseExport = () => {
    useEffect(() => {
        document.title = "Xuất hàng";
    }, []);
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [note, setNote] = useState("");
    const product = useSelector((state) => state.products);

    const [searchProductQuery, setsearchProductQuery] = useState({
        page: 1,
        per_page: 100,
        search: "",
    });

    const { getproduct, searchproduct } = useproductActions();

    const { warehouseExportAction } = usewarehouseAction();

    useEffect(() => {
        getproduct(100);
    }, []);

    useEffect(() => {
        if (product.products.data && product.products.data.length > 0) {
            const data = product.products.data.map((item, index) => ({
                key: index + 1,
                id: item.id,
                name: item.name,
            }));
            setSearchResults(data);
        }
    }, [product]);

    const addProduct = () => {
        setProducts([
            ...products,
            {
                key: products.length + 1,
                id: "",
                name: "",
                quantity: 1,
                price: 0,
                total: 0,
            },
        ]);
    };

    const updateProduct = (index, fieldValues) => {
        const updatedProducts = [...products];
        const { id, quantity, price } = fieldValues;

        // Check if the product already exists in the list
        const existingProductIndex = products.findIndex(
            (product) => product.id === id
        );

        if (
            id &&
            existingProductIndex !== -1 &&
            existingProductIndex !== index
        ) {
            // Merge quantities if the product already exists but on a different row
            updatedProducts[existingProductIndex].quantity += quantity || 1;
            updatedProducts[existingProductIndex].total =
                updatedProducts[existingProductIndex].quantity *
                updatedProducts[existingProductIndex].price;

            // Remove the duplicate row
            updatedProducts.splice(index, 1);
        } else {
            // Update the current product
            updatedProducts[index] = {
                ...updatedProducts[index],
                ...fieldValues,
            };
            // Calculate total for the product
            updatedProducts[index].total =
                (updatedProducts[index].quantity || 1) *
                (updatedProducts[index].price || 0);
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

    const validateForm = () => {
        if (products.length === 0) {
            api.error({
                message: "Vui lòng thêm sản phẩm.",
                duration: 3,
            });
            return false;
        }
        const invalidProducts = products.some(
            (product) =>
                !product.id || product.quantity <= 0 || product.price <= 0
        );
        if (invalidProducts) {
            api.error({
                message: "Vui lòng kiểm tra thông tin sản phẩm.",
                duration: 3,
            });
            return false;
        }

        return true;
    };

    const submitProduct = async () => {
        try {
            if (!validateForm()) return;

            const payload = {
                total_amount: products.reduce(
                    (acc, curr) => acc + curr.total,
                    0
                ),
                note: note || "Xuất hàng",
                details: products.map((product) => ({
                    product_id: product.id,
                    quantity_export: product.quantity,
                    unit_price: product.price,
                })),
            };

            const response = await warehouseExportAction(payload);
            console.log(response);

            if (
                response.payload.error &&
                response.payload.status != "success"
            ) {
                api.error({
                    message: "Đã xảy ra lỗi khi xuất hàng.",
                    description:
                        response?.payload?.error || "Vui lòng thử lại sau",
                    duration: 3,
                });
                return;
            }
            if (response.payload.status != "success") {
                api.error({
                    message: "Đã xảy ra lỗi khi xuất hàng.",
                    description:
                        response?.payload?.message || "Vui lòng thử lại sau",
                    duration: 3,
                });
                return;
            }
            if (response.payload.status == "success") {
                api.success({
                    message: "Xuất hàng thành công",
                    duration: 3,
                });

                navigator("/admin/warehouse");
            }
        } catch (error) {
            api.error({
                message: "Đã xảy ra lỗi khi xuất hàng.",
                description: "Vui lòng thử lại sau",
                duration: 3,
            });
        }
    };

    const searchProductDebounce = debounce((value) => {
        setsearchProductQuery({ ...searchProductQuery, search: value });
    }, 300);
    useEffect(() => {
        if (searchProductQuery.search !== "") {
            searchproduct(searchProductQuery);
        } else {
            getproduct(100);
        }
    }, [searchProductQuery]);

    const columns = [
        { title: "STT", dataIndex: "key", key: "key" },
        { title: "Mã Sản Phẩm", dataIndex: "id", key: "id" },
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
                    onSearch={searchProductDebounce}
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
            title: "Giá bán",
            dataIndex: "price",
            key: "price",
            render: (_, product, index) => (
                <InputNumber
                    className="w-100"
                    min={1000}
                    size="large"
                    formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    value={product.price}
                    onChange={(value) => updateProduct(index, { price: value })}
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
            <h1 className="text-center">Xuất hàng</h1>
            <Card
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigator("/admin/warehouse")}
                    >
                        Quay lại
                    </Button>
                }
            >
                {contextHolder}
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xl={24} md={24} sm={24} xs={24}>
                            <Card
                                title="Danh sách xuất hàng"
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
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col xl={24} md={24} sm={24} xs={24}>
                            <Card className="bg-light">
                                <Form.Item label="Mô tả">
                                    <Input.TextArea
                                        value={note}
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    />
                                </Form.Item>
                                <h3>
                                    Tổng tiền:{" "}
                                    {products
                                        .reduce(
                                            (acc, curr) => acc + curr.total,
                                            0
                                        )
                                        .toLocaleString()}{" "}
                                    VNĐ
                                </h3>
                                <Button
                                    type="primary"
                                    className="mt-3"
                                    onClick={submitProduct}
                                >
                                    Xuất hàng
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default WarehouseExport;
