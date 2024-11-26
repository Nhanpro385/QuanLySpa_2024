import React, { useState, useRef, useEffect } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Select,
    notification,
    Card,
    Row,
    Col,
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
import JoditEditor from "jodit-react";
import { Controller, set, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../utils";
import usePromotionActions from "../../modules/promotion/hooks/usepromotionAction";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const Promotions_Edit = () => {
    const { id: idpromotion } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const promotions = useSelector((state) => state.promotions);

    const {
        control,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors },
    } = useForm({});

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const { updatePromotions, getPromotionsById } = usePromotionActions();
    // Submit form
    useEffect(() => {
        if (idpromotion) {
            getPromotionsById(idpromotion);
        } else {
            reset();
            api.error({
                message: "Không tìm thấy chương trình khuyến mãi",
                description: "Vui lòng thử lại",
                duration: 3,
            });
        }
    }, [idpromotion]);
    useEffect(() => {
        if (promotions.promotion && promotions.promotion?.data) {
            setValue("name", promotions.promotion?.data.name);
            setValue("description", promotions.promotion?.data.description);
            setValue(
                "promotion_type",
                promotions.promotion?.data.promotion_type === "Percent" ? 0 : 1
            );
            setValue(
                "discount_percent",
                promotions.promotion?.data.discount_percent
            );
            setValue(
                "min_order_amount",
                promotions.promotion?.data.min_order_amount
            );
            setValue("min_quantity", promotions.promotion?.data.min_quantity);
            setValue("startDateAndEndDate", [
                dayjs(promotions.promotion?.data.start_date),
                dayjs(promotions.promotion?.data.end_date),
            ]);
            setFileList([
                {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    tag: "old",
                    url:
                        "http://127.0.0.1:8000/storage/uploads/promotions/" +
                        promotions.promotion?.data.image_url,
                },
            ]);
            setContent(promotions.promotion?.data.description);
        } else {
            api.error({
                message: "Không tìm thấy chương trình khuyến mãi",
                description: "Vui lòng  thử lại",
                duration: 3,
            });
        }
    }, [promotions]);
    const onFinish = async (values) => {
        try {
            // Remove validation temporarily to allow submission
            form.validateFields()
                .then(async () => {
                    const payload = {
                        id: generateSnowflakeId(),
                        name: values.name,
                        description: values.description,
                        start_date:
                            values.startDateAndEndDate[0].format("YYYY-MM-DD"),
                        end_date:
                            values.startDateAndEndDate[1].format("YYYY-MM-DD"),
                        promotion_type: values.promotion_type,
                        discount_percent: values.discount_percent,
                        min_order_amount: values.min_order_amount,
                        min_quantity: values.min_quantity,
                        status: true,
                    };

                    if (fileList[0].tag === "old") {
                        console.log("Đây là ảnh cũ");
                    } else {
                        payload.image_url = fileList[0].originFileObj;
                        console.log("Đây là ảnh mới");
                    }

                    const formData = new FormData();
                    Object.keys(payload).map((key) => {
                        formData.append(key, payload[key]);
                    });

                    const response = await updatePromotions({
                        id: idpromotion,
                        data: formData,
                    });

                    if (response.payload.status === "success") {
                        console.log(response);
                        api.success({
                            message:
                                "Chỉnh sửa chương trình khuyến mãi thành công",
                            description: response.payload.message,
                            duration: 3,
                        });
                        reset();
                        setFileList([]);
                        setContent("");
                    } else {
                        Object.keys(response.payload.errors).map((key) => {
                            if (key === "start_date") {
                                setError("startDateAndEndDate", {
                                    type: "manual",
                                    message: response.payload.errors[key][0],
                                });
                            }
                            if (key === "end_date") {
                                setError("startDateAndEndDate", {
                                    type: "manual",
                                    message: response.payload.errors[key][0],
                                });
                            }

                            setError(key, {
                                type: "manual",
                                message: response.payload.errors[key][0],
                            });
                        });
                    }
                })
                .catch(() => {
                    // If validation fails, you can log or handle the errors
                    api.error({
                        message: "Lỗi khi kiểm tra dữ liệu",
                        description: "Vui lòng kiểm tra lại dữ liệu đã nhập.",
                        duration: 3,
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);
    return (
        <div style={{ padding: "20px" }}>
            {contextHolder}
            <h1 className="text-center">Chỉnh Sửa Chương Trình Khuyến Mãi</h1>
            <Card
                title={<h2>Thông tin chương trình khuyến mãi</h2>}
                style={{ width: "100%" }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit(onFinish)}
                >
                    <Row gutter={16}>
                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="name"
                                label="Tên khuyến mãi"
                                help={errors.name && errors.name.message}
                                validateStatus={errors.name && "error"}
                            >
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Tên chương trình không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Nhập tên chương trình khuyến mãi"
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        <Col xl={12} md={12} sm={24} xs={24}>
                            <Form.Item
                                name="promotion_type"
                                label="Loại khuyến mãi"
                                help={
                                    errors.promotion_type &&
                                    errors.promotion_type.message
                                }
                                validateStatus={
                                    errors.promotion_type && "error"
                                }
                            >
                                <Controller
                                    name="promotion_type"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Loại khuyến mãi không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Chọn loại khuyến mãi"
                                        >
                                            <Option value={0}>
                                                Giảm giá theo phần trăm (%)
                                            </Option>
                                            <Option value={1}>
                                                Giảm giá tiền mặt (VNĐ)
                                            </Option>
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={4} md={4} sm={24} xs={24}>
                            <Form.Item
                                name="discount_percent"
                                label="Giảm giá %"
                                help={
                                    errors.discount_percent &&
                                    errors.discount_percent.message
                                }
                                validateStatus={
                                    errors.discount_percent && "error"
                                }
                            >
                                <Controller
                                    name="discount_percent"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Giảm giá không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            placeholder="Nhập giảm giá"
                                            style={{ width: "100%" }}
                                            min={0}
                                            max={100}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={4} md={4} sm={24} xs={24}>
                            <Form.Item
                                name="min_order_amount"
                                label="Tôi thiểu giá trị"
                                help={
                                    errors.min_order_amount &&
                                    errors.min_order_amount.message
                                }
                                validateStatus={
                                    errors.min_order_amount && "error"
                                }
                            >
                                <Controller
                                    name="min_order_amount"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Giá trị tối thiểu không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            placeholder="Nhập giá trị tối thiểu"
                                            style={{ width: "100%" }}
                                            formatter={(value) =>
                                                `${value}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                            }
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={4} md={4} sm={24} xs={24}>
                            <Form.Item
                                name="min_quantity"
                                label="Tối thiểu số lượng"
                                help={
                                    errors.min_quantity &&
                                    errors.min_quantity.message
                                }
                                validateStatus={errors.min_quantity && "error"}
                            >
                                <Controller
                                    name="min_quantity"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Số lượng tối thiểu không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            placeholder="Nhập số lượng tối thiểu"
                                            style={{ width: "100%" }}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Form.Item
                                name="startDateAndEndDate"
                                label="Ngày bắt đầu và kết thúc"
                                help={
                                    errors.startDateAndEndDate &&
                                    errors.startDateAndEndDate.message
                                }
                                validateStatus={
                                    errors.startDateAndEndDate && "error"
                                }
                            >
                                <Controller
                                    name="startDateAndEndDate"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Ngày bắt đầu và kết thúc không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <RangePicker
                                            {...field}
                                            className="w-100"
                                            format={"YYYY-MM-DD"}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>

                        <Col xl={6} md={6} sm={24} xs={24}>
                            <Form.Item name="image_url" label="Tải ảnh lên">
                                <Controller
                                    name="image_url"
                                    control={control}
                                    render={({ field }) => (
                                        <Upload
                                            {...field}
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={({ fileList }) =>
                                                setFileList(fileList)
                                            }
                                            beforeUpload={() => false}
                                            maxCount={1}
                                        >
                                            {fileList.length < 1 && (
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
                            </Form.Item>
                        </Col>
                        <Col xl={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name="description"
                                label="Mô tả khuyến mãi"
                                help={
                                    errors.description &&
                                    errors.description.message
                                }
                                validateStatus={errors.description && "error"}
                            >
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                "Mô tả khuyến mãi không được để trống",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <JoditEditor
                                            {...field}
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
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Nút thêm khuyến mãi */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Chỉnh sửa chương trình khuyến mãi
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Promotions_Edit;