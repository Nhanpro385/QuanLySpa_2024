import React, { useEffect, useState } from "react";
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
    List,
} from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";

const { Option } = Select;
const { RangePicker } = DatePicker;
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import useStreatmentsAction from "../../modules/streatment/hooks/useStreatmentsAction";
import style from "../../modules/streatment/style/history_sevice.module.scss";
const ServiceHistory = () => {
    useEffect(() => {
        document.title = "Lịch sử trị liệu của khách hàng";
    }, []);
    const { id: idcustomer } = useParams();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [selectedService, setSelectedService] = useState(null);
    const { getStreatmentByCustomer } = useStreatmentsAction();
    const [serviceDetails, setServiceDetails] = useState([]);
    const streatments = useSelector((state) => state.streatments);
    const handleShowModal = (service) => {
        setSelectedService(service);
        showModal();
    };
    useEffect(() => {
        getStreatmentByCustomer(idcustomer);
    }, [idcustomer]);
    useEffect(() => {
        if (streatments.streatments.data.length > 0) {
            setServiceDetails(
                streatments.streatments.data.map((service) => ({
                    key: service.id,
                    title: service.appointment.appointment_date,
                    customer: service.customer.name,
                    staff: service.staff.full_name,
                    date: service.appointment.appointment_date,
                    price: service.payment_total.toLocaleString() + " VNĐ",
                    note: service.note,
                    feedback: service.feedback,
                    status:
                        service.status === 1 ? "Hoàn thành" : "Chưa hoàn thành",
                    beforeImage: service.image_before,
                    afterImage: service.image_after,
                }))
            );
        }
    }, [streatments]);

    return (
        <div style={{ padding: "24px" }}>
            <h1 className="text-center">Lịch sử trị liệu của khách hàng</h1>

            {/* <Card className="mb-3">
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
            </Card> */}
            {/* Service Cards Section */}

            <List
                grid={{
                    gutter: 16,
                    column: 4,
                }}
                itemLayout="horizontal"
                pagination={{
                    position: "bottom",
                    align: "center",
                    pageSize: 8,
                }}
                dataSource={serviceDetails}
                renderItem={(item) => (
                    <List.Item className={style.antListItem}>
                        <Card
                            title={item.title}
                            extra={
                                <Button
                                    type="link"
                                    onClick={() => handleShowModal(item)}
                                >
                                    Xem chi tiết
                                </Button>
                            }
                            bordered
                            hoverable
                        >
                            <p>Khách hàng: {item.customer}</p>
                            <p>Ngày thực hiện: {item.date}</p>
                            <p>
                                Trạng thái:{" "}
                                <Tag color="green">{item.status}</Tag>
                            </p>
                        </Card>
                    </List.Item>
                )}
            />

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
                                src={
                                    "http://127.0.0.1:8000/storage/" +
                                    selectedService.beforeImage
                                }
                                alt="Before"
                                width="100%"
                                height={200}
                                style={{ objectFit: "cover" }}
                            />
                        </Col>
                        <Col span={12}>
                            <h3 className="text-center">Ảnh sau</h3>
                            <Image
                                src={
                                    "http://127.0.0.1:8000/storage/" +
                                    selectedService.afterImage
                                }
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
};

export default ServiceHistory;
