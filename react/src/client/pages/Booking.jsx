import React, { useRef } from "react";
import {
  Steps,
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Card,
  Divider,
} from "antd";
import Slider from "react-slick";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import baner2 from "../assets/images/baner2.png";
import anh4 from "../assets/images/image4.png";

const Appbooking = () => {
  const sliderRef = useRef();
  const Apptab = () => {
    return (
      <div
        className="slider-container"
        style={{ width: "100%", textAlign: "center" }}
      >
        <Slider ref={sliderRef} {...settings}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="p-3">
              <Card
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                styles={{
                  actions: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  },
                }}
                actions={[
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                    }}
                    ghost
                  >
                    Chọn
                  </Button>,
                ]}
                cover={<img alt="example" src={anh4} width={100} />}
              >
                <Card.Meta
                  title="Tên Dịch vụ"
                  description="Mô tả dịch vụ"
                ></Card.Meta>
                <div className="m-2">
                  Giá:{" "}
                  <strong
                    style={{
                      color: "#E05265",
                    }}
                  >
                    1.000.000đ
                  </strong>
                </div>
                ,
              </Card>
            </div>
          ))}
        </Slider>
        <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Row justify="center" align="middle" gutter={[16, 16]}>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 3 }}
                md={{ span: 2 }}
                lg={{ span: 2 }}
                xl={{ span: 2 }}
              >
                <Button
                  block
                  type="primary"
                  style={{
                    fontSize: "20px",
                    color: "#fff",
                  }}
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <ArrowLeftOutlined />
                </Button>
              </Col>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 3 }}
                md={{ span: 2 }}
                lg={{ span: 2 }}
                xl={{ span: 2 }}
              >
                <Button
                  block
                  type="primary"
                  style={{
                    fontSize: "20px",
                    color: "#fff",
                  }}
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <ArrowRightOutlined />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };
  const itemsService = [
    {
      key: "1",
      label: "Trị mụn",
      icon: (
        <img
          src={
            "https://cdn-icons-png.freepik.com/256/6006/6006538.png?uid=R106360279&ga=GA1.1.2103101817.1725044366&semt=ais_hybrid"
          }
          alt="anh4"
          width="20px"
        />
      ),
    },
    {
      key: "2",
      label: "Trị nám",
      icon: (
        <img
          src={
            "https://cdn-icons-png.freepik.com/256/13713/13713682.png?uid=R106360279&ga=GA1.1.2103101817.1725044366&semt=ais_hybrid"
          }
          alt="anh4"
          width="20px"
        />
      ),
    },
    {
      key: "3",
      label: "Trị sẹo rỗ",
      icon: (
        <img
          src={
            "https://cdn-icons-png.freepik.com/256/4771/4771158.png?uid=R106360279&ga=GA1.1.2103101817.1725044366&semt=ais_hybrid"
          }
          alt="anh4"
          width="20px"
        />
      ),
    },
    {
      key: "4",
      label: "Tắm trắng",
      icon: (
        <img
          src={
            "https://cdn-icons-png.freepik.com/256/5286/5286977.png?uid=R106360279&ga=GA1.1.2103101817.1725044366&semt=ais_hybrid"
          }
          alt="anh4"
          width="20px"
        />
      ),
    },
  ];

  const settingstimedate = {
    arrows: false,

    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings = {
    arrows: false,
    dots: false,

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingsservice = {
    dots: true,

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
    ],
  };
  return (
    <div
      style={{
        backgroundColor: "#FFF3F3",
      }}
    >
      <img src={baner2} alt="baner2" width="100%" />

      <Row justify="center" align="middle">
        <Col span={12}>
          <Steps
            size="small"
            current={0}
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

      <Row
        justify="center"
        align="middle"
        style={{
          marginTop: "30px",
        }}
      >
        <Col
          span={20}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="inline"
            wrapperCol={{ span: 24 }}
          >
            <Divider orientation="left">
              <strong>1.Thông tin cá nhân</strong>
            </Divider>
            <br />
            <Row
              gutter={[16, 16]}
              justify={"center"}
              align={"middle"}
              style={{
                width: "100%",
                padding: "20px",
              }}
            >
              <Col xs={24} sm={6}>
                <Form.Item
                  style={{ width: "100%" }}
                  name="username1"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Họ và Tên của bạn"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="username2"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="Số điện thoại"
                    prefix={<PhoneOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="username3"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="Email của bạn"
                    prefix={<MailOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">
              <strong>2.Chọn chi nhánh</strong>
            </Divider>
            <Row
              gutter={[16, 16]}
              justify={"center"}
              align={"middle"}
              style={{
                width: "100%",
              }}
            >
              <Col xs={24} sm={6}>
                <Form.Item
                  style={{ width: "100%" }}
                  name="username1"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Select
                    placeholder="Chọn Tỉnh/Thành phố"
                    optionFilterProp="label"
                    options={[
                      {
                        label: "Hồ Chí Minh",
                        value: "Hồ Chí Minh",
                      },
                      {
                        label: "Hà Nội",
                        value: "Hà Nội",
                      },
                      {
                        label: "Đà Nẵng",
                        value: "Đà Nẵng",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  style={{ width: "100%" }}
                  name="username1"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Select
                    placeholder="Chọn Qau/Huyện"
                    optionFilterProp="label"
                    options={[
                      {
                        label: "Quận 1",
                        value: "Quận 1",
                      },
                      {
                        label: "Quận 2",
                        value: "Quận 2",
                      },
                      {
                        label: "Quận 3",
                        value: "Quận 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              className="slider-container"
              style={{ width: "100%", textAlign: "center" }}
            >
              <Slider ref={sliderRef} {...settings}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div key={index} className="p-1">
                    <Card
                      style={{
                        padding: "20px",
                      }}
                      actions={[
                        <Button
                          style={{
                            width: "100%",
                          }}
                          ghost
                          type="primary"
                        >
                          Chọn
                        </Button>,
                      ]}
                      cover={<img alt="example" src={anh4} width={100} />}
                    >
                      <Card.Meta
                        title="Tên chi nhánh"
                        description="Địa chỉ chi nhánh"
                      ></Card.Meta>
                    </Card>
                  </div>
                ))}
              </Slider>
              <Row
                justify="center"
                align="middle"
                style={{ marginTop: "20px" }}
              >
                <Col span={24}>
                  <Row justify="center" align="middle" gutter={[16, 16]}>
                    <Col
                      xs={{ span: 4 }}
                      sm={{ span: 3 }}
                      md={{ span: 2 }}
                      lg={{ span: 2 }}
                      xl={{ span: 2 }}
                    >
                      <Button
                        block
                        type="primary"
                        style={{
                          fontSize: "20px",
                          color: "#fff",
                        }}
                        onClick={() => sliderRef.current.slickPrev()}
                      >
                        <ArrowLeftOutlined />
                      </Button>
                    </Col>
                    <Col
                      xs={{ span: 4 }}
                      sm={{ span: 3 }}
                      md={{ span: 2 }}
                      lg={{ span: 2 }}
                      xl={{ span: 2 }}
                    >
                      <Button
                        block
                        type="primary"
                        style={{
                          fontSize: "20px",
                          color: "#fff",
                        }}
                        onClick={() => sliderRef.current.slickNext()}
                      >
                        <ArrowRightOutlined />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <Divider orientation="left">
              <strong>3.Chọn dịch vụ</strong>
            </Divider>

            <Row
              style={{
                width: "100%",
              }}
            >
              <Col span={24} className="p-3">
                <Slider {...settingsservice}>
                  {itemsService.map((item, index) => (
                    <div className="p-2" key={index}>
                      <Button
                        
                        shape="round"
                        type="primary"
                        icon={item.icon}
                        block
                      >
                        <span>{item.label}</span>
                      </Button>
                    </div>
                  ))}
                </Slider>
              </Col>
              <Col span={24}>
                <Apptab />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{
          marginTop: "30px",
        }}
      >
        <Col
          span={20}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row align="middle" justify="start">
            <Col xs={24} sm={24} md={8} lg={8}>
              <Divider orientation="left">
                <strong>4. Chọn thời gian</strong>
              </Divider>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16}>
              <Row align="middle" justify="start">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#E05265",
                      color: "#fff",
                      padding: "10px 30px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  ></div>
                  <span>Đã chọn</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#838383",
                      color: "#fff",
                      padding: "10px 30px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  ></div>
                  <span>Đã đặt</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#bef3d9",
                      color: "#fff",
                      padding: "10px 30px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  ></div>
                  <span>Còn trống</span>
                </div>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              padding: "20px",
            }}
          >
            <Slider {...settingstimedate}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className="p-3 text-center">
                  <div
                    style={{
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <span>
                        <strong>Thứ 2</strong>
                      </span>
                    </div>
                    <div>
                      <span>12/12/2021</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <Row gutter={[8, 8]}>
              {[...Array(9)].map((_, index) => {
                const startHour = 9; // Bắt đầu từ 9:00
                const interval = 30; // Khoảng cách thời gian là 30 phút
                const time = new Date();

                time.setHours(startHour + Math.floor((index * interval) / 60));
                time.setMinutes((index * interval) % 60);

                const timeString = time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <Col xs={12} sm={8} md={8} lg={8} xl={8} key={index}>
                    <div
                      style={{
                        backgroundColor: "#E05265",
                        color: "#fff",
                        padding: "10px 30px",
                        borderRadius: "5px",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      <div>{timeString}</div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 4 }}
            >
              <Button
                type="primary"
                style={{
                  width: "100%",
                }}
                size="large"
              >
                Thanh Toán Dịch Vụ
              </Button>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 4 }}
            >
              <Button
                type="primary"
                style={{
                  width: "100%",
                }}
                ghost
                size="large"
              >
              Thêm Dịch vụ
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Appbooking;
