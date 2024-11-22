import React, { useMemo, useRef, useState, useEffect } from "react";

import {
    Form,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Button,
    Table,
    InputNumber,
    Card,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import "dayjs/locale/vi";

// import useCustomerActions from "../../Customer/hooks/useCustomerActions";
import useUsersActions from "../../modules/staffManagement/hooks/useUserAction";
import useServicesActions from "../../modules/services/hooks/useServices";
import useShiftAction from "../../modules/ShiftManagement/hooks/useShiftAction";
import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import { generateSnowflakeId, calculateEndTime } from "../../utils";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const Appointment_Edit = () => {
    const { id } = useParams();

    const { getservices } = useServicesActions();
    const { getusers } = useUsersActions();
    const { getshiftsById ,searchshifts} = useShiftAction();
    const { getappointmentsById } = useappointmentsActions();
    const service = useSelector((state) => state.services);
    const users = useSelector((state) => state.user);
    const shifts = useSelector((state) => state.shifts);
    const appointments = useSelector((state) => state.appointments);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getservices(50);
        getusers(50);
        getappointmentsById(id);
    }, []);
    useEffect(() => {
        if (!appointments.loading && appointments.appointment.data) {
            console.log(appointments.appointment.data);
            searchshifts(
            {
                search: appointments.appointment.data.shift.shift_date,
                page: 1,
                per_page: 50,
                status: 3,
            }
                
            );
        }
    }, [appointments.appointment.data]);
    useEffect(() => {
        if (!appointments.loading && appointments.appointment.data) {
            setValue(
                "full_name",
                appointments.appointment.data.customer.full_name || ""
            );
            setValue(
                "phone",
                appointments.appointment.data.customer.phone || ""
            );
            setValue(
                "appointment_date",
                [
                    dayjs(
                        appointments.appointment.data.appointment_date +
                            " " +
                            appointments.appointment.data.start_time
                    ),
                ] || []
            );
            setValue(
                "expected_time",
                calculateEndTime(
                    appointments.appointment.data.appointment_date,
                    appointments.appointment.data.start_time,
                    appointments.appointment.data.expected_time
                ) || ""
            );
        }
    }, [appointments.appointment.data]);

    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [shiftsOptions, setShiftsOptions] = useState([]);
    useEffect(() => {
        setServiceOptions(
            service.services.data.map((service) => ({
                value: service.id,
                label: service.name,
            }))
        );
        setUserOptions(
            users.users.data.map((user) => ({
                value: user.id,
                label: user.full_name,
            }))
        );
        setShiftsOptions(
            shifts.shifts.data.map((shift) => ({
                value: shift.id,
                label: shift.shift_date,
            }))
        );
    }, [service.services, users.users, shifts.shifts]);

    const onSubmit = (data) => {
        const payload = {
            id: generateSnowflakeId(),
            shift_id: data.shift,
            appointment_date: data.appointment_date[0].format("YYYY-MM-DD"),
            start_time: data.appointment_date[0].format("HH:mm:ss"),
            end_time: data.appointment_date[1].format("HH:mm:ss"),
            note: data.note,

            customer_id: generateSnowflakeId(),
            users: data.employee.map((employee) => ({ staff_id: employee })),
            services: selectedServices,
        };
        console.log("Submitted data:", payload);
    };

    const handleServiceChange = (selected) => {
        const newServices = selected.map((service) => {
            const existing = selectedServices.find(
                (item) => item.key === service
            );
            return (
                existing || {
                    key: service,
                    name: serviceOptions.find((opt) => opt.value === service)
                        ?.label,
                    quantity: 1,
                }
            );
        });
        setSelectedServices(newServices);
    };

    const handleQuantityChange = (value, key) => {
        setSelectedServices((prevServices) =>
            prevServices.map((service) =>
                service.key === key ? { ...service, quantity: value } : service
            )
        );
    };

    const columns = [
        { title: "Dịch vụ", dataIndex: "name", key: "name" },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) =>
                        handleQuantityChange(value, record.key)
                    }
                />
            ),
        },
    ];
    async function fetchUserList(username) {
        console.log("fetching user", username);
    }
    return (
        <Card title="Thêm lịch hẹn">
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Họ và tên" required>
                            <Controller
                                name="full_name"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên khách hàng",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Tên khách hàng"
                                    />
                                )}
                            />
                            {errors.fullname && (
                                <p style={{ color: "red" }}>
                                    {errors.fullname.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Số điện thoại" required>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /^[0-9]{10,11}$/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Số điện thoại khách hàng"
                                    />
                                )}
                            />
                            {errors.phone && (
                                <p style={{ color: "red" }}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Thời gian hẹn" required>
                            <Controller
                                name="appointment_date"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn thời gian hẹn",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        className="w-100"
                                        {...field}
                                        format="DD/MM/YYYY HH:mm"
                                        showTime
                                        onChange={(date) => {
                                            setValue(
                                                "expected_time",
                                                calculateEndTime(
                                                    dayjs(date).format(
                                                        "YYYY-MM-DD"
                                                    ),
                                                    dayjs(date).format(
                                                        "HH:mm:ss"
                                                    ),
                                                    appointments.appointment
                                                        .data.expected_time
                                                )
                                            );
                                        }}
                                    />
                                )}
                            />
                            {errors.appointment_date && (
                                <p style={{ color: "red" }}>
                                    {errors.appointment_date.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Thời gian dự kiến" required>
                            <Controller
                                name="expected_time"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Thời gian dự kiến"
                                        disabled
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Ca làm việc" required>
                            <Controller
                                name="shift"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ca làm việc",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn ca làm việc"
                                        options={shiftsOptions}
                                    />
                                )}
                            />
                            {errors.shift && (
                                <p style={{ color: "red" }}>
                                    {errors.shift.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Dịch vụ">
                            <Controller
                                name="service"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn dịch vụ"
                                        options={serviceOptions}
                                        onChange={handleServiceChange}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chọn nhân viên" required>
                            <Controller
                                name="employee"
                                control={control}
                                rules={{ required: "Vui lòng chọn nhân viên" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn nhân viên"
                                        options={userOptions}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                )}
                            />
                            {errors.employee && (
                                <p style={{ color: "red" }}>
                                    {errors.employee.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ghi chú">
                            <Controller
                                name="note"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        {...field}
                                        placeholder="Ghi chú"
                                        rows={4}
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Table
                        columns={columns}
                        dataSource={selectedServices}
                        pagination={false}
                        style={{ marginTop: "20px" }}
                        rowKey="key"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm Lịch Hẹn
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Appointment_Edit;
