import React, { useState } from "react";
import { Table, Button, Input, Modal, Row, Col, Dropdown, Space } from "antd";
import ServicesAdd from "./add_services";
import useModal from "../../modules/appointments/hooks/openmodal";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ServiceModalEdit from "../../modules/services/compoments/ServiceModalEdit";

function Services() {
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                handleViewDetails(record);
                break;
            case "4":
                handleDelete(record.key);
                break;
            default:
                break;
        }
    };
    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết </Button>,
        },
        {
            key: "4",
            label: (
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];
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
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();
    const [editService, setEditService] = useState(null);

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
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

    const handleEdit = (record) => {
        setEditService(record);
        showModal2();
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
            <h1 className="text-center">Quản lý dịch vụ</h1>
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
                    <Link to="/admin/categoriesService">
                        <Button color="primary" variant="outlined" block>
                            <PlusOutlined />
                            Thêm Loại dịch vụ
                        </Button>
                    </Link>
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

            <Table
                style={{ overflowX: "auto" }}
                dataSource={dataSource}
                columns={columns}
            />
            <Modal
                width={800}
                title={editService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ServicesAdd service={editService} />
            </Modal>
            <ServiceModalEdit
                isModalOpen={isModalOpen2}
                handleOk={handleOk2}
                handleCancel={handleCancel2}
            />
        </div>
    );
}

export default Services;
