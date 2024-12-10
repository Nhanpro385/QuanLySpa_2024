import React from "react";
import {
    Card,
    Col,
    Row,
    Statistic,
    Progress,
    Typography,
    Grid,
    DatePicker,
} from "antd";
import CountUp from "react-countup";
import style from "../style/StatisticsSection.module.scss";

const { Text } = Typography;
const { useBreakpoint } = Grid;

// Định dạng số với CountUp
const formatter = (value) => <CountUp end={value} separator="," />;

const StatisticsSection = ({
    monthlyRevenues,
    weeklyRevenues,
    dailyRevenues,
    revenueAppointment,
    revenueConsulation,
    date,
}) => {
    const screens = useBreakpoint();

    // Điều chỉnh kích thước Progress theo breakpoint
    const getProgressSize = () => {
        if (screens.xxl) return 200;
        if (screens.xl) return 200;
        if (screens.lg) return 200;
        if (screens.md) return 150;
        return 120;
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {/* Tổng quan doanh thu */}
                <Col xxl={6} xl={6} md={24} sm={24} xs={24}>
                    <Card
                        title={<div className="text-center">
                            <div>
                                <Text strong>Tổng doanh thu</Text>
                            </div>
                            <div>
                                {date}
                            </div>
                        </div>}
                        className={style.card}
                    >
                        <Row gutter={[16, 16]} justify="center" align="middle">
                            <Progress
                                size={getProgressSize()}
                                type="circle"
                                percent={Math.min(
                                    (parseInt(
                                        dailyRevenues?.total_revenue || 0
                                    ) /
                                        2000000) *
                                    100,
                                    100
                                )}
                                format={() =>
                                    parseInt(
                                        dailyRevenues?.total_revenue || 0
                                    ).toLocaleString() + " VND"
                                }
                            />
                        </Row>
                    </Card>
                </Col>

                {/* Chi tiết doanh thu */}
                <Col xxl={18} xl={18} md={24} sm={24} xs={24}>
                    <Row gutter={[16, 16]}>
                        {/* Doanh thu hôm nay */}
                        <Col xl={24} md={24} sm={24} xs={24}>
                            <Row gutter={[16, 16]}>
                                <Col xl={8} md={8} sm={24} xs={24}>
                                    <Card className={style.card}>
                                        <Statistic
                                            title="Doanh thu hôm nay"
                                            value={
                                                dailyRevenues?.total_revenue ||
                                                0
                                            }
                                            precision={0}
                                            valueStyle={{ color: "#85A98F" }}
                                            suffix="VND"
                                            formatter={formatter}
                                        />
                                        <Text
                                            type="secondary"
                                            style={{ display: "block" }}
                                        >
                                            Đang chờ:{" "}
                                            {parseInt(
                                                dailyRevenues?.pending_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                dailyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>
                                    </Card>
                                </Col>
                                <Col xl={8} md={8} sm={24} xs={24}>
                                    <Card className={style.card}>
                                        <Statistic
                                            title="Doanh thu tuần này"
                                            value={
                                                weeklyRevenues?.total_revenue ||
                                                0
                                            }
                                            style={{ display: "block" }}
                                            precision={0}
                                            valueStyle={{ color: "#5A6C57" }}
                                            suffix="VND"
                                            formatter={formatter}
                                        />
                                        <Text
                                            type="secondary"
                                            style={{ display: "block" }}
                                        >
                                            Đang chờ:{" "}
                                            {parseInt(
                                                weeklyRevenues?.pending_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                weeklyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>
                                    </Card>
                                </Col>
                                <Col xl={8} md={8} sm={24} xs={24}>
                                    <Card className={style.card}>
                                        <Statistic
                                            title="Doanh thu tháng này"
                                            value={
                                                monthlyRevenues?.total_revenue ||
                                                0
                                            }
                                            precision={0}
                                            valueStyle={{ color: "#525B44" }}
                                            suffix="VND"
                                            formatter={formatter}
                                        />
                                        <Text
                                            type="secondary"
                                            style={{ display: "block" }}
                                        >
                                            Đang chờ:{" "}
                                            {parseInt(
                                                monthlyRevenues?.pending_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                monthlyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VND
                                        </Text>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>

                        {/* Lượt đặt lịch hôm nay */}
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Số lượt đặt lịch Ngày: ${date}`}
                                    value={
                                        revenueAppointment.today_appointment ||
                                        0
                                    }
                                    style={{ display: "block" }}
                                    precision={0}
                                    valueStyle={{ color: "#1890ff" }}
                                    suffix="lượt"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Đang chờ:{" "}
                                    {revenueAppointment.progress_appointment ||
                                        0}{" "}
                                    lượt
                                </Text>

                                <Text
                                    type="success"
                                    style={{ display: "block" }}
                                >
                                    Đã hoàn thành:{" "}
                                    {revenueAppointment.completed_appointment ||
                                        0}{" "}
                                    lượt
                                </Text>
                            </Card>
                        </Col>

                        {/* Lịch hẹn tư vấn hôm nay */}
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Số lượt tư vấn Ngày: ${date}`}
                                    value={
                                        revenueConsulation.today_consulation ||
                                        0
                                    }
                                    style={{ display: "block" }}
                                    precision={0}
                                    jsx
                                    Sao
                                    chép
                                    mã
                                    valueStyle={{ color: "#722ed1" }}
                                    suffix="lượt"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Đang chờ:{" "}
                                    {revenueConsulation.progress_consulation ||
                                        0}{" "}
                                    lượt
                                </Text>

                                <Text
                                    type="success"
                                    style={{ display: "block" }}
                                >
                                    Đã hoàn thành:{" "}
                                    {revenueConsulation.completed_consulation ||
                                        0}{" "}
                                    lượt
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsSection;
