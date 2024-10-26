import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useForm, Controller } from "react-hook-form";

const SupplierForm = ({ control, handleSubmit, onSubmit, errors }) => {
    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Row gutter={16}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Tên Nhà cung cấp"
                        validateStatus={errors.name ? "error" : ""}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required:
                                    "Tên nhà cung cấp không được để trống.",
                                minLength: {
                                    value: 8,
                                    message: "Tên phải có ít nhất 8 ký tự.",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.name && (
                            <p style={{ color: "red" }}>
                                {errors.name.message}
                            </p>
                        )}
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Địa chỉ"
                        validateStatus={errors.country ? "error" : ""}
                    >
                        <Controller
                            name="country"
                            control={control}
                            rules={{
                                required: "Địa chỉ là bắt buộc",
                                minLength: {
                                    value: 8,
                                    message: "Địa chỉ phải có ít nhất 8 ký tự.",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.country && (
                            <p style={{ color: "red" }}>
                                {errors.country.message}
                            </p>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Địa chỉ Email"
                        validateStatus={errors.contact_email ? "error" : ""}
                    >
                        <Controller
                            name="contact_email"
                            control={control}
                            rules={{
                                required: "Email không được để trống.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Email không hợp lệ.",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.contact_email && (
                            <p style={{ color: "red" }}>
                                {errors.contact_email.message}
                            </p>
                        )}
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item
                        label="Mã số"
                        validateStatus={errors.code ? "error" : ""}
                    >
                        <Controller
                            name="code"
                            control={control}
                            rules={{
                                required: "Mã số không được để trống.",
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.code && (
                            <p style={{ color: "red" }}>
                                {errors.code.message}
                            </p>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm Mới
                </Button>
            </Form.Item>
        </Form>
    );
};
export default SupplierForm;
