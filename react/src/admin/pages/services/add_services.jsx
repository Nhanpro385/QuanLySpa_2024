import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    Row,
    Col,
    Card,
    Select,
    Upload,
    Spin,
    notification,
    InputNumber,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import useServiceCategoriesActions from "../../modules/services/hooks/useServiceCategories";
import useServicesActions from "../../modules/services/hooks/useServices";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../utils";
const ServicesAdd = () => {
    useEffect(() => {
        document.title = "Thêm dịch vụ";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const { getServiceCategories, searchServiceCategories } =
        useServiceCategoriesActions();
    const { addservices } = useServicesActions();
    const ServiceCategories = useSelector((state) => state.serviceCategories);
    const [searchquery, setSearchQuery] = useState({
        page: 1,
        search: "",
        per_page: 50,
    });
    const [fileList, setFileList] = useState([]);
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getServiceCategories(50);
    }, []);

    const servicesCategories = ServiceCategories.ServiceCategories.data.map(
        (category) => ({
            id: category.id,
            name: category.name,
        })
    );

    const OnSearchServiceCategories = debounce((value) => {
        setSearchQuery({
            ...searchquery,
            search: value,
        });
    }, 300);
    useEffect(() => {
        if (searchquery.search !== "") {
            searchServiceCategories(searchquery);
        } else {
            getServiceCategories(50);
        }
    }, [searchquery]);
    const onSubmit = async (data) => {
        try {
            data.id = generateSnowflakeId();
            data.image_url = data.image_url.map((file) => file.originFileObj);

            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            if (fileList.length > 0) {
                fileList.forEach((file) => {
                    formData.append("image_url[]", file.originFileObj);
                });
            }

            const res = await addservices(formData);

            if (res.payload.status === 422) {
                Object.keys(res.payload.errors).forEach((key) => {
                    if (
                        [
                            "name",
                            "service_category_id",
                            "duration",
                            "price",
                            "priority",
                            "description",
                            "image_url",
                        ].includes(key)
                    ) {
                        setError(key, {
                            type: "manual",
                            message: res.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: res.payload.errors[key][0],
                            duration: 2,
                        });
                    }
                });
            } else if (res.payload.status === "success") {
                api.success({
                    message: "Thêm dịch vụ thành công",
                    description: "Bạn đã thêm dịch vụ thành công",
                    duration: 2,
                });
                reset();
                setFileList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {contextHolder}
            <Row gutter={16}>
                <Col span={15}>
                    <Card title="Thông tin chi tiết">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập tên dịch vụ",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Tên dịch vụ"
                                            validateStatus={
                                                errors.name && "error"
                                            }
                                            help={errors.name?.message}
                                        >
                                            <Input
                                                {...field}
                                                placeholder="Tên dịch vụ"
                                            />
                                        </Form.Item>
                                    )}
                                />
                                {errors.service_name && (
                                    <p style={{ color: "red" }}>
                                        {errors.service_name.message}
                                    </p>
                                )}
                            </Col>
                            <Col span={12}>
                                <Controller
                                    name="service_category_id"
                                    control={control}
                                    rules={{
                                        required: "Vui lòng chọn loại dịch vụ",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Loại dịch vụ"
                                            validateStatus={
                                                errors.service_category_id &&
                                                "error"
                                            }
                                            help={
                                                errors.service_category_id
                                                    ?.message
                                            }
                                        >
                                            <Select
                                                {...field}
                                                placeholder="Chọn loại dịch vụ"
                                                showSearch
                                                optionFilterProp="children"
                                                onSearch={
                                                    OnSearchServiceCategories
                                                }
                                                filterOption={false}
                                                notFoundContent={
                                                    ServiceCategories.loading ? (
                                                        <Spin size="small" />
                                                    ) : null
                                                }
                                            >
                                                {servicesCategories.map(
                                                    (category) => (
                                                        <Select.Option
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </Select.Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row gutter={12}>
                            <Col span={6}>
                                <Controller
                                    name="duration"
                                    control={control}
                                    rules={{
                                        required:
                                            "Vui lòng nhập thời gian dịch vụ",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Thời gian (phút)"
                                            validateStatus={
                                                errors.duration && "error"
                                            }
                                            help={errors.duration?.message}
                                        >
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Thời gian (phút)"
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={6}>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập giá dịch vụ",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Giá"
                                            validateStatus={
                                                errors.price && "error"
                                            }
                                            help={errors.price?.message}
                                        >
                                            {/* <InputNumber
                                                {...field}
                                                type="number"
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                                placeholder="Giá dịch vụ"
                                            /> */}
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                {...field}
                                                formatter={(value) =>
                                                    `${value}`.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )
                                                }
                                                parser={(value) =>
                                                    value?.replace(
                                                        /\$\s?|(,*)/g,
                                                        ""
                                                    )
                                                }
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <Controller
                                    name="priority"
                                    control={control}
                                    rules={{
                                        required: "Vui lòng nhập mức ưu tiên",
                                    }}
                                    render={({ field }) => (
                                        <Form.Item
                                            label="Mức ưu tiên"
                                            validateStatus={
                                                errors.priority && "error"
                                            }
                                            help={errors.priority?.message}
                                        >
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Mức ưu tiên (1, 2, 3...)"
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Item label="Mô tả">
                                            <Input.TextArea
                                                {...field}
                                                placeholder="Mô tả dịch vụ"
                                                rows={4}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Thêm dịch vụ
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card title="Hình ảnh sản phẩm">
                        <Form.Item label="Hình ảnh sản phẩm" required>
                            <span
                                style={{ display: "block", marginBottom: 10 }}
                            >
                                1. ảnh đầu tiên sẽ là ảnh chính
                            </span>
                            <span
                                style={{ display: "block", marginBottom: 10 }}
                            >
                                2. tối đa 10 ảnh
                            </span>
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
                                        fileList={fileList}
                                        onChange={({ fileList }) => {
                                            setFileList(fileList);
                                            field.onChange(fileList);
                                        }}
                                        beforeUpload={() => false}
                                        name="image_url"
                                        maxCount={10}
                                        multiple
                                    >
                                        {fileList.length < 10 && (
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
            </Row>
        </Form>
    );
};

export default ServicesAdd;
