import React from "react";
import { Card, Table, Select, Input, Button, Row, Col } from "antd";

const { Option } = Select;

const TableSection = ({
    transactionData,
    appointmentData,
    transactionColumns,
    appointmentColumns,
}) => (
    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xl={24} md={24} sm={24} xs={24}>
            <Card
                title="Giao dịch gần đây"
                extra={
                    <Row gutter={[16, 16]}>
                        <Select
                            defaultValue="Hôm nay"
                            style={{ width: 120, marginRight: 8 }}
                        >
                            <Option value="Hôm nay">Hôm nay</Option>
                            <Option value="Tuần này">Tuần này</Option>
                            <Option value="Tháng này">Tháng này</Option>
                        </Select>
                        <Input.Search
                            placeholder="Tìm kiếm giao dịch"
                            style={{ width: 200, marginRight: 8 }}
                        />
                       
                    </Row>
                }
            >
                <Table
                    style={{ overflowX: "auto" }}
                    columns={transactionColumns}
                    dataSource={transactionData}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </Col>
        <Col xl={24} md={24} sm={24} xs={24}>
            <Card
                title="Lịch hẹn tư vấn và hẹn dịch vụ"
                extra={
                    <Row gutter={[16, 16]}>
                        <Select
                            defaultValue="Hôm nay"
                            style={{ width: 120, marginRight: 8 }}
                        >
                            <Option value="Hôm nay">Hôm nay</Option>
                            <Option value="Tuần này">Tuần này</Option>
                            <Option value="Tháng này">Tháng này</Option>
                        </Select>
                        <Input.Search
                            placeholder="Tìm kiếm lịch hẹn"
                            style={{ width: 200, marginRight: 8 }}
                        />
                       
                    </Row>
                }
            >
                <Table
                    style={{ overflowX: "auto" }}
                    columns={appointmentColumns}
                    dataSource={appointmentData}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </Col>
    </Row>
);

export default TableSection;
