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
            <Col span={24}>
                <Row gutter={16}>
                    <Col span={5}>
                        <Select className="w-100" placeholder="Bộ lọc">
                            <Select.Option key={1}>Mới nhất</Select.Option>
                            <Select.Option key={2}>Cũ nhất</Select.Option>
                        </Select>
                    </Col>
                    <Col span={10}>
                        <RangePicker format={dateFormat} />
                    </Col>
                </Row>
            </Col>
            <Col span={24} className="mt-4">
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card
                            className="bg-success-subtle"
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
                    <Col span={8}>
                        <Card
                            className="bg-danger-subtle"
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
                    <Col span={8}>
                        <Card
                            className="bg-warning-subtle"
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
                    <Col span={8}>
                        <Card
                            className="bg-success-subtle"
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
                    <Col span={8}>
                        <Card
                            className="bg-warning-subtle"
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
