import React, { useEffect, useState } from "react";
import style from "../style/servicesDetailbyid.module.scss";
import { useParams } from "react-router-dom"; // Để lấy id từ URL
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Divider,
    Card,
    Descriptions,
    Image,
    Row,
    Col,
    Tag,
    Spin,
    Button,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ServicesDetailById = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id từ URL
    const [service, setService] = useState({});
    const { getServicesDetailClient } = useServicesActions();
    const services = useSelector((state) => state.services);

    useEffect(() => {
        // Gọi API để lấy thông tin chi tiết dịch vụ
        getServicesDetailClient(id);
    }, [id]); // Chỉ gọi lại khi id thay đổi

    useEffect(() => {
        if (services.service?.data) {
            setService(services.service.data);
        } else {
            setService({});
        }
    }, [services]);

    // Kiểm tra dữ liệu có đang được tải không
    if (!service || Object.keys(service).length === 0) {
        return (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                />
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: "20px" }}>
            <Divider orientation="left">Chi tiết dịch vụ</Divider>

            <h1
                className="title"
                style={{
                    textAlign: "center",
                    marginBottom: "40px",
                    textTransform: "uppercase",
                }}
            >
                {service?.name || "Tên dịch vụ không có sẵn"}
            </h1>

            <Row gutter={[16, 16]}>
                <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>
                    {/* Hiển thị hình ảnh dịch vụ */}
                    <Card
                        bordered={false}
                        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Image
                            src={`http://127.0.0.1:8000/storage/uploads/services/special/${service?.image_url}`}
                            alt={service?.name || "Không có hình ảnh"}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                    </Card>
                    <Button
                        block
                        type="primary"
                        style={{ marginTop: "20px" }}
                        onClick={() => {
                            navigate(`/datlichhen?dichvu=${service?.id}`);
                        }}
                    >
                        Đặt lịch
                    </Button>
                </Col>
                <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
                    <Card bordered={false}>
                        <Descriptions
                            title="Thông tin dịch vụ"
                            layout="vertical"
                        >
                            <Descriptions.Item label="Mô tả">
                                {service?.description ||
                                    "Thông tin không có sẵn"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá">
                                {service?.price
                                    ? `${parseInt(
                                          service?.price
                                      ).toLocaleString()} VNĐ`
                                    : "Liên hệ"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Thời gian thực hiện">
                                {service?.duration || "Chưa xác định"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Danh mục">
                                {service?.service_category_id?.name ||
                                    "Chưa xác định"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag
                                    color={
                                        service?.status === 1 ? "green" : "red"
                                    }
                                >
                                    {service?.status === 1
                                        ? "Hoạt động"
                                        : "Không hoạt động"}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            {/* Sản phẩm liên quan */}
            {service?.products && service?.products.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                    <Divider orientation="left">
                        Sản phẩm được sử dụng trong dịch vụ
                    </Divider>
                    <Row gutter={[16, 16]}>
                        {service?.products.map((product) => (
                            <Col key={product.id} span={8}>
                                <Card
                                    title={
                                        product?.name ||
                                        "Sản phẩm không xác định"
                                    }
                                    bordered={true}
                                    className={style.cardProduct}
                                >
                                    <p>
                                        Số lượng sử dụng:{" "}
                                        {product?.quantity_used ||
                                            "Chưa xác định"}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ServicesDetailById;
