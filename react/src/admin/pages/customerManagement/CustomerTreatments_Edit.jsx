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
    Rate,
    notification,
    Tag,
    Skeleton,
    Image,
    Space,
} from "antd";
import {
    CarryOutOutlined,
    PhoneOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { Controller, useForm } from "react-hook-form";
import { generateSnowflakeId } from "../../utils";
import useappointmentsActions from "../../modules/appointments/hooks/useappointments";
import useStreatmentsAction from "../../modules/streatment/hooks/useStreatmentsAction";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StreatmentsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [fileList, setFileList] = useState([]);

    const [strreatmentData, setStrreatmentData] = useState({});
    const { updateStreatment, getStreatmentById } = useStreatmentsAction();

    const streatments = useSelector((state) => state.streatments);

    const {
        control,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        shouldFocusError: false, // Không tự động focus trường lỗi
    });

    useEffect(() => {
        getStreatmentById(id);
    }, [id]);

    useEffect(() => {
        console.log(streatments);
        if (!streatments.loading && streatments.streament) {
            setStrreatmentData(streatments?.streament?.data);

            setValue("feedback", streatments?.streament?.data?.feedback);
            setValue("note", streatments?.streament?.data?.note);
            setValue("status", streatments?.streament?.data?.status);
        }
    }, [streatments]);

    const onSubmit = async (data) => {
        try {
            // Chuẩn bị payload cơ bản (chỉ bao gồm nội dung không liên quan đến ảnh)
            const payload = {
                id: id,
                note: data.note,

                feedback: data.feedback,
                status: data.status,
            };

            // Nếu có ảnh trong fileList, thêm chúng vào payload
            if (fileList.length) {
                fileList.forEach((file, index) => {
                    payload[`image_${index === 0 ? "before" : "after"}`] =
                        file.originFileObj;
                });
            }

            const formData = new FormData();
            Object.keys(payload).forEach((key) => {
                formData.append(key, payload[key]);
            });

            // Gửi request cập nhật trị liệu
            const response = await updateStreatment({
                id: id,
                data: formData,
            });
            if (response.meta.requestStatus == "rejected") {
                api.error({
                    message: "Cập nhật trị liệu thất bại",
                    description: response.payload.message,
                });
                Object.keys(response?.payload?.errors).forEach((key) => {
                    if (
                        [
                            "feedback",
                            "note",
                            "status",
                            "image_url",
                            "image_before",
                            "image_after",
                            "status",
                            "evaluete",
                            "customer_id",
                            "user_id",
                        ].includes(key)
                    ) {
                        setError(key, {
                            type: "manual",
                            message: response.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Có lỗi xảy ra",
                            description: response.payload.errors[key][0],
                            duration: 3,
                        });
                    }
                });
            } else {
                api.success({
                    message: "Cập nhật trị liệu thành công",
                    description: "Dữ liệu đã được cập nhật.",
                });
            }

            // Xử lý thông báo dựa trên kết quả trả về
        } catch (error) {
            console.error("Lỗi trong quá trình cập nhật:", error);
        }
    };

    const OnSearch = debounce((value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    }, 500);

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            {contextHolder}
            <h1 className="text-center">Chỉnh sửa lịch sử trị liệu</h1>
            <Row gutter={16}>
                <Col span={15}>
                    <Card title="Thông tin chi tiết">
                        <Row gutter={[16, 16]}>
                            <Col
                                xxl={12}
                                xl={16}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                            >
                                <Form.Item label="Tên khách hàng">
                                    {streatments.loading ? (
                                        <Skeleton.Input
                                            block={true}
                                            active={true}
                                            size={"large"}
                                        />
                                    ) : (
                                        <Input
                                            prefix={<UserOutlined />}
                                            value={
                                                strreatmentData?.customer
                                                    ?.full_name ||
                                                strreatmentData?.customer
                                                    ?.email ||
                                                "Không có"
                                            }
                                            disabled
                                        />
                                    )}
                                </Form.Item>
                            </Col>{" "}
                            <Col
                                xxl={12}
                                xl={16}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                            >
                                <Form.Item label="Nhân viên thực hiện">
                                    {streatments.loading ? (
                                        <Skeleton.Input
                                            block={true}
                                            active={true}
                                            size={"large"}
                                        />
                                    ) : (
                                        <Input
                                            prefix={<UserOutlined />}
                                            value={
                                                strreatmentData?.users?.[0]
                                                    ?.full_name || "Không có"
                                            }
                                            disabled
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    label="Trạng thái"
                                    validateStatus={errors.status && "error"}
                                    help={errors.status?.message}
                                >
                                    {streatments.loading ? (
                                        <Skeleton.Input
                                            block={true}
                                            active={true}
                                            size={"large"}
                                        />
                                    ) : (
                                        <Controller
                                            name="status"
                                            control={control}
                                            defaultValue={
                                                strreatmentData?.status === 1
                                                    ? "true"
                                                    : "false"
                                            }
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Vui lòng chọn trạng thái",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    className="w-100"
                                                    {...field}
                                                    placeholder="Chọn trạng thái"
                                                >
                                                    <Select.Option value={0}>
                                                        Chưa hoàn thành
                                                    </Select.Option>
                                                    <Select.Option value={1}>
                                                        Hoàn thành
                                                    </Select.Option>
                                                </Select>
                                            )}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col
                                xxl={12}
                                xl={16}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                            >
                                {streatments.loading ? (
                                    <Skeleton.Input
                                        block={true}
                                        active={true}
                                        size={"large"}
                                    />
                                ) : (
                                    <Form.Item
                                        label="Ghi chú"
                                        validateStatus={errors.note && "error"}
                                        help={errors.note?.message}
                                    >
                                        {streatments.loading ? (
                                            <Skeleton.Input
                                                block={true}
                                                active={true}
                                                size={"large"}
                                            />
                                        ) : (
                                            <Controller
                                                name="note"
                                                control={control}
                                                defaultValue={
                                                    strreatmentData?.note
                                                }
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Vui lòng nhập ghi chú",
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <Input.TextArea
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        )}
                                    </Form.Item>
                                )}
                            </Col>
                            <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    label="Góp ý của khách hàng"
                                    validateStatus={errors.feedback && "error"}
                                    help={errors.feedback?.message}
                                >
                                    {streatments.loading ? (
                                        <Skeleton.Input
                                            block={true}
                                            active={true}
                                            size={"large"}
                                        />
                                    ) : (
                                        <Controller
                                            name="feedback"
                                            control={control}
                                            defaultValue={
                                                strreatmentData?.feedback
                                            }
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Vui lòng nhập góp ý của khách hàng",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input.TextArea
                                                    className="w-100"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>{" "}
                                <Button danger variant="outlined"
                                onClick={() => navigate("/admin/khachhang/lichsutrilieu")}
                                >
                                    Quay lại
                                </Button>
                            </Space>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={9}>
                    <Card title="Hình ảnh sản phẩm">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    label="Hình ảnh sản phẩm"
                                    validateStatus={errors.image_url && "error"}
                                    help={errors.image_url?.message}
                                >
                                    <span className="text-muted">
                                        Vui lòng chọn 2 ảnh (trước và sau).
                                    </span>

                                    <Controller
                                        name="image_url"
                                        control={control}
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
                                                maxCount={2}
                                            >
                                                {fileList.length < 2 && (
                                                    <div>
                                                        <UploadOutlined />
                                                        <div
                                                            style={{
                                                                marginTop: 8,
                                                            }}
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
                            <Col span={24}>
                                <Row gutter={[16, 16]} justify="space-around">
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                    >
                                        <Form.Item label="Ảnh trước">
                                            <Image
                                                src={
                                                    "http://127.0.0.1:8000/storage/" +
                                                        strreatmentData?.image_before ||
                                                    "https://via.placeholder.com/300"
                                                }
                                                alt="Ảnh trước"
                                                width={100}
                                            />
                                        </Form.Item>
                                    </Col>{" "}
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                    >
                                        <Form.Item label="Ảnh trước">
                                            <Image
                                                src={
                                                    "http://127.0.0.1:8000/storage/" +
                                                        strreatmentData?.image_after ||
                                                    "https://via.placeholder.com/300"
                                                }
                                                alt="Ảnh trước"
                                                width={100}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default StreatmentsEdit;
