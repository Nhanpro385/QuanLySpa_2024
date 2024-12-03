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
    Typography,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { ArrowUpOutlined } from "@ant-design/icons";
import style from "@admin/modules/profile/style/profile.module.scss";
import useAuthActions from "../../modules/authen/hooks/useAuth";
const { Option } = Select;
const { Text } = Typography;

const Profile = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
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
    const { authGetmeAdmin, authEditProfile } = useAuthActions();

    useEffect(() => {
        authGetmeAdmin();
    }, []);

    useEffect(() => {
        if (auth.user && auth.user.data) {
            setUserData(auth.user.data);
        }
    }, [auth]);

    useEffect(() => {
        if (UserData) {
            setValue("name", UserData.full_name || "");
            setValue("email", UserData.email || "");
            setValue("phone", UserData.phone || "");
            setValue(
                "date_of_birth",
                UserData.date_of_birth
                    ? dayjs(UserData.date_of_birth).format("YYYY-MM-DD")
                    : ""
            );
            setValue(
                "gender",
                UserData.gender === "Nữ" ? 1 : UserData.gender === "Nam" ? 2 : 0
            );
            setValue("address", UserData.address || "");
            setValue("note", UserData.note || "");
        }
    }, [UserData]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                full_name: data.name,
                email: data.email,
                phone: data.phone,
                date_of_birth: data.date_of_birth,
                gender: data.gender,
                address: data.address,
                note: data.note,
                role: UserData.role,
            };
            const res = await authEditProfile({
                id: UserData.id,
                data: payload,
            });
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                    <Card className={style.card}>
                        <Avatar
                            size={300}
                            className={style.avatar}
                            shape={"circle"}
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                        />
                        <Divider />
                        <h5 className={style.title}>Thông tin nghiệp vụ</h5>
                        <p>
                            <strong>Tên:</strong> {UserData?.full_name}
                        </p>
                        <p>
                            <strong>Chức vụ:</strong> {UserData?.position?.name}
                        </p>
                        <p>
                            <strong>Mức lương theo giờ:</strong>{" "}
                            {parseInt(
                                UserData?.position?.wage || 0
                            ).toLocaleString()}{" "}
                            VNĐ
                        </p>
                    </Card>
                </Col>
                <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                    <Card title="Thống kê công việc" bordered={false}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic
                                    title="Tư vấn khách hàng"
                                    value={
                                        (UserData.countConsulation_month || 0) +
                                        " lượt"
                                    }
                                    valueStyle={{
                                        color: "#3f8600",
                                    }}
                                />
                                <Text type="secondary">
                                    Trong tháng:{" "}
                                    {UserData.countConsulation_month || 0}
                                </Text>
                                <br />
                                <Text type="success">
                                    Trong tuần:{" "}
                                    {UserData.countConsulation_week || 0}
                                </Text>
                                <br />
                                <Text type="danger">
                                    Trong ngày:{" "}
                                    {UserData.countConsulation_today || 0}
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Lịch hẹn Dịch vụ"
                                    value={
                                        (UserData.countAppoinment_month || 0) +
                                        " lượt"
                                    }
                                    valueStyle={{
                                        color: "#3f8600",
                                    }}
                                />
                                <Text type="secondary">
                                    Trong tháng:{" "}
                                    {UserData.countAppoinment_month || 0}
                                </Text>
                                <br />
                                <Text type="success">
                                    Trong tuần:{" "}
                                    {UserData.countAppoinment_week || 0}
                                </Text>
                                <br />
                                <Text type="danger">
                                    Trong ngày:{" "}
                                    {UserData.countAppoinment_today || 0}
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card>
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit(onSubmit)}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Form.Item label="Tên đầy đủ">
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Vui lòng nhập tên đầy đủ",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
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
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
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
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
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
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
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
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
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
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Ghi chú">
                                        <Controller
                                            name="note"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.TextArea {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
