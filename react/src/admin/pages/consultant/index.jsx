import React, { useState } from "react";
import {
    Layout,
    Table,
    Form,
    Input,
    Button,
    Select,
    Card,
    Tag,
    Dropdown,
    Space,
    Modal,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Header, Content } = Layout;

const items = [
    {
        key: "1",
        label: <Button block> Sửa </Button>,
    },
    {
        key: "2",
        label: <Button block> Gọi Điện tư vấn </Button>,
    },
];

const Consultant = () => {
    const [form] = Form.useForm();
    const [editForm] = Form.useForm(); // Form instance for editing
    const [consultations, setConsultations] = useState([
        {
            key: 0,
            customerName: "Nguyễn Văn A",
            employee: "Trần Phi Hào",
            service: "Dịch vụ A",
            consultationPlan: "Tư vấn da",
            skinStatus: "Da khô",
            status: <Tag color="green">Đang chờ</Tag>,
        },
        {
            key: 1,
            customerName: "Trần Thị B",
            employee: "Nguyễn Văn C",
            service: "Dịch vụ B",
            consultationPlan: "Tư vấn da",
            skinStatus: "Da dầu",
            status: <Tag color="green">Đang chờ</Tag>,
        },
    ]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state
    const [selectedConsultation, setSelectedConsultation] = useState(null); // Selected record

    const handleFinish = (values) => {
        setConsultations([
            ...consultations,
            { ...values, key: consultations.length },
        ]);
        form.resetFields();
    };

    const handleEdit = (record) => {
        setSelectedConsultation(record);
        editForm.setFieldsValue(record); // Set form values
        setIsEditModalOpen(true); // Show modal
    };

    const handleEditOk = () => {
        editForm
            .validateFields()
            .then((values) => {
                const updatedData = consultations.map((item) =>
                    item.key === selectedConsultation.key ? { ...values, key: item.key } : item
                );
                setConsultations(updatedData);
                setIsEditModalOpen(false); // Close modal
                setSelectedConsultation(null); // Clear selected record
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedConsultation(null); // Clear selected record
    };

    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                // Logic for calling
                break;
            default:
                break;
        }
    };

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Khách hàng",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Nhân viên",
            dataIndex: "employee",
            key: "employee",
        },
        {
            title: "Dịch vụ",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Kế hoạch tư vấn",
            dataIndex: "consultationPlan",
            key: "consultationPlan",
        },
        {
            title: "Tình trạng da",
            dataIndex: "skinStatus",
            key: "skinStatus",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (e) => onClick({ key: e.key, record }),
                        }}
                        trigger={["click"]}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                Hành động
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </span>
            ),
        },
    ];

    return (
        <Card>
            <Form
                form={form}
                layout="inline"
                onFinish={handleFinish}
                style={{ marginBottom: "20px" }}
            >
                <Form.Item
                    name="customerName"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên khách hàng!",
                        },
                    ]}
                >
                    <Input placeholder="Tên khách hàng" />
                </Form.Item>
                <Form.Item
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn trạng thái!",
                        },
                    ]}
                >
                    <Select placeholder="Trạng thái" style={{ width: 120 }}>
                        <Option value="Đang chờ">Đang chờ</Option>
                        <Option value="Đang tư vấn">Đang tư vấn</Option>
                        <Option value="Hoàn thành">Hoàn thành</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="service"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn dịch vụ!",
                        },
                    ]}
                >
                    <Select placeholder="Dịch vụ" style={{ width: 150 }}>
                        <Option value="Dịch vụ A">Dịch vụ A</Option>
                        <Option value="Dịch vụ B">Dịch vụ B</Option>
                        <Option value="Dịch vụ C">Dịch vụ C</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>

            <Table columns={columns} dataSource={consultations} />

            {/* Modal for editing consultation */}
            <Modal
                title="Chỉnh sửa thông tin tư vấn"
                visible={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                        rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                    >
                        <Select placeholder="Trạng thái">
                            <Option value="Đang chờ">Đang chờ</Option>
                            <Option value="Đang tư vấn">Đang tư vấn</Option>
                            <Option value="Hoàn thành">Hoàn thành</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Dịch vụ"
                        name="service"
                        rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
                    >
                        <Select placeholder="Dịch vụ">
                            <Option value="Dịch vụ A">Dịch vụ A</Option>
                            <Option value="Dịch vụ B">Dịch vụ B</Option>
                            <Option value="Dịch vụ C">Dịch vụ C</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Kế hoạch tư vấn" name="consultationPlan">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tình trạng da" name="skinStatus">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default Consultant;
