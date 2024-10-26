// src/admin/components/ModalEditProduct.jsx
import React, { useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Upload,
    InputNumber,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import usecategoriesActions from "@admin/modules/product/hooks/useCategoriesProduct";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const ModalEditProduct = ({
    visible,
    onCancel,
    productData,
    isModalOpen,
    handleOk,
    handleCancel,
}) => {
    const { control, handleSubmit, setValue } = useForm();
    const { getcategories } = usecategoriesActions();
    const { categories } = useSelector((state) => state.categories);
    useEffect(() => {
        getcategories();
        console.log("Product Data:", productData);
        
        if (productData) {
            Object.keys(productData).forEach((key) => {
                if (key === "date") {
                    setValue(key, dayjs(productData[key]));
                } else {
                    setValue(key, productData[key]);
                }
            });
        }
    }, [productData, setValue]);

    const onSubmit = async (data) => {
        console.log("Updated Product Data:", data);
        // Call API to update product here
        onCancel(); // Close the modal after updating
    };

    return (
        <Modal
            title="Chỉnh sửa sản phẩm"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Cập nhật
                </Button>,
            ]}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Vui lòng nhập Tên sản phẩm!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Tên sản phẩm"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <Input
                                        {...field}
                                        placeholder="Tên sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: "Vui lòng nhập Giá sản phẩm!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Giá sản phẩm"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <InputNumber
                                        {...field}
                                        placeholder="Giá sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Ngày sản xuất">
                                    <DatePicker {...field} />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Vui lòng chọn Danh mục!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Danh mục"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <Select
                                        {...field}
                                        placeholder="Chọn danh mục"
                                      
                                    >
                                        {categories.data.map((category) => (
                                            <Select.Option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={24}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Mô tả">
                                    <Input.TextArea
                                        {...field}
                                        placeholder="Mô tả sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Tải lên hình ảnh">
                            <Upload>
                                <Button icon={<UploadOutlined />}>
                                    Chọn tệp
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalEditProduct;
