import React, { useEffect } from "react";
import { Button, Descriptions, Modal, Table } from "antd";

const AppointmentsDetail = ({ isOpen, onClose, selectedAppointment }) => {
    useEffect(() => {
        if (selectedAppointment) {
            console.log(selectedAppointment);
        }
    }, [selectedAppointment]);

    const items = [
        {
            key: "1",
            label: "Mã lịch hẹn",
            children: selectedAppointment?.id || "Không có",
        },
        {
            key: "2",
            label: "Ngày hẹn",
            children: selectedAppointment?.appointment_date || "Không có",
        },
        {
            key: "3",
            label: "Trạng thái lịch hẹn",
            children: selectedAppointment?.status || "Không có",
        },
        {
            key: "4",
            label: "Giờ bắt đầu",
            children: selectedAppointment?.start_time || "Không có",
        },
        {
            key: "5",
            label: "Giờ kết thúc",
            children: selectedAppointment?.expected_time || "Không có",
        },
        {
            key: "6",
            label: "Tên khách hàng",
            children: selectedAppointment?.customer?.full_name || "Không có",
        },
        {
            key: "7",
            label: "Số điện thoại khách hàng",
            children: selectedAppointment?.customer?.phone || "Không có",
        },
        {
            key: "8",
            label: "Email khách hàng",
            children: selectedAppointment?.customer?.email || "Không có",
        },
        {
            key: "9",
            label: "Người tạo",
            children: selectedAppointment?.created_by?.fullname || "Không xác định",
        },
        {
            key: "10",
            label: "Vai trò người tạo",
            children: selectedAppointment?.created_by?.role || "Không xác định",
        },
        {
            key: "11",
            label: "Dịch vụ",
            children: selectedAppointment?.services?.map(service => service.name).join(", ") || "Không có",
        },
        {
            key: "12",
            label: "Nhân viên thực hiện",
            children: selectedAppointment?.users?.map(user => user.full_name).join(", ") || "Không có",
        },
    ];

    const productColumns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Dịch Vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            render: (price) =>
                `${parseFloat(price).toLocaleString()} VNĐ`,
        },
        {
            title: "Thành tiền",
            dataIndex: "total_price",
            key: "total_price",
            render: (text, record) => {
                const totalPrice = record.quantity * parseFloat(record.price);
                return `${totalPrice.toLocaleString()} VNĐ`;
            },
        },
    ];

    return (
        <Modal
            title="Chi tiết lịch hẹn"
            open={isOpen}
            width={1000}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Descriptions bordered title="Thông tin lịch hẹn" items={items} column={2} />
            <Table
                title={() => "Danh sách dịch vụ"}
                columns={productColumns}
                dataSource={selectedAppointment?.services || []}
                rowKey="id"
                pagination={false}
            />
        </Modal>
    );
};

export default AppointmentsDetail;
