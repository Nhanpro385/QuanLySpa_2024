// src/pages/Appointments.js
import React from "react";
import { Button, Card, Col, Row,Tag } from "antd";
import ModalAppointment from "../../modules/appointments/compoments/appoitnmentsAddmodal";
import ModalAppointmentEdit from "../../modules/appointments/compoments/appoitnmentsAddmodalEdit";
import AppointmentsTable from "../../modules/appointments/compoments/AppointmentsTable";
import AppointmentsCalendar from "../../modules/appointments/compoments/AppointmentsCalendar";
import useModal from "../../modules/appointments/hooks/openmodal";
import { Link, useNavigate } from "react-router-dom";
function Appointments() {
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

    const dataSource = [
        {
            key: "1",
            id: "1",
            service_id: "Trị mụn",
            title: "Tuấn trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            date: "12/09/2024",
            status: <Tag color="green">Đã chấp nhận</Tag>,
        },
        {
            key: "2",
            id: "2",
            title: "Tuấn trị mụn",
            service_id: "Trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            status: <Tag color="red">Từ chối</Tag>,
            date: "14/09/2024",
        },
        {
            id: "3",
            key: "3",
            title: "Tuấn trị mụn",
            service_id: "Trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            status: <Tag color="warning">Đang đợi</Tag>,
            date: "13/09/2024",
        },
    ];
    const handleEdit = (id) => {
        console.log("Edit", id);
    }
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
                        <AppointmentsTable
                            dataSource={dataSource}
                            onEdit={(id) => {
                                showModal2();
                            }}
                            onViewDetail={(id) => {
                                navigate("/admin/appointments/detail/" + id);
                            }}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <AppointmentsCalendar formattedDate={formattedDate} />
                </Col>
            </Row>
        </>
    );
}

export default Appointments;
