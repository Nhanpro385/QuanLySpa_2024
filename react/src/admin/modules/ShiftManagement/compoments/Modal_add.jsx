import React from "react";
import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    TimePicker,
    Switch,
    Button,
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
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted data:", data); // Log data for testing
        const payload = {
            shift_date: dayjs(data.shift_date).format("YYYY-MM-DD"),
            start_time: dayjs(data.start_time).format("HH:mm:ss"),
            end_time: dayjs(data.end_time).format("HH:mm:ss"),
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
                            label="Tối đa nhân viên"
                            validateStatus={errors.max_customers ? "error" : ""}
                            help={errors.max_customers?.message}
                        >
                            <Controller
                                name="max_customers"
                                control={control}
                                rules={{
                                    required:
                                        "Vui lòng nhập số lượng nhân viên!",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Nhập số lượng nhân viên"
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
