import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    DatePicker,
    Dropdown,
    Row,
    Space,
    Table,
    Tag,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

import StatisticsSection from "../../modules/home/compoment/StatisticsSection";
import TableSection from "../../modules/home/compoment/TableSection";
import useStatisticsAction from "../../modules/home/hooks/useStatisticsAction";
import { useSelector } from "react-redux";
import useDate from "../../modules/home/hooks/useDate";
import usepaymentActions from "../../modules/payments/hooks/usepaymentAction";
import useconsulationsAction from "../../modules/consulations/hooks/useconsulationsAction";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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
            title: "Tổng tiền",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (text) => parseInt(text).toLocaleString() + " VNĐ",
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "payment_type",
            key: "payment_type",
            render: (text) => (text == 0 ? "Tiền mặt" : "Chuyển khoản"),
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
    const [staffConsulationsColumns, setStaffConsulationsColumns] = useState([
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Nhân viên",
            dataIndex: "full_name",
            key: "full_name",
            render: (text) => text || "Không tìm thấy",
        },
        {
            title: "Số lần tư vấn",
            dataIndex: "total",
            key: "total",
            render: (text) => text || "Không tìm thấy",
        },
    ]);
    const [staffAppoimentsColumns, setStaffAppoimentsColumns] = useState([
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Nhân viên",
            dataIndex: "full_name",
            key: "full_name",
            render: (text) => text || "Không tìm thấy",
        },
        {
            title: "Số lần Dịch vụ",
            dataIndex: "total",
            key: "total",
            render: (text) => text || "Không tìm thấy",
        },
    ]);

    const [monthlyRevenues, setMonthlyRevenues] = useState({});
    const [weeklyRevenues, setWeeklyRevenues] = useState({});
    const [dailyRevenues, setDailyRevenues] = useState({});
    const [revenueAppointment, setRevenueAppointment] = useState({});
    const [revenueConsulation, setRevenueConsulation] = useState({});
    const [staffConsulations, setStaffConsulations] = useState([]);
    const [staffAppoiments, setStaffAppoiments] = useState([]);
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
        getStaffConsulations,
        getStaffAppoiments,
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
            day: formatDate2,
        });
        getRevenueAppointment({
            day: formatDate2,
        });
        getRevenueConsulation({
            day: formatDate2,
        });
        getpayment(100);
        getconsulations(100);
        getStaffConsulations({
            day: formatDate2,
        });
        getStaffAppoiments({
            day: formatDate2,
        });
    }, [day, month, year, isoWeek, formatDate2]);

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
        if (statistical.staffConsulations) {
            setStaffConsulations(statistical.staffConsulations.data);
        }
        if (statistical.staffAppoiments) {
            setStaffAppoiments(statistical.staffAppoiments.data);
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
            <Row className="mb-3" gutter={16}>
                <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                    <DatePicker
                        value={dayjs(formattedDate, "DD/MM/YYYY")}
                        className="w-100"
                        format="DD/MM/YYYY"
                        onChange={(date, dateString) => {
                            if (date) {
                                setDate(new Date(date.toDate())); // Chuyển đổi từ dayjs sang Date object
                            }
                        }}
                    />
                </Col>
            </Row>
            <StatisticsSection
                date={formattedDate}
                monthlyRevenues={monthlyRevenues}
                weeklyRevenues={weeklyRevenues}
                dailyRevenues={dailyRevenues}
                revenueAppointment={revenueAppointment}
                revenueConsulation={revenueConsulation}
            />
            <TableSection
                staffConsulations={staffConsulations}
                staffAppoiments={staffAppoiments}
                transactionData={transactionData}
                appointmentData={appointmentData} // Ensure data is set
                transactionColumns={transactionColumns} // Fixed here
                appointmentColumns={appointmentColumns} // Add your appointment columns
                staffConsulationsColumns={staffConsulationsColumns}
                staffAppoimentsColumns={staffAppoimentsColumns}
            />
        </div>
    );
};

export default Dashboard;
