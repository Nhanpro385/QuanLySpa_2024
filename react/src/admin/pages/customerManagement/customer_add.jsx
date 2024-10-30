import React, { useState } from "react";
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
            status: true,
            date_of_birth: formattedDateOfBirth,
            id: Snowflake.generate(),
        };

        try {
            const response = await dispatch(CustomerAdd(payload));
            if (CustomerAdd.fulfilled.match(response)) {
                reset();
                setSuccess("Thêm người dùng thành công");
                api.success({
                    message: "Thêm khách hàng thành công",
                    placement: "topRight",
                });

            } else if (CustomerAdd.rejected.match(response)) {
                Object.keys(response.payload.errors).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: response.payload.errors[key][0],
                    });
                });
                api.error({
                    message: "Thêm khách hàng thất bại",
                    placement: "topRight",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <h1 className="text-center mb-4">
            Thêm khách hàng
            </h1>
        <Card >
           
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        size="large"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.name && (
                                <p style={{ color: "red" }}>
                                    {errors.name.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
                                        message: "Họ và tên không được vượt quá 50 ký tự",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.full_name && (
                                <p style={{ color: "red" }}>
                                    {errors.full_name.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
                                render={({ field }) => (
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>
                                    {errors.email.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Mật khẩu">
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Mật khẩu là bắt buộc",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Mật khẩu không được vượt quá 20 ký tự",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input.Password size="large" {...field} />
                                )}
                            />
                            {errors.password && (
                                <p style={{ color: "red" }}>
                                    {errors.password.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.phone && (
                                <p style={{ color: "red" }}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Địa chỉ">
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.address && (
                                <p style={{ color: "red" }}>
                                    {errors.address.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Giới tính">
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Giới tính là bắt buộc" }}
                                render={({ field }) => (
                                    <Select size="large" {...field}>
                                        <Option value={2}>Nam</Option>
                                        <Option value={1}>Nữ</Option>
                                        <Option value={0}>Khác</Option>
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
                        <Form.Item label="Ngày sinh">
                            <Controller
                                name="date_of_birth"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        size="large"
                                        style={{ width: "100%" }}
                                        format="YYYY-MM-DD"
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
                                    <Input.TextArea size="large" {...field} />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col xl={4} lg={12} md={12} sm={24} xs={24}>
                            <Button size="large" type="primary" htmlType="submit" block>
                                Thêm khách hàng
                            </Button>
                        </Col>
                        <Col xl={4} lg={12} md={12} sm={24} xs={24}>
                            <Button size="large" onClick={reset} block>
                                Làm mới
                            </Button>
                        </Col>
                        <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                        <Link to="/admin/user">
                            <Button size="large" block>Quay lại</Button>
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
