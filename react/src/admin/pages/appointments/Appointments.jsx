// src/pages/Appointments.js
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Input, notification, Divider } from "antd";

import AppointmentsTable from "../../modules/appointments/compoments/AppointmentsTable";
import AppointmentsCalendar from "../../modules/appointments/compoments/AppointmentsCalendar";
import useModal from "../../modules/appointments/hooks/openmodal";
import { Link, useNavigate } from "react-router-dom";
import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import AppointmentsDetail from "../../modules/appointments/compoments/AppointmentsDetail";
import { Loading3QuartersOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
function Appointments() {
    useEffect(() => {
        document.title = "Lịch hẹn";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const {
        addappointments,
        getappointments,
        updateappointments,
        deleteappointments,
        getappointmentsById,
        searchappointments,
    } = useappointmentsActions();
    const { appointments, loading, appointment } = useSelector(
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
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();

    useEffect(() => {
        if (appointments && !loading) {
            if (appointments.data) {
                console.log(appointments.data);

                setDataAppointments(
                    appointments.data.map((item) => ({
                        key: item.id,
                        id: item.id,
                        title: item.title || "Không có tiêu đề",
                        service_name: item.services
                            ?.map((service) => service.name)
                            .join(", "),
                        customer_id: item.customer?.full_name,
                        employee_name: item.users
                            ?.map((user) => user.full_name)
                            .join(", "),
                        start: item.start_time || "Không có thời gian bắt đầu",
                        end: item.end || "Không có thời gian kết thúc",
                        status: item.status || "Không có trạng thái",
                        date: item.appointment_date || "Không có  ngày",
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
            getappointments();
        }
    }, [searchQuery]);
    const handleInputChange = debounce((value) => {
        setSearchQuery({ page: 1, search: value });
    }, 500);
    const handlePageChange = (page, pagination, filters, sorter) => {
        setSearchQuery({ ...searchQuery, page, per_page: pagination });
    };
    const handledelete = async (record) => {
        try {
            const res = await deleteappointments(record.id);
            console.log(res);

            if (res.payload?.status === 500 || res.payload?.status === 403) {
                api.error({
                    message: "Có lỗi xảy ra",
                    description: res.payload.message,
                    duration: 3,
                });
                return;
            }
            api.success({
                message: res?.payload?.message || "Hủy lịch hẹn thành công",
                duration: 3,
            });
            getappointments();
        } catch (err) {
            console.log(err);
        }
    };
    const handleDetailView = async (id) => {
        try {
            const res = await getappointmentsById(id);
            if (!loading && appointment.data) {
                showModal2();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1 className="text-center">Quản lý lịch hẹn</h1>
            <Row gutter={[16, 16]}>
                {contextHolder}
                <Col span={24}>
                    <Card
                        extra={
                            <Button
                                icon={<Loading3QuartersOutlined />}
                                type="primary"
                                onClick={() => getappointments()}
                                loading={loading}
                            >
                                Làm mới
                            </Button>
                        }
                    >
                        <Divider orientation="left">
                            <h2>Danh Sách Đặt Lịch</h2>
                        </Divider>
                        <Row className="m-2" justify={"end"}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    navigate("/admin/lichhen/them");
                                }}
                                icon={<PlusOutlined />}
                            >
                                Thêm lịch hẹn
                            </Button>
                        </Row>

                        <Row gutter={[16, 16]} className="mb-5">
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
                                handleDetailView(id);
                            }}
                            handleDelete={handledelete}
                            pagination={pagination}
                            handlePageChange={handlePageChange}
                        />
                        <AppointmentsDetail
                            isOpen={isModalOpen2}
                            onClose={handleCancel2}
                            selectedAppointment={
                                appointment && appointment.data
                                    ? appointment.data
                                    : {}
                            }
                        />
                    </Card>
                </Col>
                <Divider orientation="left">
                            <h2>Lịch hẹn theo ngày</h2>
                        </Divider>
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
