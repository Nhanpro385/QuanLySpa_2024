import React from "react";
import { EditOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Image,
    Input,
    Row,
    Tabs,
    Statistic,
} from "antd";
import Statistics_staff from "../../modules/staffManagement/compoments/statistics_page";
import Staff_calendar from "../../modules/staffManagement/compoments/staff_calendar";
import Staff_history_shift from "../../modules/staffManagement/compoments/staff_history_shift";
const StaffsDetail = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card >
                    <Row>
                        <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                            <Image src="https://nld.mediacdn.vn/thumb_w/698/2020/9/23/hoo1403-1600769609391337398991-1600824814143647303103-crop-16008249755862069103195.jpg"></Image>
                        </Col>
                        <Col xl={19} lg={19} md={19} sm={19} xs={24}>
                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="mb-2">
                                    <Row
                                        justify={"space-between"}
                                        align={"middle"}
                                    >
                                        <Col>
                                            <Row>
                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <h2 className="m-2">
                                                        Nguyễn Thái Dương ( ĐÓm
                                                        con)
                                                    </h2>
                                                </Col>{" "}
                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <p className="m-2">
                                                        Nhân viên bán hàng
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="primary"
                                                size="middle"
                                            >
                                                <EditOutlined /> Chỉnh sửa thông
                                                tin
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Divider className="m-2"></Divider>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="p-2">
                                    <Form layout="vertical">
                                        <Row gutter={16}>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                                <Form.Item
                                                    label="Họ và tên"
                                                    name="fullname"
                                                >
                                                    <Input
                                                        size="middle"
                                                        variant="borderless"
                                                        defaultValue="nguyễn Thái Dương"
                                                        disabled
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                                <Form.Item
                                                    label="Email"
                                                    name="Email"
                                                >
                                                    <Input
                                                        size="middle"
                                                        variant="borderless"
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                        defaultValue={
                                                            "domcon@gmail.com"
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                                <Form.Item
                                                    label="Số điện thoại"
                                                    name="numberphone"
                                                >
                                                    <Input
                                                        size="middle"
                                                        variant="borderless"
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                        defaultValue={
                                                            "091283776"
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                                <Form.Item
                                                    label="Địa chỉ"
                                                    name="address"
                                                >
                                                    <Input
                                                        size="middle"
                                                        variant="borderless"
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                        defaultValue={
                                                            "Bén tre "
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card>
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: "Thống kê Dữ liệu ",
                                key: "1",
                                children: <Statistics_staff />,
                            },
                            {
                                label: "Ca làm việc",
                                key: "2",
                                children: <Staff_calendar />,
                            },
                            {
                                label: "Lịch sử làm việc",
                                key: "3",
                                children: <Staff_history_shift />,
                            },
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    );
};
export default StaffsDetail;
