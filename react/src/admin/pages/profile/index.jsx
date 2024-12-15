import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Statistic,
    Select,
    notification,
    Typography,
    Space,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { ArrowUpOutlined, KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import style from "@admin/modules/profile/style/profile.module.scss";
import useAuthActions from "../../modules/authen/hooks/useAuth";
import ChangepassModal from "../../modules/profile/compoments/modalChangepass";
const { Option } = Select;
const { Text } = Typography;
import useModal from "../../modules/appointments/hooks/openmodal";
const Profile = () => {
    const [api, contextHolder] = notification.useNotification();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date_of_birth: "",
            gender: 0,
            address: "",
            note: "",
        },
    });

    const [UserData, setUserData] = useState({});
    const auth = useSelector((state) => state.auth);
    const { authGetmeAdmin, authEditProfile, authChangePassword } =
        useAuthActions();

    useEffect(() => {
        authGetmeAdmin({
            day: dayjs().format("YYYY-MM-DD"),
        });
    }, []);

    useEffect(() => {
        if (auth?.user && auth?.user?.data) {
            setUserData(auth?.user?.data);
        }
    }, [auth]);

    useEffect(() => {
        if (UserData) {
            setValue("full_name", UserData?.full_name || "");
            setValue("email", UserData?.email || "");
            setValue("phone", UserData?.phone || "");
            setValue(
                "date_of_birth",
                UserData?.date_of_birth
                    ? dayjs(UserData?.date_of_birth).format("YYYY-MM-DD")
                    : ""
            );
            setValue(
                "gender",
                UserData?.gender == "Nữ" ? 1 : UserData?.gender == "Nam" ? 2 : 0
            );
            setValue("address", UserData?.address || "");
            setValue("note", UserData?.note || "");
        }
    }, [UserData]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                date_of_birth: data.date_of_birth,
                gender: data.gender,
                address: data.address,
                note: data.note,
            };
            const res = await authEditProfile({
                id: UserData.id,
                data: payload,
            });

            if (res.payload.status == "success") {
                api.success({
                    message: "Cập nhật thông tin thành công",
                });
            } else {
                if (Object.keys(res.payload.errors).length > 0) {
                    console.log(res.payload.errors);

                    Object.keys(res.payload.errors).map((key) => {
                        setError(key, {
                            type: "manual",
                            message: res.payload.errors[key][0],
                        });
                    });
                } else {
                    api.error({
                        type: "error",
                        message: res.payload.message || "Có lỗi xảy ra",
                    });
                }
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePass = async (data) => {
        try {
            const res = await authChangePassword(data);
            console.log(res);

            if (res.payload.status !== "success") {
                if (
                    Object.keys(res.payload.error).length > 0 &&
                    typeof res.payload.error === "object"
                ) {
                    console.log(123);

                    Object.keys(res.payload.error).map((key) => {
                        api.error({
                            message: res.payload.error[key][0],
                            description: res.payload.error[key][0],
                        });
                    });
                }
                api.error({
                    message: res.payload.message,
                });
            } else {
                if (res.payload?.errors?.length > 0) {
                    Object.keys(res.payload.errors).map((key) => {
                        setError(key, {
                            type: "manual",
                            message: res.payload.errors[key][0],
                        });
                    });
                }
                api.success({
                    message: res.payload.message,
                });
                handleCancel();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {contextHolder}
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                            <Card className={style.card} bordered={true}>
                                <Avatar
                                    size={"100%"}
                                    className={style.avatar}
                                    shape={"circle"}
                                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                />
                                <Divider />
                                <h5 className={style.title}>
                                    Thông tin nghiệp vụ
                                </h5>
                                <p>
                                    <strong>Tên:</strong> {UserData?.full_name}
                                </p>
                                <p>
                                    <strong>Chức vụ:</strong>{" "}
                                    {UserData?.position?.name || "Không có"}
                                </p>{" "}
                                <p>
                                    <strong>Vai trò:</strong> {UserData?.role}
                                </p>
                                <p>
                                    <strong>Mức lương theo giờ:</strong>{" "}
                                    {parseInt(
                                        UserData?.position?.wage || 0
                                    ).toLocaleString()}{" "}
                                    VNĐ
                                </p>
                                <Row>
                                    <Col
                                        xxl={24}
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Button
                                            block
                                            type="primary"
                                            icon={<KeyOutlined />}
                                            size="Large"
                                            onClick={showModal}
                                        >
                                            Thay đổi mật khẩu
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                            <Card
                            className="h-100"
                                title="Thống kê"
                                extra={
                                    <Space>
                                        <DatePicker
                                            onChange={(date, dateString) => {
                                                authGetmeAdmin({
                                                    day: dateString,
                                                });
                                            }}
                                        />
                                        <Button
                                            icon={<LoadingOutlined />}
                                            onClick={() => {
                                                authGetmeAdmin({
                                                    day: dayjs().format(
                                                        "YYYY-MM-DD"
                                                    ),
                                                });
                                            }}
                                        >
                                            Làm mới
                                        </Button>

                                    </Space>
                                }
                            >
                                <Row gutter={[16, 16]}>
                                    <Col
                                        xxl={24}
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Card
                                            title="Thống kê công việc"
                                            bordered={true}
                                        >
                                            <Row gutter={[16, 16]}>
                                                <Col
                                                    xxl={12}
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Statistic
                                                        title="Tư vấn khách hàng"
                                                        value={
                                                            (UserData?.countConsulation_month ||
                                                                0) + " lượt"
                                                        }
                                                        valueStyle={{
                                                            color: "#e05265",
                                                        }}
                                                    />
                                                    <Text type="secondary">
                                                        Trong tháng:{" "}
                                                        {UserData?.countConsulation_month ||
                                                            0}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        Trong tuần:{" "}
                                                        {UserData?.countConsulation_week ||
                                                            0}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        Trong ngày:{" "}
                                                        {UserData?.countConsulation_today ||
                                                            0}
                                                    </Text>
                                                </Col>
                                                <Col
                                                    xxl={12}
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Statistic
                                                        title="Lịch hẹn Dịch vụ"
                                                        value={
                                                            (UserData?.countAppoinment_month ||
                                                                0) + " lượt"
                                                        }
                                                        valueStyle={{
                                                            color: "#e05265",
                                                        }}
                                                    />
                                                    <Text type="secondary">
                                                        Trong tháng:{" "}
                                                        {UserData?.countAppoinment_month ||
                                                            0}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        Trong tuần:{" "}
                                                        {UserData?.countAppoinment_week ||
                                                            0}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        Trong ngày:{" "}
                                                        {UserData?.countAppoinment_today ||
                                                            0}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col
                                        xxl={24}
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Card
                                            title="Tổng Thanh toán"
                                            bordered={true}
                                        >
                                            <Row gutter={[16, 16]}>
                                                <Col
                                                    xxl={12}
                                                    xl={12}
                                                    lg={12}
                                                    md={12}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <Statistic
                                                        title={`Tổng tiền đã thực hiện ${UserData?.payment_today?.date} `}
                                                        value={
                                                            (parseInt(UserData
                                                                ?.payment_today
                                                                ?.total_amount).toLocaleString()||
                                                                0) + " VNĐ"
                                                        }
                                                        valueStyle={{
                                                            color: "#e05265",
                                                        }}
                                                    />
                                                    <Text type="secondary">
                                                        Tiền mặt:{" "}
                                                        {parseInt(
                                                            UserData
                                                                ?.payment_today
                                                                ?.total_amount_cash
                                                        ).toLocaleString() +
                                                            " VNĐ" || 0}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        Chuyển khoản:{" "}
                                                        {parseInt(
                                                            UserData
                                                                ?.payment_today
                                                                ?.total_amount_transfer
                                                        ).toLocaleString() +
                                                            " VNĐ" || 0}
                                                    </Text>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Card>
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit(onSubmit)}
                        >
                            <Row gutter={[16, 16]}>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Tên đầy đủ">
                                        <Controller
                                            name="full_name"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập tên đầy đủ",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    minLength={6}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.full_name && (
                                            <Text type="danger">
                                                {errors.full_name.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Email">
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: "Vui lòng nhập email",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                        {errors.email && (
                                            <Text type="danger">
                                                {errors.email.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Số điện thoại">
                                        <Controller
                                            name="phone"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập số điện thoại",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                        {errors.phone && (
                                            <Text type="danger">
                                                {errors.phone.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={6}
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Giới tính">
                                        <Controller
                                            name="gender"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng chọn giới tính",
                                            }}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <Option value={2}>
                                                        Nam
                                                    </Option>
                                                    <Option value={1}>
                                                        Nữ
                                                    </Option>
                                                    <Option value={0}>
                                                        Khác
                                                    </Option>
                                                </Select>
                                            )}
                                        />
                                        {errors.gender && (
                                            <Text type="danger">
                                                {errors.gender.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={6}
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Ngày sinh">
                                        <Controller
                                            name="date_of_birth"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng chọn ngày sinh",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} type="date" />
                                            )}
                                        />
                                        {errors.date_of_birth && (
                                            <Text type="danger">
                                                {errors.date_of_birth.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Địa chỉ">
                                        <Controller
                                            name="address"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập địa chỉ",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                        {errors.address && (
                                            <Text type="danger">
                                                {errors.address.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Form.Item label="Ghi chú">
                                        <Controller
                                            name="note"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.TextArea {...field} />
                                            )}
                                        />
                                        {errors.note && (
                                            <Text type="danger">
                                                {errors.note.message}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={auth.loading}
                                >
                                    Cập nhật thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <ChangepassModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                handleChangePass={handleChangePass}
                errorsAuth={auth.error}
            />
        </div>
    );
};

export default Profile;
