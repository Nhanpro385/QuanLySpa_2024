import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import useModal from "../modules/appointments/hooks/openmodal";

const ContactManagement = () => {
  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
  const [selectedContact, setSelectedContact] = useState(null); // State to hold selected contact

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewDetail(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "ngueyn@gmail.com",
      note: "Gọi lại sau",
      status: "Chưa liên hệ",
    },
    {
      key: "2",
      name: "Trần Thị B",
      phone: "0987654321",
      email: "",
      note: "Hỏi thông tin sản phẩm",
      status: "Đã liên hệ",
    },
  ];

  const handleViewDetail = (contact) => {
    setSelectedContact(contact); // Set the selected contact details
    showModal(); // Show modal
  };

  return (
    <div>
      <h1>Quản lý liên hệ</h1>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Chi tiết liên hệ"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          handleCancel();
          setSelectedContact(null); // Clear selected contact on modal close
        }}
      >
        {selectedContact ? (
          <>
            <p><strong>Tên:</strong> {selectedContact.name}</p>
            <p><strong>Số điện thoại:</strong> {selectedContact.phone}</p>
            <p>
              <strong>Email:</strong>{" "}
              {selectedContact.email ? (
                <a href={`mailto:${selectedContact.email}`}>
                  {selectedContact.email}
                </a>
              ) : (
                "Không có email"
              )}
            </p>
            <p><strong>Ghi chú:</strong> {selectedContact.note}</p>
            <p><strong>Trạng thái:</strong> {selectedContact.status}</p>
          </>
        ) : (
          <p>Vui lòng chọn một liên hệ để xem chi tiết.</p>
        )}
      </Modal>
    </div>
  );
};

export default ContactManagement;
