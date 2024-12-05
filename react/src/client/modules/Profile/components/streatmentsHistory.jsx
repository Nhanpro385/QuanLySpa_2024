import React, { useEffect, useState } from "react";
import { Row, Col, Button, Select, Table, Tag, Card } from "antd";
import style from "../style/ServiceHistory.module.scss";
import { useSelector } from "react-redux";
const { Option } = Select;
import MenuProfile from "./MenuProfile";
import ServiceHistoryModalDetail from "./ServiceHistoryModalDetail";
import useModal from "../../../../admin/modules/appointments/hooks/openmodal";

const StreatmentsHistory = () => {
    const auth = useSelector((state) => state.auth);
    const [ListAppointment, setListAppointment] = useState([]);
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [appSelected, setAppSelected] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("dateAsc");

    // Set the appointments when the auth data changes
    useEffect(() => {
        if (auth.user?.data?.appointments?.length > 0) {
            setListAppointment(
                auth.user?.data?.appointments?.map((item, index) => ({
                    key: index,
                    ...item,
                }))
            );
        }
    }, [auth]);

    // Handle the detail view modal
    const handleDetail = (record) => {
        if (record) {
            setAppSelected(record);
            showModal();
        }
    };

    // Handle the status filter change
    const handleStatusChange = (value) => {
        setFilterStatus(value);
    };

    // Handle the sort order change
    const handleSortChange = (value) => {
        setSortOrder(value);
    };

    // Apply the filters and sort to the list of appointments
    const filteredAppointments = ListAppointment.filter((appointment) => {
        if (filterStatus === "all") return true; // No filter, show all
        return appointment.status === filterStatus; // Filter by status
    });

    const sortedAppointments = filteredAppointments.sort((a, b) => {
        if (sortOrder === "dateAsc") {
            return new Date(a.appointment_date) - new Date(b.appointment_date); // Ascending order
        } else {
            return new Date(b.appointment_date) - new Date(a.appointment_date); // Descending order
        }
    });

    // Table columns
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "services",
            key: "services",
            render: (services) => {
                if (Array.isArray(services)) {
                    return services.map((service, idx) => (
                        <div key={idx}>{service.name}</div>
                    ));
                }
                return <div>{services}</div>;
            },
        },
        {
            title: "Thời gian",
            dataIndex: "appointment_date",
            key: "appointment_date",
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
            render: (status) => (
                <Tag
                    color={
                        status === "Đã đặt lịch hẹn."
                            ? "blue"
                            : status === "Đang thực hiện."
                            ? "green"
                            : status === "Đã hoàn thành."
                            ? "cyan"
                            : status === "Đã hủy lịch hẹn."
                            ? "red"
                            : "default"
                    }
                >
                    {status}
                </Tag>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (e, record) => (
                <Button type="primary" danger onClick={() => handleDetail(record)}>
                    Chi Tiết
                </Button>
            ),
        },
    ];

    return (
        <Row className={style.container} gutter={[16, 16]}>
        

            <Col    xxl={24}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24} className={style.profileContent}>
                {/* Banner Header */}
                <Row justify="center" align="middle" className={style.header}>
                    <Col xs={18} className={style.boxTitleProfile}>
                        <h2>Lịch sử dịch vụ</h2>
                    </Col>
                </Row>

                {/* Dropdown Filters */}
                <Col span={24} className={style.filters}>
                    <Row justify="space-between" align="middle">
                        <Col className={style.status}>
                            <Select
                                placeholder="Chọn Trạng Thái"
                                style={{ width: 150 }}
                                onChange={handleStatusChange}
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="Đã đặt lịch hẹn.">Đã đặt lịch hẹn.</Option>
                                <Option value="Đã hủy lịch hẹn.">Đã hủy lịch hẹn.</Option>
                                <Option value="Đang thực hiện.">Đang thực hiện.</Option>
                                <Option value="Đã hoàn thành.">Đã hoàn thành.</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                placeholder="Sắp Xếp"
                                style={{ width: 150 }}
                                onChange={handleSortChange}
                            >
                                <Option value="dateAsc">Ngày tăng dần</Option>
                                <Option value="dateDesc">Ngày giảm dần</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>

                {/* Table */}
                <Col span={24} className={style.table}>
                    <Card>
                        <Table
                        locale={{
                            emptyText: "Không có dữ liệu nào",
                        }}
                            id="myTable"
                            dataSource={sortedAppointments}
                            columns={columns}
                            rowKey={"key"}
                            pagination={{
                                pageSize: 5,
                                showSizeChanger: false,
                            }}
                        />
                    </Card>
                </Col>
                <ServiceHistoryModalDetail
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    appointmentData={appSelected}
                />
            </Col>
        </Row>
    );
};

export default StreatmentsHistory;
