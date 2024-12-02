import React from "react";
import { Card, Col, Row, Statistic, Progress, Typography, Grid } from "antd";
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
}) => {
    const screens = useBreakpoint();

    // Điều chỉnh kích thước Progress theo breakpoint
    const getProgressSize = () => {
        if (screens.xxl) return 300;
        if (screens.xl) return 250;
        if (screens.lg) return 200;
        if (screens.md) return 150;
        return 120;
    };

    return (
        <Row gutter={[16, 16]}>
            {/* Tổng quan doanh thu */}
            <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
                <Card title="Tổng quan doanh thu" className={style.card}>
                    <Row gutter={[16, 16]} justify="center" align="middle">
                        <Progress
                            size={getProgressSize()}
                            type="circle"
                            percent={Math.min(
                                (parseInt(monthlyRevenues?.total_revenue || 0) /
                                    2000000) *
                                    100,
                                100
                            )}
                            format={() =>
                                parseInt(
                                    monthlyRevenues?.total_revenue || 0
                                ).toLocaleString() + " VND"
                            }
                        />
                    </Row>
                </Card>
            </Col>

            {/* Chi tiết doanh thu */}
            <Col xxl={18} xl={18} md={12} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                    {/* Doanh thu hôm nay */}
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card className={style.card}>
                            <Statistic
                                title="Doanh thu hôm nay"
                                value={dailyRevenues?.total_revenue || 0}
                                precision={0}
                                valueStyle={{ color: "#3f8600" }}
                                suffix="VND"
                                formatter={formatter}
                            />
                            <Text type="secondary">
                                Đang chờ: {dailyRevenues?.pending_revenue || 0}{" "}
                                VND
                            </Text>
                            <br />
                            <Text type="success">
                                Đã hoàn thành:{" "}
                                {dailyRevenues?.completed_revenue || 0} VND
                            </Text>
                        </Card>
                    </Col>

                    {/* Lượt đặt lịch hôm nay */}
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card className={style.card}>
                            <Statistic
                                title="Số lượt đặt lịch hôm nay"
                                value={
                                    revenueAppointment.today_appointment || 0
                                }
                                precision={0}
                                valueStyle={{ color: "#1890ff" }}
                                suffix="lượt"
                                formatter={formatter}
                            />
                            <Text type="secondary">
                                Đang chờ:{" "}
                                {revenueAppointment.progress_appointment || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="success">
                                Đã hoàn thành:{" "}
                                {revenueAppointment.completed_appointment || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="danger">
                                Đã hủy:{" "}
                                {revenueAppointment.cancel_appointment || 0}{" "}
                                lượt
                            </Text>
                        </Card>
                    </Col>

                    {/* Lịch hẹn tư vấn hôm nay */}
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card className={style.card}>
                            <Statistic
                                title="Lịch hẹn tư vấn hôm nay"
                                value={
                                    revenueConsulation.today_consulation || 0
                                }
                                precision={0}
                                jsx
                                Sao
                                chép
                                mã
                                valueStyle={{ color: "#722ed1" }}
                                suffix="lượt"
                                formatter={formatter}
                            />
                            <Text type="secondary">
                                Đang chờ:{" "}
                                {revenueConsulation.progress_consulation || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="success">
                                Đã hoàn thành:{" "}
                                {revenueConsulation.completed_consulation || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="danger">
                                Đã hủy:{" "}
                                {revenueConsulation.cancel_consulation || 0}{" "}
                                lượt
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default StatisticsSection;
