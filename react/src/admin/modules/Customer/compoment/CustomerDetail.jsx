import React, { useEffect } from "react";
import { Button, Descriptions, Modal } from "antd";

const CustomerDetail = ({ isOpen, onClose, selectedCustomer }) => {
    useEffect(() => {
        if (selectedCustomer) {
            console.log(selectedCustomer);
        }
    }, [selectedCustomer]);

    const items = [
        {
            key: "1",
            label: "Tên khách hàng",
            children: selectedCustomer?.full_name || "Không có",
        },
        {
            key: "2",
            label: "Giới tính",
            children: selectedCustomer?.gender || "Không có",
        },
        {
            key: "3",
            label: "Số điện thoại",
            children: selectedCustomer?.phone || "Không có",
        },
        {
            key: "4",
            label: "Email",
            children: selectedCustomer?.contact_email || "Không có",
        },
        {
            key: "5",
            label: "Ngày sinh",
            children: selectedCustomer?.date_of_birth || "Không có",
        },
        {
            key: "6",
            label: "Địa chỉ",
            children: selectedCustomer?.address || "Không có",
        },
        {
            key: "7",
            label: "Người tạo",
            children: selectedCustomer?.created_by?.full_name || "Không xác định",
        },
        {
            key: "8",
            label: "Vai trò người tạo",
            children: selectedCustomer?.created_by?.role || "Không xác định",
        },
        {
            key: "9",
            label: "Ngày tạo",
            children: selectedCustomer?.created_at || "Không có",
        },
        {
            key: "10",
            label: "Ngày cập nhật",
            children: selectedCustomer?.updated_at || "Không có",
        },
    ];

    return (
        <Modal
            title="Chi tiết khách hàng"
            open={isOpen}
            width={800}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Descriptions title="Thông tin khách hàng" items={items} column={2} />
        </Modal>
    );
};

export default CustomerDetail;
