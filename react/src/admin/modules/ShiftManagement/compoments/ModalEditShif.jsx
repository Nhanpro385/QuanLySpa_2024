import React, { useEffect } from "react";
import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    Button,
    TimePicker,
    Switch,
    notification,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import "dayjs/locale/vi";
import dayjs from "dayjs";
const { TextArea } = Input;

function ModalAddShiftEdit({
    isModalOpen,
    handleOk,
    handleCancel,
    data,
    loading,
    handleEditSubmit,
    error,
}) {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: data,
    });
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        if (data) {
            // Ensure date and time fields are converted to dayjs objects
            setValue(
                "shift_date",
                data.shift_date ? dayjs(data.shift_date) : null
            );
            setValue(
                "start_time",
                data.start_time ? dayjs(data.start_time, "HH:mm") : null
            );
            setValue(
                "end_time",
                data.end_time ? dayjs(data.end_time, "HH:mm") : null
            );
            setValue("max_customers", data.max_customers);
            setValue("status", data.status);
            setValue("note", data.note);
        }
    }, [data, setValue]);
    useEffect(() => {
        if (error) {
            if (
                [
                    "shift_date",
                    "start_time",
                    "end_time",
                    "max_customers",
                ].includes(key)
            ) {
                setError(key, {
                    type: "manual",
                    message: error[key][0],
                });
            } else {
                api.error({
                    message: "Có lỗi xảy ra",
                    description: error[key][0],
                    duration: 3,
                });
            }
        }
    }, [error]);

    const handleFinish = (values) => {
        const payload = {
            id: data.id,
            shift_date: values.shift_date.format("YYYY-MM-DD"),
            start_time: values.start_time.format("HH:mm:ss"),
            end_time: values.end_time.format("HH:mm:ss"),
            max_customers: values.max_customers,
            note: "Cập nhật ca sáng",
            status: values.status
        };

        handleEditSubmit(payload);
    };

    return (
        <Modal
            title="Chỉnh Sửa Ca Làm"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(handleFinish)}
                >
                    Lưu
                </Button>,
            ]}
        >
            {contextHolder}
            <Form layout="vertical" onFinish={handleSubmit(handleFinish)}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Chọn ngày"
                            validateStatus={errors.shift_date ? "error" : ""}
                            help={errors.shift_date?.message}
                        >
                            <Controller
                                name="shift_date"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày!",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        style={{ width: "100%" }}
                                        format={"DD/MM/YYYY"}
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thời Gian Bắt Đầu"
                            validateStatus={errors.start_time ? "error" : ""}
                            help={errors.start_time?.message}
                        >
                            <Controller
                                name="start_time"
                                control={control}
                                rules={{
                                    required:
                                        "Vui lòng chọn thời gian bắt đầu!",
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        style={{ width: "100%" }}
                                        onChange={(time) =>
                                            field.onChange(time)
                                        }
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Thời Gian Kết Thúc"
                            validateStatus={errors.end_time ? "error" : ""}
                            help={errors.end_time?.message}
                        >
                            <Controller
                                name="end_time"
                                control={control}
                                rules={{
                                    required:
                                        "Vui lòng chọn thời gian kết thúc!",
                                }}
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        style={{ width: "100%" }}
                                        onChange={(time) =>
                                            field.onChange(time)
                                        }
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Tối đa khách hàng"
                            validateStatus={errors.max_customers ? "error" : ""}
                            help={errors.max_customers?.message}
                        >
                            <Controller
                                name="max_customers"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập số  khách hàng!",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Nhập số  khách hàng"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Trạng thái">
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        {...field}
                                        onChange={(checked) =>
                                            field.onChange(checked)
                                        }
                                        checkedChildren="Hoạt động"
                                        unCheckedChildren="Không hoạt động"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Ghi chú">
                            <Controller
                                name="note"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        {...field}
                                        rows={4}
                                        placeholder="Ghi chú về ca làm (nếu có)"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalAddShiftEdit;
