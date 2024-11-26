import React from "react";

import { Row, Col, Button, Select, Table } from "antd";
import style from "../style/BookingConsultant.module.scss";

const { Option } = Select;
import MenuProfile from "./MenuProfile";


const BookingConsultant = () => {
    const data = [
        {
            key: "1",
            service: "Khám Mụn Chuẩn Y Khoa",
            date: "21/08/2024",
            time: "10:30",
            status: "Đang chờ thực hiện",
            statusColor: "orange",
        },
        {
            key: "2",
            service: "Chiếu Ánh Sáng Sinh Học",
            date: "21/08/2024",
            time: "10:30",
            status: "Đang thực hiện",
            statusColor: "blue",
        },
        {
            key: "3",
            service: "Lấy Nhân Mụn Chuẩn Y Khoa",
            date: "21/08/2024",
            time: "10:30",
            status: "Đã hủy",
            statusColor: "red",
        },
        {
            key: "4",
            service: "Khám Mụn Chuẩn Y Khoa",
            date: "21/08/2024",
            time: "10:30",
            status: "Hoàn thành",
            statusColor: "green",
        },
        {
            key: "5",
            service: "Khám Mụn Chuẩn Y Khoa",
            date: "21/08/2024",
            time: "10:30",
            status: "Hoàn thành",
            statusColor: "green",
        },
        {
            key: "4",
            service: "Khám Mụn Chuẩn Y Khoa",
            date: "21/08/2024",
            time: "10:30",
            status: "Hoàn thành",
            statusColor: "green",
        },
    ];

    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Thời gian",
            dataIndex: "date",
            key: "date",
            render: (date, record) => (
                <div>
                    <div>{date}</div>
                    <div style={{ color: "red" }}>{record.time}</div>
                </div>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <span style={{ color: record.statusColor }}>{status}</span>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: () => (
                <Button type="primary" danger>
                    Chi Tiết
                </Button>
            ),
        },
    ];

    return (
        <Row className={style.container} gutter={[16, 16]}>
            <Col xs={24} sm={6} lg={6} className={style.sidebar}>
                <MenuProfile />
            </Col>


            <Col xs={24} sm={18} lg={18} className={style.profileContent}>
                {/* Banner Header */}
                <Row justify="center" align="middle" className={style.header}>
                    <Col xs={18} className={style.boxTitleProfile}>
                        <h2>Tư vấn đặt lịch</h2>
                    </Col>
                </Row>

                {/* Dropdown Filters */}
                <Col span={24} className={style.filters}>
                    <Row justify="space-between" align="middle">
                        <Col className={style.status}>
                            <Select placeholder="Chọn Trạng Thái" style={{ width: 150 }}>
                                <Option value="all">Tất cả</Option>
                                <Option value="pending">Đang chờ thực hiện</Option>
                                <Option value="inProgress">Đang thực hiện</Option>
                                <Option value="completed">Hoàn thành</Option>
                                <Option value="cancelled">Đã hủy</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Sắp Xếp" style={{ width: 150 }}>
                                <Option value="dateAsc">Ngày tăng dần</Option>
                                <Option value="dateDesc">Ngày giảm dần</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>

                {/* Table */}
                <Col span={24} className={style.table}>
                    <Table id="myTable" dataSource={data} columns={columns} pagination={false} />
                </Col>
            </Col>
        </Row>
    );
};

export default BookingConsultant;
