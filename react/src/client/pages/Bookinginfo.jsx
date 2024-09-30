import React from "react";
import {
    Col,
    Divider,
    Row,
    Steps,
    Table,
    ConfigProvider,
    Button,
    Typography,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
const { Paragraph, Text } = Typography;
import baner from "../assets/images/banerbookinginfo.png";

const BookingInfo = () => {
    const dataSource = [
        {
            key: "1",
            name: "1",
            nameService: "Massage body",
            price: "100.000 VNĐ",
        },
        {
            key: "2",
            name: "2",
            nameService: "Massage body",
            price: "100.000 VNĐ",
        },
    ];

    const columns = [
        {
            title: "#",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Dịch vụ",
            dataIndex: "nameService",
            key: "nameService",
            width: "80%",
            align: "left",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            align: "center",
        },
    ];
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#E05265",
                        headerColor: "white",
                    },
                },
            }}
        >
            <div
                style={{
                    backgroundColor: "#FFF3F3",
                }}
            >
                <div>
                    <img width={"100%"} src={baner} alt="baner" />
                </div>
                <Row justify="center" align="middle">
                    <Col span={12}>
                        <Steps
                            size="small"
                            current={1}
                            style={{
                                marginTop: "30px",
                            }}
                            items={[
                                {
                                    title: "Đặt lịch",
                                },
                                {
                                    title: "Thông tin Đăt lịch",
                                },
                                {
                                    title: "Thanh toán",
                                },
                                {
                                    title: "Hoàn tất",
                                },
                            ]}
                        />
                    </Col>
                </Row>

                <section className="container">
                    <Divider orientation="left">
                        <strong>1.Thông tin Đặt lịch của bạn</strong>
                    </Divider>
                    <div
                        style={{
                            paddingBottom: "30px",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Row justify="center" align="middle">
                            <Col span={24}>
                                <Row
                                    style={{
                                        backgroundColor: "#E05265",
                                    }}
                                    justify="space-around"
                                    align="middle"
                                >
                                    <Col
                                        className="text-center"
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                    >
                                        <div
                                            style={{
                                                color: "white",
                                                fontSize: "3rem",
                                                fontFamily: "Anton",
                                                fontWeight: "400",
                                                textTransform: "capitalize",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            hóa đơn dịch vụ
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row
                                    align={"middle"}
                                    justify={"space-between"}
                                    className="mt-3"
                                >
                                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                                        <ul style={{ listStyleType: "none" }}>
                                            <li>
                                                Thời gian: 19/8/2024 - 09:00
                                            </li>
                                            <li>Tổng tiền: 100.000 VNĐ</li>
                                            <li>
                                                Chi nhánh: 14b1 Trương vĩnh
                                                nguyên
                                            </li>
                                            <li>thời gian hẹn: 10:30</li>
                                        </ul>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                                        <ul style={{ listStyleType: "none" }}>
                                            <li>
                                                Khách hàng:{" "}
                                                <strong
                                                    style={{
                                                        color: "#E05265",
                                                    }}
                                                >
                                                    Trần Phi Hào
                                                </strong>
                                            </li>
                                            <li>Điện thoại: 0123456789</li>
                                            <li>Email: a@gail.com</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    marginTop: "30px",
                                }}
                                span={20}
                            >
                                <Table
                                    size="large"
                                    pagination={false}
                                    dataSource={dataSource}
                                    columns={columns}
                                />
                                <Col
                                    className="mt-4"
                                    xl={24}
                                    lg={24}
                                    md={24}
                                    sm={24}
                                    xs={24}
                                >
                                    <Row justify="end">
                                        <Col
                                            xl={6}
                                            lg={6}
                                            md={6}
                                            sm={24}
                                            xs={24}
                                        >
                                            <Row>
                                                <Col
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        <strong>
                                                            Tổng tiền:{" "}
                                                        </strong>
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        <strong>
                                                            200.000 VNĐ
                                                        </strong>
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        <strong>
                                                            Giảm giá:{" "}
                                                        </strong>
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        <strong>0 VNĐ</strong>
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1.1rem",
                                                            color: "#E05265",
                                                        }}
                                                    >
                                                        <strong>
                                                            Thanh toán:{" "}
                                                        </strong>
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <span
                                                        style={{
                                                            color: "#E05265",
                                                            fontSize: "1.1rem",
                                                        }}
                                                    >
                                                        <strong>
                                                            200.000 VNĐ
                                                        </strong>
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Row
                                        style={{
                                            border: "1px solid #E05265",
                                            padding: "20px",
                                            marginTop: "30px",
                                        }}
                                        justify="center"
                                        align={"top"}
                                    >
                                        <Col
                                            xl={8}
                                            lg={8}
                                            md={8}
                                            sm={24}
                                            xs={24}
                                        >
                                            <ul
                                                style={{
                                                    textAlign: "center",
                                                    listStyleType: "none",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                <li>
                                                    <h4>
                                                        <strong
                                                            style={{
                                                                color: "#E05265",
                                                            }}
                                                        >
                                                            Hóa đơn dịch vụ
                                                        </strong>
                                                    </h4>
                                                </li>
                                                <li>Chi nhánh 1 Cần thơ</li>
                                                <li>số Hóa đơn : #012343</li>
                                            </ul>
                                        </Col>
                                        <Col
                                            xl={8}
                                            lg={8}
                                            md={8}
                                            sm={24}
                                            xs={24}
                                        >
                                            <ul
                                                style={{
                                                    textAlign: "center",
                                                    listStyleType: "none",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                <li>
                                                    <h4>
                                                        <strong
                                                            style={{
                                                                color: "#E05265",
                                                            }}
                                                        >
                                                            Thông tin
                                                        </strong>
                                                    </h4>
                                                </li>
                                                <li>Trần Phi hào</li>
                                                <li>0978648720</li>
                                                <li>
                                                    Thời gian: 10:30 - 19/8/2024
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col
                                            xl={8}
                                            lg={8}
                                            md={8}
                                            sm={24}
                                            xs={24}
                                        >
                                            <ul
                                                style={{
                                                    textAlign: "center",
                                                    listStyleType: "none",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                <li>
                                                    <h4>
                                                        <strong
                                                            style={{
                                                                color: "#E05265",
                                                            }}
                                                        >
                                                            Chúng tôi
                                                        </strong>
                                                    </h4>
                                                </li>
                                                <li>SakuraSpa.com</li>
                                                <li>+84 160024007</li>
                                                <li>
                                                    Trạng thái: Đã thanh toán
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </section>
                <Row justify="center" align="middle">
                    <Col span={12}>
                        <Steps
                            size="small"
                            current={2}
                            style={{
                                marginTop: "30px",
                            }}
                            items={[
                                {
                                    title: "Đặt lịch",
                                },
                                {
                                    title: "Thông tin Đăt lịch",
                                },
                                {
                                    title: "Thanh toán",
                                },
                                {
                                    title: "Hoàn tất",
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <section className="container">
                    <Divider orientation="left">
                        <h4>2.Thông tin thanh toán</h4>
                    </Divider>
                    <div
                        style={{
                            padding: "20px",
                            boxShadow: "0px 7px 6px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Row>
                            <Col
                                xl={12}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px",
                                }}
                            >
                                <div>Số Hóa Đơn : #012343</div>
                                <div>Số tiền cần thanh toán: </div>
                                <div
                                    style={{
                                        fontFamily: "Anton",
                                        fontSize: "2rem",
                                        color: "#E05265",
                                    }}
                                >
                                    200.000 VNĐ
                                </div>
                            </Col>
                            <Col span={24}>
                                <Divider orientation="left">
                                    <h5>2.1 hình thức thanh toán</h5>
                                </Divider>
                            </Col>
                        </Row>
                        <Row
                            gutter={[8, 8]}
                            justify={"center"}
                            align={"middle"}
                        >
                            <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                                <Button
                                    block
                                    size="large"
                                    shape="round"
                                    icon={
                                        <img
                                            width={"30px"}
                                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png"
                                            alt="logo"
                                        />
                                    }
                                >
                                    Thanh toán qua Momo
                                </Button>
                            </Col>
                            <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                                <Button
                                    block
                                    size="large"
                                    shape="round"
                                    icon={
                                        <img
                                            width={"30px"}
                                            src="https://png.pngtree.com/png-vector/20220821/ourmid/pngtree-bank-transfer-icon-house-selected-transfer-vector-png-image_19626578.png"
                                            alt="logo"
                                        />
                                    }
                                >
                                    Chuyển qua Số tài khoản
                                </Button>
                            </Col>
                            <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                                <Button
                                    block
                                    size="large"
                                    shape="round"
                                    icon={
                                        <img
                                            width={"30px"}
                                            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-pack-cash-icon-cartoon-style-png-image_5208194.jpg"
                                            alt="logo"
                                        />
                                    }
                                >
                                    Tiền mặt
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Divider orientation="left">
                                    2.2 Thông tin thanh toán
                                </Divider>
                                <Row
                                    align="middle"
                                    gutter={[16, 16]}
                                    justify={"center"}
                                >
                                    <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                                        <img
                                            width={"100%"}
                                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                            alt="baner"
                                        />
                                    </Col>
                                    <Col
                                        className="mt-4"
                                        xl={8}
                                        lg={8}
                                        md={8}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Row>
                                            <Col span={24}>
                                                <Row
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Tên Chủ tài khoản
                                                        </span>
                                                    </Col>
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Thẩm mỹ viện Sakura
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Tên ngân hàng
                                                        </span>
                                                    </Col>
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Á Châu Bank(ACB)
                                                        </span>
                                                    </Col>
                                                </Row>{" "}
                                                <Row
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Số tài khoản
                                                        </span>
                                                    </Col>
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    "1.11rem",
                                                            }}
                                                            copyable
                                                        >
                                                            16002407
                                                        </Text>
                                                    </Col>
                                                </Row>{" "}
                                                <Row
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Số tiền
                                                        </span>
                                                    </Col>
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    "1.11rem",
                                                            }}
                                                            copyable={{
                                                                text: "200000",
                                                            }}
                                                        >
                                                            200.000 VNĐ
                                                        </Text>
                                                    </Col>
                                                </Row>{" "}
                                                <Row
                                                    style={{
                                                        padding: "5px",
                                                    }}
                                                >
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            Nội dung
                                                        </span>
                                                    </Col>
                                                    <Col
                                                        xl={12}
                                                        lg={12}
                                                        md={12}
                                                        sm={12}
                                                        xs={12}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize:
                                                                    "1.11rem",
                                                            }}
                                                            copyable
                                                        >
                                                            #012343
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={0} sm={0} md={0} lg={1}>
                                        <Divider
                                            style={{
                                                marginTop: "20px",

                                                border: "2px solid #E05265",
                                                height: "100px",
                                            }}
                                            type="vertical"
                                        />
                                    </Col>
                                    <Col
                                        className="text-center"
                                        xl={11}
                                        lg={11}
                                        md={11}
                                        sm={24}
                                    >
                                        <div>
                                            <CheckCircleOutlined
                                                style={{
                                                    fontSize: "5rem",
                                                    color: "#009500",
                                                }}
                                            />
                                        </div>
                                        <span>
                                            <strong
                                                style={{
                                                    fontSize: "2.5rem",
                                                    color: "#E05265",
                                                }}
                                            >
                                                Đã thanh toán
                                            </strong>
                                            <p>“Sakura Spa cảm ơn quý’’</p>
                                            <strong
                                                style={{ color: "#E05265" }}
                                            >
                                                nhớ kiểm tra thông báo để điều
                                                trị đúng giờ !
                                            </strong>
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col
                                xl={5}
                                lg={5}
                                md={5}
                                sm={24}
                                xs={24}
                                style={{
                                    marginTop: "20px",
                                }}
                            >
                                <Button block shape="round" type="primary">
                                    Hoàn tất thanh toán
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </ConfigProvider>
    );
};
export default BookingInfo;
