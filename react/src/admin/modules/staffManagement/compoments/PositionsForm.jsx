import React from "react";
import { Row, Col, Input, Button, Form, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";

const PositionsForm = ({ onSubmit, control, errors }) => {
    return (
        <Form layout="vertical" onFinish={onSubmit}>
            <Row gutter={16}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Tên danh mục" validateStatus={errors.name ? "error" : ""}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Tên danh mục là bắt buộc",
                                minLength: {
                                    value: 8,
                                    message: "Tên phải có ít nhất 8 ký tự.",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                    </Form.Item>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Lương cơ bản theo giờ" validateStatus={errors.wage ? "error" : ""}>
                        <Controller
                            name="wage"
                            control={control}
                            rules={{
                                required: "Lương là bắt buộc",
                                min: {
                                    value: 1000,
                                    message: "Lương phải lớn hơn 1000",
                                },
                            }}
                            render={({ field }) => (
                                <InputNumber
                                    className="w-100"
                                    suffix="VNĐ"
                                    min={1000}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                                    {...field}
                                />
                            )}
                        />
                        {errors.wage && <p style={{ color: "red" }}>{errors.wage.message}</p>}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Ghi chú" validateStatus={errors.note ? "error" : ""}>
                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => <Input.TextArea rows={4} {...field} />}
                        />
                        {errors.note && <p style={{ color: "red" }}>{errors.note.message}</p>}
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

export default PositionsForm;
