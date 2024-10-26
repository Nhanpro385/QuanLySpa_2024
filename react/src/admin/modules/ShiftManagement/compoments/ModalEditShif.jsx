import React, { useState } from "react";
import {
  Modal,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Button,
  TimePicker,
} from "antd";

import "dayjs/locale/vi";

const { TextArea } = Input;

function ModalAddShiftEdit({ isModalOpen, handleOk, handleCancel }) {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        handleOk(); // Close the modal on success
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Chỉnh Sửa Ca Làm"
      open={isModalOpen}
      onOk={onOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên!",
                },
              ]}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ca làm"
              name="shiftType"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ca làm!",
                },
              ]}
            >
              <Select placeholder="Chọn ca làm">
                <Select.Option value="morning">Ca Sáng</Select.Option>
                <Select.Option value="afternoon">Ca Chiều</Select.Option>
                <Select.Option value="evening">Ca Tối</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Vai trò"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò!",
                },
              ]}
            >
              <Select placeholder="Chọn vai trò">
                <Select.Option value="staff">Nhân viên</Select.Option>
                <Select.Option value="manager">Quản lý</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thời Gian Bắt Đầu"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu!",
                },
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                format="HH:mm"
                placeholder="Chọn thời gian bắt đầu"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thời Gian Kết Thúc"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian kết thúc!",
                },
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                format="HH:mm"
                placeholder="Chọn thời gian kết thúc"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ghi chú" name="notes">
              <TextArea rows={4} placeholder="Ghi chú về ca làm (nếu có)" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm Ca Làm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddShiftEdit;
