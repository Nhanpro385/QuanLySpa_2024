import React, { useEffect } from "react";
import {
    Button,
    Descriptions,
    Modal,
    Table,
    Image,
    Tag,
    Card,
    Space,
} from "antd";
import { URL_IMAGE } from "../../../config/appConfig";
const ServiceModalDetail = ({ isOpen, onClose, servicedata }) => {
    useEffect(() => {
        if (servicedata) {
            console.log(servicedata);
        }
    }, [servicedata]);

    const items = [
        {
            key: "1",
            label: "Tên dịch vụ",
            children: servicedata?.name || "Không có",
        },
        {
            key: "2",
            label: "Danh mục dịch vụ",
            children: servicedata?.service_category_id?.name || "Không có",
        },
        {
            key: "3",
            label: "Mô tả",
            children: servicedata?.description || "Không có",
        },
        {
            key: "4",
            label: "Giá",
            children: `${parseFloat(servicedata?.price || 0).toLocaleString()} VNĐ`,
        },
        {
            key: "5",
            label: "Thời gian",
            children: servicedata?.duration || "Không có",
        },
        {
            key: "6",
            label: "Trạng thái",
            children:
                servicedata?.status === 1 ? (
                    <Tag color="success">Hoạt động</Tag>
                ) : (
                    <Tag color="error">Không hoạt động</Tag>
                ),
        },
        {
            label: "Ảnh đại diện",
            key: "7",
            children: servicedata?.image_url ? (
                <Image
                    src={
                        `${URL_IMAGE}/services/special/` +
                        servicedata?.image_url
                    }
                    width={200}
                    fallback="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                />
            ) : (
                "Không có"
            ),
        },
    ];

    const productColumns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng sử dụng",
            dataIndex: "quantity_used",
            key: "quantity_used",
        },
    ];

    return (
        <Modal
            title="Chi tiết dịch vụ"
            open={isOpen}
            width={1000}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <Card>
                    <Descriptions
                        title="Thông tin dịch vụ"
                        items={items}
                        bordered
                        column={2}
                    />
                </Card>
                <Card>
                    <Table
                        title={() => "Danh sách sản phẩm sử dụng"}
                        columns={productColumns}
                        dataSource={servicedata?.products || []}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card>
                    <h3 className="mb-5 mt-4">Hình ảnh dịch vụ</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {servicedata?.serviceImages?.map((image) => (
                            <Image
                                key={image.id}
                                src={
                                    `${URL_IMAGE}/services/${image.image_url}` ||
                                    ""
                                }
                                alt={`Image for ${servicedata?.name}`}
                                fallback="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                width={200}
                                style={{
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    border: "1px solid #f0f0f0",
                                    padding: "5px",
                                }}
                            />
                        ))}
                    </div>
                </Card>
            </Space>
        </Modal>
    );
};

export default ServiceModalDetail;
