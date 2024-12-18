import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Row, Col } from "antd";
import { use } from "react";

const { Option } = Select;

const TableSection = ({
    transactionData,
    appointmentData,
    transactionColumns,
    appointmentColumns,
    staffConsulations,
    staffAppoiments,
    staffConsulationsColumns,
    staffAppoimentsColumns,
}) => {
    console.log();
    console.log(staffAppoiments);
    const [dateStaff, setDateStaff] = useState("today");
    const [dateAppointment, setDateAppointment] = useState("today");
    const [filteredStaffAppoiments, setFilteredStaffAppoiments] = useState([]);
    const [filteredStaffConsultations, setFilteredStaffConsultations] =
        useState([]);

    useEffect(() => {
        // Update filtered data based on the selected date filter

        if (
            staffConsulations?.month?.length > 0 ||
            staffConsulations?.week?.length > 0 ||
            staffConsulations?.today?.length > 0
        ) {
            console.log(staffConsulations[dateStaff]);
            setFilteredStaffConsultations(staffConsulations[dateStaff]);
        }
    }, [dateStaff, staffConsulations]);
    useEffect(() => {
        if (
            staffAppoiments?.month?.length > 0 ||
            staffAppoiments?.week?.length > 0 ||
            staffAppoiments?.today?.length > 0
        ) {
            console.log(staffAppoiments[dateAppointment]);

            setFilteredStaffAppoiments(staffAppoiments[dateAppointment] || []);
        }
    }, [dateAppointment, staffAppoiments]);

    return (
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Card
                    title="Thống kê lịch hẹn của nhân viên"
                    extra={
                        <Row gutter={[16, 16]}>
                            <Select
                                defaultValue="Hôm nay"
                                style={{ width: 120, marginRight: 8 }}
                                onChange={(value) => setDateAppointment(value)}
                            >
                                <Option value="today">Hôm nay</Option>
                                <Option value="week">Tuần này</Option>
                                <Option value="month">Tháng này</Option>
                            </Select>
                        </Row>
                    }
                >
                    <Table
                        scroll={{ x: 768 }}
                        columns={staffAppoimentsColumns}
                        dataSource={filteredStaffAppoiments}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Card
                    title="Thống kê tư vấn của nhân viên"
                    extra={
                        <Row gutter={[16, 16]}>
                            <Select
                                defaultValue="Hôm nay"
                                style={{ width: 120, marginRight: 8 }}
                                onChange={(value) => setDateStaff(value)}
                            >
                                <Option value="today">Hôm nay</Option>
                                <Option value="week">Tuần này</Option>
                                <Option value="month">Tháng này</Option>
                            </Select>
                        </Row>
                    }
                >
                    <Table
                        scroll={{ x: 768 }}
                        columns={staffConsulationsColumns}
                        dataSource={filteredStaffConsultations}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Card title="Giao dịch gần đây">
                    <Table
                        scroll={{ x: 768 }}
                        columns={transactionColumns}
                        dataSource={transactionData}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Card title="Lịch hẹn tư vấn ">
                    <Table
                        scroll={{ x: 768 }}
                        columns={appointmentColumns}
                        dataSource={appointmentData}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default TableSection;
