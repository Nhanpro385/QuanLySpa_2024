import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Card,
    Select,
    Upload,
    Spin,
    notification,
    Tag,
} from "antd";
import {
    CarryOutOutlined,
    PhoneOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../utils";
import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import useStreatmentsAction from "../../modules/streatment/hooks/useStreatmentsAction";
import { set } from "lodash";

const StreatmentsAdd = () => {
    const [api, contextHolder] = notification.useNotification();
    const [fileList, setFileList] = useState([]);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [appointmentData, setAppointmentData] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 50,
        status: 3,
    });
    useEffect(() => {
        document.title = "Thêm lịch sử trị liệu";
    }, []);
    const { getappointmentsByStatus, searchappointmentsByStatus } =
        useappointmentsActions();
    const { addStreatment } = useStreatmentsAction();

    const appointments = useSelector((state) => state.appointments);
    const streatments = useSelector((state) => state.streatments);

    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        shouldFocusError: false, // Không tự động focus trường lỗi
    });

    useEffect(() => {
        getappointmentsByStatus({ status: 3, per_page: 50 });
    }, []);

    useEffect(() => {
        if (!appointments.loading) {
            setAppointmentsData(appointments.appointments?.data || []);
            setAppointmentData(appointments.appointment || {});
            console.log(appointments);
        }
    }, [appointments]);

    const handleAppointmentChange = debounce((value) => {
        const appointment = appointmentsData.find((a) => a.id === value);
        if (appointment) setAppointmentData(appointment);
    }, 500);

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: generateSnowflakeId(),
                appointment_id: data.appointment_id,
                customer_id: appointmentData?.customer?.id,
                staff_id: appointmentData?.users?.[0]?.id,
                feedback: data.feedback,
                image_before: data.image_url?.[0]?.originFileObj,
                image_after: data.image_url?.[1]?.originFileObj,
                status: 1,
            };

            const formData = new FormData();
            Object.keys(payload).forEach((key) =>
                formData.append(key, payload[key])
            );

            const response = await addStreatment(formData);
            console.log("response", response);

            if (response.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm lịch sử trị liệu thành công",
                    description: response.payload.message,
                    duration: 3,
                });
                setFileList([]);
                reset();
            } else {
                api.error({
                    message: "Thêm lịch sử trị liệu thất bại",
                    description: response.payload.message,
                    duration: 3,
                });

                Object.keys(response.payload.errors).forEach((key) => {
                    if (
                        [
                            "appointment_id",
                            "feedback",
                            "image_url",
                            "status",
                            "customer_id",
                            "staff_id",
                            "image_before",
                            "image_after",
                            "id",
                        ].includes(key)
                    ) {
                        setError(key, {
                            type: "manual",
                            message: response.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: response.payload.errors[key][0],
                            duration: 3,
                        });
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderSelectOptions = (data, renderOption) =>
        data?.length > 0
            ? data.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                      {renderOption(item)}
                  </Select.Option>
              ))
            : null;

    const OnSearch = debounce((value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    }, 500);
    useEffect(() => {
        if (searchQuery.search) {
            searchappointmentsByStatus(searchQuery);
        } else {
            getappointmentsByStatus({ status: 3, per_page: 50 });
        }
    }, [searchQuery]);
    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {contextHolder}
            <h1>Thêm lịch sử trị liệu</h1>
            <Row gutter={16}>
                <Col span={15}>
                    <Card title="Thông tin chi tiết">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Controller
                                    name="appointment_id"
                                    control={control}
                                    rules={{
                                        required: "Vui lòng chọn lịch hẹn",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Lịch hẹn"
                                            validateStatus={
                                                errors.appointment_id && "error"
                                            }
                                            help={
                                                errors.appointment_id?.message
                                            }
                                        >
                                            <Select
                                                {...field}
                                                showSearch
                                                placeholder="Chọn lịch hẹn hoặc tìm kiếm"
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    handleAppointmentChange(
                                                        value
                                                    );
                                                }}
                                                filterOption={false}
                                                onSearch={OnSearch}
                                                notFoundContent={
                                                    <Spin size="small" />
                                                }
                                            >
                                                {renderSelectOptions(
                                                    appointmentsData,
                                                    (a) => (
                                                        <>
                                                            <Tag color="blue">
                                                                <CarryOutOutlined />
                                                                {"  "}
                                                                {
                                                                    a.appointment_date
                                                                }
                                                            </Tag>
                                                            <Tag color="green">
                                                                <UserOutlined />
                                                                {"  "}
                                                                {
                                                                    a.customer
                                                                        ?.full_name
                                                                }
                                                            </Tag>
                                                            <Tag color="red">
                                                                <PhoneOutlined />
                                                                {"  "}
                                                                {
                                                                    a.customer
                                                                        ?.phone
                                                                }
                                                            </Tag>
                                                        </>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <Controller
                                    name="customer_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Item label="Khách hàng">
                                            <Input
                                                {...field}
                                                value={
                                                    appointmentData?.customer
                                                        ?.full_name
                                                }
                                                disabled
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <Controller
                                    name="staff_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Nhân viên"
                                            validateStatus={
                                                errors.staff_id && "error"
                                            }
                                            help={errors.staff_id?.message}
                                        >
                                            <Input
                                                {...field}
                                                value={
                                                    appointmentData?.users?.[0]
                                                        ?.full_name
                                                }
                                                disabled
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={24}>
                                <Controller
                                    name="feedback"
                                    control={control}
                                    rules={{
                                        required:
                                            "Vui lòng nhập đánh giá của khách hàng",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Phản hồi của khách hàng"
                                            validateStatus={
                                                errors.feedback && "error"
                                            }
                                            help={errors.feedback?.message}
                                        >
                                            <Input.TextArea
                                                {...field}
                                                placeholder="Phản hồi của khách hàng"
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Thêm mới
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card title="Hình ảnh sản phẩm">
                        <span className="mb-2">
                            * Vui lòng chọn 2 ảnh (trước và sau).
                        </span>
                        <Form.Item
                            label="Hình ảnh sản phẩm"
                            validateStatus={errors.image_url && "error"}
                            help={errors.image_url?.message}
                        >
                            <Controller
                                name="image_url"
                                control={control}
                                rules={{
                                    validate: {
                                        required: (value) =>
                                            (value && value.length === 2) ||
                                            "Vui lòng chọn 2 ảnh (trước và sau).",
                                    },
                                }}
                                render={({ field }) => (
                                    <Upload
                                        {...field}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={({ fileList }) => {
                                            setFileList(fileList);
                                            field.onChange(fileList);
                                        }}
                                        beforeUpload={() => false}
                                        maxCount={2}
                                    >
                                        {fileList.length < 2 && (
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Tải ảnh lên
                                                </div>
                                            </div>
                                        )}
                                    </Upload>
                                )}
                            />
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default StreatmentsAdd;
