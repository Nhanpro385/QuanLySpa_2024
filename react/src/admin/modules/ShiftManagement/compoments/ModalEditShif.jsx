import React, { useEffect, useState } from "react";
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
    Radio,
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
    const [selectedShiftTime, setSelectedShiftTime] = useState({
        start_time: "08:00:00",
        end_time: "12:00:00",
    });

    const initialShiftTime = [
        {
            label: "Ca sáng",
            value: {
                start_time: "08:00:00",
                end_time: "12:00:00",
            },
        },
        {
            label: "Ca chiều",
            value: {
                start_time: "13:00:00",
                end_time: "17:00:00",
            },
        },
    ];

    useEffect(() => {
        if (data) {
            setValue(
                "shift_date",
                data.shift_date ? dayjs(data.shift_date) : null
            );
            setSelectedShiftTime({
                start_time: data.start_time,
                end_time: data.end_time,
            });

            setValue("max_customers", data.max_customers);
            setValue("status", data.status);
            setValue("note", data.note);
        }
    }, [data, setValue]);

    useEffect(() => {
        if (error && typeof error === "object") {
            Object.keys(error).forEach((key) => {
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
                }
            });
        }
    }, [error]);

    const handleFinish = (values) => {
        const payload = {
            id: data.id,
            shift_date: values.shift_date.format("YYYY-MM-DD"),
            start_time: values.start_time,
            end_time: values.end_time,
            max_customers: values.max_customers,
            note: values.note || "Cập nhật ca làm",
            status: values.status,
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
                    loading={loading}
                    onClick={handleSubmit(handleFinish)}
                >
                    Lưu
                </Button>,
            ]}
        >
            {contextHolder}
            <Form layout="vertical">
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
                                rules={{ required: "Vui lòng chọn ngày!" }}
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
                            label="Ca làm"
                            validateStatus={errors.start_time ? "error" : ""}
                            help={errors.start_time?.message}
                        >
                            <Controller
                                name="start_time"
                                control={control}
                                rules={{ required: "Vui lòng chọn ca làm!" }}
                                render={({ field }) => (
                                    <>
                                        <Radio.Group
                                            block
                                            onChange={(e) => {
                                                const selectedShift =
                                                    initialShiftTime.find(
                                                        (item) =>
                                                            item.label ===
                                                            e.target.value
                                                    );
                                                setSelectedShiftTime(
                                                    selectedShift?.value
                                                );
                                                setValue(
                                                    "start_time",
                                                    selectedShift?.value.start_time
                                                );
                                                setValue(
                                                    "end_time",
                                                    selectedShift?.value.end_time
                                                );
                                                field.onChange(
                                                    selectedShift?.value
                                                        .start_time
                                                );
                                            }}
                                            value={
                                                initialShiftTime.find(
                                                    (item) =>
                                                        item.value
                                                            .start_time ===
                                                            selectedShiftTime.start_time &&
                                                        item.value.end_time ===
                                                            selectedShiftTime.end_time
                                                )?.label
                                            }
                                            optionType="button"
                                        >
                                            {initialShiftTime.map((item) => (
                                                <Radio.Button
                                                    key={item.label}
                                                    value={item.label}
                                                >
                                                    {item.label}
                                                </Radio.Button>
                                            ))}
                                        </Radio.Group>

                                        <div
                                            style={{
                                                marginTop: "8px",
                                                color: "gray",
                                            }}
                                        >
                                            Thời gian:{" "}
                                            {selectedShiftTime.start_time} -{" "}
                                            {selectedShiftTime.end_time}
                                        </div>
                                    </>
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
                                    required: "Vui lòng nhập số khách hàng!",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Nhập số khách hàng"
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
                                        checked={field.value}
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
