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
    Tag,
    notification,
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
import {
    ClockCircleOutlined,
    ContactsOutlined,
    UserOutlined,
} from "@ant-design/icons";

const Appointment_Edit = () => {
    const { id: idAppointment } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const { getservices } = useServicesActions();
    const { getusers } = useUsersActions();
    const { getshiftsById, searchshifts } = useShiftAction();
    const { getappointmentsById, updateappointments } =
        useappointmentsActions();
    const service = useSelector((state) => state.services);
    const users = useSelector((state) => state.user);
    const shifts = useSelector((state) => state.shifts);
    const appointments = useSelector((state) => state.appointments);
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getservices(50);
        getusers(50);
        getappointmentsById(idAppointment);
    }, []);
    useEffect(() => {
        if (!appointments.loading && appointments.appointment.data) {
            searchshifts({
                search: appointments.appointment.data.shift.shift_date,
                page: 1,
                per_page: 50,
                status: 3,
            });
        }
    }, [appointments.appointment.data]);
    useEffect(() => {
        if (!appointments.loading && appointments.appointment.data) {
            setValue(
                "full_name",
                appointments.appointment.data.customer?.full_name ||
                    "Không tìm thấy"
            );
            setValue(
                "phone",
                appointments.appointment.data.customer?.phone ||
                    "Không tìm thấy"
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
            setValue("note", appointments.appointment.data.note || "");

            setValue("shift", appointments.appointment.data.shift.id || "");
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

        setShiftsOptions(
            shifts.shifts.data.map((shift) => ({
                value: shift.id,
                label: (
                    <>
                        <Tag color="blue">
                            <ContactsOutlined /> {shift.shift_date}
                        </Tag>

                        <Tag color="green">
                            <ClockCircleOutlined /> {shift.start_time}
                        </Tag>

                        <Tag color="red">
                            <ClockCircleOutlined /> {shift.end_time}
                        </Tag>
                        <Tag color={shift.staffs.length > 0 ? "green" : "red"}>
                            <UserOutlined /> {shift.staffs.length} nhân viên
                        </Tag>
                    </>
                ),
            }))
        );
    }, [service.services, users.users, shifts.shifts]);

    const HandleShiftChange = async (value) => {
        try {
            const res = await getshiftsById(value || getValues("shift"));
            if (res.meta.requestStatus === "fulfilled") {
                const shift = res.payload.data;
                setValue("employee", []);
                // Ánh xạ vai trò
                const roleMap = {
                    0: "Quản lý",
                    1: "Nhân viên",
                    2: "Nhân viên Chăm sóc khách hàng",
                    default: "Nhân viên",
                };

                // Chuẩn bị dữ liệu nhân viên
                const employees = shift.staffs.map((employee) => ({
                    value: employee.id,
                    label: (
                        <>
                            <Tag color="blue">
                                <UserOutlined /> {employee.name}
                            </Tag>
                            <Tag color="green">
                                {roleMap[employee.role] || roleMap.default}
                            </Tag>
                        </>
                    ),
                }));
                setUserOptions(employees);
                setValue("shift", value);
                setValue(
                    "employee",
                    employees.map((employee) => employee.value)
                );
            } else {
                console.warn("Failed to fetch shift data:", res);
            }
        } catch (error) {
            console.error("Error in HandleShiftChange:", error);
        }
    };
    useEffect(() => {
        if (getValues("shift")) {
            HandleShiftChange(getValues("shift"));
        }
    }, [getValues("shift")]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: idAppointment,
                services: selectedServices.map((service) => ({
                    service_id: service.key,
                    quantity: service.quantity,
                })),
                users: data.employee.map((user) => ({
                    staff_id: user,
                })),
                status: 2,
                note: data.note,
            };
            const res = await updateappointments(payload);
            console.log("res", res);

            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm lịch hẹn thành công",
                    description: `Lịch hẹn cho ${data.customer_id} đã được thêm`,
                });
                // reset all
                setSelectedServices([]);
                setValue("customer_id", null);
                setValue("appointment_date", null);
                setValue("service", null);
                setValue("shift", null);
                setValue("employee", null);
                setValue("note", null);
            } else {
                const errorMessage = (
                    <div>
                        <span>{res.payload?.message}</span>
                        <br />
                        <span>{res.payload.errors}</span>
                    </div>
                );

                api.error({
                    message: "Thêm lịch hẹn thất bại",
                    duration: 5,
                    description: errorMessage,
                });
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };
    useEffect(() => {
        //set service form data
        if (appointments.appointment.data) {
            const services = appointments.appointment.data.services.map(
                (service) => ({
                    key: service.id,
                    name: service.name,
                    quantity: service.quantity,
                })
            );

            setSelectedServices(services);
        }
    }, [appointments.appointment.data]);
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
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
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
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <Button
                    danger
                    onClick={() =>
                        setSelectedServices((prevServices) =>
                            prevServices.filter(
                                (service) => service.key !== record.key
                            )
                        )
                    }
                >
                    Xóa
                </Button>
            ),
        },
    ];
    async function fetchUserList(username) {
        console.log("fetching user", username);
    }

    return (
        <Card title="Thêm lịch hẹn">
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Họ và tên" required>
                            <Controller
                                name="full_name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled
                                           size="large"
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
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        size="large"
                                        disabled
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
                                        size="large"
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
                                        size="large"
                                        placeholder="Thời gian dự kiến"
                                        disabled
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ca làm việc" required>
                            <Controller
                                name="shift"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ca làm việc",
                                }}
                                render={({ field }) => (
                                    <Select
                                    size="large"
                                        {...field}
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn ca làm việc"
                                        options={shiftsOptions}
                                        onChange={(value) =>
                                            HandleShiftChange(value)
                                        }
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
                                        loading={shifts.loading}
                                        {...field}
                                        mode="multiple"
                                        size="large"
                                        allowClear
                                        value={selectedServices.map(
                                            (service) => service.key
                                        )}
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
                                    size="large"
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
                        scroll={{ y: 300 }}
                        columns={columns}
                        dataSource={selectedServices}
                        pagination={false}
                        style={{ marginTop: "20px" }}
                        rowKey="key"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Appointment_Edit;
