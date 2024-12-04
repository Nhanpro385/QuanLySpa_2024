import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

import StatisticsSection from "../../modules/home/compoment/StatisticsSection";
import TableSection from "../../modules/home/compoment/TableSection";
import useStatisticsAction from "../../modules/home/hooks/useStatisticsAction";
import { useSelector } from "react-redux";
import useDate from "../../modules/home/hooks/useDate";
import usepaymentActions from "../../modules/payments/hooks/usepaymentAction";
import useconsulationsAction from "../../modules/consulations/hooks/useconsulationsAction";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    useEffect(() => {
        document.title = "Sakura Spa - Quản lý";
    }, []);
    const navigate = useNavigate();
    const [transactionData, setTransactionData] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]); // Fixed here
    const [transactionColumns, setTransactionColumns] = useState([
        {
            title: "#",
            key: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Mã hóa đơn",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            render: (text) => text || "Chưa có",
        },
        { title: "Tổng tiền", dataIndex: "total_amount", key: "total_amount" },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment_type",
            key: "payment_type",
            render: (text) => (text == 1 ? "Tiền mặt" : "Chuyển khoản"),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) =>
                status == 1 ? (
                    <Tag color="green">Đã thanh toán</Tag>
                ) : (
                    <Tag color="red">Chưa thanh toán</Tag>
                ),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "2",
                                label: (
                                    <Button
                                        onClick={() => {
                                            navigate(`/admin/thanhtoan`);
                                        }}
                                        block
                                    >
                                        Chi tiết
                                    </Button>
                                ),
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary">
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ]);
    const [appointmentColumns, setAppointmentColumns] = useState([
        {
            title: "#",
            key: "index",
            align: "center",
            width: 50,
            render: (text, record, index) => index + 1,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            width: 200,
            ellipsis: true,
            render: (text) => text?.full_name || "Không tìm thấy",
        },
        {
            title: "Nhân viên",
            dataIndex: "staff_id",
            key: "staff_id",
            width: 200,
            ellipsis: true,
            render: (text) => text?.fullname || "Không tìm thấy",
        },
        {
            title: "Số điện thoại",
            dataIndex: "customer",
            key: "phone",
            width: 150,
            align: "center",
            render: (text) => text?.phone || "Không tìm thấy",
        },
        {
            title: "Kế hoạch tư vấn",
            dataIndex: "treatment_plan",
            key: "treatment_plan",
            width: 250,
            ellipsis: true,
            render: (plan) => plan || "Không tìm thấy",
        },
        {
            title: "Tình trạng da",
            dataIndex: "skin_condition",
            key: "skin_condition",
            width: 250,
            ellipsis: true,
            render: (condition) => condition || "Không tìm thấy",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 150,
            align: "center",
            render: (status) =>
                status === 0 ? (
                    <Tag color="warning">Đang chờ xác nhận</Tag>
                ) : status === 1 ? (
                    <Tag color="processing"> Đã xác nhận đang chờ tư vấn</Tag>
                ) : (
                    <Tag color="success">Hoàn thành</Tag>
                ),
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            width: 200,
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "2",
                                label: (
                                    <Button
                                        onClick={() => {
                                            navigate(`/admin/tuvankhachhang`);
                                        }}
                                        block
                                    >
                                        Chi tiết
                                    </Button>
                                ),
                            },
                        ],
                        onClick: (e) => onClick({ key: e.key, record }),
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary" onClick={(e) => e.stopPropagation()}>
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ]);

    const [monthlyRevenues, setMonthlyRevenues] = useState({});
    const [weeklyRevenues, setWeeklyRevenues] = useState({});
    const [dailyRevenues, setDailyRevenues] = useState({});
    const [revenueAppointment, setRevenueAppointment] = useState({});
    const [revenueConsulation, setRevenueConsulation] = useState({});

    const {
        formattedDate,
        day,
        month,
        year,
        weekDay,
        isoWeek,
        weekOfMonth,
        setDate,
        formatDate2,
    } = useDate();

    const {
        getMonthlyRevenues,
        getWeeklyRevenues,
        getDailyRevenues,
        getRevenueConsulation,
        getRevenueAppointment,
    } = useStatisticsAction();
    const { getconsulations } = useconsulationsAction();
    const { getpayment } = usepaymentActions();
    const statistical = useSelector((state) => state.statistical);
    const payment = useSelector((state) => state.payments);
    const consulations = useSelector((state) => state.consulations);

    useEffect(() => {
        getMonthlyRevenues({
            month: month,
            year: year,
        });
        getWeeklyRevenues({
            week: isoWeek,
            year: year,
        });
        getDailyRevenues({
            day: day,
        });
        getRevenueAppointment({
            day: formatDate2,
        });
        getRevenueConsulation({
            day: formatDate2,
        });
        getpayment(100);
        getconsulations(100);
    }, []);

    useEffect(() => {
        if (statistical.monthlyRevenues) {
            setMonthlyRevenues(statistical.monthlyRevenues.data);
        }
        if (statistical.weeklyRevenues) {
            setWeeklyRevenues(statistical.weeklyRevenues.data);
        }
        if (statistical.dailyRevenues) {
            setDailyRevenues(statistical.dailyRevenues.data);
        }
        if (statistical.revenueAppointment?.data) {
            setRevenueAppointment(statistical.revenueAppointment.data);
        } else {
            setRevenueAppointment([]);
        }
        if (statistical.revenueConsulation?.data) {
            setRevenueConsulation(statistical.revenueConsulation.data);
        } else {
            setRevenueConsulation([]);
        }
    }, [statistical]);

    useEffect(() => {
        if (payment.Payments && payment.Payments.data) {
            setTransactionData(
                payment.Payments?.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        } else {
            setTransactionData([]);
        }
    }, [payment]);

    useEffect(() => {
        console.log(consulations);
        if (consulations.consulations && consulations.consulations.data) {
            setAppointmentData(
                consulations.consulations?.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        } else {
            setAppointmentData([]);
        }
    }, [consulations]);

    return (
        <div style={{ padding: 20 }}>
            <StatisticsSection
                monthlyRevenues={monthlyRevenues}
                weeklyRevenues={weeklyRevenues}
                dailyRevenues={dailyRevenues}
                revenueAppointment={revenueAppointment}
                revenueConsulation={revenueConsulation}
            />
            <TableSection
                transactionData={transactionData}
                appointmentData={appointmentData} // Ensure data is set
                transactionColumns={transactionColumns} // Fixed here
                appointmentColumns={appointmentColumns} // Add your appointment columns
            />
        </div>
    );
};

export default Dashboard;
