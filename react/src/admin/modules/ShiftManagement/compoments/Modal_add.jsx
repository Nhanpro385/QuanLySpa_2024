import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    Switch,
    Button,
    Radio,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import "dayjs/locale/vi";
import dayjs from "dayjs";

const { TextArea } = Input;

function ModalAddShift({
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddShift,
    error,
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const [selectedShiftTime, setSelectedShiftTime] = useState({
        start_time: "8:00:00",
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
        if (error?.errors) {
            Object.keys(error.errors).forEach((key) => {
                if (
                    [
                        "shift_date",
                        "start_time",
                        "max_customers",
                        "status",
                        "note",
                    ].includes(key)
                ) {
                    setError(key, {
                        type: "manual",
                        message: error.errors[key][0],
                    });
                } else {
                    console.warn(
                        `Unhandled error for key '${key}': ${error.errors[key][0]}`
                    );
                }
            });
        }
    }, [error]);

    const onSubmit = (data) => {
        console.log("Data:", data); // Log data for testing

        const payload = {
            shift_date: dayjs(data.shift_date).format("YYYY-MM-DD"),
            start_time: data.start_time?.start_time,
            end_time: data.start_time?.end_time,
            max_customers: data.max_customers,
            note: data.note,
            status: data.status,
        };
        console.log("Payload:", payload); // Log payload for testing
        handleAddShift(payload);
    };

    return (
        <Modal
            title="Thêm Ca Làm"
            width={800}
            open={isModalOpen}
            onOk={handleSubmit(onSubmit)} // Ensure onOk triggers handleSubmit
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Lưu
                </Button>,
            ]}
        >
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
                            label="Thời Gian Ca làm"
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
                                            {...field}
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
                                                field.onChange(
                                                    selectedShift?.value
                                                );
                                            }}
                                            value={
                                                initialShiftTime.find(
                                                    (item) =>
                                                        JSON.stringify(
                                                            item.value
                                                        ) ===
                                                        JSON.stringify(
                                                            field.value
                                                        )
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

                                        {selectedShiftTime && (
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
                                        )}
                                    </>
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Tối đa Khách Hàng"
                            validateStatus={errors.max_customers ? "error" : ""}
                            help={errors.max_customers?.message}
                        >
                            <Controller
                                name="max_customers"
                                control={control}
                                rules={{
                                    required:
                                        "Vui lòng nhập số lượng khách hàng!",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Nhập số lượng khách hàng"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Trạng thái"
                            validateStatus={errors.status ? "error" : ""}
                            help={errors.status?.message}
                        >
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Switch
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

export default ModalAddShift;
