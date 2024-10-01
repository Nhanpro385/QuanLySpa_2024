import React from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Table,
  Tag,
  Progress,
  Select,
  Button,
  Input,
  Typography,
} from "antd";
const { Text } = Typography;
const { Option } = Select;
import CountUp from "react-countup";

// Dữ liệu mẫu cho các giao dịch gần đây
const transactionData = [
  {
    key: 1,
    client: "Lily Smith",
    date: "25/09/2024",
    service: "Massage trị liệu",
    therapist: "Sarah Johnson",
    amount: "1,750,000 VND",
    paymentMethod: "**** 1234",
  },
  {
    key: 2,
    client: "John Doe",
    date: "25/09/2024",
    service: "Chăm sóc da mặt cấp ẩm",
    therapist: "Emily Davis",
    amount: "2,250,000 VND",
    paymentMethod: "Tiền mặt",
  },
  // Thêm dữ liệu mẫu khác...
];

// Dữ liệu mẫu cho lịch hẹn tư vấn và hẹn dịch vụ
const appointmentData = [
  {
    key: 1,
    client: "Michael Brown",
    appointmentDate: "26/09/2024",
    appointmentType: "Tư vấn da",
    therapist: "Amanda Clark",
    status: "Đang chờ",
  },
  {
    key: 2,
    client: "Emma Wilson",
    appointmentDate: "26/09/2024",
    appointmentType: "Dịch vụ chăm sóc da",
    therapist: "Olivia Harris",
    status: "Hoàn thành",
  },
  // Thêm dữ liệu mẫu khác...
];

// Cấu hình cột của bảng giao dịch
const transactionColumns = [
  {
    title: "Khách hàng",
    dataIndex: "client",
    key: "client",
    render: (text) => (
      <div>
        <img
          src="https://via.placeholder.com/40"
          alt="Ảnh đại diện"
          style={{ borderRadius: "50%", marginRight: 8 }}
        />
        {text}
      </div>
    ),
  },
  {
    title: "Ngày",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Dịch vụ",
    dataIndex: "service",
    key: "service",
    render: (text) => <Tag color="green">{text}</Tag>,
  },
  {
    title: "Chuyên viên",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Thao tác",
    key: "actions",
    render: () => (
      <>
        <Button type="link">Hoàn tiền</Button>
        <Button type="link">Biên nhận</Button>
      </>
    ),
  },
];

// Cấu hình cột của bảng lịch hẹn
const appointmentColumns = [
  {
    title: "Khách hàng",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Ngày hẹn",
    dataIndex: "appointmentDate",
    key: "appointmentDate",
  },
  {
    title: "Loại hẹn",
    dataIndex: "appointmentType",
    key: "appointmentType",
    render: (text) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: "Chuyên viên",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      let color = text === "Hoàn thành" ? "green" : "orange";
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "Thao tác",
    key: "actions",
    render: () => (
      <>
        <Button type="link">Cập nhật</Button>
        <Button type="link">Hủy hẹn</Button>
      </>
    ),
  },
];
const formatter = (value) => <CountUp end={value} separator="," />;
const Dashboard = () => {
  
  return (
    <div style={{ padding: 20 }}>
      {/* Khu vực tổng quan */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Tổng quan doanh thu">
            <Progress
              size={250}
              type="circle"
              percent={75}
              format={() => "3,250,000 VND"}
            
            />
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Doanh thu hôm nay"
                  value={3250000}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="VND"
                  formatter={formatter}
                />
                <Text type="secondary">Đang chờ: 500,000 VND</Text>
                <br />
                <Text type="success">Đã hoàn thành: 2,750,000 VND</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Số lượt đặt lịch"
                  value={58}
                  precision={0}
                  valueStyle={{ color: "#1890ff" }}
                  suffix="lượt"
                  formatter={formatter}
                />
                <Text type="secondary">Đang chờ: 10 lượt</Text>
                <br />
                <Text type="success">Đã hoàn thành: 48 lượt</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Lịch hẹn tư vấn"
                  value={25}
                  precision={0}
                  valueStyle={{ color: "#1890ff" }}
                  suffix="lượt"
                  formatter={formatter}
                />
                <Text type="secondary">Đang chờ: 8 lượt</Text>
                <br />
                <Text type="success">Đã hoàn thành: 17 lượt</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Lịch hủy"
                  value={5}
                  precision={0}
                  valueStyle={{ color: "#cf1322" }}
                  suffix="lượt"
                  formatter={formatter}
                />
                <Text type="secondary">Đang chờ: 2 lượt</Text>
                <br />
                <Text type="danger">Đã hủy: 3 lượt</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Khách mới/trở lại"
                  value={58}
                  formatter={formatter}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  
                />
                <Text type="secondary">Khách mới: 12</Text>
                <br />
                <Text type="success">Khách quay lại: 46</Text>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Bảng giao dịch gần đây với bộ lọc và tìm kiếm */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card
            title="Giao dịch gần đây"
            extra={
              <>
                <Select
                  defaultValue="Hôm nay"
                  style={{ width: 120, marginRight: 8 }}
                >
                  <Option value="Hôm nay">Hôm nay</Option>
                  <Option value="Tuần này">Tuần này</Option>
                  <Option value="Tháng này">Tháng này</Option>
                </Select>
                <Input.Search
                  placeholder="Tìm kiếm giao dịch"
                  style={{ width: 200, marginRight: 8 }}
                />
                <Button type="primary">Xuất Excel</Button>
              </>
            }
          >
            <Table
              columns={transactionColumns}
              dataSource={transactionData}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title="Lịch hẹn tư vấn và hẹn dịch vụ"
            extra={
              <>
                <Select
                  defaultValue="Hôm nay"
                  style={{ width: 120, marginRight: 8 }}
                >
                  <Option value="Hôm nay">Hôm nay</Option>
                  <Option value="Tuần này">Tuần này</Option>
                  <Option value="Tháng này">Tháng này</Option>
                </Select>
                <Input.Search
                  placeholder="Tìm kiếm lịch hẹn"
                  style={{ width: 200, marginRight: 8 }}
                />
                <Button type="primary">Xuất Excel</Button>
              </>
            }
          >
            <Table
              columns={appointmentColumns}
              dataSource={appointmentData}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
