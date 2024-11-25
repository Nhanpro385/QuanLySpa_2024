import React, { useEffect } from "react";
import { Form, Button, Select, Row, Col, Table, Input } from "antd";
import { useForm, Controller } from "react-hook-form";

const ProductServiceForm = ({
    onSubmit,
    error,
    dataproduct,
    productSelected,
    dataselected,
    handleUpdateProductSelected,
    handleDeleteProductSelected,
    handleFormSubmit,
    onSearch,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue(
            "name",
            dataselected.map((e) => e.id)
        );
    }, [dataselected]);
    useEffect(() => {
        if (error) {
            Object.keys(error).forEach((key) => {
                setError(key, {
                    type: "server",
                    message: error[key][0],
                });
            });
        }
    }, [error, setError]);

    // Xử lý sự kiện khi danh sách thay đổi

    return (
        <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
            <Row gutter={[16, 16]}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Tên danh mục"
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={[]}
                            rules={{
                                required: "Tên danh mục là bắt buộc",
                                validate: (value) =>
                                    value.length >= 1 ||
                                    "Vui lòng chọn ít nhất một danh mục",
                            }}
                            render={({ field }) => (
                                <Select
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    style={{
                                        width: "100%",
                                    }}
                                    value={dataselected.map((e) => e.id)}
                                    placeholder="Vui lòng chọn Sản phẩm"
                                    options={dataproduct.map((e) => ({
                                        label: e.name,
                                        value: e.id,
                                    }))}
                                    filterOption={(input, option) =>
                                        option.label
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value, options) => {
                                        const updatedProductSelected =
                                            options.map((option) => {
                                                const existingProduct =
                                                    dataselected.find(
                                                        (product) =>
                                                            product.id ===
                                                            option.value
                                                    );
                                                return {
                                                    id: option.value,
                                                    label: option.label,
                                                    quantity: existingProduct
                                                        ? existingProduct.quantity
                                                        : 1,
                                                };
                                            });
                                        field.onChange(value);
                                        productSelected(updatedProductSelected);
                                    }}
                                    onSearch={onSearch}
                                />
                            )}
                        />
                    </Form.Item>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Table
                        dataSource={dataselected}
                        rowKey="id" // Use the unique id for rowKey
                        scroll={{ y: 340 }}
                        pagination={false}
                        columns={[
                            {
                                title: "Tên danh mục",
                                dataIndex: "label",
                                key: "label",
                            },
                            {
                                title: "Số lượng",
                                dataIndex: "quantity",
                                key: "quantity",
                                render: (_, product, index) => (
                                    <Input
                                        type="number"
                                        min={1}
                                        value={product.quantity}
                                        onChange={(e) =>
                                            handleUpdateProductSelected(index, {
                                                ...product,
                                                quantity: e.target.value,
                                            })
                                        }
                                    />
                                ),
                            },
                            {
                                title: "Hành động",
                                dataIndex: "action",
                                key: "action",
                                render: (_, product, index) => (
                                    <Button
                                        danger
                                        color="danger"
                                        onClick={() =>
                                            handleDeleteProductSelected(index)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm Mới
                </Button>{" "}
                <Button type="primary">Cập Nhật</Button>
            </Form.Item>
        </Form>
    );
};

export default ProductServiceForm;
