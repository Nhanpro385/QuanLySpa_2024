import React, { useEffect } from "react";
import { Card, Col, Row, Statistic, Progress, Typography } from "antd";
import CountUp from "react-countup";

const { Text } = Typography;

const formatter = (value) => <CountUp end={value} separator="," />;

const StatisticsSection = ({
    monthlyRevenues,
    weeklyRevenues,
    dailyRevenues,
    revenueAppointment,
    revenueConsulation,
}) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} md={24} sm={24} xs={24}>
                <Card title="Tổng quan doanh thu">
                    <Row gutter={[16, 16]} justify="center" align="middle">
                        <Progress
                            size={200}
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
            <Col xl={18} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card>
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
                            <br />
                            <Text type="success">Đã hoàn thành: </Text>
                        </Card>
                    </Col>
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card>
                            <Statistic
                                title="Số lượt đặt lịch Hôm nay"
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
                                {revenueAppointment.progress_appointment || 0}{" "}
                                lượt
                            </Text>{" "}
                            <br />
                            <Text type="danger">
                                Đã hủy:
                                {revenueAppointment.cancel_appointment ||
                                    0}{" "}
                                lượt
                            </Text>
                        </Card>
                    </Col>
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card>
                            <Statistic
                                title="Lịch hẹn tư vấn Hôm nay"
                                value={
                                    revenueConsulation.today_consulation || 0
                                }
                                precision={0}
                                valueStyle={{ color: "#1890ff" }}
                                suffix="lượt"
                                formatter={formatter}
                            />

                            <Text type="warning">
                                Đang yêu cầu:{" "}
                                {revenueConsulation.request_consulation || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="secondary">
                                Đang chờ tư vấn:{" "}
                                {revenueConsulation.progress_consulation || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="success">
                                Đã hoàn thành:{" "}
                                {revenueConsulation.complete_consulation || 0}{" "}
                                lượt
                            </Text>
                        </Card>
                    </Col>
                    <Col xl={8} md={12} sm={24} xs={24}>
                        <Card>
                            <Statistic
                                title="Lịch hủy"
                                value={
                                    (revenueConsulation.cancel_consulation ||
                                        0) +
                                    (revenueAppointment.cancel_appointment || 0)
                                }
                                precision={0}
                                valueStyle={{ color: "#cf1322" }}
                                suffix="lượt"
                                formatter={formatter}
                            />
                            <Text type="secondary">
                                Lịch hủy tư vấn:{" "}
                                {revenueConsulation.cancel_consulation || 0}{" "}
                                lượt
                            </Text>
                            <br />
                            <Text type="danger">
                                Lịch hủy dịch vụ:{" "}
                                {revenueAppointment.cancel_appointment || 0}{" "}
                                lượt
                            </Text>
                        </Card>
                    </Col>
                    {/* <Col xl={8} md={12} sm={24} xs={24}>
                        <Card>
                            <Statistic
                                title="Khách mới/trở lại"
                                value={58}
                                formatter={formatter}
                                precision={0}
                                valueStyle={{ color: "#3f8600" }}
                            />
                            <Text type="secondary">Khách mới: 12</Text>
                            <br />
                            <Text type="success">Khách quay lại: 46</Text>
                        </Card>
                    </Col> */}
                </Row>
            </Col>
        </Row>
    );
};

export default StatisticsSection;
