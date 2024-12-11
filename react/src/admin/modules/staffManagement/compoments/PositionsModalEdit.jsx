import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Space, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";

const PositionsModalEdit = ({
    isModalOpen,
    handleOk,
    handleCancel,
    Position,
    handleEditSubmit,
    editErrors,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (Position.data) {
            setValue("name", Position.data.name);
            const wage = parseInt(Position.data.wage.replace(/,/g, ""), 10);
            setValue("wage", wage);
            setValue("note", Position.data.note);
        }
    }, [Position.data, setValue]);

    const onSubmit = (data) => {
        // Check if wage is a string before trying to replace characters
   

        handleEditSubmit({ ...data, id: Position.data.id });
    };

    return (
        <Modal
            title="Chỉnh sửa Chức vụ"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item label="Tên Chức vụ">
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Tên chức vụ là bắt buộc",
                            minLength: {
                                value: 8,
                                message: "Tên phải có ít nhất 8 ký tự.",
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.name && (
                        <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                </Form.Item>

                <Form.Item label="Lương">
                    <Controller
                        name="wage"
                        control={control}
                        rules={{
                            required: "Lương là bắt buộc",
                            min: {
                                value: 10000,
                                message: "Lương phải ít nhất là 10000 VNĐ/h.",
                            },
                        }}
                        render={({ field }) => (
                            <InputNumber
                                style={{ width: "100%" }}
                                {...field}
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) =>
                                    value?.replace(/\$\s?|(,*)/g, "")
                                }
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                            />
                        )}
                    />
                    {errors.wage && (
                        <p style={{ color: "red" }}>{errors.wage.message}</p>
                    )}
                    {/* Hiển thị lỗi từ Redux nếu có */}
                    {editErrors && (
                        <p style={{ color: "red" }}>
                            {editErrors.wage?.join(", ")}
                        </p>
                    )}
                </Form.Item>

                <Form.Item label="Ghi chú">
                    <Controller
                        name="note"
                        control={control}
                        render={({ field }) => <Input.TextArea {...field} />}
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PositionsModalEdit;
