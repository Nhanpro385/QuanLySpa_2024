import React from "react";
import {
  Table,
  Button,
  Card,
  Input,
  Row,
  Col,
  Dropdown,
  Space,
  Select,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function User() {
  const navigate = useNavigate();
  const onClick = ({ key, record }) => {
    switch (key) {
      case "1":
        handleEdit(record.key);
        break;
      case "2":
        navigate("/admin/user/Detail/1");
        break;
      case "3":
        navigate("/admin/user/history/4");
        break;
      case "4":
        break;
      default:
        break;
    }
  };
  const dataSource = [
    {
      key: "1",
      fullname: "Trịnh Trần Phương Tuấn",
      age: 55,
      phone: "0982731275",
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (text, record) => (
        <span>
          <Dropdown
            menu={{
              items,
              onClick: (e) => onClick({ key: e.key, record }),
            }}
            trigger={["click"]}
          >
            <Button type="primary" onClick={(e) => e.preventDefault()}>
              <Space>
                Hành động
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </span>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: <Button block> Sửa </Button>,
    },
    {
      key: "2",
      label: <Button block> Chi tiết </Button>,
    },
    {
      key: "3",
      label: <Button block> Lịch sử giao dịch </Button>,
    },
    {
      key: "4",
      label: (
        <Button block danger>
          Xóa
        </Button>
      ),
    },
  ];

  const handleEdit = (key) => {
    console.log("Edit", key);
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>Danh Sách Người Dùng</h2>

        <Link to="/admin/user/add">
          <Button block type="primary">
            <PlusOutlined />
            Thêm Người Dùng mới
          </Button>
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={3}>
          <Select
            style={{ width: 120 }}
            className="mb-3 w-100"
            placeholder="Giới tính"
          >
            <Select.Option value="nam">Nam</Select.Option>
            <Select.Option value="nu">Nữ</Select.Option>
          </Select>
        </Col>
        <Col span={5}>
          <Input.Search placeholder="Tìm kiếm......" />
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  );
}

export default User;
