import React from "react";
import {
    Col,
    Row,
    Select,
    DatePicker,
    Space,
    Card,
    Tag,
    Button,
    List,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    PlayCircleOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
import Staff_history_shift_Detail from "./staff_history_shift_Detail";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
import useModal from "../../appointments/hooks/openmodal";
import style from "../style/staff_history_shift.module.scss";
const Staff_history_shift = ({ data }) => {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [DataSelected, setDataSelected] = React.useState({});
    const handleShowDetail = (data) => {
        setDataSelected(() => data);
        showModal();
    };
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
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    pagination={{
                        pageSize: 8,
                    }}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                className={style.card}
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
                                    <h3>{item?.customer?.full_name}</h3>
                                    <Button
                                        shape="circle"
                                        onClick={() => {
                                            handleShowDetail(item);
                                        }}
                                    >
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
                                        <span>{item?.start_time}</span>
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
                                        <span>
                                            {item?.total_price_services.toLocaleString() ||
                                                0}
                                            VND
                                        </span>
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
                                        <span> {item?.appointment_date} -</span>
                                    </div>
                                </div>
                                <Tag
                                    color="green"
                                    style={{ marginTop: "10px" }}
                                >
                                    {item?.status}
                                </Tag>
                            </Card>
                        </List.Item>
                    )}
                />
            </Col>
            <Staff_history_shift_Detail
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                appoitmentData={DataSelected}
            />
        </Row>
    );
};
export default Staff_history_shift;
