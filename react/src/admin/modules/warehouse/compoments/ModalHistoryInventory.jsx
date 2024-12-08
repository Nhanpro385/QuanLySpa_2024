import React from "react";
import { Modal, Table, Descriptions, Card, Space, Button } from "antd";
import dayjs from "dayjs";
const ModalHistoryInventory = ({ isOpen, onClose, data }) => {
    // Cấu hình cột cho bảng lịch sử nhập/xuất hàng
    const historyColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
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
        {
            title: "Người thực hiện",
            dataIndex: ["created_by", "name"],
            key: "created_by_name",
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
        },
    ];

    // Dữ liệu mô tả thông tin cơ bản của lịch sử
    const descriptionItems = [
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
            value:
                dayjs(data?.created_at).format("DD/MM/YYYY HH:mm") ||
                "Không tìm thấy",
        },
        {
            label: "Ngày cập nhật",
            value:
                dayjs(data?.updated_at).format("DD/MM/YYYY HH:mm") ||
                "Không tìm thấy",
        },
    ];

    return (
        <Modal
            title="Lịch sử nhập/xuất hàng"
            open={isOpen}
            width={1200}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* Thông tin mô tả */}
                <Card>
                    <Descriptions
                        title="Thông tin chi tiết"
                        bordered
                        column={2}
                    >
                        {descriptionItems.map((item) => (
                            <Descriptions.Item
                                key={item.label}
                                label={item.label}
                            >
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </Card>

                {/* Bảng lịch sử */}
                <Card>
                    <Table
                        title={() => "Lịch sử nhập/xuất hàng"}
                        columns={historyColumns}
                        dataSource={[data]} // Thay bằng danh sách lịch sử nếu có nhiều bản ghi
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

export default ModalHistoryInventory;
