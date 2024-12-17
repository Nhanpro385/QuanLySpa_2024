import React, { useState, useEffect } from "react";
import { Badge, Popover, Avatar, Row, Col, Tag, Skeleton, Button } from "antd";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";
import usenotificationsActions from "../hooks/usenotificationsAction";
import styles from "../style/notification.module.scss";
import { useNavigate } from "react-router-dom";

const NotificationModule = () => {
    const navigate = useNavigate();
    const { getnotification } = usenotificationsActions();
    const [open, setOpen] = useState(false);
    const [notiData, setNotiData] = useState([]);
    const notifications = useSelector((state) => state.notification);
    const [count, setCount] = useState(5);
    const pagnation = notifications?.notifications?.data?.meta || {};


    useEffect(() => {
        const interval = setInterval(() => {
            getnotification(count);
        }, 15000);

        return () => clearInterval(interval);
    }, [count]);


    useEffect(() => {
        if (
            notifications?.notifications?.data?.data?.length > 0 &&
            !notifications.loading
        ) {
            setNotiData(
                notifications.notifications.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        } else {
            setNotiData([]);
        }
    }, [notifications]);

    const handleOpenChange = (newOpen) => {
        setCount(5);
        setOpen(newOpen);
        if (newOpen) {
            // Fetch notifications when Popover opens
            getnotification(count);
        }
    };

    useEffect(() => {
        if (count > pagnation.total) {
            setCount(pagnation.total);
        } else {
            getnotification(count);
        }
    }, [count]);

    const CheckNotification = (type) => {
        if (type === `App\\Models\\Appointment`) {
            navigate("/admin/lichhen");
            setOpen(false);
        } else if (type === `App\\Models\\Consulation`) {
            navigate("/admin/tuvankhachhang");
            setOpen(false);
        }
    };

    const notificationContent =
        notiData.length > 0 ? (
            <div className={styles.notificationList}>
                {notiData.map((notification, index) => (
                    <div
                        key={notification.key}
                        onClick={() =>
                            CheckNotification(notification.notifiable_type)
                        }
                    >
                        <Row
                            key={notification.key}
                            align="middle"
                            className={clsx(
                                styles.notification,
                                notification.notifiable_type ===
                                    "App\\Models\\Consulation"
                                    ? styles.noti_Consulation
                                    : styles.noti_appointment,
                                styles.notificationItem
                            )}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                marginBottom: 10,
                            }}
                        >
                            <Col span={4}>
                                <Avatar
                                    src={
                                        "https://api.dicebear.com/7.x/miniavs/svg?seed=" +
                                        index
                                    }
                                    shape="square"
                                    icon={<UserOutlined />}
                                    size="large"
                                />
                            </Col>
                            <Col span={20}>
                                <Row gutter={[16, 16]}>
                                    <Col
                                        xxl={24}
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <p
                                            style={{ margin: 0 }}
                                            className={styles.noti_title}
                                        >
                                            <strong>{notification.user}</strong>{" "}
                                            {notification.data}
                                        </p>
                                    </Col>
                                    <Col
                                        xxl={24}
                                        xl={24}
                                        lg={24}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                        style={{ textAlign: "right" }}
                                    >
                                        <Tag
                                            color="green"
                                            style={{
                                                fontSize: "12px",
                                                margin: 0,
                                            }}
                                        >
                                            {notification.created_at}
                                        </Tag>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ))}
                {pagnation.total > count && (
                    <div>
                        <Row>
                            <Col
                                span={24}
                                style={{ textAlign: "center" }}
                                className="mt-2"
                            >
                                <Button
                                    type="primary"
                                    onClick={() => setCount(count + 5)}
                                >
                                    Xêm thêm
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        ) : (
            <Row align="middle">
                <Col span={24}>Không có thông báo mới</Col>
            </Row>
        );

    return (
        <Popover
            content={notificationContent}
            title="Thông báo"
            trigger="click"
            open={open}
            className={styles.notificationPopover}
            onOpenChange={handleOpenChange}

        >
            <NotificationOutlined style={{ fontSize: 18 }} /> Thông báo
            <Tag
                style={{
                    borderRadius: "50%",
                }}
                color="#e05265"
                className={styles.notificationBadge}
            >
                {notiData.filter((item) => !item.read).length}
            </Tag>
        </Popover >
    );
};

export default NotificationModule;
