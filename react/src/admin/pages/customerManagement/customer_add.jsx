import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    notification,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";
import { formatDate } from "../../utils";
import { CustomerAdd } from "../../redux/slices/CustomerSlice";

const { Option } = Select;

const CustomersAdd = () => {
    useEffect(() => {
        document.title = "Thêm khách hàng";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.customers);
    const [success, setSuccess] = useState(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        const formattedDateOfBirth = formatDate(data.date_of_birth);
        const payload = {
            ...data,
            status: 1,
            date_of_birth: formattedDateOfBirth,
            id: Snowflake.generate(),
        };

        try {
            const response = await dispatch(CustomerAdd(payload));
            if (response.payload.status === 403) {
                return api.error({
                    message: "Banj không có quyền thực hiện thao tác này",
                    placement: "topRight",
                });
            }

            if (CustomerAdd.fulfilled.match(response)) {
                reset();
                setSuccess("Thêm người dùng thành công");
                api.success({
                    message: "Thêm khách hàng thành công",
                    placement: "topRight",
                });
            } else if (CustomerAdd.rejected.match(response)) {
                Object.keys(response.payload.errors).forEach((key) => {
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
                            message: response.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: response.payload.errors[key][0],
                            duration: 3,
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-center mb-4">Thêm khách hàng</h1>
            <Card>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={16}>
                        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                            <Form.Item label="Họ và tên" required>
                                <Controller
                                    name="full_name"
                                    control={control}
                                    rules={{
                                        required: "Họ và tên là bắt buộc",
                                        pattern: {
                                            value: /^[^\d]+$/,
                                            message:
                                                "Họ và tên không được chứa số",
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
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                            <Form.Item label="Email" required>
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
                                    <p style={{ color: "red" }}>
                                        {errors.email.message}
                                    </p>
                                )}
                            </Form.Item>
                        </Col>

                        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                            <Form.Item label="Số điện thoại" required>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: {
                                            value: /^(0[3|5|7|8|9])+([0-9]{8})\b$/,
                                            message:
                                                "Số điện thoại không hợp lệ",
                                        },
                                    }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.phone && (
                                    <p style={{ color: "red" }}>
                                        {errors.phone.message}
                                    </p>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                            <Form.Item label="Giới tính" required>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        required: "Giới tính là bắt buộc",
                                    }}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            <Option value={1}>Nam</Option>
                                            <Option value={2}>Nữ</Option>
                                            <Option value={3}>Khác</Option>
                                        </Select>
                                    )}
                                />
                                {errors.gender && (
                                    <p style={{ color: "red" }}>
                                        {errors.gender.message}
                                    </p>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item label="Địa chỉ">
                                <Controller
                                    name="address"
                                    control={control}
                                    rules={{
                                        required: "Địa chỉ là bắt buộc",
                                    }}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.address && (
                                    <p style={{ color: "red" }}>
                                        {errors.address.message}
                                    </p>
                                )}
                            </Form.Item>
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item label="Ngày sinh" required>
                                <Controller
                                    name="date_of_birth"
                                    control={control}
                                    rules={{
                                        required: "Ngày sinh là bắt buộc",
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            format="DD/MM/YYYY"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.date_of_birth && (
                                    <p style={{ color: "red" }}>
                                        {errors.date_of_birth.message}
                                    </p>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item label="Ghi chú">
                                <Controller
                                    name="note"
                                    control={control}
                                    render={({ field }) => (
                                        <Input.TextArea {...field} />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col xl={4} lg={12} md={12} sm={24} xs={24}>
                                <Button type="primary" htmlType="submit" block>
                                    Thêm khách hàng
                                </Button>
                            </Col>
                            <Col xl={4} lg={12} md={12} sm={24} xs={24}>
                                <Button onClick={reset} block>
                                    Làm mới
                                </Button>
                            </Col>
                            <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                                <Link to="/admin/khachhang">
                                    <Button block>Quay lại</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                {contextHolder}
            </Card>
        </>
    );
};

export default CustomersAdd;
