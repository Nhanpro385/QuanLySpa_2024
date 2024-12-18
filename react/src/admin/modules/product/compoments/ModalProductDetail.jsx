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
const ModalProductDetail = ({ isOpen, onClose, ProductData }) => {
    useEffect(() => {
        if (ProductData) {
            console.log(ProductData);
        }
    }, [ProductData]);

    const items = [
        {
            key: "Tên sản phẩm",
            label: "Tên sản phẩm",
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
            children: `${
                parseInt(ProductData?.price).toLocaleString() || 0
            } VNĐ`,
        },
        {
            key: "Chi phí",
            label: "Chi phí",
            children: `${
                parseInt(ProductData?.cost).toLocaleString() || 0
            } VNĐ`,
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
            children:
                ProductData?.status === 1 ? (
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
            children: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: ProductData?.description || "Không có mô tả",
                    }}
                />
            ),
        },

        {
            key: "Ảnh đại diện",
            label: "Ảnh đại diện",
            span: 1,
            children: (
                <Image
                    src={
                        `${URL_IMAGE}/products/${ProductData?.image_url}` || ""
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
            ),
        },
    ];

    const productColumns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "id",
            key: "id",
            render: (text) => ProductData?.id || "Chưa có thông tin",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    return (
        <Modal
            title="Chi tiết dịch vụ"
            open={isOpen}
            width={1200}
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
                        title={() => "Danh sách sản phẩm trong kho gần nhất"}
                        columns={productColumns}
                        dataSource={ProductData?.inventories || []}
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: false,
                        }}
                        bordered
                    />
                </Card>
                {/* <Card>
                    <h3 className="mb-5 mt-4">Hình ảnh sản phẩm</h3>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {ProductData?.productImages?.length > 0 ? (
                            ProductData?.productImages.map((image) => (
                                <Image
                                    key={image.id}
                                    src={
                                        `${URL_IMAGE}/products/${image.image_url}` ||
                                        ""
                                    }
                                    alt={`Image for ${ProductData?.name}`}
                                    fallback="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                    width={200}
                                    style={{
                                        boxShadow:
                                            "0 4px 8px rgba(0, 0, 0, 0.1)",
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
                </Card> */}
            </Space>
        </Modal>
    );
};

export default ModalProductDetail;
