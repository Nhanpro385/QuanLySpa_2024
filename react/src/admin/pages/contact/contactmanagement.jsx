import {
    Button,
    Modal,
    Table,
    Input,
    Form,
    Select,
    Col,
    Row,
    notification,
    Card,
    Tag,
} from "antd";
import React, { useState, useEffect } from "react";
import useModal from "../../modules/appointments/hooks/openmodal";
import useContactActions from "../../modules/contact/hooks/usecontact";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
const { Option } = Select;

const ContactManagement = () => {
    const { fetchContacts, searchContacts, updateAdminContact } =
        useContactActions();
    const [api, contextHolder] = notification.useNotification();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [selectedContact, setSelectedContact] = useState(null); // State to hold selected contact
    const [contactData, setContactData] = useState([]); // State to hold contact data
    const contact = useSelector((state) => state.contact);
    const pagination = contact?.contacts?.data || {};
    const [searchquery, setSearchQuery] = useState({
        search: "",
        per_page: 10,
        page: 1,
    });

    useEffect(() => {
        document.title = "Quản lý liên hệ";
        fetchContacts();
    }, []);

    useEffect(() => {
        if (contact?.contacts?.data && contact?.contacts?.data.length > 0) {
            setContactData(
                contact?.contacts?.data?.map((item, index) => ({
                    key: index + 1,
                    ...item,
                }))
            );
        }
    }, [contact]);

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
            width: "10%",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "10%",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            width: "20%",
            render: (text) => (
                <span
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {text || "Không có ghi chú"}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status == 0 ? (
                    <Tag color="red">Chưa liên hệ</Tag>
                ) : (
                    <Tag color="green">Đã liên hệ</Tag>
                ),
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (_, record) => (
                <Button
                    type={record.status === 1 ? "default" : "primary"}
                    onClick={() => handleMarkAsContacted(record)}
                    disabled={record.status === 1}
                >
                   {record.status === 1 ? "Đã liên hệ" : "Đánh dấu đã liên hệ"}
                </Button>
            ),
        },
    ];

    const handleMarkAsContacted = async (contact) => {
        try {
            const res = await updateAdminContact({
                id: contact.id,
                data: { status: false },
            });
            if (res.payload.status === "success") {
                api.success({
                    message:
                        res?.payload?.message ||
                        "Cập nhật trạng thái thành công",
                });
                fetchContacts();
            } else {
                api.error({
                    message:
                        res?.payload?.message || "Cập nhật trạng thái thất bại",
                });
            }
        } catch (error) {
            console.error("Update failed:", error);
            api.error({ message: "Đã xảy ra lỗi khi cập nhật trạng thái" });
        }
    };

    const handleChangePage = (page, pageSize) => {
        setSearchQuery({
            ...searchquery,
            page: page,
            per_page: pageSize,
        });
    };

    useEffect(() => {
        if (
            searchquery.search !== "" ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 10
        ) {
            searchContacts(searchquery);
        } else {
            fetchContacts();
        }
    }, [searchquery]);

    return (
        <div>
            {contextHolder}
            <h1 className="text-center">Quản lý liên hệ</h1>
            <Card
                extra={
                    <Button
                        type="primary"
                        onClick={() => fetchContacts()}
                        loading={contact.loading}
                    >
                        Làm mới
                    </Button>
                }
            >
                <Table
                    loading={contact.loading}
                    scroll={{ x: 768 }}
                    columns={columns}
                    dataSource={contactData}
                    pagination={{
                        current: pagination.current_page,
                        pageSize: pagination.per_page,
                        total: pagination.total,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} mục`,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        responsive: true,
                        onChange: handleChangePage,
                    }}
                />
            </Card>

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
                        <p>
                            <strong>Tên:</strong> {selectedContact.name}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong>{" "}
                            {selectedContact.phone}
                        </p>
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
                        <p>
                            <strong>Ghi chú:</strong> {selectedContact.note}
                        </p>
                        <p>
                            <strong>Trạng thái:</strong>{" "}
                            {selectedContact.status}
                        </p>
                    </>
                ) : (
                    <p>Vui lòng chọn một liên hệ để xem chi tiết.</p>
                )}
            </Modal>
        </div>
    );
};

export default ContactManagement;
