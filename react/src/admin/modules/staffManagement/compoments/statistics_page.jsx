import React from "react";
import { Row, Col, Statistic, Card, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Statistics_staff = ({ data }) => {
    return (
        <Row gutter={[16, 16]}>
            {/* Số giờ làm việc */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Thống kê lịch hẹn"
                        value={data?.countAppoinment_month || 0}
                        precision={0}
                        valueStyle={{
                            color: "#cf1322",
                        }}
                        suffix="Lịch hẹn"
                    />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong tuần:{" "}
                            {data?.countAppoinment_week || 0}
                        </strong>
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong ngày:{" "}
                            {data?.countAppoinment_today || 0}
                        </strong>
                    </Typography.Text>
                </Card>
            </Col>

            {/* Doanh thu cá nhân */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Thống kê tư vấn"
                        value={data?.countConsulation_month || 0}
                        precision={0}
                        valueStyle={{
                            color: "#cf1322",
                        }}
                        suffix="Lịch tư vấn"
                    />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch tư vấn trong tuần:{" "}
                            {data?.countConsulation_week || 0}
                        </strong>
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch tư vấn trong ngày:{" "}
                            {data?.countConsulation_today || 0}
                        </strong>
                    </Typography.Text>
                </Card>
            </Col>

            {/* Tổng Thanh toán */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={true}>
                    <Statistic
                        title={`Tổng tiền đã thực hiện`}
                        value={
                            data?.payment_today?.total_amount
                                ? parseInt(
                                      data.payment_today.total_amount
                                  ).toLocaleString() + " VNĐ"
                                : "0 VNĐ"
                        }
                        valueStyle={{ color: "#cf1322" }}
                    />
                    <Text type="secondary">
                        <strong>
                            Tiền mặt:{" "}
                            {data?.payment_today?.total_amount_cash
                                ? parseInt(
                                      data.payment_today.total_amount_cash
                                  ).toLocaleString() + " VNĐ"
                                : "0 VNĐ"}
                        </strong>
                    </Text>
                    <br />
                    <Text type="secondary">
                        <strong>
                            Chuyển khoản:{" "}
                            {data?.payment_today?.total_amount_transfer
                                ? parseInt(
                                      data.payment_today.total_amount_transfer
                                  ).toLocaleString() + " VNĐ"
                                : "0 VNĐ"}
                        </strong>
                    </Text>
                </Card>
            </Col>
        </Row>
    );
};

export default Statistics_staff;
