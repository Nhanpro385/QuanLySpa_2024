import React, { useMemo, useRef, useState, useEffect } from "react";

import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    Select,
    DatePicker,
    Button,
    Table,
    InputNumber,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import "dayjs/locale/vi";
import debounce from "lodash/debounce";

import useCustomerActions from "../../Customer/hooks/useCustomerActions";
import useUsersActions from "../../staffManagement/hooks/useUserAction";
import { generateSnowflakeId } from "../../../utils/snowflakeID";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const serviceOptions = [
    { label: "Dịch vụ 1", value: "a10", key: "a10" },
    { label: "Dịch vụ 2", value: "a11", key: "a11" },
];

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 800,
    defauldOptions,
    ...props
}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState(defauldOptions);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            if (value === "") {
                setOptions(defauldOptions);
                setFetching(false);
                return;
            }
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

function ModalAppointment({ isModalOpen, handleOk, handleCancel }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { getCustomer } = useCustomerActions();
    const { getusers, searchusers } = useUsersActions();
    const { customers } = useSelector((state) => state.customers);
    const { users } = useSelector((state) => state.user);

    const [selectedServices, setSelectedServices] = useState([]);
    const [value, setValue] = useState([]);
    useEffect(() => {
        getCustomer();
        getusers();
    }, [isModalOpen]);

    const userOptions = users.data.map((user) => ({
        label: `${user.full_name} - ${user.role}`,
        value: user.id,
    }));

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
        <Modal
            title="Thêm lịch hẹn"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={1200}
        >
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
                                        options={[
                                            { label: "Ca 1", value: "a10" },
                                            { label: "Ca 2", value: "a11" },
                                        ]}
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
                                    // <Select
                                    //     {...field}
                                    //     mode="multiple"
                                    //     allowClear
                                    //     style={{ width: "100%" }}
                                    //     placeholder="Chọn nhân viên"
                                    //     options={userOptions}
                                    // />
                                    <DebounceSelect
                                        mode="multiple"
                                        value={value}
                                        placeholder="Select users"
                                        fetchOptions={fetchUserList}
                                        defauldOptions={userOptions}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        style={{
                                            width: "100%",
                                        }}
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
        </Modal>
    );
}

export default ModalAppointment;
