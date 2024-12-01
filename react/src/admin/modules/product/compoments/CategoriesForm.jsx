// src/modules/product/components/CategoriesForm.jsx

import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useForm, Controller } from "react-hook-form";

const CategoriesForm = ({ onSubmit, error }) => {
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError, // Add setError to handle server errors
    } = useForm();

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
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {contextHolder}
            <Form.Item
                label="Tên danh mục"
                validateStatus={errors.name ? "error" : ""}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
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

export default CategoriesForm;
