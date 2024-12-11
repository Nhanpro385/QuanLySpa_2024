import React from "react";
import { Table, Row, Col, Card, Input, Button } from "antd";

const ListBookingServiceTable = ({ service, setService }) => {
    // Hàm chung để thay đổi số lượng
    const handleQuantityChange = (value, index) => {
        const newService = [...service];
        newService[index].quantity = value > 0 ? value : 1; // Đảm bảo số lượng >= 1
        setService(newService);
    };

    // Hàm chung để xóa dịch vụ
    const handleRemoveService = (index) => {
        const newService = [...service];
        newService.splice(index, 1);
        setService(newService);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "#",
            key: "#",
            render: (text, record, index) => index + 1,
            width: "5%",
        },
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
            width: "10%",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
            render: (text, record, index) => (
                <Input
                className="w-100"
                min={1}
                max={3}
                type="number"
                value={record.quantity}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    // Giới hạn giá trị trong khoảng từ 1 đến 3
                    const clampedValue = Math.max(1, Math.min(3, value));
                    handleQuantityChange(clampedValue, index);
                }}
            />
            
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) =>
                parseInt(record.price).toLocaleString() + " VNĐ",
            width: "10%",
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            key: "total",
            render: (text, record) =>
                parseInt(record.price * record.quantity).toLocaleString() +
                " VNĐ",
            width: "10%",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record, index) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveService(index)}
                >
                    Xóa
                </button>
            ),
            width: "10%",
        },
    ];

    return (
        <Card
            className="container mt-4"
            style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
            }}
            title="Danh sách dịch vụ đã chọn"   
        >
            <Row>
                {/* Giao diện Desktop */}
                <Col xxl={24} xl={24} lg={24} md={24} sm={0} xs={0}>
                    <Table
                        scroll={{ x: 768 }}
                        dataSource={service}
                        pagination={false}
                        columns={columns}
                        rowKey="id"
                        locale={{
                            emptyText: "Vui lòng chọn dịch vụ để thêm số lượng",
                        }}
                    />
                </Col>

                {/* Giao diện Mobile */}
                <Col xxl={0} xl={0} lg={0} md={0} sm={24} xs={24}>
                    {service.length > 0 ? (
                        service.map((item, index) => (
                            <Card
                                key={item.id}
                                style={{
                                    marginBottom: "15px",
                                    borderRadius: "10px",
                                    boxShadow:
                                        "0px 5px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <h4>
                                            {index + 1}. {item.name}
                                        </h4>
                                    </Col>
                                    <Col span={12}>
                                        <p>
                                            <strong>Giá:</strong>{" "}
                                            {parseInt(
                                                item.price
                                            ).toLocaleString()}
                                        </p>
                                    </Col>
                                    <Col span={12}>
                                        <p>
                                            <strong>Thành tiền:</strong>{" "}
                                            {parseInt(
                                                item.price * item.quantity
                                            ).toLocaleString()}
                                        </p>
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    parseInt(e.target.value) ||
                                                        1,
                                                    index
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() =>
                                                handleRemoveService(index)
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            Xóa
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    ) : (
                        <p style={{ textAlign: "center" }}>
                            Vui lòng chọn dịch vụ để thêm số lượng.
                        </p>
                    )}
                </Col>
            </Row>
        </Card>
    );
};

export default ListBookingServiceTable;
