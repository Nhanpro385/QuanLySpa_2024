import React, { useState } from "react";
import { Table, Button, Input, Modal, Row, Col } from "antd";
import ServicesAdd from "./add_services";
import useModal from "../../modules/appointments/hooks/openmodal";
import { PlusOutlined } from "@ant-design/icons";
function Services() {
    const [dataSource, setDataSource] = useState([
        {
            key: "1",
            name: "Phục hồi da",
            image_url: "Ảnh 1",
            price: "500.000",
            duration: "1 giờ",
            status: "Đang hoạt động",
        },
    ]);

    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [editService, setEditService] = useState(null);

    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh",
            dataIndex: "image_url",
            key: "image_url",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Thời gian dự kiến",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Button
                    type="primary"
                    style={{
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                        color: "#fff",
                    }}
                    disabled
                >
                    {status}
                </Button>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => handleViewDetails(record)}
                        style={{ marginRight: 8 }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDelete(record.key)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setEditService(record);
        setIsModalVisible(true);
    };

    const handleDelete = (key) => {
        setDataSource(dataSource.filter((item) => item.key !== key));
        console.log("Deleted service with key:", key);
    };

    const handleViewDetails = (record) => {
        Modal.info({
            title: "Chi tiết dịch vụ",
            content: (
                <div>
                    <p>Tên dịch vụ: {record.name}</p>
                    <p>Giá: {record.price}</p>
                    <p>Thời gian: {record.duration}</p>
                    <p>Trạng thái: {record.status}</p>
                </div>
            ),
            onOk() {},
        });
    };

    return (
        <div>
            <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
                <Col xl={16} md={12} sm={24} xs={24}>
                    <h2>Danh Sách Dịch Vụ</h2>
                </Col>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Button type="primary" onClick={showModal} block>
                        <PlusOutlined />
                        Thêm dịch vụ mới
                    </Button>
                </Col>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Button color="primary" variant="outlined" block>
                        <PlusOutlined />
                        Thêm Loại dịch vụ
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Input.Search
                        className="mb-3 w-100"
                        placeholder="Tìm dịch vụ theo tên..."
                        onSearch={(value) => console.log(value)}
                        
                    />
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
            <Modal
                width={800}
                title={editService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ServicesAdd service={editService} />
            </Modal>
        </div>
    );
}

export default Services;
