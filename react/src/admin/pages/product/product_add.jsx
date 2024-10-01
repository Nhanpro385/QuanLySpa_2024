import React, { useState, useRef } from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Select,
    Button,
    Input,
    DatePicker,
    InputNumber,
    Image,
    Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const Product_add = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
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

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);

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
                Upload
            </div>
        </button>
    );

    return (
        <Form layout="vertical">
            <Row gutter={[16, 16]}>
                {/* Col chính chứa thông tin sản phẩm */}
                <Col span={16}>
                    <Card className="bg-light" title="Thông tin sản phẩm">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tên sản phẩm"
                                    name="prodcutName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập Tên sản phẩm!",
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Loại sản phẩm"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn Loại sản phẩm!",
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        showSearch
                                        placeholder="Chọn loại sản phẩm"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Mặt nạ",
                                            },
                                            {
                                                value: "2",
                                                label: "Sữa rửa mặt",
                                            },
                                            {
                                                value: "3",
                                                label: "Kem dưỡng",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Dung tích sản phẩm"
                                    name="capacity"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập Dung tích sản phẩm!",
                                        },
                                    ]}
                                >
                                    <Input
                                        addonAfter={
                                            <Select defaultValue="Cái">
                                                <Select.Option value="Cái">
                                                    Cái
                                                </Select.Option>
                                                <Select.Option value="Thể tích">
                                                    Thể tích
                                                </Select.Option>
                                            </Select>
                                        }
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Mã Code sản phẩm"
                                    name="capacity"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập mã code sản phẩm!",
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Thời hạn sản phẩm"
                                    name="Dateproduct"
                                >
                                    <RangePicker
                                        size="large"
                                        className="w-100"
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card className="bg-light" style={{ marginTop: 16 }} title="Giá và số lượng">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá Nhập"
                                    name="cost"
                                    rules={[
                                        {
                                            message: "Vui lòng nhập Giá Nhập!",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        size="large"
                                        className="w-100"
                                        defaultValue={1000}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value?.replace(/\$\s?|(,*)/g, "")
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Giá Bán ra"
                                    name="price"
                                    rules={[
                                        {
                                            message:
                                                "Vui lòng nhập Giá Bán ra!",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        size="large"
                                        className="w-100"
                                        defaultValue={1000}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        parser={(value) =>
                                            value?.replace(/\$\s?|(,*)/g, "")
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Số lượng tồn kho"
                                    name="quantity"
                                >
                                    <InputNumber
                                        size="large"
                                        className="w-100"
                                        defaultValue={1000}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Col chứa hình ảnh sản phẩm */}
                <Col span={8}>
                    <Card className="bg-light" style={{ height: "100%" }} title="Hỉnh ảnh sản phẩm">
                        <Form.Item label="Hình ảnh sản phẩm" name="gender">
                            <>
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
                                        wrapperStyle={{ display: "none" }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) =>
                                                setPreviewOpen(visible),
                                            afterOpenChange: (visible) =>
                                                !visible && setPreviewImage(""),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </>
                        </Form.Item>
                    </Card>
                </Col>

                {/* Ghi chú và mô tả sản phẩm */}
                <Col span={24}>
                    <Card className="bg-light" style={{ marginTop: 16 }} title="Ghi chú">
                        <Form.Item label="Ghi chú" name="note">
                            <TextArea
                                rows={4}
                                placeholder="Tối đa 255 ký tự"
                                maxLength={255}
                            />
                        </Form.Item>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card className="bg-light" style={{ marginTop: 16 }}>
                        <Form.Item label="Mô tả sản phẩm" name="description">
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1}
                                onBlur={(newContent) => setContent(newContent)}
                            />
                        </Form.Item>
                    </Card>
                </Col>

                {/* Button điều hướng */}
                <Col span={24}>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">
                            Thêm sản phẩm
                        </Button>
                        <Link to="/admin/user">
                            <Button size="large" style={{ marginLeft: 8 }}>
                                Quay lại
                            </Button>
                        </Link>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Product_add;
