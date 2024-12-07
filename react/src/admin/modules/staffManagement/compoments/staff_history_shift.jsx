import React from "react";
import { Col, Row, Select, DatePicker, Space, Card, Tag, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    PlayCircleOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const Staff_history_shift = () => {
    return (
        <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                        <Select className="w-100" placeholder="Bộ lọc">
                            <Select.Option key={1}>Mới nhất</Select.Option>
                            <Select.Option key={2}>Cũ nhất</Select.Option>
                        </Select>
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                        <RangePicker format={dateFormat} className="w-100" />
                    </Col>
                </Row>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24} className="mt-3">
                <Row gutter={[16, 16]}>
                    <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Card
                            className=""
                            bordered={false}
                            style={{
                                backgroundColor: "#fafafa",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Trị Mụn </h3>
                                <Button shape="circle">
                                    <RightCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Button>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>15:37:15</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <DollarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>500,000đ</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CalendarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>01/03/2023</span>
                                </div>
                            </div>
                            <Tag color="green" style={{ marginTop: "10px" }}>
                                Hoàn thành
                            </Tag>
                        </Card>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Card
                            className=""
                            bordered={false}
                            style={{
                                backgroundColor: "#fafafa",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Trị Mụn </h3>
                                <Button shape="circle">
                                    <RightCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Button>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>15:37:15</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <DollarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>500,000đ</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CalendarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>01/03/2023</span>
                                </div>
                            </div>
                            <Tag color="green" style={{ marginTop: "10px" }}>
                                Hoàn thành
                            </Tag>
                        </Card>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Card
                            className=""
                            bordered={false}
                            style={{
                                backgroundColor: "#fafafa",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Trị Mụn </h3>
                                <Button shape="circle">
                                    <RightCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Button>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>15:37:15</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <DollarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>500,000đ</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CalendarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>01/03/2023</span>
                                </div>
                            </div>
                            <Tag color="green" style={{ marginTop: "10px" }}>
                                Hoàn thành
                            </Tag>
                        </Card>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Card
                            className=""
                            bordered={false}
                            style={{
                                backgroundColor: "#fafafa",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Trị Mụn </h3>
                                <Button shape="circle">
                                    <RightCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Button>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>15:37:15</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <DollarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>500,000đ</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CalendarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>01/03/2023</span>
                                </div>
                            </div>
                            <Tag color="green" style={{ marginTop: "10px" }}>
                                Hoàn thành
                            </Tag>
                        </Card>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                        <Card
                            className=""
                            bordered={false}
                            style={{
                                backgroundColor: "#fafafa",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3>Trị Mụn </h3>
                                <Button shape="circle">
                                    <RightCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Button>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <ClockCircleOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>15:37:15</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <DollarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>500,000đ</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CalendarOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span>01/03/2023</span>
                                </div>
                            </div>
                            <Tag color="green" style={{ marginTop: "10px" }}>
                                Hoàn thành
                            </Tag>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
export default Staff_history_shift;
