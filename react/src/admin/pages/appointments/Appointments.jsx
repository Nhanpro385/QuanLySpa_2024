// src/pages/Appointments.js
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tag, Spin } from "antd";
import ModalAppointment from "../../modules/appointments/compoments/appoitnmentsAddmodal";
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
    } = useappointmentsActions();
    const { appointments } = useSelector((state) => state.appointments);

    const [loading, setLoading] = useState(true); // Thêm trạng thái loading

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true); // Bắt đầu tải
            await getappointments();
            setLoading(false); // Kết thúc tải
        };
        fetchAppointments();
    }, []);

    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);

    const dataSource =
        appointments.data.map((item) => {
            return {
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
            };
        }) || [];

    const handleEdit = (id) => {
        console.log("Edit", id);
    };

    return (
        <>
            <h1 className="text-center">Quản lý lịch hẹn</h1>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Row className="m-2" justify={"space-between"}>
                            <h2>Danh Sách Đặt Lịch</h2>
                            <Button type="primary" onClick={showModal}>
                                Thêm lịch hẹn
                            </Button>
                            <ModalAppointment
                                isModalOpen={isModalOpen}
                                handleOk={handleOk}
                                handleCancel={handleCancel}
                            />
                            <ModalAppointmentEdit
                                isModalOpen={isModalOpen2}
                                handleOk={handleOk2}
                                handleCancel={handleCancel2}
                            />
                        </Row>
                        {loading ? ( // Hiển thị spinner khi loading
                            <Row justify="center">
                                <Spin
                                    spinning={loading}
                                    tip="Đang tải dữ liệu..."
                                >
                                    {!loading && (
                                        <AppointmentsTable
                                            dataSource={dataSource}
                                        />
                                    )}
                                </Spin>
                            </Row>
                        ) : (
                            <AppointmentsTable
                                dataSource={dataSource}
                                onEdit={(id) => {
                                    showModal2();
                                }}
                                onViewDetail={(id) => {
                                    navigate(
                                        "/admin/appointments/detail/" + id
                                    );
                                }}
                            />
                        )}
                    </Card>
                </Col>
                <Col span={24}>
                    {dataSource.length > 0 && (
                        <AppointmentsCalendar data={appointments.data} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Appointments;
