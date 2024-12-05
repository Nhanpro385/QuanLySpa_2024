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

const ModalProductDetail = ({ isOpen, onClose, ProductData }) => {
    useEffect(() => {
        if (ProductData) {
            console.log(ProductData);
        }
    }, [ProductData]);

    const items = [
        {
            key: "Tên dịch vụ",
            label: "Tên dịch vụ",
            children: ProductData?.name || "Chưa có thông tin",
        },
        {
            key: "Mã vạch",
            label: "Mã vạch",
            children: ProductData?.bar_code || "Chưa có thông tin",
        },
        {
            key: "Giá",
            label: "Giá bán",
            children: `${parseInt(ProductData?.price).toLocaleString() || 0} VND`,
        },
        {
            key: "Chi phí",
            label: "Chi phí",
            children: `${parseInt(ProductData?.cost).toLocaleString() || 0} VND`,
        },
        {
            key: "Ngày tạo",
            label: "Ngày tạo",
            children: ProductData?.created_at || "Chưa có thông tin",
        },
        {
            key: "Ngày cập nhật",
            label: "Ngày cập nhật",
            children: ProductData?.updated_at || "Chưa có thông tin",
        },
        {
            key: "Độ ưu tiên",
            label: "Độ ưu tiên",
            children: ProductData?.priority || "Không có",
        },
        {
            key: "Trạng thái",
            label: "Trạng thái",
            children: ProductData?.status === 1 ? (
                <Tag color="green">Hoạt động</Tag>
            ) : (
                <Tag color="red">Ngừng hoạt động</Tag>
            ),
        },
        {
            key: "Tạo bởi",
            label: "Tạo bởi",
            children: ProductData?.created_by?.fullname || "Chưa có thông tin",
        },
        {
            key: "Người cập nhật",
            label: "Người cập nhật",
            children: ProductData?.updated_by?.fullname || "Chưa có thông tin",
        },
        {
            key: "Mô tả",
            label: "Mô tả",
            span: 2,
            children: ProductData?.description || "Không có mô tả",
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
                        dataSource={ProductData?.inventories || []}
                        rowKey="id"
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card>
                    <h3 className="mb-5 mt-4">Hình ảnh dịch vụ</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {ProductData?.productImages?.length > 0 ? (
                            ProductData?.productImages.map((image) => (
                                <Image
                                    key={image.id}
                                    src={
                                        "http://127.0.0.1:8000/storage/uploads/products/" +
                                        image.image_url
                                    }
                                    alt={`Image for ${ProductData?.name}`}
                                    fallback="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                    width={200}
                                    style={{
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "8px",
                                        border: "1px solid #f0f0f0",
                                        padding: "5px",
                                    }}
                                />
                            ))
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                </Card>
            </Space>
        </Modal>
    );
};

export default ModalProductDetail;

