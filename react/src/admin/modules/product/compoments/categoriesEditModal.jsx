import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Switch, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { EditFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { categoriesUpdate } from "@admin/redux/slices/CategoriesProductSlice";

const ModalEditCategory = ({
    isModalOpen,
    handleOk,
    handleCancel,
    category,
}) => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            status: false, // default is false (status = 0)
        },
    });

    // Update form values when the category data changes
    useEffect(() => {
        if (category && category.data) {
            setValue("name", category.data.name || "");
            setValue("description", category.data.description || "");
            setValue("status", category.data.status === 1);
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        // Convert the boolean status value to 1 or 0 before submitting
        const formattedData = {
            id: category.data.id,
            ...data,
            status: data.status ? 1 : 0,
        };

        try {
            // Dispatch the update action
            await dispatch(categoriesUpdate(formattedData)).unwrap();

            // Show success notification
            api.success({
                message: "Cập nhật thành công",
                description: "Danh mục đã được cập nhật thành công.",
                duration: 3,
            });
            handleOk(); // Submit the form and close the modal
        } catch (error) {
            // Bắt lỗi từ API và hiển thị thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description:
                    error.message ||
                    "Đã có lỗi xảy ra khi cập nhật danh mục. Vui lòng thử lại.",
                duration: 3,
            });
            console.log("Failed:", error);

            // Sử dụng setError để bắt lỗi cụ thể trên từng trường của form
            if (error.errors) {
                Object.keys(error.errors).forEach((field) => {
                    if (["name", "description", "status"].includes(field)) {
                        return setError(field, {
                            type: "manual",
                            message: error.errors[field][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: error.errors[field][0],
                            duration: 3,
                        });
                    }
                });
            }
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <span>
                        Chỉnh sửa danh mục:{" "}
                        <span style={{ color: "red" }}>
                            {category.data?.name}
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
                        label="Tên danh mục"
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name ? errors.name.message : ""}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập tên danh mục!",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Tên danh mục phải có ít nhất 10 ký tự",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Nhập tên danh mục"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        validateStatus={errors.description ? "error" : ""}
                        help={
                            errors.description ? errors.description.message : ""
                        }
                    >
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "Vui lòng nhập mô tả danh mục!",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="Nhập mô tả danh mục"
                                />
                            )}
                        />
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

export default ModalEditCategory;
