import React from "react";
import { Modal, Table, Descriptions, Tag } from "antd";
import style from "../styles/odalHistoryInventory.module.scss";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const ProductHistoryModal = ({ isOpen, onClose, data }) => {
    const columns = [
        {
            title: "Loại giao dịch",
            dataIndex: "type",
            key: "type",
            render: (type) => (type === "outbound" ? "Xuất kho" : "Nhập kho"),
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "invoice_id",
            key: "invoice_id",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity, record) =>
                record?.type === "outbound" ? (
                    <Tag color="red">
                        {quantity} <CaretDownOutlined />
                    </Tag>
                ) : (
                    <Tag color="green">
                        {quantity} <CaretUpOutlined />
                    </Tag>
                ),
        },
        {
            title: "Giá (VNĐ)",
            dataIndex: "cost",
            key: "cost",
            render: (cost) =>
                parseInt(cost || 0).toLocaleString() + " VNĐ" || 0,
        },

        {
            title: "Ngày",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Người tạo",
            dataIndex: "created_by",
            key: "created_by",
            render: (created_by) => created_by?.name || "Không xác định",
        },
    ];

    return (
        <Modal
            title="Chi tiết sản phẩm"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={1200}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Mã sản phẩm">
                    {data?.product?.id}
                </Descriptions.Item>
                <Descriptions.Item label="Tên sản phẩm">
                    {data?.product?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Mã vạch">
                    {data?.product?.barcode}
                </Descriptions.Item>
            </Descriptions>
            <Table
                dataSource={data?.history?.map((item, index) => ({
                    ...item,
                    key: index,
                }))}
                columns={columns}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                }}
                scroll={{ y: 400 }}
                style={{ marginTop: 20 }}
                rowClassName={(record) =>
                    record.type === "outbound"
                        ? style.outboundrow
                        : style.inboundrow
                } // Thêm class theo điều kiện
            />
        </Modal>
    );
};

export default ProductHistoryModal;
