import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Input,
    DatePicker,
    InputNumber,
    notification,
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
import { generateSnowflakeId } from "../../utils";
import { UploadOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
const Product_add = () => {
    useEffect(() => {
        document.title = "Thêm sản phẩm";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        shouldFocusError: false,
    });
    const { addproduct } = useproductActions();
    const { getcategories, searchcategories } = usecategoriesActions();
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 100,
    });
    const { categories, loading, error, category } = useSelector(
        (state) => state.categories
    );
    useEffect(() => {
        getcategories(50);
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
            console.log(res);

            if (res.payload.status === "success") {
                api.success({
                    message: "Thêm sản phẩm thành công!",
                    description: "Bạn đã thêm sản phẩm thành công.",
                    duration: 3,
                });
                reset();
                setFile([]);
                setContent("");
            } else {
                api.error({
                    message: "Thêm sản phẩm không thành công!",
                    description: res.payload.message || "Có lỗi xảy ra!",
                    duration: 3,
                });
                if (Object.keys(res.payload?.errors)?.length > 0) {
                    Object.keys(res.payload?.errors)?.map((key) => {
                        if (
                            [
                                "name",
                                "category_id",
                                "capacity",
                                "bar_code",
                                "date",
                                "priority",
                                "cost",
                                "price",
                                "image_url",
                                "description",
                            ].includes(key)
                        ) {
                            setError(key, {
                                type: "manual",
                                message: res.payload.errors[key][0],
                            });
                        }
                    });
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const debouncedSearch = debounce((value) => {
        searchcategories({ search: value, page: 1, per_page: 50 });
    }, 500);
    useEffect(() => {
        if (searchQuery.search !== "") {
            searchcategories(searchQuery);
        } else {
            getcategories(50);
        }
    }, [searchQuery]);
    return (
        <>
            {contextHolder}
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
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        option.label
                                                            .toLowerCase()
                                                            .indexOf(
                                                                input.toLowerCase()
                                                            ) >= 0
                                                    }
                                                    showSearch
                                                    onSearch={debouncedSearch}
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
                                    <Form.Item label="Dung tích" required>
                                        <Controller
                                            name="capacity"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập Dung tích sản phẩm!",
                                            }}
                                            render={({ field }) => (
                                                <Input
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
                                    <Form.Item label="Mã code" required>
                                        <Controller
                                            name="bar_code"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập mã code sản phẩm!",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    maxLength={20}
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
                                    <Form.Item label="Hạn sử dụng" required>
                                        <Controller
                                            name="date"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng chọn Hạn sử dụng!",
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
                                <Col xl={12} md={12} sm={24} xs={24}>
                                    <Form.Item label="Độ ưu tiên" required>
                                        <Controller
                                            name="priority"
                                            control={control}
                                            rules={{
                                                required:
                                                    "vui lòng nhập độ ưu tiên",
                                            }}
                                            render={({ field }) => (
                                                <InputNumber
                                                    min={0}
                                                    size="large"
                                                    className="w-100"
                                                    {...field}
                                                    placeholder="Độ ưu tiên"
                                                />
                                            )}
                                        />
                                        {errors.priority && (
                                            <p style={{ color: "red" }}>
                                                {errors.priority.message}
                                            </p>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            className="bg-light"
                            style={{ marginTop: 16 }}
                            title="Giá sản phẩm"
                        >
                            <Row gutter={[16, 16]}>
                                <Col xl={12} md={12} sm={24} xs={24}>
                                    <Form.Item label="Giá Nhập" required>
                                        <Controller
                                            name="cost"
                                            control={control}
                                            rules={{
                                                required:
                                                    "vui lòng nhập giá nhập",
                                            }}
                                            render={({ field }) => (
                                                <InputNumber
                                                    min={0}
                                                    size="large"
                                                    className="w-100"
                                                    {...field}
                                                    formatter={(value) =>
                                                        `${value}`.replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )
                                                    }
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
                                                required:
                                                    "vui lòng nhập giá bán",
                                            }}
                                            render={({ field }) => (
                                                <InputNumber
                                                    min={0}
                                                    size="large"
                                                    className="w-100"
                                                    {...field}
                                                    formatter={(value) =>
                                                        `${value}`.replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )
                                                    }
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
                                                    <div
                                                        style={{ marginTop: 8 }}
                                                    >
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
                                        required:
                                            "Vui lòng nhập Mô tả sản phẩm!",
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
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
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
