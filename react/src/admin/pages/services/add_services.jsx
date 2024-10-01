import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Card,
  Switch,
  Image,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ServicesAdd = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm ảnh
      </div>
    </button>
  );
  return (
    <Row gutter={16}>
      <Col span={15}>
        <Card title="Thông tin chi tiết">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên dịch vụ"
                  name="service_name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên dịch vụ" },
                  ]}
                >
                  <Input placeholder="Tên dịch vụ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá dịch vụ" },
                  ]}
                >
                  <Input type="number" placeholder="Giá dịch vụ" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea placeholder="Mô tả dịch vụ" rows={4} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thời gian (phút)" name="duration">
                  <Input type="number" placeholder="Thời gian (phút)" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren="Hoạt động"
                    unCheckedChildren="Ngừng hoạt động"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm dịch vụ
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={9}>
        <Card title="Hình ảnh sản phẩm">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ServicesAdd;
