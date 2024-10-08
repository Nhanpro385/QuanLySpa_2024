import { Button, Card, Col, Input, Row, Select, Space, Table, Tag } from "antd";
import React from "react";

const ProductInventory = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VNĐ`, // Format price with currency
    },
    {
      title: "Ngày nhập",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "hạn sử dụng",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <Space>
          <Button type="primary">Sửa</Button>
          <Button danger>Khuyến mãi</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Mặt nạ giấy chiết xuất trà xanh",
      quantity: 200,
      price: 50000,
      date: "2024-09-25",
      status: <Tag color="green">Còn hàng</Tag>,
    },
    {
      key: "2",
      name: "Kem dưỡng ẩm ban đêm",
      quantity: 150,
      price: 120000,
      date: "2024-09-20",
      status: <Tag color="yellow">Sắp hết hàng</Tag>,
    },
    {
      key: "3",
      name: "Mặt nạ đất sét",
      quantity: 75,
      price: 300000,
      date: "2024-09-15",
      status: <Tag color="red">Hết hàng</Tag>,
    },
    {
      key: "4",
      name: "Kem chống nắng SPF 50",
      quantity: 90,
      price: 250000,
      date: "2024-09-10",
      status: <Tag color="green">Còn hàng</Tag>,
    },
  ];

  return (
    <div>
      <Card>
        <h1>Quản lý tồn kho sản phẩm Spa</h1>
        <Row>
          <Col span={12} style={{ marginBottom: 10 }}>
            <Select defaultValue="all" style={{ width: 120 }}>
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="expired">Hết hạn</Select.Option>
              <Select.Option value="nearly_expired">Sắp hết hạn</Select.Option>
            </Select>
          </Col>
          <Col span={12} style={{ marginBottom: 10, textAlign: "right" }}>
            <Input.Search
              placeholder="Tìm kiếm sản phẩm"
              style={{ width: 200 }}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ProductInventory;
