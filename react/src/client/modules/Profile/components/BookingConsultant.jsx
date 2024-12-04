import React, { useEffect, useState } from "react";

import { Row, Col, Button, Select, Table, Tag, Card } from "antd";
import style from "../style/BookingConsultant.module.scss";

const { Option } = Select;
import MenuProfile from "./MenuProfile";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BookingConsultant = () => {
    const navigate = useNavigate();
    const { authGetmeClient } = useAuthActions();
    const [consdata, setconsdata] = useState();
    const authCustomer = useSelector((state) => state.auth);
    useEffect(() => {
        authGetmeClient();
    }, []);

    useEffect(() => {
        console.log(authCustomer);
        if (authCustomer?.user?.data) {
            setconsdata(
                authCustomer?.user?.data?.consulations?.map((e) => ({
                    ...e,
                    key: e.id,
                }))
            );
        }
    }, [authCustomer.user]);
    const handleApprove = (record) => {
        navigate("/tuvankhachhang/videocall/" + record.id);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên bác sĩ",
            dataIndex: ["staff_id", "fullname"],
            key: "staff_id",
            render: (text) => text || "chưa có",
        },
        {
            title: "Thời gian",
            dataIndex: "created_at",
            key: "created_at",
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
            render: (status, record) =>
                status == 2 ? (
                    <Tag color="green">Đã tư vấn</Tag>
                ) : status == 0 ? (
                    <Tag color="warning">Đang chờ duyệt</Tag>
                ) : (
                    <Tag color="red">Đã duyệt</Tag>
                ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    {record.status === 1 ? (
                        <Button
                            type="primary"
                            onClick={() => handleApprove(record)}
                        >
                            Tham gia cuộc gọi
                        </Button>
                    ) : record.status === 0 ? (
                        <>
                            <span>Đang chờ duyệt</span>
                            {/* <Button
                                type="default"
                                disabled
                                style={{ marginLeft: 8 }}
                            >
                                Hủy
                            </Button> */}
                        </>
                    ) : (
                        <span>Đã hoàn thành</span>
                    )}
                </>
            ),
        },
    ];

    return (
        <Row className={style.container} gutter={[16, 16]}>
            <Col
                xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className={style.profileContent}
            >
                {/* Banner Header */}
                <Row justify="center" align="middle" className={style.header}>
                    <Col xs={18} className={style.boxTitleProfile}>
                        <h2>Lịch hẹn tư vấn của bạn</h2>
                    </Col>
                </Row>

                {/* Dropdown Filters */}
                {/* <Col span={24} className={style.filters}>
                    <Row justify="space-between" align="middle">
                        <Col className={style.status}>
                            <Select
                                placeholder="Chọn Trạng Thái"
                                style={{ width: 150 }}
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="pending">
                                    Đang chờ thực hiện
                                </Option>
                                <Option value="inProgress">
                                    Đang thực hiện
                                </Option>
                                <Option value="completed">Hoàn thành</Option>
                                <Option value="cancelled">Đã hủy</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                placeholder="Sắp Xếp"
                                style={{ width: 150 }}
                            >
                                <Option value="dateAsc">Ngày tăng dần</Option>
                                <Option value="dateDesc">Ngày giảm dần</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col> */}

                {/* Table */}
                <Col span={24} className={style.table}>
                    <Card title="Danh sách lịch hẹn tư vấn">
                        <Table
                            locale={{
                                emptyText: "Không có dữ liệu",
                            }}
                            id="myTable"
                            loading={authCustomer.loading}
                            dataSource={consdata}
                            columns={columns}
                            rowKey={"key"}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Col>
        </Row>
    );
};

export default BookingConsultant;
