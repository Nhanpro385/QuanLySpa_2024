import React, { useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, Space } from "antd";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
const { Option } = Select;
import { formatDate } from "@admin/utils";
const ModalEditCustomer = ({
    isModalOpen,
    handleOk,
    handleCancel,
    customer,

    formErrors,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (customer) {
            setValue("name", customer.name);
            setValue("full_name", customer.full_name);
            setValue("email", customer.email);
            // setValue("password", customer.password); // Để an toàn, bạn có thể không hiển thị mật khẩu trong form
            setValue("phone", customer.phone);
            setValue("address", customer.address);
            setValue("date_of_birth", dayjs(customer.date_of_birth));
            setValue("gender", customer.gender);
            setValue("note", customer.note);
            setValue("role", customer.role);
        }
    }, [customer, setValue]);
    useEffect(() => {
        if (formErrors) {
            console.log(formErrors);

            Object.keys(formErrors).forEach((key) => {
                setError(key, { type: "manual", message: formErrors[key] });
            });
        }
    }, [formErrors, setError]);
    const onSubmit = (data) => {
        data.date_of_birth = formatDate(data.date_of_birth);

        handleOk({ ...data, id: customer.id, status: customer.status });
    };

    return (
        <Modal
            title="Chỉnh sửa khách hàng"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item label="Tên">
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Tên là bắt buộc",
                            pattern: {
                                value: /^[^\d]+$/,
                                message: "Tên không được chứa số",
                            },
                            maxLength: {
                                value: 50,
                                message: "Tên không được vượt quá 50 ký tự",
                            },
                        }}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                    {errors.name && (
                        <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                </Form.Item>

                <Form.Item label="Họ và tên">
                    <Controller
                        name="full_name"
                        control={control}
                        rules={{
                            required: "Họ và tên là bắt buộc",
                            pattern: {
                                value: /^[^\d]+$/,
                                message: "Họ và tên không được chứa số",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "Họ và tên không được vượt quá 50 ký tự",
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.full_name && (
                        <p style={{ color: "red" }}>
                            {errors.full_name.message}
                        </p>
                    )}
                </Form.Item>

                <Form.Item label="Email">
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email là bắt buộc",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email không hợp lệ",
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email.message}</p>
                    )}
                </Form.Item>

                {/* <Form.Item label="Mật khẩu">
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            minLength: {
                                value: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Mật khẩu không được vượt quá 20 ký tự",
                            },
                        }}
                        render={({ field }) => <Input.Password {...field} />}
                    />
                    {errors.password && (
                        <p style={{ color: "red" }}>
                            {errors.password.message}
                        </p>
                    )}
                </Form.Item> */}

                <Form.Item label="Số điện thoại">
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: "Số điện thoại là bắt buộc",
                            pattern: {
                                value: /^(0[3|5|7|8|9])+([0-9]{8})\b$/,
                                message: "Số điện thoại không hợp lệ",
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.phone && (
                        <p style={{ color: "red" }}>{errors.phone.message}</p>
                    )}
                </Form.Item>

                <Form.Item label="Địa chỉ">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item label="Giới tính">
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Giới tính là bắt buộc" }}
                        render={({ field }) => (
                            <Select {...field}>
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                            </Select>
                        )}
                    />
                    {errors.gender && (
                        <p style={{ color: "red" }}>{errors.gender.message}</p>
                    )}
                </Form.Item>

                <Form.Item label="Ngày sinh">
                    <Controller
                        name="date_of_birth"
                        control={control}
                        rules={{ required: "Ngày sinh là bắt buộc" }}
                        render={({ field }) => (
                            <DatePicker style={{ width: "100%" }} {...field} />
                        )}
                    />
                    {errors.date_of_birth && (
                        <p style={{ color: "red" }}>
                            {errors.date_of_birth.message}
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

export default ModalEditCustomer;
