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
import { useParams } from "react-router-dom";
const Product_import_Edit = () => {
    useEffect(() => {
        document.title = "Chỉnh sửa nhập hàng";
    }, []);
    const { id } = useParams();
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [note, setNote] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const product = useSelector((state) => state.products);
    const supplier = useSelector((state) => state.supplier);

    const [searchSupplierQuery, setsearchSupplierQuery] = useState({
        page: 1,
        per_page: 100,
        search: "",
    });
    const [searchProductQuery, setsearchProductQuery] = useState({
        page: 1,
        per_page: 100,
        search: "",
    });
    const warehouse = useSelector((state) => state.warehouse);
    const { getproduct, searchproduct } = useproductActions();
    const { getSupplier, searchSupplier } = useSupplierActions();
    const { updateImportAction, getImportDetailAction } = usewarehouseAction();

    useEffect(() => {
        getproduct(100);
        getSupplier(100);
    }, []);
    useEffect(() => {
        if (id) {
            getImportDetailAction(id);
        }
    }, [id]);
    useEffect(() => {
        if (warehouse?.import?.detail?.data) {
            console.log(warehouse.import.detail.data?.details);
            setSelectedSupplier(warehouse?.import?.detail?.data?.supplier?.id);
            setProducts(
                warehouse?.import?.detail?.data?.details?.map((item) => ({
                    key: item.product?.id,
                    id: item.product?.id,
                    id_inbound: item.id,
                    name: item.product?.name,
                    quantity: item.quantity_import,
                    cost: item.cost_import,
                    price: item.unit_price,
                    total: item.quantity_import * item.cost_import,
                    cost_olded: item.cost_olded,
                }))
            );
            setNote(warehouse?.import?.detail?.data?.note);
        }
    }, [warehouse]);
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
        if (
            supplier?.Suppliers?.data &&
            supplier?.Suppliers?.data?.length > 0
        ) {
            const data = supplier?.Suppliers?.data.map((item, index) => ({
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
                key: products?.length + 1,
                id: "",
                name: "",
                quantity: 1,
                id_inbound: "",
                cost: 0,
                cost_olded: 0,
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
                message: "Lỗi",
                description: "Vui lòng chọn nhà cung cấp",
                duration: 3,
            });
            return false;
        }
        if (products.length === 0) {
            api.error({
                message: "Lỗi",
                description: "Vui lòng thêm sản phẩm",
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
                message: "Lỗi",
                description: "Vui lòng nhập đúng thông tin sản phẩm",
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
                    id: product.id_inbound,
                    product_id: product.id,
                    quantity_import: product.quantity,
                    cost_import: product.cost,
                    unit_price: product.price,
                    cost_olded: product.cost_olded,
                })),
                status: true,
            };
            const response = await updateImportAction({
                id: id,
                data: payload,
            });
            if (response.payload.status == "success") {
                api.success({
                    message: "Cập nhật thành công",
                    duration: 3,
                });
                setProducts([]);
                setSelectedSupplier(null);
                setNote("");
            } else {
                api.error({
                    message: "Cập nhật thất bại",
                    duration: 3,
                    description: response.payload.message,
                });
                if (Object.keys(response.payload.errors).length > 0) {
                    Object.keys(response.payload.errors).forEach((key) => {
                        api.error({
                            message: "Cập nhật thất bại",
                            description: response.payload.errors[key][0],
                            duration: 3,
                        });
                    });
                }
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
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            key: "name",
            render: (_, product, index) => (
                <Select
                    className="w-100"
                    disabled
                    size="large"
                    showSearch
                    placeholder="Nhập tên sản phẩm"
                    filterOption={false}
                    value={{
                        value: product.id,
                        label: product.name,
                    }}
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
                disabled
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
        // {
        //     title: "Thành tiền",
        //     dataIndex: "total",
        //     key: "total",
        //     render: (_, product) => product.total.toLocaleString(),
        // },
        // {
        //     title: "Hành động",
        //     key: "action",
        //     render: (_, product, index) => (
        //         <Button danger onClick={() => removeProduct(index)}>
        //             Xóa
        //         </Button>
        //     ),
        // },
    ];

    return (
        <div className="warehouse-import">
            <h1 className="text-center">Chỉnh sửa nhập hàng</h1>
            <Card
                title="Nhập sản phẩm : #123456789"
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigator("/admin/warehouse")}
                    >
                        quay lại
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
                                                loading={
                                                    warehouse.import.loading
                                                }
                                                size="large"
                                                placeholder="Nhập tên nhà cung cấp"
                                                options={supplierData.map(
                                                    (item) => ({
                                                        value: item.id,
                                                        label: item.name,
                                                    })
                                                )}
                                                value={selectedSupplier}
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
                                // extra={
                                //     <Button type="primary" onClick={addProduct}>
                                //         Thêm sản phẩm
                                //     </Button>
                                // }
                            >
                                <Table
                                    columns={columns}
                                    dataSource={products}
                                    pagination={false}
                                    loading={warehouse.import.loading}
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
                                    Cập nhật
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default Product_import_Edit;
