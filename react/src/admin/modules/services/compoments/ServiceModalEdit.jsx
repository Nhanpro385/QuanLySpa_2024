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
    Switch,
    Spin,
    Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import useServiceCategoriesActions from "../hooks/useServiceCategories";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

const { Option } = Select;
function timeStringToMinutes(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
}
function ServiceModalEdit({
    isModalOpen,
    handleOk,
    handleCancel,
    service,
    handleSubmitEdit,
    error,
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
    } = useForm();
    const {
        getServiceCategories,
        searchServiceCategories,
        getServiceCategoriesById,
    } = useServiceCategoriesActions();
    const { ServiceCategories, loading, category } = useSelector(
        (state) => state.ServiceCategories
    );

    const [datacate, setdatacate] = useState([]);

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (service) {
            setValue("name", service.name || "");
            setValue("price", service.price || "");
            setValue("description", service.description || "");
            setValue("duration", timeStringToMinutes(service.duration) || "");
            setValue("status", service.status || false);
            setValue(
                "service_category_id",
                service.service_category_id.id || ""
            );
            // Get service categories from API
            getServiceCategories();
            getServiceCategoriesById(service.service_category_id.id);
        }
    }, [service]);
    useEffect(() => {
   
        
        
        if (error) {
            Object.keys(error).forEach((key) => {
                setError(key, {
                    type: "manual",
                    message: error[key][0],
                });
            });
        }
    }, [error]);

    useEffect(() => {
        if (ServiceCategories && service) {
            const data = [
                ...ServiceCategories.data,
                service.service_category_id,
            ].map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                };
            });
            // check trung lap
            const unique = data.filter(
                (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );

            setdatacate(unique);
        }
    }, [ServiceCategories, service]);

    const debouncedSearch = debounce((value) => {
        searchServiceCategories({ search: value, page: 1 });
    }, 500); // 300ms debounce

    const onSubmit = (data) => {
        const payload = {
            id: service.id,
            ...data,
        };
        handleSubmitEdit(payload);
        reset();
        setFileList([]);
        
    };

    return (
        <Modal
            title="Chỉnh sửa danh mục"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={1400}
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
                                            name="name"
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
                                <Col span={12}>
                                    <Form.Item label="Thời gian (phút)">
                                        <Controller
                                            name="duration"
                                            rules={{
                                                required:
                                                    "Vui lòng nhập thời gian dịch vụ",
                                            }}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Thời gian (phút)"
                                                />
                                            )}
                                        />
                                        {errors.duration && (
                                            <span style={{ color: "red" }}>
                                                {errors.duration.message}
                                            </span>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Loại dịch vụ">
                                        <Controller
                                            name="service_category_id"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng chọn loại dịch vụ",
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Chọn loại dịch vụ"
                                                    showSearch
                                                    defaultActiveFirstOption={
                                                        false
                                                    }
                                                    optionFilterProp="children"
                                                    onSearch={debouncedSearch}
                                                    filterOption={false}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    notFoundContent={
                                                        loading ? (
                                                            <Spin size="small" />
                                                        ) : null
                                                    }
                                                >
                                                    {datacate.map(
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
                                        {errors.service_category_id && (
                                            <span style={{ color: "red" }}>
                                                {
                                                    errors.service_category_id
                                                        .message
                                                }
                                            </span>
                                        )}
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
                                <Col span={12}>
                                    <Form.Item label="mức độ ưu tiên">
                                        <Controller
                                            name="priority"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập mức độ ưu tiên",
                                                valueAsNumber: true,
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="mức độ ưu tiên"
                                                />
                                            )}
                                        />
                                        {errors.priority && (
                                            <span style={{ color: "red" }}>
                                                {errors.priority.message}
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
                                defaultValue={[]} // Giá trị mặc định là một mảng rỗng
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
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
}

export default ServiceModalEdit;
