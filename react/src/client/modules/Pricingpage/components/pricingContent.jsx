import React from "react";
import {
    Col,
    Divider,
    Row,
    Table,
    Collapse,
    Badge,
    Tag,
    Typography,
    Button,
} from "antd";
const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const { Text } = Typography;
import baner from "../../../assets/images/banderprice.png";

const PricingContent = () => {
    const data = [
        {
            key: "1",
            serviceName: (
                <span>
                    Điều trị mụn chuẩn y khoa <Tag color="#E05265">Hot</Tag>
                </span>
            ),
            price: "1.000.000",
            priceHSSV: "500.000",
            action: (
                <>
                    <Button size="small" shape="round" type="primary">
                        Đặt lịch
                    </Button>
                    <Divider type="vertical" />
                    <Button size="small" shape="round" type="primary">
                        Tư vấn
                    </Button>
                </>
            ),
        },
        {
            key: "2",
            serviceName: (
                <span>
                    Chiếu ánh sáng sinh học{" "}
                    <Tag color="#E05265">Khuyến mãi</Tag>
                </span>
            ),
            price: (
                <div>
                    <Text delete>1.000.000</Text>
                    <Divider type="vertical" />
                    <Text>800.000</Text>
                </div>
            ),
            priceHSSV: "500.000",
            style: {
                backgroundColor: "#FFDCDC",
            },
            action: (
                <>
                    <Button size="small" shape="round" type="primary">
                        Đặt lịch
                    </Button>
                    <Divider type="vertical" />
                    <Button size="small" shape="round" type="primary">
                        Tư vấn
                    </Button>
                </>
            ),
        },
        {
            key: "3",
            serviceName: "Mặt nạ điều trị mụn và kiểm soát nhờn",
            price: "1.000.000",
            priceHSSV: "500.000",
            action: (
                <>
                    <Button size="small" shape="round" type="primary">
                        Đặt lịch
                    </Button>
                    <Divider type="vertical" />
                    <Button size="small" shape="round" type="primary">
                        Tư vấn
                    </Button>
                </>
            ),
        },
        {
            key: "4",
            serviceName: "Lấy nhân mụn Y khoa",
            price: "1.000.000",
            priceHSSV: "500.000",
            action: (
                <>
                    <Button size="small" shape="round" type="primary">
                        Đặt lịch
                    </Button>
                    <Divider type="vertical" />
                    <Button size="small" shape="round" type="primary">
                        Tư vấn
                    </Button>
                </>
            ),
        },
    ];
    return (
        <div>
            <Row>
                <Col span={24}>
                    <img style={{ width: "100%" }} src={baner} alt="baner" />
                </Col>
                <Divider orientation="center">
                    <h1
                        style={{
                            fontFamily: "Anton, sans-serif",
                            fontSize: "4rem",
                        }}
                    >
                        Bảng giá chi tiết
                    </h1>
                </Divider>
                <Col span={24} className="container">
                    <Collapse defaultActiveKey={["1"]} size="large" accordion>
                        <Panel header="Bảng giá dịch vụ trị mụn" key="1">
                            <Table
                                bordered={true}
                                pagination={false}
                                dataSource={data}
                            >
                                <Column
                                    rowScope={2}
                                    title={
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: "2rem",

                                                    textAlign: "center",
                                                }}
                                            >
                                                Danh sách các dịch vụ
                                            </p>
                                        </div>
                                    }
                                    dataIndex="serviceName"
                                    key="serviceName"
                                />
                                <ColumnGroup
                                    style={{ backgroundColor: "#FFDCDC" }}
                                    title="điều trị vùng da mặt"
                                >
                                    <Column
                                        title="Giá niêm yết"
                                        dataIndex="price"
                                        key="price"
                                        align="center"
                                    />
                                    <Column
                                        title="Giá HSSV"
                                        dataIndex="priceHSSV"
                                        key="priceHSSV"
                                        align="center"
                                    />
                                    <Column
                                        title="Thao tác"
                                        key="action"
                                        align="center"
                                        dataIndex="action"
                                    />
                                </ColumnGroup>
                            </Table>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export default PricingContent;
