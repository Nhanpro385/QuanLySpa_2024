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
                        title={
                            <div className="text-center">
                                <div>
                                    <Text strong>Tổng doanh thu</Text>
                                </div>
                                <div>{date}</div>
                            </div>
                        }
                        className={style.card}
                    >
                        <Row gutter={[16, 16]} justify="center" align="middle">
                            <Progress
                                strokeColor={{
                                    "0%": "#e05265",
                                    "100%": "#e05265",
                                }}
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
                                format={() => (
                                    <p
                                        style={
                                            {
                                                color: "#e05265",
                                            }
                                        }
                                    >
                                        {parseInt(
                                            dailyRevenues?.total_revenue || 0
                                        ).toLocaleString()}
                                    </p>
                                )}
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
                                            valueStyle={{ color: "#e05265" }}
                                            suffix="VNĐ"
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
                                            VNĐ
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                dailyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VNĐ
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
                                            valueStyle={{ color: "#e05265" }}
                                            suffix="VNĐ"
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
                                            VNĐ
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                weeklyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VNĐ
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
                                            valueStyle={{ color: "#e05265" }}
                                            suffix="VNĐ"
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
                                            VNĐ
                                        </Text>

                                        <Text
                                            type="success"
                                            style={{ display: "block" }}
                                        >
                                            Đã hoàn thành:{" "}
                                            {parseInt(
                                                monthlyRevenues?.completed_revenue
                                            ).toLocaleString() || 0}{" "}
                                            VNĐ
                                        </Text>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Tổng tiền mặt`}
                                    value={dailyRevenues?.cash_revenue || 0}
                                    style={{ display: "block" }}
                                    precision={0}
                                    jsx
                                    Sao
                                    chép
                                    mã
                                    valueStyle={{ color: "#e05265" }}
                                    suffix="VNĐ"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Số lượt :{dailyRevenues?.cash_count || 0}{" "}
                                    lượt
                                </Text>
                            </Card>
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Tổng tiền chuyển khoản`}
                                    value={dailyRevenues?.transfer_revenue || 0}
                                    style={{ display: "block" }}
                                    precision={0}
                                    jsx
                                    Sao
                                    chép
                                    mã
                                    valueStyle={{ color: "#e05265" }}
                                    suffix="VNĐ"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Số lượt :
                                    {dailyRevenues?.transfer_count || 0} lượt
                                </Text>
                            </Card>
                        </Col>
                        {/* Lượt đặt lịch hôm nay */}
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Số lượt đặt lịch Ngày: ${date}`}
                                    value={
                                        revenueAppointment?.today_appointment ||
                                        0
                                    }
                                    style={{ display: "block" }}
                                    precision={0}
                                    valueStyle={{ color: "#e05265" }}
                                    suffix="lượt"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Đang thực hiện:{" "}
                                    {revenueAppointment?.progress_appointment ||
                                        0}{" "}
                                    lượt
                                </Text>

                                <Text
                                    type="success"
                                    style={{ display: "block" }}
                                >
                                    Đã hoàn thành:{" "}
                                    {revenueAppointment?.completed_appointment ||
                                        0}{" "}
                                    lượt
                                </Text>
                            </Card>
                        </Col>

                        {/* Lịch hẹn tư vấn hôm nay */}
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Card className={style.card}>
                                <Statistic
                                    title={`Số lượt tư vấn Ngày: ${date}`}
                                    value={
                                        revenueConsulation?.today_consulation ||
                                        0
                                    }
                                    style={{ display: "block" }}
                                    precision={0}
                                    jsx
                                    Sao
                                    chép
                                    mã
                                    valueStyle={{ color: "#e05265" }}
                                    suffix="lượt"
                                    formatter={formatter}
                                />
                                <Text
                                    type="secondary"
                                    style={{ display: "block" }}
                                >
                                    Đang thực hiện:{" "}
                                    {revenueConsulation?.progress_consulation ||
                                        0}{" "}
                                    lượt
                                </Text>

                                <Text
                                    type="success"
                                    style={{ display: "block" }}
                                >
                                    Đã hoàn thành:{" "}
                                    {revenueConsulation?.complete_consulation ||
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
