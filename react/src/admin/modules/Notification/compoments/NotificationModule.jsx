import React, { useState, useEffect } from "react";
import { Badge, Popover, Avatar, Row, Col, Tag, Skeleton, Button } from "antd";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";
import usenotificationsActions from "../hooks/usenotificationsAction";
import styles from "../style/notification.module.scss";

const NotificationModule = () => {
    const { getnotification } = usenotificationsActions();
    const [open, setOpen] = useState(false);
    const [notiData, setNotiData] = useState([]);
    const notifications = useSelector((state) => state.notification);
    const [count, setCount] = useState(5);
    const pagnation = notifications?.notifications?.data?.meta || {};

    // Update local notification data when Redux store changes
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
    const notificationContent =
        notiData.length > 0 ? (
            <>
                <div className={styles.notificationList}>
                    {notiData.map((notification, index) => (
                        <>
                            <Row
                                key={notification.key}
                                align="middle"
                                className={clsx(
                                    styles.notification,
                                    styles.noti_comment
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
                                    <p style={{ margin: 0 }}>
                                        <strong>{notification.user}</strong>{" "}
                                        {notification.data}
                                    </p>
                                    <Tag
                                        color="green"
                                        style={{ fontSize: "9px", margin: 0 }}
                                    >
                                        {notification.created_at}
                                    </Tag>
                                </Col>
                            </Row>
                           
                        </>
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
            </>
        ) : (
            <Row align="middle">
                <Col span={24}>
                    <Skeleton active />
                </Col>
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
            <Badge count={notiData.filter((item) => !item.read).length}>
                <NotificationOutlined style={{ fontSize: 18 }} /> Thông báo
            </Badge>         
        </Popover>
    );
};

export default NotificationModule;
