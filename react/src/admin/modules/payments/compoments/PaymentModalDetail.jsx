import React, { useEffect } from "react";
import { Button, Descriptions, Modal, Table } from "antd";

const PaymentModalDetail = ({ isOpen, onClose, selectedInvoice }) => {
    useEffect(() => {
        if (selectedInvoice) {
            console.log(selectedInvoice);
        }
    }, [selectedInvoice]);

    const items = [
        {
            key: "1",
            label: "Mã hóa đơn",
            children: selectedInvoice?.appointment_id.id || "Không có",
        },
        {
            key: "2",
            label: "Ngày thanh toán",
            children: selectedInvoice?.created_at || "Không có",
        },
        {
            key: "3",
            label: "Trạng thái thanh toán",
            children:
                selectedInvoice?.status === 1
                    ? "Đã thanh toán"
                    : "Chưa thanh toán",
        },
        {
            key: "4",
            label: "Phương thức thanh toán",
            children:
                selectedInvoice?.payment_type === 0
                    ? "Tiền mặt"
                    : "Chuyển khoản",
        },
        {
            key: "5",
            label: "Người tạo",
            children: selectedInvoice?.created_by?.fullname || "Không xác định",
        },
        {
            key: "6",
            label: "Vai trò người tạo",
            children: selectedInvoice?.created_by?.role || "Không xác định",
        },
        {
            key: "7",
            label: "Tổng tiền",
            children: `${parseFloat(
                selectedInvoice?.total_amount || 0
            ).toLocaleString()} VNĐ`,
        },
        {
            key: "8",
            label: "Số tiền dịch vụ",
            children: `${
                parseFloat(
                    selectedInvoice?.service_total || 0
                ).toLocaleString() + " VNĐ"
            }`,
        },
        {
            key: "9",
            label: "Số tiền sản phẩm",
            children: `${
                parseFloat(
                    selectedInvoice?.product_total || 0
                ).toLocaleString() + " VNĐ"
            }`,
        },
        {
            key: "10",
            label: "Giảm giá",
            children: `${
                parseFloat(selectedInvoice?.reduce || 0).toLocaleString() +
                " VNĐ"
            }`,
        },
        // Add customer information
        {
            key: "11",
            label: "Tên khách hàng",
            children:
                selectedInvoice?.appointment_id?.customer?.full_name ||
                "Không có",
        },
        {
            key: "12",
            label: "Số điện thoại khách hàng",
            children:
                selectedInvoice?.appointment_id?.customer?.phone || "Không có",
        },
    ];

    const productColumns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "product_name",
            key: "product_name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "unit_price",
            key: "unit_price",
            render: (price) => `${parseFloat(price).toLocaleString() + " VNĐ"}`,
        },
        {
            title: "Thành tiền",
            dataIndex: "total_price",
            key: "total_price",
            render: (price) => `${parseFloat(price).toLocaleString() + " VNĐ"}`,
        },
    ];

    return (
        <Modal
            title="Chi tiết thanh toán"
            open={isOpen}
            width={1000}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Descriptions
                bordered
                title="Thông tin thanh toán"
                items={items}
                column={2}
            />
            <Table
                title={() => "Danh sách sản phẩm"}
                columns={productColumns}
                dataSource={selectedInvoice?.products || []}
                rowKey="product_id"
                pagination={false}
            />
        </Modal>
    );
};

export default PaymentModalDetail;
