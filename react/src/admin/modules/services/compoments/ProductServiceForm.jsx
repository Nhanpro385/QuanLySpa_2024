import React, { useEffect } from "react";
import {
    Form,
    Button,
    Select,
    Row,
    Col,
    Table,
    Input,
    notification,
} from "antd";
import { useForm, Controller } from "react-hook-form";

const ProductServiceForm = ({
    error,
    dataproduct,
    productSelected,
    dataselected,
    handleUpdateProductSelected,
    handleDeleteProductSelected,
    handleFormSubmit,
    onSearch,
    handleUpdateProductQuantity,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm();
    const [statusEdit, setStatusEdit] = React.useState(false);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const hasEditTag = dataselected.some((item) => item.tag);
        setStatusEdit(hasEditTag);
    }, [dataselected]);

    useEffect(() => {
        setValue(
            "name",
            dataselected.map((e) => e.id)
        );
    }, [dataselected]);

    useEffect(() => {
        if (error) {
            Object.keys(error).forEach((key) => {
                if (["name", "description"].includes(key)) {
                    setError(key, {
                        type: "manual",
                        message: error[key][0],
                    });
                } else {
                    api.error({
                        message: "Có lỗi xảy ra",
                        description: error[key][0],
                        duration: 3,
                    });
                }
            });
        }
    }, [error, setError]);

    return (
        <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
            {contextHolder}
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
                                    disabled={statusEdit} // Disable Select nếu statusEdit là true
                                    onChange={(value, options) => {
                                        field.onChange(value);
                                        productSelected(options);
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
                        rowKey="id"
                        scroll={{ y: 340 }}
                        style={{
                            minHeight: "360px",
                        }}
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
                <Row gutter={[16, 16]}>
                    <Col xxl={2} xl={4} lg={4} md={4} sm={24} xs={24}>
                        {!statusEdit && ( // Ẩn nút "Thêm Mới" khi statusEdit là true
                            <Button block type="primary" htmlType="submit">
                                Thêm Mới
                            </Button>
                        )}
                    </Col>
                    <Col xxl={2} xl={4} lg={4} md={4} sm={24} xs={24}>
                        <Button
                            block
                            danger
                            variant="outlined"
                            onClick={handleUpdateProductQuantity}
                        >
                            Cập Nhật
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default ProductServiceForm;
