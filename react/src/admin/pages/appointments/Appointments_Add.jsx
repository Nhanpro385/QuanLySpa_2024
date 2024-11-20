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
import debounce from "lodash/debounce";

// import useCustomerActions from "../../Customer/hooks/useCustomerActions";
import useUsersActions from "../../modules/staffManagement/hooks/useUserAction";
import useServicesActions from "../../modules/services/hooks/useServices";
import useShiftAction from "../../modules/ShiftManagement/hooks/useShiftAction";
import { generateSnowflakeId } from "../../utils";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Appointment_Add = () => {
    const { getservices } = useServicesActions();
    const { getusers } = useUsersActions();
    const { getshifts } = useShiftAction();
    const service = useSelector((state) => state.services);
    const users = useSelector((state) => state.user);
    const shifts = useSelector((state) => state.shifts);
console.log("shifts", shifts);

    useEffect(() => {
        getservices(50);
        getusers(50);
        getshifts();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selectedServices, setSelectedServices] = useState([]);
    const [value, setValue] = useState([]);

    const userOptions =
        users.users.data.map((user) => ({
            label: user.full_name,
            value: user.id,
        })) || [];

    const serviceOptions =
        service.services.data.map((service) => ({
            label: service.name,
            value: service.id,
        })) || [];
    const { data: shiftsData } = shifts.shifts.data || [];
    console.log("shiftsData", shiftsData);

    const shiftsOptions =
        (shiftsData &&
            shiftsData.map((shift) => ({
                label: `${shift.shift_date} (${shift.start_time} - ${shift.end_time})`,
                value: shift.id,
            }))) ||
        [];

    const onSubmit = (data) => {
        const payload = {
            id: generateSnowflakeId(),
            shift_id: data.shift,
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
                                name="fullname"
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
                                    <RangePicker {...field} className="w-100" />
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

export default Appointment_Add;
