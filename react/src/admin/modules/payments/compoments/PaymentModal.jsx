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

const PaymentModal = ({ isOpen, onClose, payment, error, data }) => {
    const [DataAppointment, setDataAppointment] = useState({});
    useEffect(() => {
        console.log(data);
        setDataAppointment(data);
    }, [data]);

    const [form] = Form.useForm();
    const { getproduct, searchproduct } = useproductActions();
    const { getPromotions } = usePromotionActions();
    const products = useSelector((state) => state.products);
    const promotions = useSelector((state) => state.promotions);
    const [DataProduct, setDataProduct] = useState([]);
    const [DataPromotion, setDataPromotion] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const productTotal = selectedProducts.reduce((sum, item) => {
            return sum + item.quantity * parseFloat(item.price || 0);
        }, 0);
        const serviceTotal = parseFloat(DataAppointment?.service_total || 0);
        setTotalAmount(productTotal + serviceTotal);
    }, [selectedProducts, DataAppointment]);
    useEffect(() => {
        if (data) {
            setDataAppointment(data);

            // Tính tổng tiền từ sản phẩm
            const productTotal =
                data.products?.reduce((sum, item) => {
                    const product = DataProduct.find(
                        (prod) => prod.id === item.product_id
                    );
                    return sum + (product?.price || 0) * item.quantity;
                }, 0) || 0;

            // Tiền dịch vụ
            const serviceTotal = parseFloat(data.service_total || 0);

            // Tổng tiền cần thanh toán
            setTotalAmount(productTotal + serviceTotal);

            // Cập nhật các sản phẩm được chọn
            setSelectedProducts(
                data.products.map((item) => ({
                    id: item.product_id,
                    quantity: item.quantity,
                    price: DataProduct.find(
                        (product) => product.id === item.product_id
                    )?.price,
                })) || []
            );

            // Đặt giá trị cho form
            form.setFieldsValue({
                status: data.status || 0,
                paymentMethod: data.payment_type,
                promotion_name: data.promotion_id?.name || "",
                products: data.products.map((item) => item.product_id) || [],
            });
        }
    }, [data, DataProduct, form]);

    const handleFinish = (values) => {
        payment({
            paymentMethod: values.paymentMethod,
            promotion_name: values.promotion_name || "",
            status: values.status,
            promotion_id: values.promotion_name,
            products: selectedProducts.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            })),
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
    const items = [
        {
            key: "1",
            label: "Tên khách hàng",
            children:
                DataAppointment?.appointment_id?.customer?.full_name ||
                "Không có",
        },
        {
            key: "2",
            label: "Số điện thoại",
            children:
                DataAppointment?.appointment_id?.customer?.phone || "Không có",
        },
        {
            key: "3",
            label: "Ngày Đạt lịch",
            children: DataAppointment?.created_at || "",
        },
        {
            key: "4",
            label: "trạng thái",
            children: (
                <Badge
                    status={DataAppointment?.status === 1 ? "success" : "error"}
                    text={
                        DataAppointment?.status === 1
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"
                    }
                />
            ),
        },
        {
            key: "5",
            label: "Tiền dịch vụ",
            children:
                parseInt(DataAppointment?.service_total || 0).toLocaleString() +
                " VNĐ",
        },
        {
            key: "6",
            label: "Tổng tiền cần thanh toán",
            children: totalAmount.toLocaleString() + " VNĐ",
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
                    form="paymentForm"
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
                    <Descriptions
                        title="Thông tin Dịch vụ"
                        bordered
                        items={items}
                    />
                </Col>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card title="Thanh toán">
                        <Form
                            id="paymentForm"
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
                            <Form.Item
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
                                                        ? `Giảm giá ${parseInt(
                                                              item.discount_percent ||
                                                                  0
                                                          )}%`
                                                        : "Giảm giá tiền mặt"}
                                                </Tag>

                                                <Tag color="blue">
                                                    Giá trị đơn hàng tối thiểu:
                                                    {" " +
                                                        parseInt(
                                                            item.min_order_amount
                                                        ).toLocaleString()}
                                                </Tag>
                                                <Tag color="purple">
                                                    Số lượng các loại:
                                                    {" "}
                                                    {item.min_quantity}
                                                </Tag>
                                            </Space>
                                        ),
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item label="Sản phẩm" name="products">
                                <Select
                                    placeholder="Chọn sản phẩm"
                                    mode="multiple"
                                    allowClear
                                    options={DataProduct.map((item) => ({
                                        label: (
                                            <Space>
                                                <Tag color="orange">
                                                    {item?.name}
                                                </Tag>
                                                <Tag color="red">
                                                    {parseInt(item?.price).toLocaleString() + " VNĐ"}
                                                </Tag>
                                            </Space>
                                        ),
                                        value: item.id,
                                    }))}
                                    filterOption={false}
                                    onSearch={onSearchproduct}
                                    onChange={handleProductSelect}
                                />
                            </Form.Item>
                            <Form.Item label="Trạng thái" name="status">
                                <Select placeholder="Chọn trạng thái">
                                    <Select.Option value={1}>
                                        Đã thanh toán
                                    </Select.Option>
                                    <Select.Option value={0}>
                                        Chưa thanh toán
                                    </Select.Option>
                                </Select>
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

export default PaymentModal;
