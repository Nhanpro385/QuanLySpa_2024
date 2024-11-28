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
    notification,
    Tag,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import "dayjs/locale/vi";
import debounce from "lodash/debounce";

import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import useUsersActions from "../../modules/staffManagement/hooks/useUserAction";
import useServicesActions from "../../modules/services/hooks/useServices";
import useShiftAction from "../../modules/ShiftManagement/hooks/useShiftAction";
import useCustomerActions from "../../modules/Customer/hooks/useCustomerActions";
import { generateSnowflakeId, formatDate, formatTime } from "../../utils";
import {
    ClockCircleOutlined,
    ContactsOutlined,
    UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Appointment_Add = () => {
    const [api, contextHolder] = notification.useNotification();
    const { getservices, searchservices } = useServicesActions();
    const { getusers } = useUsersActions();
    const { getshifts, getshiftsById, searchshifts } = useShiftAction();
    const { addappointments } = useappointmentsActions();
    const { getCustomer } = useCustomerActions();
    const service = useSelector((state) => state.services);
    const users = useSelector((state) => state.user);
    const shifts = useSelector((state) => state.shifts);
    const customer = useSelector((state) => state.customers);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [shiftsOptions, setShiftsOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [searchService, setSearchService] = useState({
        search: "",
        per_page: 50,
        page: 1,
    });
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const [searchShift, setSearchShift] = useState({
        search: "",
        per_page: 50,
        page: 1,
        status: 1,
    });
    useEffect(() => {
        getservices(50);
        getusers(50);
        getshifts(50);
        getCustomer(50);
    }, []);
    useEffect(() => {
        if (service.loading === false && service.services) {
            setServiceOptions(
                service.services.data.map((service) => ({
                    value: service.id,
                    label: service.name,
                }))
            );
        }
    }, [service.services]);

    useEffect(() => {
        if (customer.loading === false && customer.customers) {
            setCustomerOptions(
                customer.customers.data.map((customer) => ({
                    value: customer.id,
                    label: customer.full_name,
                }))
            );
        }
    }, [customer.customers]);

    useEffect(() => {
        if (!shifts.loading && shifts.shifts.data) {
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
                            <Tag
                                color={
                                    shift.staffs?.length > 0 ? "green" : "red"
                                }
                            >
                                <UserOutlined /> {shift.staffs.length} nhân viên
                            </Tag>
                        </>
                    ),
                }))
            );
        }
    }, [shifts.shifts]);
    useEffect(() => {
        if (searchService.search) {
            searchservices(searchService);
        } else {
            getservices(50);
        }
    }, [searchService]);
    useEffect(() => {
        if (searchShift.search) {
            searchshifts(searchShift);
        } else {
            getshifts(50);
        }
    }, [searchShift]);
    const [selectedServices, setSelectedServices] = useState([]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: generateSnowflakeId(),
                shift_id: data.shift,
                customer_id: data.customer_id,
                start_time: formatTime(data.appointment_date),
                appointment_date: formatDate(data.appointment_date),
                note: data.note || "đã note",
                users: data.employee.map((employee) => ({
                    staff_id: employee,
                })),
                services: selectedServices.map((service) => ({
                    service_id: service.key,
                    quantity: service.quantity,
                })),
                status: 1,
            };

            const res = await addappointments(payload);
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
                const errorMessage =
                    res.payload?.message + res.payload.errors ||
                    "Lỗi không xác định";
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
        setValue;
    };

    const handleQuantityChange = (value, key) => {
        setSelectedServices((prevServices) =>
            prevServices.map((service) =>
                service.key === key ? { ...service, quantity: value } : service
            )
        );
    };

    const HandleShiftChange = async (value) => {
        try {
            const res = await getshiftsById(value);
            if (res.meta.requestStatus === "fulfilled") {
                const shift = res.payload.data;
                const { shift_date } = shift;
                setValue("appointment_date", dayjs(shift_date));
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
                console.log(res.payload.data.staffs);
            } else {
                console.warn("Failed to fetch shift data:", res);
            }
        } catch (error) {
            console.error("Error in HandleShiftChange:", error);
        }
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
    const HandleServiceChange = debounce((value) => {
        setSearchService({ ...searchService, search: value });
    }, 300);

    const OnsearchShift = debounce((value) => {
        setSearchShift({ ...searchShift, search: value });
    }, 300);
    const handleChangeDate = (value) => {
        if (value === null) {
            setValue("appointment_date", null);
            setSearchShift({
                ...searchShift,
                search: "",
            });
        } else {
            setValue("appointment_date", value);
            setSearchShift({
                ...searchShift,
                search: value.format("YYYY-MM-DD"),
            });
        }
    };

    return (
        <Card title="Thêm lịch hẹn">
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item label="Họ và tên" required>
                            <Controller
                                name="customer_id"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên khách hàng",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        allowClear
                                        showSearch
                                        placeholder="Chọn khách hàng"
                                        options={customerOptions}
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
                        <Form.Item label="ngày hẹn" required>
                            <Controller
                                name="appointment_date"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày hẹn",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        showTime={{ format: "HH:mm" }}
                                        {...field}
                                        className="w-100"
                                        onChange={(value) => {
                                            handleChangeDate(value);
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
                                        filterOption={(input, option) => {
                                            const optionLabel =
                                                option?.label?.toLowerCase() ||
                                                "";
                                            return optionLabel.includes(
                                                input.toLowerCase()
                                            );
                                        }}
                                        showSearch
                                        onSearch={(value) => {
                                            HandleServiceChange(value);
                                        }}
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
                                        {...field}
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn ca làm việc"
                                        options={shiftsOptions}
                                        showSearch
                                        onChange={(value) => {
                                            field.onChange(value); // Cập nhật giá trị vào React Hook Form
                                            HandleShiftChange(value);
                                        }}
                                        onSearch={OnsearchShift}
                                        onClear={() => {
                                            field.onChange(null); // Xóa giá trị của field
                                            setValue("shift", null); // Xóa giá trị trong React Hook Form
                                            setValue("employee", []); // Reset các trường khác nếu cần
                                            setValue("appointment_date", null);
                                            setSearchShift({
                                                ...searchShift,
                                                search: "",
                                            });
                                        }}
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

export default Appointment_Add;
