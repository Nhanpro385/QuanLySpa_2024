import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import useproductActions from "../../product/hooks/useProduct";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const { getproduct, searchproduct } = useproductActions();
    const products = useSelector((state) => state.products);
    const [DataProduct, setDataProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleFinish = (values) => {
        onSubmit({
            ...values,
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
            return existing || { id, quantity: 1 };
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
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, record) => (
                <Input
                    type="number"
                    min={1}
                    value={
                        selectedProducts.find((item) => item.id === record.id)
                            ?.quantity || 1
                    }
                    onChange={(e) =>
                        handleQuantityChange(record.id, e.target.value)
                    }
                />
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
                    form="paymentForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                >
                    Thanh Toán
                </Button>,
            ]}
        >
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
                            message: "Vui lòng chọn phương thức thanh toán!",
                        },
                    ]}
                >
                    <Select placeholder="Chọn phương thức">
                        <Select.Option value={1}>Tiền mặt</Select.Option>
                        <Select.Option value={0}>Chuyển khoản</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Nhập mã khuyến mãi"
                    name="promotion_name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số tiền!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập số tiền" />
                </Form.Item>
                <Form.Item label="Sản phẩm" name="products">
                    <Select
                        placeholder="Chọn sản phẩm"
                        mode="multiple"
                        options={DataProduct.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        onChange={handleProductSelect}
                    />
                </Form.Item>
                <Form.Item label="trạng thái" name="status">
                    <Select placeholder="Chọn trạng thái">
                        <Select.Option value={1}>Đã thanh toán</Select.Option>
                        <Select.Option value={0}>Chưa thanh toán</Select.Option>
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
                    pagination={false}
                    rowKey="id"
                />
            </Form>
        </Modal>
    );
};

export default PaymentModal;
