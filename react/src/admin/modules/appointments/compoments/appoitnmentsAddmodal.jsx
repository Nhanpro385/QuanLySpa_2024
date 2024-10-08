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
    TreeSelect,
} from "antd";

import "dayjs/locale/vi";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const treeData = [
    {
        value: "sever1",
        title: "Dịch vụ trị mụn",
        children: [
            {
                value: "parent 1-0",
                title: "Trị mụn chuyên khoa",
            },
        ],
    },
    {
        value: "sever2",
        title: "Dịch vụ trị Thâm",
        children: [
            {
                value: "sever2 1",
                title: "Trị Thâm bằng laze",
            },
        ],
    },
];
function ModalAppointment({ isModalOpen, handleOk, handleCancel }) {
    const [value, setValue] = useState();
    const onOk = (value) => {
        console.log("onOk: ", value);
    };
    const onChangetreeselect = (newValue) => {
        setValue(newValue);
    };
    return (
        <Modal
            title="Thêm lịch hẹn"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form layout="vertical">
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
                            <Input placeholder="Tên khách hàng" />
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
                            <Input placeholder="Số điện thoại khách hàng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ca làm" name="shift">
                            <Select placeholder="Chọn Ca làm">
                                <Select.Option value="1">Ca 1 </Select.Option>
                                <Select.Option value="2">Ca 2</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính" name="gender">
                            <Select placeholder="Chọn giới tính">
                                <Select.Option value="NAM">Nam</Select.Option>
                                <Select.Option value="NU">Nữ</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>{" "}
                    <Col span={12}>
                        <Form.Item label="Dịch vụ" name="service">
                            <TreeSelect
                                showSearch
                                style={{
                                    width: "100%",
                                }}
                                value={value}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: "auto",
                                }}
                                placeholder="Vui lòng chọn dịch vụ"
                                allowClear
                                onChange={onChangetreeselect}
                                treeDefaultExpandAll
                                treeData={treeData}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chọn Nhân viên" name="staff">
                            <Select placeholder="Chọn nhân viên">
                                <Select.Option value="1">Nhân viên 1 </Select.Option>
                                <Select.Option value="2">Nhân viên 1 </Select.Option>
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Thời Gian Lịch Hẹn" name="DateTime">
                            <RangePicker
                                style={{
                                    width: "100%",
                                }}
                                showTime={{
                                    format: "HH:mm",
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={(value, dateString) => {
                                    console.log("Selected Time: ", value);
                                    console.log(
                                        "Formatted Selected Time: ",
                                        dateString
                                    );
                                }}
                                onOk={onOk}
                            />
                        </Form.Item>
                    </Col>{" "}
                    <Col span={24}>
                        <Form.Item label="Ghi chú Lịch hẹn" name="Note">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Trạng Thái" name="Status">
                            <Select placeholder="Chọn trạng thái">
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
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm Lịch Hẹn
                    </Button>{" "}
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default ModalAppointment;
