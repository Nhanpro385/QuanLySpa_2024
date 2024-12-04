import React from "react";
import { Table, Row, Col, Card, Input } from "antd";
const ListBookingServiceTable = ({ service, setService }) => {
    const columns = [
        {
            title: "#",
            dataIndex: "#",
            key: "#",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",

            render: (text, record, index) => (
                <Input
                    className="w-100"
                    min={1}
                    max={5}
                    type="number"
                    value={record.quantity}
                    onChange={(e) => {
                        const newService = [...service];
                        newService[index].quantity = e.target.value;
                        setService(newService);
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
        },
        {
            title: "Thành tiền",
            dataIndex: "total",
            key: "total",
            render: (text, record) =>
                parseInt(record.price * record.quantity).toLocaleString() +
                " VNĐ",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record, index) => (
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        const newService = [...service];
                        newService.splice(index, 1);
                        setService(newService);
                    }}
                >
                    Xóa
                </button>
            ),
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
        >
            <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Table
                        dataSource={service}
                        pagination={false}
                        columns={columns}
                        rowKey="id"
                        locale={{
                            emptyText: "Vui lòng chọn dịch vụ để thêm số lượng",
                        }}
                    />
                </Col>
            </Row>
        </Card>
    );
};
export default ListBookingServiceTable;
