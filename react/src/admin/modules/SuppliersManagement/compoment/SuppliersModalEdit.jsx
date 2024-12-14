import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { EditFilled } from "@ant-design/icons";

const ModalEditSupplier = ({
    isModalOpen,
    handleOk,
    handleCancel,
    supplier,
    handleUpdate,
    errors: supplierErrors,
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            country: "",
            contact_email: "",
            code: "",
        },
    });

    // Update form values when supplier changes
    useEffect(() => {
        if (supplier) {
            reset({
                name: supplier.name || "",
                country: supplier.country || "",
                contact_email: supplier.contact_email || "",
                code: supplier.code || "",
            });
        }
    }, [supplier, reset]);

    const onSubmit = (data) => {
        const formattedData = {
            id: supplier.id,
            ...data,
        };
        handleUpdate(formattedData);
    };

    return (
        <Modal
            title={
                <span>
                    Chỉnh sửa nhà cung cấp:{" "}
                    <span style={{ color: "red" }}>{supplier?.name}</span>
                </span>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Huỷ bỏ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Chỉnh sửa <EditFilled />
                </Button>,
            ]}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Tên Nhà cung cấp"
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name ? errors.name.message : ""}
                >
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Vui lòng nhập tên nhà cung cấp!",
                            minLength: {
                                value: 8,
                                message:
                                    "Tên nhà cung cấp phải có ít nhất 8 ký tự",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Nhập tên nhà cung cấp"
                            />
                        )}
                    />
                    {supplierErrors?.errors?.name && (
                        <p style={{ color: "red" }}>
                            {supplierErrors.errors.name[0]}
                        </p>
                    )}
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    validateStatus={errors.country ? "error" : ""}
                    help={errors.country ? errors.country.message : ""}
                >
                    <Controller
                        name="country"
                        control={control}
                        rules={{
                            required: "Vui lòng nhập địa chỉ nhà cung cấp!",
                            minLength: {
                                value: 8,
                                message: "Địa chỉ phải có ít nhất 8 ký tự",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Nhập địa chỉ nhà cung cấp"
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ Email"
                    validateStatus={errors.contact_email ? "error" : ""}
                    help={
                        errors.contact_email ? errors.contact_email.message : ""
                    }
                >
                    <Controller
                        name="contact_email"
                        control={control}
                        rules={{
                            required: "Vui lòng nhập địa chỉ email!",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Email không hợp lệ.",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Nhập địa chỉ email"
                            />
                        )}
                    />
                    {supplierErrors?.errors?.contact_email && (
                        <p style={{ color: "red" }}>
                            {supplierErrors.errors.contact_email[0]}
                        </p>
                    )}
                </Form.Item>

                <Form.Item
                    label="Mã số"
                    validateStatus={errors.code ? "error" : ""}
                    help={errors.code ? errors.code.message : ""}
                >
                    <Controller
                        name="code"
                        control={control}
                        rules={{
                            required: "Vui lòng nhập mã số nhà cung cấp!",
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Nhập mã số" />
                        )}
                    />
                    {supplierErrors?.errors?.code && (
                        <p style={{ color: "red" }}>
                            {supplierErrors.errors.code[0]}
                        </p>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditSupplier;
