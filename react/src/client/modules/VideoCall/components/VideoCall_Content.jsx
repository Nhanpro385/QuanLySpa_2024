import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Col,
    Row,
    Input,
    Card,
    Divider,
    Badge,
    message,
    Result,
} from "antd";
import { MdMissedVideoCall, MdOutlineAddIcCall } from "react-icons/md";
import { BsMicMuteFill } from "react-icons/bs";
import {
    InfoCircleOutlined,
    PhoneOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { FaVideoSlash } from "react-icons/fa6";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import clsx from "clsx";

import JoinScreen from "./JoinScreen";
import MeetingView from "./MeetingView";
import useChat from "../hooks/useChat";
import styles from "../styles/Videocall.module.scss";
import {
    VIDEOSDK_TOKEN,
    createMeeting,
    validateMeeting,
} from "../services/API";
import { useParams } from "react-router-dom";
const VideoCall_Content = () => {
    const { idmeet } = useParams();

    const chatEndRef = useRef(null);

    const [message, setMessage] = useState("");
    const { mess, sendMessage, id } = useChat();

    const [meetingId, setMeetingId] = useState(null); // id của cuộc gọi
    useEffect(() => {
        validateMeeting({ roomId: idmeet, token: VIDEOSDK_TOKEN }).then(
            ({ meetingId, err }) => {
                console.log(err);
                if (err) {
                    message.error(err);
                } else {
                    setMeetingId(meetingId);
                }
            }
        );
        console.log(meetingId);
    }, [idmeet]);
    const getMeetingAndToken = async (id) => {
        // Hàm này sẽ tạo cuộc gọi mới hoặc sử dụng cuộc gọi đã tồn tại
        const meetingId =
            id == null ? await createMeeting({ token: VIDEOSDK_TOKEN }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage("");
    };

    return (
        <div className="container">
            <Divider orientation="left">
                Cuộc gọi video
             
            </Divider>
            <Row className={styles.videoCallContainer} gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className={styles.videoContainer}>
                            {meetingId ? (
                                <MeetingProvider
                                    config={{
                                        meetingId,
                                        micEnabled: true,
                                        webcamEnabled: true,
                                        name: "hao",
                                    }}
                                    token={VIDEOSDK_TOKEN}
                                >
                                    <MeetingConsumer>
                                        {() => (
                                            <MeetingView
                                                meetingId={meetingId}
                                                onMeetingLeave={onMeetingLeave}
                                            />
                                        )}
                                    </MeetingConsumer>
                                </MeetingProvider>
                            ) : (
                                // <JoinScreen
                                //     getMeetingAndToken={getMeetingAndToken}
                                // />
                                <Result
                                    status="404"
                                    title="Không tìm thấy cuộc gọi"
                                    className="w-100"
                                    subTitle="vui lòng kiểm tra lại đường dẫn và có thông báo về cuộc gọi"
                                    extra={
                                        <Button type="primary" onClick={() => window.history.back()}>
                                           Quay lại
                                        </Button>
                                    }
                                />
                            )}
                        </div>
                    </Col>
                </Col>
                {/* <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                    <div className={styles.chatContainer}>
                        <Row justify="center" align="middle">
                            <Col span={24}>
                                <div className={styles.chatHeader}>
                                    <PhoneOutlined />
                                    <span className={styles.chatHeaderTitle}>
                                        Bác sĩ <strong>Nguyễn Văn A</strong>
                                    </span>
                                    <InfoCircleOutlined />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div
                                    ref={chatEndRef}
                                    className={styles.chatcontent}
                                >
                                    {mess.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    styles.messageWrapper
                                                }
                                            >
                                                <Col
                                                    span={24}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            item.id === id
                                                                ? "flex-end"
                                                                : "flex-start",
                                                        alignItems: "flex-end",
                                                    }}
                                                >
                                                    {item.id !== id && (
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                                            alt="avatar 1"
                                                            width={50}
                                                            className={clsx(
                                                                styles.avatar,
                                                                styles.avatarLeft
                                                            )}
                                                        />
                                                    )}
                                                    <div
                                                        className={clsx(
                                                            styles.messageContainer,
                                                            item.id === id
                                                                ? styles.messageRight
                                                                : styles.messageLeft
                                                        )}
                                                    >
                                                        <p
                                                            className={
                                                                styles.messageText
                                                            }
                                                        >
                                                            {item.content}
                                                        </p>
                                                        <p
                                                            className={
                                                                item.id === id
                                                                    ? styles.timestampright
                                                                    : styles.timestampleft
                                                            }
                                                        >
                                                            23:58
                                                        </p>
                                                    </div>
                                                    {item.id === id && (
                                                        <img
                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                            alt="avatar 1"
                                                            width={30}
                                                            className={clsx(
                                                                styles.avatar,
                                                                styles.avatarRight
                                                            )}
                                                        />
                                                    )}
                                                </Col>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[8, 8]}>
                                    <Col span={19}>
                                        <Input
                                            size="large"
                                            placeholder="Nhập tin nhắn"
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            value={message}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <Button
                                            block
                                            size="large"
                                            type="primary"
                                            onClick={handleSendMessage}
                                            icon={<SendOutlined />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col> */}
            </Row>
        </div>
    );
};

export default VideoCall_Content;
