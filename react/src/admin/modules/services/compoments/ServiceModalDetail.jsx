import React, { useEffect } from "react";
import { Button, Descriptions, Modal, Table, Image } from "antd";

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
            children: `${parseFloat(servicedata?.price || 0).toLocaleString(
                "vi-VN",
                {
                    style: "currency",
                    currency: "VND",
                }
            )}`,
        },
        {
            key: "5",
            label: "Thời gian",
            children: servicedata?.duration || "Không có",
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
            <Descriptions title="Thông tin dịch vụ" items={items} column={2} />
            <Table
                title={() => "Danh sách sản phẩm sử dụng"}
                columns={productColumns}
                dataSource={servicedata?.products || []}
                rowKey="id"
                pagination={false}
            />
            <div>
                <h3 className="mb-5 mt-4">Hình ảnh dịch vụ</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    {servicedata?.serviceImages?.map((image) => (
                        <Image
                            key={image.id}
                            src={
                                "http://127.0.0.1:8000/storage/uploads/services/" +
                                image.image_url
                            }
                            alt={`Image for ${servicedata?.name}`}
                            width={200}
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                            }}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default ServiceModalDetail;
