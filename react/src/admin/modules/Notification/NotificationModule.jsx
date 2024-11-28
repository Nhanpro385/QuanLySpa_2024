import React, { useState, useEffect } from "react";
import { Badge, Popover, Avatar, Row, Col } from "antd";
import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import usenotificationsActions from "./hooks/usenotificationsAction";
import styles from "./notification.module.scss";

const NotificationModule = () => {
    // const [open, setOpen] = useState(false);

    // const { getnotification } = usenotificationsActions();

    // // Fetch notifications from the Redux store
    // const notifications = useSelector((state) => state.notification);

    // // Fetch notifications when the component is mounted
    // useEffect(() => {
    //     getnotification();
    // }, [notifications]);

    // const handleOpenChange = (newOpen) => {
    //     setOpen(newOpen);
    //     if (!newOpen) {
    //     }
    // };

    // const notificationContent = (
    //     <div style={{ width: "600px", height: "300px", overflowY: "scroll" }}>
    //         <div style={{ marginBottom: "20px" }}>
    //             <h4>Thông báo đặt lịch</h4>
    //             {/* <Row gutter={[0, 8]}>
    //                 {notifications
    //                     .filter((notification) => notification.type === "appointment")
    //                     .map((notification, index) => (
    //                         <Col
    //                             span={24}
    //                             className={clsx(
    //                                 styles.notification,
    //                                 styles.noti_appointment,
    //                                 { [styles.read]: notification.read }
    //                             )}
    //                             key={notification.id}
    //                             style={{ animationDelay: `${index * 0.1}s` }}
    //                         >
    //                             <Row align={"middle"}>
    //                                 <Col span={2}>
    //                                     <Avatar shape="square" icon={<UserOutlined />} size="large" />
    //                                 </Col>
    //                                 <Col span={22} style={{ padding: 10 }}>
    //                                     <div>
    //                                         <p style={{ margin: 0 }}>
    //                                             <strong>{notification.user}</strong> {notification.message}
    //                                         </p>
    //                                         <p style={{ fontSize: "12px", margin: 0 }}>
    //                                             {notification.time}
    //                                         </p>
    //                                     </div>
    //                                 </Col>
    //                             </Row>
    //                         </Col>
    //                     ))}
    //             </Row> */}
    //         </div>
    //         <div>
    //             <h4>Thông báo bình luận</h4>
    //             <Row gutter={[0, 8]}>
    //                 {/* {notifications
    //                     .filter((notification) => notification.type === "comment")
    //                     .map((notification, index) => (
    //                         <Col
    //                             span={24}
    //                             className={clsx(
    //                                 styles.notification,
    //                                 styles.noti_comment,
    //                                 { [styles.read]: notification.read }
    //                             )}
    //                             key={notification.id}
    //                             style={{ animationDelay: `${index * 0.1}s` }}
    //                         >
    //                             <Row align={"middle"}>
    //                                 <Col span={2}>
    //                                     <Avatar shape="square" icon={<UserOutlined />} size="large" />
    //                                 </Col>
    //                                 <Col span={22} style={{ padding: 10 }}>
    //                                     <div>
    //                                         <p style={{ margin: 0 }}>
    //                                             <strong>{notification.user}</strong> {notification.message}
    //                                         </p>
    //                                         <p style={{ fontSize: "12px", margin: 0 }}>
    //                                             {notification.time}
    //                                         </p>
    //                                     </div>
    //                                 </Col>
    //                             </Row>
    //                         </Col>
    //                     ))} */}
    //             </Row>
    //         </div>
    //     </div>
    // );

    return (
        <Popover
            // content={notificationContent}
            title="Thông báo"
            trigger="click"
            // open={open}
            // onOpenChange={handleOpenChange}
        >
            <Badge

            // count={notifications.filter((notification) => !notification.read).length}
            >
                <NotificationOutlined /> Thông báo
            </Badge>
        </Popover>
    );
};

export default NotificationModule;
