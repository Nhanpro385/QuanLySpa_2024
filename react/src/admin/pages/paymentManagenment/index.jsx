import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Select, notification } from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";
import InvoiceTable from "../../modules/payments/compoments/InvoiceTable";
import PaymentModal from "../../modules/payments/compoments/PaymentModal";
import usepaymentActions from "../../modules/payments/hooks/usepaymentAction";
import PaymentModalDetail from "../../modules/payments/compoments/PaymentModalDetail";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
const PaymentManagement = () => {
    const [api, contextHolder] = notification.useNotification();
    const { isModalOpen, showModal, handleCancel } = useModal();
    const [errorpayment, setErrorpayment] = useState({});
    const {
        isModalOpen: isPaymentModalOpen,
        showModal: showPaymentModal,
        handleCancel: closePaymentModal,
    } = useModal();
    const {
        isModalOpen: isPaymentModalOpen2,
        showModal: showPaymentModal2,
        handleCancel: closePaymentModal2,
    } = useModal();
    const [paymendata, setPaymentData] = useState([]);
    const payments = useSelector((state) => state.payments);
    const { getpayment, addpayment, updatepayment, getpaymentById } =
        usepaymentActions();
    useEffect(() => {
        getpayment();
    }, []);
    useEffect(() => {
        if (payments?.Payments?.data && !payments.loading) {
            setPaymentData(
                payments?.Payments?.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
    }, [payments]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const data = [
        {
            key: "1",
            appointmentId: "HD001",
            name: "Nguyễn Văn A",
            total: "100.000 VNĐ",
            paymentMethod: "Thẻ tín dụng",
            date: "01/01/2021",
            tags: ["Đã thanh toán"],
        },
        {
            key: "2",
            appointmentId: "HD002",
            name: "Nguyễn Văn B",
            total: "200.000 VNĐ",
            paymentMethod: "Tiền mặt",
            date: "02/01/2021",
            tags: ["Đã thanh toán"],
        },
    ];

    const handleActionClick = async (e, record) => {
        if (e.key === "3") {
            showPaymentModal();
            setSelectedInvoice(record);
        } else if (e.key === "2") {
            // showPaymentModal2();
            // setSelectedInvoice(record);
            try {
                const res = await getpaymentById(record.id);
                if (res.payload.status === "success") {
                    setSelectedInvoice((prev) =>
                        res.payload.data ? res.payload.data : prev
                    );
                    showPaymentModal2();
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    const detailpayment = (values) => {};
    const handlePaymentSubmit = async (values) => {
        try {
            console.log(values);

            const payload = {
                promotion_name: values.promotion_name,
                payment_type: values.paymentMethod,
                products: values.products.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                })),
                status: values.status,
            };

            const res = await updatepayment({
                id: selectedInvoice.id,
                data: payload,
            });

            if (res.payload.status === "success") {
                api.success({
                    message: "Cập nhật thanh toán thành công",
                    duration: 3,
                });

                closePaymentModal();
                getpayment();
            } else {
                api.error({
                    message: res.payload.message || "Có lỗi xảy ra",
                    duration: 3,
                    description: res.payload.errors["promotion_name"] || "",
                });
                setErrorpayment((prev) => res.payload.errors || {});
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1 className="text-center">Quản lý thanh toán</h1>
            <Row gutter={[16, 16]}>
                {contextHolder}
                <Col span={24}>
                    <Card title="Lịch sử thanh toán">
                        <Row gutter={[16, 16]} className="mb-3">
                            <Col span={6}>
                                <Select
                                    placeholder="Sắp xếp"
                                    className="w-100"
                                    defaultValue="newest"
                                >
                                    <Select.Option value="newest">
                                        Mới nhất
                                    </Select.Option>
                                    <Select.Option value="oldest">
                                        Cũ nhất
                                    </Select.Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Select
                                    placeholder="Lọc theo"
                                    className="w-100"
                                    defaultValue="all"
                                >
                                    <Select.Option value="all">
                                        Tất cả
                                    </Select.Option>
                                    <Select.Option value="paid">
                                        Đã thanh toán
                                    </Select.Option>
                                    <Select.Option value="unpaid">
                                        Chưa thanh toán
                                    </Select.Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Input.Search placeholder="Tìm kiếm theo mã hóa đơn hoặc tên khách hàng" />
                            </Col>
                        </Row>
                        <InvoiceTable
                            loading={payments.loading}
                            data={paymendata}
                            onActionClick={handleActionClick}
                        />
                    </Card>
                </Col>
            </Row>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={closePaymentModal}
                onSubmit={handlePaymentSubmit}
            />
            <PaymentModalDetail
                isOpen={isPaymentModalOpen2}
                onClose={closePaymentModal2}
                selectedInvoice={selectedInvoice} // Truyền selectedInvoice vào modal
            />
        </>
    );
};

export default PaymentManagement;
