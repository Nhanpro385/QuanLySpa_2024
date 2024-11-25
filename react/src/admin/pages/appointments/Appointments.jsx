// src/pages/Appointments.js
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Row,
    Tag,
    Spin,
    Input,
    Select,
    DatePicker,
} from "antd";

import ModalAppointmentEdit from "../../modules/appointments/compoments/appoitnmentsAddmodalEdit";
import AppointmentsTable from "../../modules/appointments/compoments/AppointmentsTable";
import AppointmentsCalendar from "../../modules/appointments/compoments/AppointmentsCalendar";
import useModal from "../../modules/appointments/hooks/openmodal";
import { Link, useNavigate } from "react-router-dom";
import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
function Appointments() {
    const {
        addappointments,
        getappointments,
        updateappointments,
        deleteappointments,
        getappointmentsById,
        searchappointments,
    } = useappointmentsActions();
    const { appointments, loading } = useSelector(
        (state) => state.appointments
    );

    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        search: "",
        per_page: 5,
    });
    const [dataAppointments, setDataAppointments] = useState([]);
    useEffect(() => {
        const fetchAppointments = async () => {
            await getappointments();
        };
        fetchAppointments();
    }, []);

    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();

    useEffect(() => {
        if (appointments && !loading) {
            if (appointments.data) {
                setDataAppointments(
                    appointments.data.map((item) => ({
                        key: item.id,
                        id: item.id,
                        title: item.title,
                        service_name: item.services
                            .map((service) => service.name)
                            .join(", "),
                        customer_id: item.customer.full_name,
                        employee_name: item.users
                            .map((user) => user.full_name)
                            .join(", "),
                        start: item.start_time,
                        end: item.end,
                        status: item.status,
                        date: item.appointment_date,
                    }))
                );
            }
        }
    }, [appointments]);
    const pagination = appointments.meta || {};

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page
        ) {
            searchappointments(searchQuery);
        } else {
            getappointments({ page: 1 });
        }
    }, [searchQuery]);
    const handleInputChange = debounce((value) => {
        setSearchQuery({ page: 1, search: value });
    }, 500);
    const handlePageChange = (page, pagination, filters, sorter) => {
        setSearchQuery({ ...searchQuery, page, per_page: pagination });
    };

    return (
        <>
            <h1 className="text-center">Quản lý lịch hẹn</h1>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Row className="m-2" justify={"space-between"}>
                            <h2>Danh Sách Đặt Lịch</h2>
                            <Button
                                type="primary"
                                onClick={() => {
                                    navigate("/admin/lichhen/them");
                                }}
                            >
                                Thêm lịch hẹn
                            </Button>
                        </Row>

                        <Row gutter={[16, 16]} className="mb-3">
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={24}
                                sm={24}
                                xs={24}
                            >
                                <Input.Search
                                    placeholder="Tìm kiếm sản phẩm theo : tên, số điện thoại, email, ngày"
                                    allowClear
                                    enterButton="Tìm kiếm"
                                    size="middle"
                                    onSearch={handleInputChange}
                                    onChange={(e) =>
                                        handleInputChange(e.target.value)
                                    }
                                />
                            </Col>
                        </Row>
                        <AppointmentsTable
                            loading={loading}
                            dataSource={dataAppointments}
                            onEdit={(id) => {
                                navigate("/admin/lichhen/chinhsua/" + id);
                            }}
                            onViewDetail={(id) => {
                                navigate("/admin/appointments/detail/" + id);
                            }}
                            pagination={pagination}
                            handlePageChange={handlePageChange}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    {dataAppointments.length > 0 && (
                        <AppointmentsCalendar data={appointments.data} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Appointments;
