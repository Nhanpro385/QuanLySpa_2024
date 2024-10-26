import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Select,
    message,
    Card,
    Row,
    Col,
} from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;

const PromotionsAdd = () => {
    const [form] = Form.useForm();

    // Submit form
    const onFinish = (values) => {
        console.log("Form Values: ", values);
        message.success("Khuyến mãi đã được thêm!");
        form.resetFields();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 className="text-center">Quản Lý Khuyến Mãi</h1>
            <Card
                title={<h2>Thêm Chương Trình Khuyến Mãi</h2>}
                style={{ width: "100%" }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        service: "Khuyến mãi tháng 4",
                        discount: 40,
                        startDate: null,
                        endDate: null,
                    }}
                >
                    <Row gutter={16}>
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="service"
                                label="Dịch vụ"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên khuyến mãi",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên chương trình khuyến mãi" />
                            </Form.Item>
                        </Col>{" "}
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="condition"
                                label="Điều kiện áp dụng"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập điều kiện áp dụng",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập điều kiện áp dụng" />
                            </Form.Item>
                        </Col>
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="type"
                                label="Loại khuyến mãi"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn loại khuyến mãi",
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn loại khuyến mãi">
                                    <Option value="1">Giảm giá</Option>
                                    <Option value="2">Tặng quà</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="discount"
                                label="Giảm giá"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập giảm giá",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Nhập giảm giá"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col  xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="startDate"
                                label="Ngày bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn ngày bắt đầu",
                                    },
                                ]}
                            >
                                <RangePicker className="w-100" showTime />
                            </Form.Item>
                        </Col>
                        <Col  xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="endDate"
                                label="Số lượng sử dụng"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số lượng",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Nhập số lượng sử dụng"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                        
                    </Row>

                    {/* Nút thêm khuyến mãi */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm Khuyến Mãi
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default PromotionsAdd;
