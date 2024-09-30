import { Button, Modal, Table, Input, Form, Select } from "antd";
import React, { useState } from "react";
import useModal from "../modules/appointments/hooks/openmodal";

const { Option } = Select;

const ContactManagement = () => {
  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
  const [selectedContact, setSelectedContact] = useState(null); // State to hold selected contact
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [editForm] = Form.useForm(); // Form instance for editing

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
        <>
          <Button type="primary" onClick={() => handleViewDetail(record)}>
            Xem chi tiết
          </Button>
          <Button type="default" onClick={() => handleEditContact(record)} style={{ marginLeft: "8px" }}>
            Sửa
          </Button>
        </>
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

  const handleEditContact = (contact) => {
    setSelectedContact(contact); // Set the selected contact
    editForm.setFieldsValue(contact); // Set form values with contact details
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleEditOk = () => {
    // Save the edited values
    editForm
      .validateFields()
      .then((values) => {
        // Update the data (you can replace this with API call or state update logic)
        console.log("Updated values:", values);
        setIsEditModalOpen(false); // Close modal
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false); // Close edit modal
  };

  return (
    <div>
      <h1>Quản lý liên hệ</h1>
      <Table columns={columns} dataSource={data} />

      {/* Modal for viewing contact details */}
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

      {/* Modal for editing contact */}
      <Modal
        title="Sửa thông tin liên hệ"
        visible={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
            <Select>
              <Option value="Chưa liên hệ">Chưa liên hệ</Option>
              <Option value="Đã liên hệ">Đã liên hệ</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactManagement;
