// ServiceCategoryForm.jsx
import React, { useEffect } from "react";
import { Input, Button, Form } from "antd";
import { Controller } from "react-hook-form";

const ServiceCategoryForm = ({ onSubmit, errors, control }) => {
   
    return (
        <Form layout="vertical" onFinish={onSubmit}>
            {" "}
            {/* Use handleSubmit from react-hook-form */}
            <Form.Item
                label="Tên danh mục"
                validateStatus={errors.name ? "error" : ""}
            >
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: "Tên danh mục là bắt buộc",
                        minLength: {
                            value: 10,
                            message: "Tên danh mục phải có ít nhất 10 ký tự",
                        },
                    }}
                    render={({ field }) => <Input size="large" {...field} />}
                />
                {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
            </Form.Item>
            <Form.Item
                label="Mô tả"
                validateStatus={errors.description ? "error" : ""}
            >
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Mô tả là bắt buộc" }}
                    render={({ field }) => <Input size="large" {...field} />}
                />
                {errors.description && (
                    <p style={{ color: "red" }}>{errors.description.message}</p>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm Mới
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ServiceCategoryForm;
