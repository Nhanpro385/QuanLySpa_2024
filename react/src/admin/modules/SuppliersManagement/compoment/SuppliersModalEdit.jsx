import React, { useEffect, memo } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { EditFilled } from "@ant-design/icons";

const ModalEditSupplier = ({
    isModalOpen,
    handleOk,
    handleCancel,
    supplier,
    handleUpdate,
    errors: supplierErrors, // Đổi tên biến ở đây
}) => {
    console.log(supplierErrors);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }, // Vẫn giữ lại biến errors từ useForm
    } = useForm({
        defaultValues: {
            name: "",
            country: "",
            contact_email: "",
            code: "",
            status: false, // default is false (status = 0)
        },
    });

    // Update form values when the supplier data changes
    useEffect(() => {
        if (supplier && supplier.data) {
            setValue("name", supplier.data.name || "");
            setValue("country", supplier.data.country || "");
            setValue("contact_email", supplier.data.contact_email || "");
            setValue("code", supplier.data.code || "");
            setValue("status", true); // Set status to true if status is 1
        }
    }, [supplier, setValue]);

    const onSubmit = (data) => {
        const formattedData = {
            id: supplier.id,
            ...data,
            status: data.status,
        };

        handleUpdate(formattedData);
    };

    return (
        <>
            <Modal
                title={
                    <span>
                        Chỉnh sửa nhà cung cấp:{" "}
                        <span style={{ color: "red" }}>
                            {supplier?.name}
                        </span>
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
                        {supplierErrors && supplierErrors.errors.name && (
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
                            errors.contact_email
                                ? errors.contact_email.message
                                : ""
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
                        {supplierErrors &&
                            supplierErrors.errors.contact_email && (
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
                        {supplierErrors && supplierErrors.errors.code && (
                            <p style={{ color: "red" }}>
                                {supplierErrors.errors.code[0]}
                            </p>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Trạng thái"
                        validateStatus={errors.status ? "error" : ""}
                        help={errors.status ? errors.status.message : ""}
                    >
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    {...field}
                                    checked={field.value}
                                    onChange={(checked) =>
                                        field.onChange(checked)
                                    }
                                    checkedChildren="Kích hoạt"
                                    unCheckedChildren="Không kích hoạt"
                                />
                            )}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default memo(ModalEditSupplier);
