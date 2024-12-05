import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Alert,
    notification,
    Space,
    Spin,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";
import { formatDate } from "../../utils";
import { usersAdd } from "../../redux/slices/UserSlice";
import usePositionsActions from "../../modules/staffManagement/hooks/usePositionsAction";
const { Option } = Select;
import debounce from "lodash/debounce";
const StaffsAdd = () => {
    const { getPositions, searchPositions } = usePositionsActions();
    useEffect(() => {
        document.title = "Thêm nhân viên";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.user);
    const positions = useSelector((state) => state.positions);
    const [success, setSuccess] = useState(null);
    const [positionsList, setPositionsList] = useState([]);
    const [searchquery, setSearchquery] = useState({
        search: "",
        page: 1,
        per_page: 100,
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        const formattedDateOfBirth = formatDate(data.date_of_birth);
        const payload = {
            ...data,
            status: true,
            note: data.note || "",
            date_of_birth: formattedDateOfBirth,
            id: Snowflake.generate(),
        };

        try {
            const response = await dispatch(usersAdd(payload));
            if (usersAdd.fulfilled.match(response)) {
                reset();
                api.success({
                    message: "Thêm nhân viên thành công",
                    description: `Nhân viên ${data.full_name} đã được thêm vào hệ thống`,
                    duration: 3,
                });
            } else if (usersAdd.rejected.match(response)) {
                api.error({
                    message: "Thêm nhân viên thất bại",
                    description: response.payload.message,
                    duration: 3,
                });
                Object.keys(response.payload.errors).forEach((key) => {
                    if (
                        [
                            "full_name",
                            "gender",
                            "role",
                            "phone",
                            "email",
                            "date_of_birth",
                            "address",
                        ].includes(key)
                    ) {
                        setError(key, {
                            type: "manual",
                            message: response.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message:
                                response.payload.message || "Có lỗi xảy ra",
                            duration: 3,
                            description: response.payload.errors[key][0] || "",
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPositions(50);
    }, []);

    useEffect(() => {
        if (
            positions?.Positions?.data &&
            positions?.Positions?.data?.length > 0
        ) {
            setPositionsList(
                positions?.Positions?.data?.map((item) => ({
                    key: item.id,
                    ...item,
                }))
            );
        }
    }, [positions]);
    const onsetSearch = debounce((value) => {
        setSearchquery({ ...searchquery, search: value });
    }, 500);
    useEffect(() => {
        if (searchquery.search !== "") {
            searchPositions(searchquery);
        } else {
            getPositions(100);
        }
    }, [searchquery]);
    return (
        <>
            <h1 className="text-center">Thêm nhân viên</h1>
            <Card>
                <Spin spinning={loading} size="large" tip="Đang tải...">
                    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                        <Row gutter={[16, 16]}>
                            {/* Họ và tên */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Họ và tên">
                                    <Controller
                                        name="full_name"
                                        control={control}
                                        rules={{
                                            required: "Họ và tên là bắt buộc",
                                            pattern: {
                                                value: /^[^\d]+$/,
                                                message:
                                                    "Họ và tên không được chứa số",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message:
                                                    "Họ và tên không được vượt quá 50 ký tự",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input size="large" {...field} />
                                        )}
                                    />
                                    {errors.full_name && (
                                        <p style={{ color: "red" }}>
                                            {errors.full_name.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Tên */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Giới tính">
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{
                                            required: "Giới tính là bắt buộc",
                                        }}
                                        render={({ field }) => (
                                            <Select size="large" {...field}>
                                                <Option value={2}>Nam</Option>
                                                <Option value={1}>Nữ</Option>
                                                <Option value={0}>khác</Option>
                                            </Select>
                                        )}
                                    />
                                    {errors.gender && (
                                        <p style={{ color: "red" }}>
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Vai trò */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Vai trò">
                                    <Controller
                                        name="role"
                                        control={control}
                                        rules={{
                                            required: "Vai trò là bắt buộc",
                                        }}
                                        render={({ field }) => (
                                            <Select size="large" {...field}>
                                                <Option value={"0"}>
                                                    Quản trị viên
                                                </Option>
                                                <Option value={"2"}>
                                                    Nhân viên tư vấn và chăm sóc
                                                    khách hàng
                                                </Option>
                                                <Option value={"1"}>
                                                    Nhân viên
                                                </Option>
                                            </Select>
                                        )}
                                    />
                                    {errors.role && (
                                        <p style={{ color: "red" }}>
                                            {errors.role.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Chức vụ">
                                    <Controller
                                        name="position_id"
                                        control={control}
                                        rules={{
                                            required: "Vai trò là bắt buộc",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                size="large"
                                                {...field}
                                                onSearch={(value) =>
                                                    onsetSearch(value)
                                                }
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(
                                                            input.toLowerCase()
                                                        ) >= 0
                                                }
                                                loading={positions.loading}
                                            >
                                                {positionsList.map((item) => (
                                                    <Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    {errors.position_id && (
                                        <p style={{ color: "red" }}>
                                            {errors.position_id.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Số điện thoại */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Số điện thoại">
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required:
                                                "Số điện thoại là bắt buộc",
                                            pattern: {
                                                value: /^(0[3|5|7|8|9])+([0-9]{8})\b$/,
                                                message:
                                                    "Số điện thoại không hợp lệ",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input size="large" {...field} />
                                        )}
                                    />
                                    {errors.phone && (
                                        <p style={{ color: "red" }}>
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Email */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Email">
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Email là bắt buộc",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                                message: "Email không hợp lệ",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input size="large" {...field} />
                                        )}
                                    />
                                    {errors.email && (
                                        <p style={{ color: "red" }}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Địa chỉ */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Địa chỉ">
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <Input size="large" {...field} />
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            {/* Giới tính */}

                            {/* Ngày sinh */}
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Ngày sinh">
                                    <Controller
                                        name="date_of_birth"
                                        control={control}
                                        rules={{
                                            required: "Ngày sinh là bắt buộc",
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                size="large"
                                                style={{ width: "100%" }}
                                                format="YYYY/MM/DD"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.date_of_birth && (
                                        <p style={{ color: "red" }}>
                                            {errors.date_of_birth.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item label="Ghi chú">
                                    <Controller
                                        name="note"
                                        control={control}
                                        render={({ field }) => (
                                            <Input.TextArea
                                                size="large"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.note && (
                                        <p style={{ color: "red" }}>
                                            {errors.note.message}
                                        </p>
                                    )}
                                </Form.Item>
                            </Col>

                            {/* Nút Lưu */}
                            <Col span={24}>
                                <Form.Item className="">
                                    <Space>
                                        <Button
                                            size="large"
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Thêm nhân viên
                                        </Button>
                                        <Link to="/admin/nhanvien">
                                            <Button size="large">
                                                Quay lại
                                            </Button>
                                        </Link>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Card>
            {contextHolder}
        </>
    );
};

export default StaffsAdd;
