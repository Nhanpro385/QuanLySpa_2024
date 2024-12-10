import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Switch, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { EditFilled } from "@ant-design/icons";
import useServiceCategoriesActions from "../hooks/useServiceCategories";

const ModalEditServiceCategory = ({
    isModalOpen,
    handleOk,
    handleCancel,
    category,
}) => {
    const [api, contextHolder] = notification.useNotification();
    const { updateServiceCategories } = useServiceCategoriesActions();
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        setError,
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
    console.log(errors);
    
    const onSubmit = async (data) => {
        // Convert the boolean status value to 1 or 0 before submitting
        const formattedData = {
            id: category.data.id,
            ...data,
            parent_id: "",
            status: data.status ? 1 : 0,
        };

        try {
            // Dispatch the update action
            const response = await updateServiceCategories(formattedData);

            

            if (response.payload.status !== "success") {
                if (Object.keys(response.payload.errors).length > 0) {
                    Object.keys(response.payload.errors).map((key) => {
                        console.log(key);
                        console.log(response.payload.errors[key][0]);
                        
                        
                        setError(key, {
                            type: "manual",
                            message: response.payload.errors[key][0],
                        });
                    });
                    return;
                }
                api.error({
                    message: "Cập nhật thất bại",
                    description: response.payload.message,
                    duration: 3,
                });
            } else {
                api.success({
                    message: "Cập nhật thành công",
                    description: `Danh mục "${data.name}" đã được cập nhật thành công!`,
                    duration: 3,
                });
                handleOk(); // Close the modal on success
            }
        } catch (error) {
            // Show error notification

            api.error({
                message: "Cập nhật thất bại",
                description:
                    "Đã có lỗi xảy ra khi cập nhật danh mục. Vui lòng thử lại.",
                duration: 3,
            });
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
                afterClose={reset}
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

export default ModalEditServiceCategory;
