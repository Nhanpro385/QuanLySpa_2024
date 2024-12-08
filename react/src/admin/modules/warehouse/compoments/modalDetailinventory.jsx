import React from "react";
import { Button, Descriptions, Modal, Table, Card, Space } from "antd";
import dayjs from "dayjs";
const ModalDetailInventory = ({ isOpen, onClose, data }) => {
    // Cấu hình cột cho bảng
    const productColumns = [
        {
            title: "ID sản phẩm",
            dataIndex: "product_id",
            key: "product_id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: ["product", "name"],
            key: "product_name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    // Dữ liệu mô tả
    const items = [
        {
            label: "ID",
            value: data?.id || "Không tìm thấy",
        },
        {
            label: "Tên sản phẩm",
            value: data?.product?.name || "Không tìm thấy",
        },
        {
            label: "Số lượng",
            value: data?.quantity || "Không tìm thấy",
        },
        {
            label: "Người tạo",
            value: data?.created_by?.name || "Không tìm thấy",
        },
        {
            label: "Ngày tạo",
            value: dayjs(data?.created_at).format("DD/MM/YYYY") || "Không tìm thấy",
        },
        {
            label: "Ngày cập nhật",
            value: dayjs(data?.updated_at).format("DD/MM/YYYY") || "Không tìm thấy",
        },
    ];

    return (
        <Modal
            title="Chi tiết sản phẩm"
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
                        title="Thông tin sản phẩm"
                        bordered
                        column={2}
                    >
                        {items?.map((item) => (
                            <Descriptions.Item
                                label={item.label}
                                key={item.label}
                            >
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </Card>
                <Card>
                    <Table
                        title={() => "Danh sách sản phẩm trong kho gần nhất"}
                        columns={productColumns}
                        dataSource={[data]} // Hiển thị dữ liệu từ prop data
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: false,
                        }}
                        bordered
                    />
                </Card>
            </Space>
        </Modal>
    );
};

export default ModalDetailInventory;
