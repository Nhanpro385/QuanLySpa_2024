import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Image,
    Input,
    message,
    Row,
    notification,
    Tabs,
} from "antd";
import Statistics_staff from "../../modules/staffManagement/compoments/statistics_page";
import { useParams } from "react-router-dom";
import useCustomerActions from "@admin/modules/Customer/hooks/useCustomerActions";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

const CustomerDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { getCustomerById, updateCustomer } = useCustomerActions(); // Gọi API lấy dữ liệu khách hàng
    const { customer, loading } = useSelector((state) => state.customers); // Lấy thông tin customer từ store
    const [api, contextHolder] = notification.useNotification();
    // Sử dụng react-hook-form
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm();

    // Gọi API để lấy dữ liệu customer khi component được mount
    useEffect(() => {
        getCustomerById(id);
    }, [id]);

    // Cập nhật form với dữ liệu từ API khi customer thay đổi
    useEffect(() => {
        if (customer) {
            setValue("full_name", customer.data?.full_name);
            setValue("email", customer.data?.email);
            setValue("phone", customer.data?.phone);
            setValue("address", customer.data?.address);
        }
    }, [customer, setValue]);

    const onSubmit = async (data) => {
        const payload = {
            id,
            email: data.email,
            full_name: data.full_name,
            phone: data.phone,
            address: data.address,
            gender: customer.data.gender,
            name: customer.data.name,

            status: customer.data.status,
        };
        try {
            const resultAction = await updateCustomer(payload);
            if (resultAction.payload.status === "success") {
                api.success({
                    message: "Cập nhật khách hàng thành công",
                    description: resultAction.payload.message || "Thành công",
                    duration: 3,
                });
            } else {
                Object.keys(resultAction.payload.errors).map((key) => {
                    if (
                        [
                            "full_name",
                            "email",
                            "phone",
                            "address",
                            "gender",
                            "name",
                            "status",
                        ].includes(key)
                    ) {
                        setError(key, {
                            type: "manual",
                            message: resultAction.payload.errors[key][0],
                        });
                    } else {
                        api.error({
                            message: "Cập nhật khách hàng không thành công",
                            description:
                                resultAction.payload.errors[key][0] ||
                                "Vui lòng thử lại sau",
                            duration: 3,
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Render loading state

    return (
        <Row gutter={[16, 16]}>
            {contextHolder}
            <Col span={24}>
                <Card>
                    <Row gutter={[16, 16]}>
                        <Col xl={5} lg={5} md={5} sm={12} xs={24}>
                            <Image
                                src={
                                    customer?.profileImage ||
                                    "https://nld.mediacdn.vn/thumb_w/698/2020/9/23/hoo1403-1600769609391337398991-1600824814143647303103-crop-16008249755862069103195.jpg"
                                }
                            ></Image>
                        </Col>
                        <Col xl={19} lg={19} md={19} sm={12} xs={24}>
                            <Row>
                                <Col span={24} className="p-3 ">
                                    <Row
                                        justify={"space-between"}
                                        align={"middle"}
                                    >
                                        <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            sm={24}
                                            xs={24}
                                        >
                                            <h2 className="m-2">
                                                Thông tin khách hàng
                                            </h2>
                                        </Col>
                                    </Row>
                                </Col>
                                <Divider className="m-2"></Divider>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <Form
                                        layout="vertical"
                                        onFinish={handleSubmit(onSubmit)}
                                    >
                                        <Row gutter={16}>
                                            <Col
                                                xl={12}
                                                lg={12}
                                                md={12}
                                                sm={24}
                                                xs={24}
                                            >
                                                <Form.Item label="Họ và tên">
                                                    <Controller
                                                        name="full_name"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input
                                                                size="middle"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.full_name && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errors.full_name
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col
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
                                                        render={({ field }) => (
                                                            <Input
                                                                size="middle"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.email && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errors.email
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col
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
                                                        render={({ field }) => (
                                                            <Input
                                                                size="middle"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.phone && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errors.phone
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Địa chỉ">
                                                    <Controller
                                                        name="address"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input
                                                                size="middle"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.address && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errors.address
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    icon={<EditOutlined />}
                                                >
                                                    Chỉnh sửa
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card>
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: "Thống kê Dữ liệu",
                                key: "1",
                                children: <h1>chua lam gi</h1>,
                            },
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default CustomerDetail;
