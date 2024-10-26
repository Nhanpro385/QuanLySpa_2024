import React from "react";
import { Modal, Form, Col, Row, Input, Select, DatePicker, Button } from "antd";
import "dayjs/locale/vi";
import { useForm, Controller } from "react-hook-form";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const options = [{ label: "Dịch vụ 1", value: "a10" }];

function ModalAppointmentEdit({ isModalOpen, handleOk, handleCancel }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted data: ", data);
    };

    return (
        <Modal
            title="Chỉnh sửa lịch hẹn"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Họ và tên">
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

                    <Col span={12}>
                        <Form.Item label="Số điện thoại">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập số điện thoại",
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

                    <Col span={12}>
                        <Form.Item label="Giới tính">
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Vui lòng chọn giới tính" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Chọn giới tính"
                                    >
                                        <Select.Option value="NAM">
                                            Nam
                                        </Select.Option>
                                        <Select.Option value="NU">
                                            Nữ
                                        </Select.Option>
                                    </Select>
                                )}
                            />
                            {errors.gender && (
                                <p style={{ color: "red" }}>
                                    {errors.gender.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Dịch vụ">
                            <Controller
                                name="service"
                                control={control}
                                rules={{ required: "Vui lòng chọn dịch vụ" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: "100%" }}
                                        placeholder="Chọn dịch vụ"
                                        options={options}
                                    />
                                )}
                            />
                            {errors.service && (
                                <p style={{ color: "red" }}>
                                    {errors.service.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Ca làm">
                            <Controller
                                name="shift"
                                control={control}
                                rules={{ required: "Vui lòng chọn ca làm" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Chọn Ca làm"
                                    >
                                        <Select.Option value="1">
                                            Ca 1
                                        </Select.Option>
                                        <Select.Option value="2">
                                            Ca 2
                                        </Select.Option>
                                    </Select>
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
                        <Form.Item label="Chọn Nhân viên">
                            <Controller
                                name="staff"
                                control={control}
                                rules={{ required: "Vui lòng chọn nhân viên" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Chọn nhân viên"
                                    >
                                        <Select.Option value="1">
                                            Nhân viên 1
                                        </Select.Option>
                                        <Select.Option value="2">
                                            Nhân viên 2
                                        </Select.Option>
                                    </Select>
                                )}
                            />
                            {errors.staff && (
                                <p style={{ color: "red" }}>
                                    {errors.staff.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Thời Gian Lịch Hẹn">
                            <Controller
                                name="DateTime"
                                control={control}
                                rules={{ required: "Vui lòng chọn thời gian" }}
                                render={({ field }) => (
                                    <RangePicker
                                        {...field}
                                        style={{ width: "100%" }}
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                )}
                            />
                            {errors.DateTime && (
                                <p style={{ color: "red" }}>
                                    {errors.DateTime.message}
                                </p>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Trạng Thái">
                            <Controller
                                name="Status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Chọn trạng thái"
                                    >
                                        <Select.Option value="datlich">
                                            Đặt Lịch
                                        </Select.Option>
                                        <Select.Option value="xacnhan">
                                            Xác nhận
                                        </Select.Option>
                                        <Select.Option value="dangthuchien">
                                            Đang Thực hiện
                                        </Select.Option>
                                        <Select.Option value="dahoanthanh">
                                            Đã hoàn thành
                                        </Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Ghi chú Lịch hẹn">
                            <Controller
                                name="Note"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        {...field}
                                        rows={4}
                                        placeholder="Nhập ghi chú"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm Lịch Hẹn
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalAppointmentEdit;
