import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Col,
    Row,
    Card,
    Select,
    Upload,
    Image,
    Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import useServicesActions from "../hooks/useServices";
const { Option } = Select;
// const {
//     addservices,
//     getservices,
//     updateservices,
//     deleteservices,
//     getservicesById,
// } = useServicesActions();
import { useSelector } from "react-redux";
const ServiceModalEdit = ({ isModalOpen, handleOk, handleCancel, id }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    // const { service } = useSelector((state) => state.services);
    // useEffect(() => {
    //     getservicesById(id);
    // }, [id]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

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
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Thêm ảnh</div>
        </div>
    );

    const servicesCategories = [
        { id: 1, name: "Dịch vụ mặt" },
        { id: 2, name: "Dịch vụ body" },
    ];

    const onSubmit = (data) => {
        // Process form data here
        handleOk();
    };

    return (
        <Modal
            title="Chỉnh sửa danh mục"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={1000}
        >
            <Row gutter={16}>
                <Col span={15}>
                    <Card title="Thông tin chi tiết">
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit(onSubmit)}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Tên dịch vụ">
                                        <Controller
                                            name="service_name"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập tên dịch vụ",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Tên dịch vụ"
                                                    status={
                                                        errors.service_name
                                                            ? "error"
                                                            : ""
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.service_name && (
                                            <span style={{ color: "red" }}>
                                                {errors.service_name.message}
                                            </span>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Giá">
                                        <Controller
                                            name="price"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập giá dịch vụ",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Giá dịch vụ"
                                                    status={
                                                        errors.price
                                                            ? "error"
                                                            : ""
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.price && (
                                            <span style={{ color: "red" }}>
                                                {errors.price.message}
                                            </span>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Mô tả">
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.TextArea
                                                    {...field}
                                                    placeholder="Mô tả dịch vụ"
                                                    rows={4}
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Thời gian (phút)">
                                        <Controller
                                            name="duration"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Thời gian (phút)"
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Loại dịch vụ">
                                        <Controller
                                            name="services_category_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Chọn loại dịch vụ"
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                >
                                                    {servicesCategories.map(
                                                        (category) => (
                                                            <Option
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Trạng thái">
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    {...field}
                                                    checked={field.value}
                                                    checkedChildren="Hoạt động"
                                                    unCheckedChildren="Ngừng hoạt động"
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Lưu
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
                        <Modal
                            visible={previewOpen}
                            footer={null}
                            onCancel={() => setPreviewOpen(false)}
                        >
                            <Image
                                alt="preview"
                                style={{ width: "100%" }}
                                src={previewImage}
                            />
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
};

export default ServiceModalEdit;
