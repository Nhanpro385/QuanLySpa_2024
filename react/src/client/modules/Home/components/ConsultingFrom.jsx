import React, { useEffect } from "react";
import { Button, Form, Input, Col, Select, notification } from "antd";
import {
    ArrowRightOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import clsx from "clsx"; // Import clsx
import styles from "../styles/ConsultingFrom.module.scss";
import useContactActions from "../../../../admin/modules/contact/hooks/usecontact";
import { useSelector } from "react-redux";
import useServicesActions from "../../../../admin/modules/services/hooks/useServices";
const ConsultingFrom = () => {
    const [form] = Form.useForm();
    const { createClientContact } = useContactActions();
    const { getServicesClient } = useServicesActions();
    const contact = useSelector((state) => state.contact);
    const [api, contextHolder] = notification.useNotification();
    const [listServices, setListServices] = React.useState([]);
    const [size, setSize] = React.useState(() => {
        if (window.innerWidth < 768) return "horizontal";
        else return "inline";
    });
    const getServices = async () => {
        try {
            const res = await getServicesClient(100);
            if (res?.meta?.requestStatus === "fulfilled") {
                setListServices(res?.payload?.data?.map((item) => item?.name));
            }
        } catch (error) {
            console.error("Lỗi khi lấy dịch vụ:", error);
        }
    };

    React.useEffect(() => {
        getServices();
        function handleResize() {
            if (window.innerWidth < 768) setSize("horizontal");
            else setSize("inline");
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Xử lý submit form
    const handleSubmit = async (values) => {
        try {
            const res = await createClientContact(values); // Gọi API từ action
            if (res.payload.status == "success") {
                api.success({
                    message: "Gửi tư vấn thành công!",
                    description: "Chúng tôi sẽ liên hệ với bạn sớm nhất!",
                });
                form.resetFields(); // Reset form sau khi submit thành công
            } else {
                api.error({
                    message: "Gửi tư vấn thất bại!",
                    description: res.payload.message || "Có lỗi xảy ra!",
                });
            }
        } catch (error) {
            console.error("Lỗi khi gửi tư vấn:", error);
        }
    };

    // Xử lý khi form không hợp lệ
    const handleSubmitFailed = (errorInfo) => {
        console.error("Lỗi xác thực form:", errorInfo);
    };

    return (
        <div className={clsx(styles.container, "container")}>
            {contextHolder}
            <Form
                form={form}
                layout={size}
                className={styles.form}
                onFinish={handleSubmit} // Gọi khi form submit thành công
                onFinishFailed={handleSubmitFailed} // Gọi khi form có lỗi
            >
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Họ và Tên</label>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ và tên",
                            },
                        ]} // Validation
                    >
                        <Input
                            size="middle"
                            prefix={<UserOutlined />}
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Email</label>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input
                            size="middle"
                            type="email"
                            prefix={<MailOutlined />}
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Số điện thoại</label>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                            },
                            {
                                pattern:
                                    /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/,
                                message: "Số điện thoại không hợp lệ",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            prefix={<PhoneOutlined />}
                            size="middle"
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Dịch vụ cần tư vấn</label>
                    <Form.Item
                        name="note"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn dịch vụ",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn dịch vụ cần tư vấn"
                            optionFilterProp="label"
                            size="middle"
                            className={styles.input}
                            options={listServices.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Form.Item className={clsx(styles.button)} colon={false}>
                    <Button
                        loading={contact.loading}
                        type="primary"
                        size="middle"
                        htmlType="submit"
                    >
                        Gửi tư vấn cho chúng tôi
                        <ArrowRightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ConsultingFrom;
