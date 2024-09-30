import React from "react";
import { Table, Button, Row, Col, Card, Statistic, Image } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

function Appointments_Detail() {
  const handleEdit = (key) => {
    console.log("Edit", key);
  };

  const handleDelete = (key) => {
    console.log("Delete", key);
  };

  const handleAdd = () => {
    console.log("Add");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>Danh Sách Đặt Lịch Chi Tiết</h2>
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={15}>
          <Card title="Thông tin chi tiết ">
            <Row gutter={[16, 16]}>
              <Col span={10}>
                <Card>
                  <Statistic
                    title="Họ và tên"
                    value={"Nguyễn Thái Dương"}
                    precision={2}
                    valueStyle={{
                      color: "#e05265",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Giới tính"
                    value={"Nam"}
                    precision={2}
                    valueStyle={{
                      color: "#e05265",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Số điện thoại"
                    value={"0987654321"}
                    precision={0}
                    formatter={(value) => `${value}`}
                    valueStyle={{
                      color: "#e05265",
                      fontWeight: "bold",
                    }}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Tình trạng da"
                        value={"Khô, nứt nẻ"}
                        precision={2}
                        valueStyle={{
                          color: "#e05265",
                          fontWeight: "bold",
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Người Tư Vấn"
                        value={"BS. Nguyễn Thị Hương"}
                        precision={2}
                        valueStyle={{
                          color: "#e05265",
                          fontWeight: "bold",
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Hình ảnh">
                      <Image.PreviewGroup
                        preview={{
                          onChange: (current, prev) =>
                            console.log(
                              `current index: ${current}, prev index: ${prev}`
                            ),
                        }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <Image
                              width={"100%"}
                              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                            />
                          </Col>
                          <Col span={12}>
                            <Image
                              width={"100%"}
                              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                            />
                          </Col>
                        </Row>
                      </Image.PreviewGroup>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={9}>
          <Card title="Thông tin lịch hẹn">
            <Statistic title="Ngày hẹn" value={"19/09/2024"} />
            <Statistic title="Thời gian" value={"10:00 - 12:00"} />
            <Statistic title="Trạng thái" value={"Đã xác nhận"} />
            <div style={{ marginTop: 16 }}>
              <Button onClick={() => handleEdit(1)} style={{ marginRight: 8 }}>
                Sửa
              </Button>
              <Button onClick={() => handleDelete(1)} danger>
                Xóa
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Appointments_Detail;
