import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Input,
    DatePicker,
    InputNumber,
    Image,
    Upload,
    Form,
    Select,
    message,
} from "antd";

import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useForm, Controller } from "react-hook-form";
import usecategoriesActions from "../../modules/product/hooks/useCategoriesProduct";
import useproductActions from "../../modules/product/hooks/useProduct";

import { useSelector } from "react-redux";
import formatDate from "../../utils/formatedate";
import { generateSnowflakeId } from "../../utils/snowflakeID";
import { UploadOutlined } from "@ant-design/icons";

const Product_add = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const { addproduct } = useproductActions();
    const { getcategories } = usecategoriesActions();
    const { categories, loading, error, category } = useSelector(
        (state) => state.categories
    );
    useEffect(() => {
        getcategories();
    }, []);
    const [file, setFile] = useState([]);
    const editor = useRef(null);
    const [content, setContent] = useState("");

    const onSubmit = async (data) => {
        try {
            data.id = generateSnowflakeId();
            data.date = formatDate(data.date);

            // Tạo đối tượng FormData
            const formData = new FormData();

            // Gắn dữ liệu text vào FormData
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // Gắn file ảnh vào FormData
            if (file.length > 0) {
                formData.append("image_url", file[0].originFileObj);
            }

            const res = await addproduct(formData);
            if (res.meta.requestStatus === "fulfilled") {
                message.success("Thêm sản phẩm thành công!");
            } else {
                Object.keys(res.payload.errors).map((key) => {
                    setError(key, {
                        type: "manual",
                        message: res.payload.errors[key][0],
                    });
                });

                message.error("Thêm sản phẩm thất bại!");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <h1 className="text-center">Thêm sản phẩm</h1>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Row gutter={[16, 16]}>
                <Col xl={16} md={16} sm={24} xs={24}>
                    <Card className="bg-light" title="Thông tin sản phẩm">
                        <Row gutter={[16, 16]}>
                            <Col xl={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Tên sản phẩm" required>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required:
                                                "Vui lòng nhập Tên sản phẩm!",
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                size="large"
                                                {...field}
                                                placeholder="Tên sản phẩm"
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <p style={{ color: "red" }}>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Loại sản phẩm" required>
                                    <Controller
                                        name="category_id"
                                        control={control}
                                        rules={{
                                            required:
                                                "Vui lòng chọn Loại sản phẩm!",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                loading={loading}
                                                size="large"
                                                className="w-100"
                                                {...field}
                                                placeholder="Chọn loại sản phẩm"
                                                options={categories.data.map(
                                                    (item) => ({
                                                        value: item.id,
                                                        label: item.name,
                                                    })
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.category_id && (
                                        <p style={{ color: "red" }}>
                                            {errors.category_id.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={6} md={6} sm={12} xs={24}>
                                <Form.Item label="Dung tích sản phẩm" required>
                                    <Controller
                                        name="capacity"
                                        control={control}
                                        rules={{
                                            required:
                                                "Vui lòng nhập Dung tích sản phẩm!",
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                addonAfter={
                                                    <Select defaultValue="Cái">
                                                        <Select.Option value="piece">
                                                            Cái
                                                        </Select.Option>
                                                        <Select.Option value="ml">
                                                            Thể tích
                                                        </Select.Option>
                                                    </Select>
                                                }
                                                size="large"
                                                {...field}
                                                placeholder="Dung tích"
                                            />
                                        )}
                                    />
                                    {errors.capacity && (
                                        <p style={{ color: "red" }}>
                                            {errors.capacity.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={6} md={6} sm={12} xs={24}>
                                <Form.Item label="Mã code sản phẩm" required>
                                    <Controller
                                        name="bar_code"
                                        control={control}
                                        rules={{
                                            required:
                                                "Vui lòng nhập mã code sản phẩm!",
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                size="large"
                                                {...field}
                                                placeholder="Mã Code"
                                            />
                                        )}
                                    />
                                    {errors.bar_code && (
                                        <p style={{ color: "red" }}>
                                            {errors.bar_code.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Ngày sản xuất" required>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{
                                            required:
                                                "Vui lòng chọn ngày sản xuất!",
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                size="large"
                                                className="w-100"
                                                format="YYYY-MM-DD"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.date && (
                                        <p style={{ color: "red" }}>
                                            {errors.date.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        className="bg-light"
                        style={{ marginTop: 16 }}
                        title="Giá và số lượng"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xl={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Giá Nhập" required>
                                    <Controller
                                        name="cost"
                                        control={control}
                                        rules={{
                                            required: "vui lòng nhập giá nhập",
                                        }}
                                        render={({ field }) => (
                                            <InputNumber
                                                size="large"
                                                className="w-100"
                                                {...field}
                                                placeholder="Giá Nhập"
                                            />
                                        )}
                                    />
                                    {errors.cost && (
                                        <p style={{ color: "red" }}>
                                            {errors.cost.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Giá Bán" required>
                                    <Controller
                                        name="price"
                                        control={control}
                                        rules={{
                                            required: "vui lòng nhập giá bán",
                                        }}
                                        render={({ field }) => (
                                            <InputNumber
                                                size="large"
                                                className="w-100"
                                                {...field}
                                                placeholder="Giá Bán"
                                            />
                                        )}
                                    />
                                    {errors.price && (
                                        <p style={{ color: "red" }}>
                                            {errors.price.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xl={8} md={8} sm={24} xs={24}>
                    <Card
                        className="bg-light"
                        style={{ height: "100%" }}
                        title="Hình ảnh sản phẩm"
                    >
                        <Form.Item label="Hình ảnh sản phẩm" required>
                            <Controller
                                name="image_url"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ảnh sản phẩm!",
                                }}
                                render={({ field }) => (
                                    <Upload
                                        {...field}
                                        listType="picture-card"
                                        fileList={file}
                                        onChange={({ fileList }) => {
                                            setFile(fileList);
                                            field.onChange(fileList);
                                        }}
                                        beforeUpload={() => false}
                                        name="image_url"
                                        maxCount={1}
                                    >
                                        {file.length < 1 && (
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Tải ảnh lên
                                                </div>
                                            </div>
                                        )}
                                    </Upload>
                                )}
                            />
                            {errors.image_url && (
                                <p style={{ color: "red" }}>
                                    {errors.image_url.message}
                                </p>
                            )}
                        </Form.Item>
                    </Card>
                </Col>

                <Col xl={24} md={24} sm={24} xs={24}>
                    <Card className="bg-light" style={{ marginTop: 16 }}>
                        <Form.Item label="Mô tả sản phẩm" required>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập Mô tả sản phẩm!",
                                }}
                                render={({ field }) => (
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        tabIndex={1}
                                        onBlur={(newContent) => {
                                            setContent(newContent);
                                            field.onChange(newContent); // Update the form state
                                        }}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p style={{ color: "red" }}>
                                    {errors.description.message}
                                </p>
                            )}
                        </Form.Item>
                    </Card>
                </Col>

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
        </>
    );
};

export default Product_add;
