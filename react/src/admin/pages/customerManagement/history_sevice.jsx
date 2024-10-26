import React, { useState } from "react";
import {
    Button,
    Row,
    Col,
    Card,
    Image,
    Descriptions,
    Tag,
    Modal,
    Select,
    DatePicker,
} from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";

const { Option } = Select;
const { RangePicker } = DatePicker;

const serviceDetails = [
    {
        key: "1",
        title: "Trị mụn",
        customer: "Trịnh Trần Phương Tuấn",
        staff: "Thiên An",
        date: "2021-10-20",
        price: "500.000đ",
        note: "Khách hàng đã trả tiền",
        feedback: "Khách hàng rất hài lòng với dịch vụ",
        status: "Hoàn thành",
        beforeImage: "https://via.placeholder.com/300x200",
        afterImage: "https://via.placeholder.com/300x200",
    },
    {
        key: "2",
        title: "Nhuộm tóc",
        customer: "Nguyễn Thị Hồng",
        staff: "Hồng Phúc",
        date: "2021-10-21",
        price: "1.000.000đ",
        note: "Khách hàng chưa trả tiền",
        feedback: "Khách hàng không hài lòng với màu tóc",
        status: "Đang thực hiện",
        beforeImage: "https://via.placeholder.com/300x200",
        afterImage: "https://via.placeholder.com/300x200",
    },
    {
        key: "3",
        title: "Cắt tóc",
        customer: "Trần Thị Thu",
        staff: "Hồng Phúc",
        date: "2021-10-22",
        price: "200.000đ",
        note: "Khách hàng đã trả tiền",
        feedback: "Khách hàng rất hài lòng với kiểu tóc",
        status: "Hoàn thành",
        beforeImage: "https://via.placeholder.com/300x200",
        afterImage: "https://via.placeholder.com/300x200",
    },
    {
        key: "4",
        title: "Nhuộm tóc",
        customer: "Nguyễn Thị Hồng",
        staff: "Hồng Phúc",
        date: "2021-10-21",
        price: "1.000.000đ",
        note: "Khách hàng chưa trả tiền",
        feedback: "Khách hàng không hài lòng với màu tóc",
        status: "Hủy",
        beforeImage: "https://via.placeholder.com/300x200",
        afterImage: "https://via.placeholder.com/300x200",
    },
    {
        key: "5",
        title: "Cắt tóc",
        customer: "Trần Thị Thu",
        staff: "Hồng Phúc",
        date: "2021-10-22",
        price: "200.000đ",
        note: "Khách hàng đã trả tiền",
        feedback: "Khách hàng rất hài lòng với kiểu tóc",
        status: "Hoàn thành",
        beforeImage: "https://via.placeholder.com/300x200",
        afterImage: "https://via.placeholder.com/300x200",

    }
];

function ServiceHistory() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [selectedService, setSelectedService] = useState(null);

    const handleShowModal = (service) => {
        setSelectedService(service);
        showModal();
    };

    return (
        <div style={{ padding: "24px" }}>
          <h1 className="text-center">Lịch sử dịch vụ</h1>
         
            <Card className="mb-3">
                <Row gutter={[16, 16]}>
                    <Col xl={4} md={6} sm={12} xs={24}>
                        <Select
                            placeholder="Chọn trạng thái"
                            style={{ width: 150 }}
                        >
                            <Option value="Hoàn thành">Hoàn thành</Option>
                            <Option value="Đang thực hiện">
                                Đang thực hiện
                            </Option>
                            <Option value="Hủy">Hủy</Option>
                        </Select>
                    </Col>
                    <Col xl={4} md={6} sm={12} xs={24}>
                        <RangePicker style={{ width: 250 }} />
                    </Col>
                </Row>
            </Card>
            {/* Service Cards Section */}
            <Row gutter={[16, 16]}>
                {serviceDetails.map((service) => (
                    <Col span={8} key={service.key}>
                        <Card
                            title={service.title}
                            extra={
                                <Button
                                    type="link"
                                    onClick={() => handleShowModal(service)}
                                >
                                    Xem chi tiết
                                </Button>
                            }
                            bordered
                            hoverable
                        >
                            <p>Khách hàng: {service.customer}</p>
                            <p>Ngày thực hiện: {service.date}</p>
                            <p>
                                Trạng thái:{" "}
                                <Tag color="green">{service.status}</Tag>
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* Modal for Service Details */}
            <Modal
                title={selectedService?.title}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                afterClose={() => setSelectedService(null)}
            >
                {selectedService && (
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <h3 className="text-center">Ảnh trước</h3>
                            <Image
                                src={selectedService.beforeImage}
                                alt="Before"
                                width="100%"
                                height={200}
                                style={{ objectFit: "cover" }}
                            />
                        </Col>
                        <Col span={12}>
                            <h3 className="text-center">Ảnh sau</h3>
                            <Image
                                src={selectedService.afterImage}
                                alt="After"
                                width="100%"
                                height={200}
                                style={{ objectFit: "cover" }}
                            />
                        </Col>
                        <Col span={24}>
                            <Descriptions
                                layout="vertical"
                                bordered
                                style={{ marginTop: "20px" }}
                            >
                                <Descriptions.Item label="Tên dịch vụ">
                                    {selectedService.title}
                                </Descriptions.Item>
                                <Descriptions.Item label="Tên khách hàng">
                                    {selectedService.customer}
                                </Descriptions.Item>
                                <Descriptions.Item label="Nhân viên thực hiện">
                                    {selectedService.staff}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày thực hiện">
                                    {selectedService.date}
                                </Descriptions.Item>
                                <Descriptions.Item label="Giá tiền">
                                    {selectedService.price}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ghi chú">
                                    {selectedService.note}
                                </Descriptions.Item>
                                <Descriptions.Item label="Góp ý của khách hàng">
                                    {selectedService.feedback}
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color="green">
                                        {selectedService.status}
                                    </Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                )}
            </Modal>
        </div>
    );
}

export default ServiceHistory;
