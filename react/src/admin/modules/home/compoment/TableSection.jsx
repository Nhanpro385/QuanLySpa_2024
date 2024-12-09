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
    const [dateStaff, setDateStaff] = useState("today");
    const [dateAppointment, setDateAppointment] = useState("today");
    const [filteredStaffAppoiments, setFilteredStaffAppoiments] = useState([]);
    const [filteredStaffConsultations, setFilteredStaffConsultations] =
        useState([]);
    useEffect(() => {
        // Update filtered data based on the selected date filter

        if (staffConsulations?.length > 0) {
            setFilteredStaffConsultations(staffConsulations[dateStaff]);
        }
    }, [dateStaff, staffConsulations]);
    useEffect(() => {
        if (staffAppoiments?.length > 0) {
        setFilteredStaffAppoiments(staffAppoiments[dateAppointment] || []);
        }
    }, [dateAppointment, staffAppoiments]);

    return (
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
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
                        style={{ overflowX: "auto" }}
                        columns={staffConsulationsColumns}
                        dataSource={filteredStaffConsultations}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
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
                        style={{ overflowX: "auto" }}
                        columns={staffAppoimentsColumns}
                        dataSource={filteredStaffAppoiments}
                        pagination={{ pageSize: 5 }}
                    />
                </Card>
            </Col>
            <Col xl={24} md={24} sm={24} xs={24}>
                <Card
                    title="Giao dịch gần đây"
                    // extra={
                    //     <Row gutter={[16, 16]}>
                    //         <Select
                    //             defaultValue="Hôm nay"
                    //             style={{ width: 120, marginRight: 8 }}
                    //         >
                    //             <Option value="Hôm nay">Hôm nay</Option>
                    //             <Option value="Tuần này">Tuần này</Option>
                    //             <Option value="Tháng này">Tháng này</Option>
                    //         </Select>

                    //     </Row>
                    // }
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
                    // extra={
                    //     <Row gutter={[16, 16]}>
                    //         <Select
                    //             defaultValue="Hôm nay"
                    //             style={{ width: 120, marginRight: 8 }}
                    //         >
                    //             <Option value="Hôm nay">Hôm nay</Option>
                    //             <Option value="Tuần này">Tuần này</Option>
                    //             <Option value="Tháng này">Tháng này</Option>
                    //         </Select>
                    //         <Input.Search
                    //             placeholder="Tìm kiếm lịch hẹn"
                    //             style={{ width: 200, marginRight: 8 }}
                    //         />
                    //     </Row>
                    // }
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
};

export default TableSection;
