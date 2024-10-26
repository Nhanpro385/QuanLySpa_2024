import React from "react";
import { Row, Col, Statistic, Card } from "antd";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LikeOutlined,
    UserOutlined,
} from "@ant-design/icons";

const Statistics_staff = () => {
    return (
        <Row gutter={[16,16]}>
            {/* Số giờ làm việc */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Số giờ làm việc"
                        value={130}
                        precision={0}
                        valueStyle={{
                            color: "#3f8600",
                        }}
                        suffix="Tiếng"
                        prefix={<ArrowUpOutlined />}
                    />
                </Card>
            </Col>
            {/* Doanh thu cá nhân */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Doanh thu cá nhân"
                        value={3000000}
                        precision={0}
                        valueStyle={{
                            color: "#cf1322",
                        }}
                        suffix="đ"
                        prefix={<ArrowDownOutlined />}
                    />
                </Card>
            </Col>
            {/* Số lượng khách hàng mới */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Khách hàng mới"
                        value={25}
                        precision={0}
                        valueStyle={{
                            color: "#3f8600",
                        }}
                        prefix={<UserOutlined />}
                    />
                </Card>
            </Col>
            {/* Tỷ lệ hoàn thành chỉ tiêu */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Tỷ lệ hoàn thành chỉ tiêu"
                        value={85}
                        precision={0}
                        valueStyle={{
                            color: "#3f8600",
                        }}
                        suffix="%"
                        prefix={<ArrowUpOutlined />}
                    />
                </Card>
            </Col>
            {/* Đánh giá trung bình */}
            <Col xl={6} lg={6} md={6} sm={12} xs={24}>
                <Card bordered={false}>
                    <Statistic
                        title="Đánh giá trung bình"
                        value={4.5}
                        precision={1}
                        valueStyle={{
                            color: "#faad14",
                        }}
                        suffix="/ 5"
                        prefix={<LikeOutlined />}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Statistics_staff;
