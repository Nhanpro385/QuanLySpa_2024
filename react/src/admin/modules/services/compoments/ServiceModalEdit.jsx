import React from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import { useForm, Controller } from "react-hook-form";

const ServiceModalEdit = ({ isModalOpen, handleOk, handleCancel, initialData }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
        }
    });

    const onSubmit = (data) => {
        // Gửi dữ liệu chỉnh sửa sau khi người dùng nhấn OK
        handleOk(data);
    };

    return (
        <Modal
            title="Chỉnh sửa danh mục"
            open={isModalOpen}
            onOk={handleSubmit(onSubmit)}  // Submit form khi OK
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Lưu
                </Button>,
            ]}
        >
            <Form layout="vertical">
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
            </Form>
        </Modal>
    );
};

export default ServiceModalEdit;
