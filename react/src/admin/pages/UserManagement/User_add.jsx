import React from "react";
import {
    Table,
    Button,
    Card,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Switch,
} from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

function UserAdd() {
    return (
        <Card title="Thêm người dùng">
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullname"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message:
                                        "Vui lòng nhập đúng định dạng email!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ" name="address">
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính" name="gender">
                            <Select size="large" placeholder="Chọn giới tính">
                                <Option value="NAM">Nam</Option>
                                <Option value="NU">Nữ</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh" name="date_of_birth">
                            <DatePicker
                                size="large"
                                style={{
                                    width: "100%",
                                }}
                                styles={{}}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Ghi chú" name="note">
                            <Input.TextArea size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit">
                        Thêm người dùng
                    </Button>{" "}
                    <Link to="/admin/user">
                        <Button onClick={() => {}} size="large">
                            Quay lại
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default UserAdd;
