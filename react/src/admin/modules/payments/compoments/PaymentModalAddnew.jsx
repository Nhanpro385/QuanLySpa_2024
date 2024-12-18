import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Table,
    Descriptions,
    Badge,
    Row,
    Col,
    Card,
    Tag,
    Space,
} from "antd";
import useproductActions from "../../product/hooks/useProduct";
import usePromotionActions from "../../promotion/hooks/usepromotionAction";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { get } from "lodash";

const PaymentModalAddnew = ({ isOpen, onClose, addpayment, error }) => {
    const [form] = Form.useForm();
    const { getproduct, searchproduct } = useproductActions();
    const { getPromotions } = usePromotionActions();
    const products = useSelector((state) => state.products);
    const promotions = useSelector((state) => state.promotions);
    const [DataProduct, setDataProduct] = useState([]);
    const [DataPromotion, setDataPromotion] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleFinish = (values) => {
        addpayment({
            payment_type: values.paymentMethod,
            promotion_name: values.promotion_name || null,
            status: 1,
            products: selectedProducts.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
        }).then((e) => {
            if (e) {
                setSelectedProducts([]);
                form.resetFields();
            }
        });
    };

    const [searchquery, setSearchQuery] = useState({
        search: "",
        per_page: 50,
        page: 1,
    });

    useEffect(() => {
        getproduct(50);
        getPromotions(100);
    }, []);

    useEffect(() => {
        if (products?.products?.data && !products.loading) {
            setDataProduct(
                products?.products?.data.map((item) => ({
                    ...item,
                    name: (
                        <Space>
                            <Tag color="blue">{item.name}</Tag>
                            <Tag color="green">
                                {parseInt(item.price).toLocaleString() + " VNĐ"}
                            </Tag>
                        </Space>
                    ),
                    key: item.id,
                }))
            );
        }
    }, [products]);
    useEffect(() => {
        if (promotions?.promotions?.data && !promotions.loading) {
            setDataPromotion(
                promotions?.promotions?.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
    }, [promotions]);
    const onSearchproduct = debounce((value) => {
        setSearchQuery({ ...searchquery, search: value });
    }, 300);

    useEffect(() => {
        if (searchquery.search !== "") {
            searchproduct(searchquery);
        } else {
            getproduct(50);
        }
    }, [searchquery]);

    const handleProductSelect = (value) => {
        const newSelectedProducts = value.map((id) => {
            const existing = selectedProducts.find((item) => item.id === id);
            return (
                existing || {
                    id,
                    quantity: 1,
                    price: DataProduct.find((item) => item.id === id).price,
                }
            );
        });
        setSelectedProducts(newSelectedProducts);
    };

    const handleQuantityChange = (id, quantity) => {
        setSelectedProducts((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (_, record) =>
                parseInt(record.price).toLocaleString() + " VNĐ",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, record) => (
                <Input
                    type="number"
                    min={1}
                    value={
                        selectedProducts.find((item) => item.id === record.id)
                            ?.quantity || 0
                    }
                    onChange={(e) =>
                        handleQuantityChange(record.id, e.target.value)
                    }
                />
            ),
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            key: "total",
            render: (_, record) =>
                parseInt(
                    get(
                        selectedProducts.find((item) => item.id === record.id),
                        "quantity",
                        1
                    ) * record.price
                ).toLocaleString() + " VNĐ",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        const newSelectedProducts = selectedProducts.filter(
                            (item) => item.id !== record.id
                        );
                        setSelectedProducts(newSelectedProducts);

                        // Cập nhật lại giá trị trong Select
                        form.setFieldsValue({
                            products: newSelectedProducts.map(
                                (item) => item.id
                            ),
                        });
                    }}
                    danger
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <Modal
            title="Thanh Toán"
            open={isOpen}
            width={1000}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    form="paymentFormadd"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                >
                    Thanh Toán
                </Button>,
            ]}
        >
            <Row gutter={[16, 16]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card title="Thanh toán">
                        <Form
                            id="paymentFormadd"
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Phương thức thanh toán"
                                name="paymentMethod"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn phương thức thanh toán!",
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn phương thức">
                                    <Select.Option value={0}>
                                        Tiền mặt
                                    </Select.Option>
                                    <Select.Option value={1}>
                                        Chuyển khoản
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            {/* <Form.Item
                                label="Nhập mã khuyến mãi"
                                name="promotion_name"
                            >
                                <Select
                                    allowClear
                                    placeholder="Chọn mã khuyến mãi"
                                    onChange={(value) => {
                                        const promotion = DataPromotion.find(
                                            (item) => item.id === value
                                        );
                                        form.setFieldsValue({
                                            promotion_name: promotion?.name,
                                        });
                                    }}
                                    options={DataPromotion.map((item) => ({
                                        label: (
                                            <Space>
                                                <Tag color="orange">
                                                    {item.name}
                                                </Tag>

                                                <Tag
                                                    color={
                                                        item.promotion_type ==
                                                        "Percent"
                                                            ? "green"
                                                            : "red"
                                                    }
                                                >
                                                    {item.promotion_type ==
                                                    "Percent"
                                                        ? "Giảm giá %"
                                                        : "Giảm giá tiền mặt"}
                                                </Tag>

                                                <Tag color="blue">
                                                    Giá trị đơn hàng tối thiểu:
                                                    {" " +
                                                        parseInt(
                                                            item.min_order_amount
                                                        ).toLocaleString()}
                                                </Tag>
                                            </Space>
                                        ),
                                        value: item.id,
                                        name: item.name,
                                    }))}
                                />
                            </Form.Item> */}
                            <Form.Item label="Sản phẩm" name="products">
                                <Select
                                    placeholder="Chọn sản phẩm"
                                    mode="multiple"
                                    allowClear
                                    value={selectedProducts.map(
                                        (item) => item.id
                                    )}
                                    options={DataProduct.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    onSearch={onSearchproduct}
                                    filterOption={false}
                                    onChange={handleProductSelect}
                                />
                            </Form.Item>

                            <Table
                                columns={columns}
                                dataSource={selectedProducts.map((item) => ({
                                    ...item,
                                    ...DataProduct.find(
                                        (product) => product.id === item.id
                                    ),
                                }))}
                                pagination={{
                                    pageSize: 5,
                                    hideOnSinglePage: true,
                                }}
                                rowKey="id"
                            />
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
};

export default PaymentModalAddnew;
