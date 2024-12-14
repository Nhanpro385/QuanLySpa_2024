import React, { useEffect } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Space,
    notification,
} from "antd";
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
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
                if (
                    [
                        "full_name",
                        "email",
                        "phone",
                        "address",
                        "date_of_birth",
                        "gender",
                    ].includes(key)
                ) {
                    setError(key, {
                        type: "manual",
                        message: formErrors[key][0],
                    });
                }
            });
        }
    }, [formErrors]);

    useEffect(() => {
        if (customer) {
            setValue("id", customer.id);
            setValue("full_name", customer.full_name);
            setValue("email", customer.contact_email);
            // setValue("password", customer.password); // Để an toàn, bạn có thể không hiển thị mật khẩu trong form
            setValue("phone", customer.phone);
            setValue("address", customer.address);
            setValue("date_of_birth", dayjs(customer.date_of_birth));
            setValue(
                "gender",
                customer.gender == "Nam" ? 1 : customer.gender == "Nữ" ? 2 : 3
            );
            setValue("status", customer.status);
            setValue("role", customer.role);
        }
    }, [customer]);

    return (
        <Modal
            title="Chỉnh sửa khách hàng"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit(handleOk)}>
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
                        render={({ field }) => (
                            <Input type="number" {...field} />
                        )}
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
                                <Option value={1}>Nam</Option>
                                <Option value={2}>Nữ</Option>
                                <Option value={3}>Khác</Option>
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
                <Form.Item label="Trạng Thái">
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Trạng thái" }}
                        render={({ field }) => (
                            <Select {...field} defaultValue={1}>
                                <Option value={0}>Tạm ngưng hoạt động</Option>
                                <Option value={1}>Đang hoạt động</Option>
                            </Select>
                        )}
                    />
                    {errors.status && (
                        <p style={{ color: "red" }}>{errors.status.message}</p>
                    )}
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
