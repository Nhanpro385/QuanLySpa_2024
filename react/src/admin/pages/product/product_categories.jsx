import { Card, Col, Form, Row, Input, Button, Table } from "antd";

import React from "react";
const ProductCategories = () => {
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: () => (
                <div>
                    <Button type="primary">Sửa</Button>
                    <Button type="danger">Xóa</Button>
                </div>
            ),
        },
    ];
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card title="Danh mục sản phẩm">
                    <Form layout="vertical">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item label="Tên danh mục">
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" size="large">
                                        Thêm Mới
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Danh sách danh mục sản phẩm">
                    <Table dataSource={dataSource} columns={columns} />
                </Card>
            </Col>
        </Row>
    );
};
export default ProductCategories;
