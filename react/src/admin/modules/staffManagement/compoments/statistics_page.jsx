import React from "react";
import { Row, Col, Statistic, Card, Typography } from "antd";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LikeOutlined,
    UserOutlined,
} from "@ant-design/icons";

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
                            color: "#3f8600",
                        }}
                        suffix="Lịch hẹn"
                    />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong tuần :{" "}
                            {data?.countAppoinment_week || 0}
                        </strong>
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong Ngày :{" "}
                            {data?.countAppoinment_today || 0}
                        </strong>
                    </Typography.Text>
                </Card>
            </Col>
            {/* Doanh thu cá nhân */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Thống kê lịch tư vấn"
                        value={data?.countConsulation_month || 0}
                        precision={0}
                        valueStyle={{
                            color: "#cf1322",
                        }}
                        suffix="Lịch tư vấn"
                    />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong tuần :{" "}
                            {data?.countAppoinment_week || 0}
                        </strong>
                    </Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                        <strong>
                            Lịch hẹn trong Ngày :{" "}
                            {data?.countAppoinment_today || 0}
                        </strong>
                    </Typography.Text>
                </Card>
            </Col>
        </Row>
    );
};

export default Statistics_staff;
