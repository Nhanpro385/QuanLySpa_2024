import React, { useEffect, useState } from "react";
import {
    Col,
    Divider,
    Row,
    Steps,
    Table,
    Button,
    Typography,
    notification,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
const { Paragraph, Text } = Typography;
import baner from "../assets/images/banerbookinginfo.png";
import { useNavigate } from "react-router-dom";
import useappointmentsActions from "../../admin/modules/appointments/hooks/useappointments";
const BookingInfo = () => {
    document.title = "Thông tin đặt lịch";
    const { CreateClient } = useappointmentsActions();
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const data = localStorage.getItem("booking");
        if (data) {
            return JSON.parse(data);
        }
        return [];
    });
    const [CustomerInfo, setCustomerInfo] = useState(() => {
        const data = localStorage.getItem("user");
        if (data) {
            return JSON.parse(data);
        }
        return {};
    });
    useEffect(() => {
        if (!CustomerInfo) {
            setCustomerInfo(localStorage.getItem("user"));
        }
    }, [CustomerInfo]);

    const handleBooking = async () => {
        try {
            const res = await CreateClient(data);
            console.log(res);
            if (res.payload.status === 403) {
                api.error({
                    message: "Đặt lịch thất bại",
                    description: res.payload.message || "Đặt lịch thất bại",
                });
                return;
            }
            if (res.payload.status === "success") {
                api.success({
                    message: "Đặt lịch thành công",
                    description:
                        "Đặt lịch thành công Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi",
                });
                localStorage.removeItem("booking");
                navigate("/datlich/thanhcong");
            } else {
                api.error({
                    message: "Đặt lịch thất bại",
                    description:
                        res.payload.message ||
                        "Đặt lịch thất bại vui lòng đặt lịch lại",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        if (data) {
            setDataSource(
                data?.services?.map((item, index) => ({
                    key: index + 1,
                    ...item,
                }))
            );
        } else {
            navigate("/datlichhen");
        }
    }, [data]);
    const columns = [
        {
            title: "#",
            dataIndex: "stt",
            key: "stt",
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
            width: "80%",
            align: "left",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            align: "center",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            align: "center",
            render: (text) =>
                parseInt(text).toLocaleString() + " VNĐ" || "Dữ liệu không có",
        },
    ];
    return (
        <div
            style={{
                backgroundColor: "#FFF3F3",
                paddingBottom: "50px",
            }}
        >
            {contextHolder}
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
                                title: "Đặt Lịch",
                            },
                            {
                                title: "Thông Tin Đặt Lịch",
                            },
                            {
                                title: "Xác Nhận Đặt Lịch",
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
                                        hóa đơn dịch vụ (tạm tính)
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
                                            Thời gian: {data?.date}-{" "}
                                            {data?.time}
                                        </li>
                                        <li>
                                            Tổng tiền:{" "}
                                            {parseInt(
                                                data?.totalprice
                                            ).toLocaleString() + " VNĐ" || 0}
                                        </li>
                                        {/* <li>
                                            Chi nhánh: 14b1 Trương vĩnh nguyên
                                        </li> */}
                                        <li>Thời gian hẹn: {data?.time}</li>
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
                                                {CustomerInfo.name}
                                            </strong>
                                        </li>
                                        <li>
                                            Điện thoại: {CustomerInfo.phone}
                                        </li>
                                        <li>Email: {CustomerInfo.email}</li>
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
                                locale={{
                                    emptyText:
                                        "Không có dữ liệu Vui lòng đặt lịch",
                                }}
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
                                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
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
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    <strong>Tổng tiền: </strong>
                                                </span>
                                            </Col>
                                            <Col>
                                                <span
                                                    style={{
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    <strong>
                                                        {parseInt(
                                                            data?.totalprice
                                                        ).toLocaleString() +
                                                            " VNĐ" || 0}
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
                                                        fontSize: "2rem",
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
                                                        fontSize: "2rem",
                                                    }}
                                                >
                                                    <strong>
                                                        {parseInt(
                                                            data?.totalprice
                                                        ).toLocaleString() + " VNĐ" || 0}
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
                                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
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
                                            {/* <li>số Hóa đơn : #012343</li> */}
                                        </ul>
                                    </Col>
                                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
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
                                            <li>
                                                {CustomerInfo.name ||
                                                    "Khách hàng"}
                                            </li>
                                            <li>
                                                {CustomerInfo.phone ||
                                                    "Khách hàng"}
                                            </li>
                                            <li>
                                                {CustomerInfo.email ||
                                                    "Khách hàng"}
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
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
                                            {/* <li>Trạng thái: Đã thanh toán</li> */}
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Row className="mt-4" justify="center" gutter={[8, 8]}>
                        <Col xxl={4} xl={4} lg={4} md={4} sm={24} xs={24}>
                            <Button
                                block
                                shape="round"
                                danger
                                variant="outlined"
                                onClick={() => navigate("/datlichhen")}
                            >
                                Quay lại
                            </Button>
                        </Col>{" "}
                        <Col xxl={4} xl={4} lg={4} md={4} sm={24} xs={24}>
                            <Button
                                block
                                shape="round"
                                type="primary"
                                onClick={() => handleBooking()}
                            >
                                Xác nhận đặt lịch
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* <Row justify="center" align="middle">
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
                    <Row gutter={[8, 8]} justify={"center"} align={"middle"}>
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.11rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.11rem",
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
                                                            fontSize: "1.1rem",
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
                                                            fontSize: "1.11rem",
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
                                        <strong style={{ color: "#E05265" }}>
                                            nhớ kiểm tra thông báo để điều trị
                                            đúng giờ !
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
            </section> */}
        </div>
    );
};
export default BookingInfo;
