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
    message,
    notification,
} from "antd";
import React, { useState, useEffect } from "react";
import "./../../modules/warehouse/styles/ProductImport.scss";
import useproductActions from "../../modules/product/hooks/useProduct";
import useSupplierActions from "../../modules/SuppliersManagement/hooks/useSupplierActions";
import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
const WarehouseImport = () => {
    useEffect(() => {
        document.title = "Nhập hàng";
    }, []);
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [note, setNote] = useState("");
    const product = useSelector((state) => state.products);
    const supplier = useSelector((state) => state.supplier);
    const [searchSupplierQuery, setsearchSupplierQuery] = useState({
        page: 1,
        per_page: 100,
        search: "",
    });
    const [api, contextHolder] = notification.useNotification();
    const [searchProductQuery, setsearchProductQuery] = useState({
        page: 1,
        per_page: 100,
        search: "",
    });
    const warehouse = useSelector((state) => state.warehouse);
    const { getproduct, searchproduct } = useproductActions();
    const { getSupplier, searchSupplier } = useSupplierActions();
    const { warehouseImportAction } = usewarehouseAction();

    useEffect(() => {
        getproduct(100);
        getSupplier(100);
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

    useEffect(() => {
        if (supplier.Suppliers.data && supplier.Suppliers.data.length > 0) {
            console.log(supplier);
            const data = supplier.Suppliers.data.map((item, index) => ({
                key: index + 1,
                id: item.id,
                name: item.name,
            }));
            setSupplierData(data);
        }
    }, [supplier]);

    const addProduct = () => {
        setProducts([
            ...products,
            {
                key: products.length + 1,
                id: "",
                name: "",
                quantity: 1,
                cost: 0,

                price: 0,
                total: 0,
            },
        ]);
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

    const validateForm = () => {
        if (!selectedSupplier) {
            api.error({
                message: "Vui lòng chọn nhà cung cấp",
                duration: 3,
            });
            return false;
        }
        if (products.length === 0) {
            api.error({
                message: "Vui lòng thêm sản phẩm",
                duration: 3,
            });

            return false;
        }
        const invalidProducts = products.some(
            (product) =>
                !product.id || product.quantity <= 0 || product.cost <= 0
        );
        if (invalidProducts) {
            api.error({
                message: "Vui lòng nhập đúng thông tin sản phẩm",
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
                supplier_id: selectedSupplier,
                total_amount: products.reduce(
                    (acc, curr) => acc + curr.total,
                    0
                ),
                note: note || "Nhập hàng",
                details: products.map((product) => ({
                    product_id: product.id,
                    quantity_import: product.quantity,
                    cost_import: product.cost,
                    unit_price: product.price,
                })),
            };
            const response = await warehouseImportAction(payload);
            console.log(response);
            if (response.payload.status == "success") {
                api.success({
                    message: "Nhập hàng thành công",
                    duration: 3,
                });

                setProducts([]);
                setSelectedSupplier(null);
                setNote("");
            } else {
                api.error({
                    message: response.payload.message || "Nhập hàng thất bại",
                    duration: 3,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const searchSupplierDebounce = debounce((value) => {
        setsearchSupplierQuery({ ...searchSupplierQuery, search: value });
    }, 300);
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

    useEffect(() => {
        if (searchSupplierQuery.search !== "") {
            searchSupplier(searchSupplierQuery);
        } else {
            getSupplier(100);
        }
    }, [searchSupplierQuery]);

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
            title: "Giá nhập",
            dataIndex: "cost",
            key: "cost",
            render: (_, product, index) => (
                <InputNumber
                    className="w-100"
                    min={1000}
                    size="large"
                    formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    value={product.cost}
                    onChange={(value) => updateProduct(index, { cost: value })}
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
            <h1 className="text-center">Nhập hàng</h1>
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
                            <Card title="Thông tin nhập hàng">
                                <Row gutter={[16, 16]}>
                                    <Col xl={24} md={24} sm={24} xs={24}>
                                        <Form.Item label="Nhà cung cấp">
                                            <Select
                                                className="w-100"
                                                size="large"
                                                placeholder="Nhập tên nhà cung cấp"
                                                options={supplierData.map(
                                                    (item) => ({
                                                        value: item.id,
                                                        label: item.name,
                                                    })
                                                )}
                                                showSearch
                                                onChange={(value) => {
                                                    setSelectedSupplier(value);
                                                }}
                                                filterOption={false}
                                                onSearch={
                                                    searchSupplierDebounce
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
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
                                    className="w-100 mt-3"
                                    onClick={submitProduct}
                                >
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
