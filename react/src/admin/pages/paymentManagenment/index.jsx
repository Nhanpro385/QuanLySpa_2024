import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Select, notification } from "antd";
import useModal from "../../modules/appointments/hooks/openmodal";
import InvoiceTable from "../../modules/payments/compoments/InvoiceTable";
import PaymentModal from "../../modules/payments/compoments/PaymentModal";
import usepaymentActions from "../../modules/payments/hooks/usepaymentAction";
import PaymentModalDetail from "../../modules/payments/compoments/PaymentModalDetail";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
import PaymentModalAddnew from "../../modules/payments/compoments/PaymentModalAddnew";
import { generateSnowflakeId } from "../../utils";
import debounce from "lodash/debounce";
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
    const {
        isModalOpen: isPaymentModalOpen3,
        showModal: showPaymentModal3,
        handleCancel: closePaymentModal3,
    } = useModal();
    const [paymendata, setPaymentData] = useState([]);
    const payments = useSelector((state) => state.payments);
    const { getpayment, addpayment, updatepayment, getpaymentById,searchpayment } =
        usepaymentActions();
    useEffect(() => {
        getpayment();
    }, []);
    const [searchquery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    const OnchangePage = (page, pagination) => {
        setSearchQuery((prev) => ({
            ...prev,
            page: page,
            per_page: pagination,
        }));
    };
    const pagination = payments?.Payments?.meta || {};
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

    const handleActionClick = async (e, record) => {
        if (e.key === "3") {
            showPaymentModal();

            setSelectedInvoice(() => record);
        } else if (e.key === "2") {
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
    useEffect(() => {
        if (
            searchquery.search !== "" ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 5
        ) {
            searchpayment(searchquery);
        } else {
            getpayment();
        }
    }, [searchquery]);
    const handlePaymentSubmit = async (values) => {
        try {
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
    const handleaddnewpayment = async (data) => {
        try {
            const payload = {
                id: generateSnowflakeId(),
                ...data,
            };
            const res = await addpayment(payload);
            console.log(res);

            if (res.payload.status === "success") {
                api.success({
                    message: "Thêm thanh toán thành công",
                    duration: 3,
                });

                closePaymentModal3();
                getpayment();
            } else {
                api.error({
                    message: res.payload.message || "Có lỗi xảy ra",
                    duration: 3,
                    description: res.payload.error || "",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const OnsearchPayment = debounce((value) => {
        setSearchQuery((prev) => ({
            ...prev,
            search: value,
        }));
    }
    , 500);
    return (
        <>
            <h1 className="text-center">Quản lý thanh toán</h1>
            <Row gutter={[16, 16]}>
                {contextHolder}
                <Col span={24}>
                    <Card
                        title="Lịch sử thanh toán"
                        extra={
                            <Button
                                type="primary"
                                onClick={() => showPaymentModal3()}
                            >
                                Thêm thanh toán
                            </Button>
                        }
                    >
                        <Row gutter={[16, 16]} className="mb-3">
                            <Col xxl={3} xl={4} lg={6} md={6} sm={6} xs={6}>
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
                            <Col xxl={3} xl={4} lg={6} md={6} sm={6} xs={6}>
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
                            <Col xxl={6} xl={8} lg={12} md={12} sm={12} xs={12}>
                                <Input.Search
                                    onChange={(e) => OnsearchPayment(e.target.value)}
                                    onSearch={(value) => OnsearchPayment(value)}
                                placeholder="Tìm kiếm theo mã hóa đơn hoặc tên khách hàng" />
                            </Col>
                        </Row>
                        <InvoiceTable
                            OnchangePage={OnchangePage}
                            loading={payments.loading}
                            data={paymendata}
                            onActionClick={handleActionClick}
                            pagination={pagination}
                        />
                    </Card>
                </Col>
            </Row>

            <PaymentModal
                data={selectedInvoice}
                isOpen={isPaymentModalOpen}
                onClose={closePaymentModal}
                onSubmit={handlePaymentSubmit}
            />
            <PaymentModalDetail
                isOpen={isPaymentModalOpen2}
                onClose={closePaymentModal2}
                selectedInvoice={selectedInvoice} // Truyền selectedInvoice vào modal
            />
            <PaymentModalAddnew
                isOpen={isPaymentModalOpen3}
                onClose={closePaymentModal3}
                onSubmit={handleaddnewpayment}
            />
        </>
    );
};

export default PaymentManagement;
