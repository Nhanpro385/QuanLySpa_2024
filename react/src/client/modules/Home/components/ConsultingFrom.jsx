import React from "react";
import { Button, Form, Input, Col, Select } from "antd";
import {
    ArrowRightOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import clsx from "clsx"; // Import clsx
import styles from "../styles/ConsultingFrom.module.scss";

const ConsultingFrom = () => {
    const [size, setSize] = React.useState(() => {
        if (window.innerWidth < 768) return "horizontal";
        else return "inline";
    });

    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) setSize("horizontal");
            else setSize("inline");
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.container}>
            <Form layout={size} className={styles.form}>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Họ và Tên</label>
                    <Form.Item name="fullName">
                        <Input
                            prefix={<UserOutlined />}
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Email</label>
                    <Form.Item name="email">
                        <Input
                            type="email"
                            prefix={<MailOutlined />}
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Số điện thoại</label>
                    <Form.Item name="phone">
                        <Input
                            type="number"
                            prefix={<PhoneOutlined />}
                            className={styles.input}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} lg={6} md={6} xl={6} xxl={6}>
                    <label className={styles.label}>Dịch vụ cần tư vấn</label>
                    <Form.Item name="consulting">
                        <Select
                            showSearch
                            placeholder="Chọn dịch vụ cần tư vấn"
                            optionFilterProp="label"
                            className={styles.input}
                            options={[
                                {
                                    label: "Bị vấn đề về mụn",
                                    value: "Bị vấn đề về mụn",
                                },
                                {
                                    label: "Bị vấn đề về nám",
                                    value: "Bị vấn đề về nám",
                                },
                                {
                                    label: "Bị vấn đề về da",
                                    value: "Bị vấn đề về da",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Form.Item className={clsx(styles.button)} colon={false}>
                    <Button type="primary" size="large">
                        Gửi tư vấn cho chúng tôi
                        <ArrowRightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ConsultingFrom;
