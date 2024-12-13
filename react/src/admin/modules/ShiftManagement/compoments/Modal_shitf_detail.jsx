import React, { useEffect } from "react";
import { Button, Descriptions, Modal, Table } from "antd";

const ModalShiftDetail = ({ isOpen, onClose, selectedShif }) => {
    useEffect(() => {
        if (selectedShif) {
            console.log(selectedShif);
        }
    }, [selectedShif]);

    const items = [
        {
            key: "1",
            label: "Mã ca làm việc",
            children: selectedShif?.id || "Không có",
        },
        {
            key: "2",
            label: "Ngày làm việc",
            children: selectedShif?.shift_date || "Không có",
        },
        {
            key: "3",
            label: "Giờ bắt đầu",
            children: selectedShif?.start_time || "Không có",
        },
        {
            key: "4",
            label: "Giờ kết thúc",
            children: selectedShif?.end_time || "Không có",
        },
        {
            key: "5",
            label: "Số lượng khách tối đa",
            children: selectedShif?.max_customers || "Không có",
        },
        {
            key: "6",
            label: "Ghi chú",
            children: selectedShif?.note || "Không có",
        },
        {
            key: "7",
            label: "Người tạo",
            children: selectedShif?.created_by?.name || "Không xác định",
        },
        {
            key: "8",
            label: "Vai trò người tạo",
            children: selectedShif?.created_by?.role == 0 ? "Quản lý" : "Nhân viên",
        },
    ];

    const staffColumns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên nhân viên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role) => (role === 1 ? "Nhân viên" : "Quản lý"),
        },
    ];

    return (
        <Modal
            title="Chi tiết ca làm việc"
            open={isOpen}
            width={800}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
        >
            <Descriptions bordered title="Thông tin ca làm việc" items={items} column={2} />
            <Table
                title={() => "Danh sách nhân viên tham gia"}
                columns={staffColumns}
                dataSource={selectedShif?.staffs || []}
                rowKey="id"
                pagination={false}
            />
        </Modal>
    );
};

export default ModalShiftDetail;