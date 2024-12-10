import React from "react";
import { Modal, Table, Card, Space, Button } from "antd";
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
            render: (text) => (text ? dayjs(text).format("DD/MM/YYYY HH:mm") : "Chưa cập nhật"),
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
                {/* Bảng lịch sử */}
                <Card>
                    <Table
                        title={() => "Lịch sử nhập/xuất hàng"}
                        columns={historyColumns}
                        dataSource={data} // Sử dụng trực tiếp danh sách lịch sử
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                        }}
                        bordered
                    />
                </Card>
            </Space>
        </Modal>
    );
};

export default ModalHistoryInventory;
