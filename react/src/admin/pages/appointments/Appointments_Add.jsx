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
    Divider,
    Space,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import "dayjs/locale/vi";
import debounce from "lodash/debounce";

import { PhoneFilled, PhoneOutlined, PlusOutlined } from "@ant-design/icons";

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

const Appointment_Add = () => {
    useEffect(() => {
        document.title = "Thêm lịch hẹn";
    }, []);
    const inputRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const { getservices, searchservices } = useServicesActions();

    const { getshifts, getshiftsById, searchshifts } = useShiftAction();
    const { addappointments } = useappointmentsActions();
    const { getCustomer, searchCustomer, addCustomer } = useCustomerActions();
    const service = useSelector((state) => state.services);

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
    const [searchCustomerQuery, setSearchCustomerQuery] = useState({
        search: "",
        page: 1,
        per_page: 50,
    });
    const [searchShift, setSearchShift] = useState({
        search: "",
        per_page: 50,
        page: 1,
        status: 1,
    });
    const [nameCustomer, setNameCustomer] = useState("");
    const [PhoneCustomer, setPhoneCustomer] = useState("");
    const [emailCustomer, setEmailCustomer] = useState("");

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getservices(50);

        getshifts(50);
        getCustomer(50);
    }, []);
    useEffect(() => {
        if (service.loading === false && service.services) {
            setServiceOptions(
                service.services.data.map((service) => ({
                    value: service.id,
                    name: service.name,
                    price: service.price,
                    label: (
                        <Space>
                            <Tag color="blue">{service.name}</Tag>
                            <Tag color="green">
                                {parseInt(service.price).toLocaleString()} VNĐ
                            </Tag>
                        </Space>
                    ),
                }))
            );
        }
    }, [service.services]);

    useEffect(() => {
        if (customer.loading === false && customer.customers) {
            setCustomerOptions(
                customer.customers.data.map((customer) => ({
                    value: customer.id,
                    label: (
                        <>
                            <Tag color="blue">
                                <UserOutlined /> {customer.full_name}
                            </Tag>
                            <Tag color="green">
                                <PhoneOutlined /> {customer.phone}
                            </Tag>
                        </>
                    ),
                }))
            );
        }
    }, [customer.customers]);

    useEffect(() => {
        if (!shifts?.loading && shifts?.shifts?.data) {
            setShiftsOptions(
                shifts?.shifts?.data.map((shift) => ({
                    value: shift.id,
                    label: (
                        <>
                            <Tag color="blue">
                                <ContactsOutlined /> {shift?.shift_date}
                            </Tag>

                            <Tag color="green">
                                <ClockCircleOutlined /> {shift?.start_time}
                            </Tag>

                            <Tag color="red">
                                <ClockCircleOutlined /> {shift?.end_time}
                            </Tag>
                            <Tag
                                color={
                                    shift?.staffs?.length > 0 ? "green" : "red"
                                }
                            >
                                <UserOutlined /> {shift?.staffs?.length} nhân
                                viên
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
                users: data.users.map((users) => ({
                    staff_id: users,
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
                setValue("users", null);
                setValue("note", null);
            } else {
                if (res.payload?.errors && res.payload.errors.length > 0) {
                    console.log("res.payload.errors", res.payload.errors);
                    Object.keys(res.payload.errors).forEach((key) => {
                        if (
                            [
                                "customer_id",
                                "appointment_date",
                                "shift",
                                "users",
                                "services",
                            ].includes(key)
                        ) {
                            setError(key, {
                                type: "manual",
                                message: res.payload.errors[key][0],
                            });
                        } else {
                            api.error({
                                message: "Có lỗi xảy ra",
                                description: res.payload.errors[key][0],
                                duration: 3,
                            });
                        }
                    });
                    return;
                } else {
                    api.error({
                        message: "Thêm lịch hẹn thất bại",
                        duration: 5,
                        description: res.payload.error || res.payload.message,
                    });
                    return;
                }
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
                        ?.name,
                    quantity: 1,
                    price: parseInt(
                        serviceOptions.find((opt) => opt.value === service)
                            ?.price
                    ).toLocaleString(),
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
                // setValue("appointment_date", dayjs(shift_date));
                setValue("users", []);
                // Ánh xạ vai trò
                const roleMap = {
                    0: "Quản lý",
                    1: "Nhân viên",
                    2: "Nhân viên Chăm sóc khách hàng",
                    default: "Nhân viên",
                };

                // Chuẩn bị dữ liệu nhân viên
                const users = shift.staffs.map((users) => ({
                    value: users.id,
                    label: (
                        <>
                            <Tag color="blue">
                                <UserOutlined /> {users.name}
                            </Tag>
                            <Tag color="green">
                                {roleMap[users.role] || roleMap.default}
                            </Tag>
                        </>
                    ),
                }));
                setUserOptions(users);
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
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        { title: "Dịch vụ", dataIndex: "name", key: "name" },
        {
            title: "Giá",
            dataIndex: "price",
        },
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

    const HandleServiceChange = debounce((value) => {
        setSearchService({ ...searchService, search: value });
    }, 300);

    const OnsearchShift = debounce((value) => {
        setSearchShift({ ...searchShift, search: value });
    }, 300);
    const onSearchCustomer = debounce((value) => {
        setSearchCustomerQuery({ ...searchCustomerQuery, search: value });
    }, 300);

    useEffect(() => {
        if (searchCustomerQuery.search !== "") {
            searchCustomer(searchCustomerQuery);
        } else {
            getCustomer(50);
        }
    }, [searchCustomerQuery]);

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
    // -------------------add item-------------------
    const onNameChange = (event) => {
        setNameCustomer(event.target.value);
    };
    const onPhoneChange = (event) => {
        setPhoneCustomer(event.target.value);
    };
    const onEmailChange = (event) => {
        setEmailCustomer(event.target.value);
    };

    const addItem = async (e) => {
        try {
            // Validate input fields
            const validateFields = () => {
                if (!nameCustomer || !PhoneCustomer || !emailCustomer) {
                    api.error({
                        message: "Vui lòng nhập đầy đủ thông tin.",
                        duration: 5,
                    });
                    return false;
                }

                // Simple email validation
                const emailPattern =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailPattern.test(emailCustomer)) {
                    api.error({
                        message: "Vui lòng nhập email hợp lệ.",
                        duration: 5,
                    });
                    return false;
                }

                // Simple phone number validation (Vietnamese phone number format)
                const phonePattern = /^0[3|5|7|8|9][0-9]{8,9}$/;
                if (!phonePattern.test(PhoneCustomer)) {
                    api.error({
                        message: "Vui lòng nhập số điện thoại hợp lệ.",
                        duration: 5,
                    });
                    return false;
                }

                return true;
            };

            // Check if the fields are valid
            if (!validateFields()) return; // If validation fails, exit early

            // Payload to be sent
            const payload = {
                id: generateSnowflakeId(),
                full_name: nameCustomer,
                email: emailCustomer,
                phone: PhoneCustomer, // Ensure variable matches the one you're using
                gender: 2,
                address: "Chưa cập nhật",
                date_of_birth: "1999-01-01",
                status: true,
            };

            // Call the API to add the customer
            const res = await addCustomer(payload);
            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm khách hàng mới thành công.",
                    duration: 5,
                });
                // Reset the form after success
                setNameCustomer("");
                setPhoneCustomer("");
                setEmailCustomer("");
                setValue("customer_id", res.payload.data.id);
                setCustomerOptions([
                    ...customerOptions,
                    {
                        value: res.payload.data.id,
                        label: (
                            <>
                                <Tag color="blue">
                                    <UserOutlined />{" "}
                                    {res.payload?.data?.full_name}
                                </Tag>
                                <Tag color="green">
                                    <PhoneOutlined /> {res.payload?.data?.phone}
                                </Tag>
                            </>
                        ),
                    },
                ]);
            } else {
                Object.keys(res.payload.errors).forEach((key) => {
                    api.error({
                        message: "Có lỗi xảy ra khi thêm khách hàng mới.",
                        duration: 5,
                        description: res.payload.errors[key][0],
                    });
                });
            }
        } catch (error) {
            api.error({
                message: "Có lỗi xảy ra khi thêm khách hàng mới.",
                duration: 5,
            });
            console.error("Error adding customer:", error);
        }
    };

    return (
        <Card title="Thêm lịch hẹn">
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Họ và tên" required>
                            <Controller
                                name="customer_id"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập tên khách hàng",
                                }}
                                render={({ field }) => (
                                    <Select
                                        size="large"
                                        {...field}
                                        loading={customer.loading}
                                        allowClear
                                        showSearch
                                        placeholder="Chọn khách hàng"
                                        options={customerOptions}
                                        onSearch={onSearchCustomer}
                                        filterOption={false}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider
                                                    style={{
                                                        margin: "8px 0",
                                                    }}
                                                />
                                                <Row
                                                    gutter={[8, 8]}
                                                    style={{
                                                        padding: "8px",
                                                    }}
                                                >
                                                    <Col
                                                        xxl={24}
                                                        xl={8}
                                                        lg={8}
                                                        md={24}
                                                        sm={24}
                                                        xs={24}
                                                    >
                                                        <Input
                                                            allowClear
                                                            placeholder="Nhập tên khách hàng"
                                                            ref={inputRef}
                                                            value={nameCustomer}
                                                            onChange={
                                                                onNameChange
                                                            }
                                                            onKeyDown={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        xxl={8}
                                                        xl={8}
                                                        lg={8}
                                                        md={24}
                                                        sm={24}
                                                        xs={24}
                                                    >
                                                        <Input
                                                            allowClear
                                                            placeholder="Nhập Số điện thoại"
                                                            ref={inputRef}
                                                            value={
                                                                PhoneCustomer
                                                            }
                                                            onChange={
                                                                onPhoneChange
                                                            }
                                                            onKeyDown={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </Col>
                                                    <Col
                                                        xxl={8}
                                                        xl={8}
                                                        lg={8}
                                                        md={24}
                                                        sm={24}
                                                        xs={24}
                                                    >
                                                        <Input
                                                            allowClear
                                                            type="email"
                                                            placeholder="Nhập Email"
                                                            ref={inputRef}
                                                            value={
                                                                emailCustomer
                                                            }
                                                            onChange={
                                                                onEmailChange
                                                            }
                                                            onKeyDown={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </Col>
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={addItem}
                                                    >
                                                        Thêm nhanh khách hàng
                                                    </Button>
                                                </Row>
                                            </>
                                        )}
                                    />
                                )}
                            />
                            {errors.customer_id && (
                                <p style={{ color: "red" }}>
                                    {errors.customer_id.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Ngày hẹn" required>
                            <Controller
                                name="appointment_date"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày hẹn",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        size="large"
                                        showTime={{ format: "HH:mm" }}
                                        {...field}
                                        needConfirm={false}
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
                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Ca làm việc" required>
                            <Controller
                                name="shift"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ca làm việc",
                                }}
                                render={({ field }) => (
                                    <Select
                                        loading={shifts.loading}
                                        size="large"
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
                                        filterOption={false}
                                        onSearch={OnsearchShift}
                                        onClear={() => {
                                            field.onChange(null); // Xóa giá trị của field
                                            setValue("shift", null); // Xóa giá trị trong React Hook Form
                                            setValue("users", []); // Reset các trường khác nếu cần
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
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Dịch vụ" required>
                            <Controller
                                name="service"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        loading={service.loading}
                                        allowClear
                                        value={selectedServices.map(
                                            (service) => service.key
                                        )}
                                        size="large"
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

                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item label="Chọn nhân viên" required>
                            <Controller
                                name="users"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn nhân viên",
                                }}
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
                            {errors.users && (
                                <p style={{ color: "red" }}>
                                    {errors.users.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
