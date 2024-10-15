import React from "react";
import { Card, Form, Input, Button, Alert } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

const CategoriesServices = () => {
    return (
        <div>
            <Card title="Danh mục sản phẩm">
                {error && (
                    <Alert
                        message={<span>{error.message}</span>}
                        type="error"
                    />
                )}
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
                                    message:
                                        "Tên danh mục phải có ít nhất 10 ký tự",
                                },
                            }}
                            render={({ field }) => (
                                <Input size="large" {...field} />
                            )}
                        />
                        {errors.name && (
                            <p style={{ color: "red" }}>
                                {errors.name.message}
                            </p>
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
                            render={({ field }) => (
                                <Input size="large" {...field} />
                            )}
                        />
                        {errors.description && (
                            <p style={{ color: "red" }}>
                                {errors.description.message}
                            </p>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm Mới
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default CategoriesServices;
