import React, { useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, Space } from "antd";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { formatDate } from "@admin/utils";

const { Option } = Select;

const ModalEditStaff = ({
    isModalOpen,
    handleOk,
    handleCancel,
    staff,
    handleEditSubmit,
    errorForm,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (staff) {
            setValue("full_name", staff.full_name);
            setValue("email", staff.email);
            setValue("phone", staff.phone);
            setValue("address", staff.address);
            setValue("date_of_birth", dayjs(staff.date_of_birth));
            setValue("gender", staff.gender === "nam" ? 0 : 1);
            setValue("note", staff.note);
            setValue(
                "role",
                staff.role === "Nhân viên tư vấn và chăm sóc khách hàng"
                    ? 2
                    : staff.role === "Nhân viên"
                    ? 1
                    : 0
            );
        }
    }, [staff, setValue]);
    useEffect(() => {
        if (errorForm) {
            Object.keys(errorForm).forEach((key) => {
                setError(key, { type: "manual", message: errorForm[key] });
            });
        }
    }, [errorForm]);

    const onSubmit = (data) => {
        data.date_of_birth = formatDate(data.date_of_birth);

        handleEditSubmit({ ...data, id: staff.id, status: staff.status });
    };
    const onCancel = () => {
        reset(); // Clear form when modal is closed
        handleCancel(); // Close the modal
    };
    return (
        <Modal
            title="Chỉnh sửa nhân viên"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
                                <Option value={0}>Nam</Option>
                                <Option value={1}>Nữ</Option>
                            </Select>
                        )}
                    />
                    {errors.gender && (
                        <p style={{ color: "red" }}>{errors.gender.message}</p>
                    )}
                </Form.Item>
                <Form.Item label="Chức vụ">
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Chức vụ là bắt buộc" }}
                        render={({ field }) => (
                            <Select {...field}>
                                <Option value={0}>Quản trị viên</Option>
                                <Option value={1}>Nhân viên</Option>
                                <Option value={2}>
                                    Nhân viên tư vấn và chăm sóc khách hàng
                                </Option>
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
                        <Button onClick={onCancel}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditStaff;
