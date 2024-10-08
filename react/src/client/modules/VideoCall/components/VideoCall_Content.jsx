import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Row, Input, Card, Divider, Badge } from "antd";
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
import { authToken, createMeeting } from "../services/API";

const VideoCall_Content = () => {
    const chatEndRef = useRef(null);

    const [message, setMessage] = useState("");
    const { mess, sendMessage, id } = useChat();

    const [meetingId, setMeetingId] = useState(null);
   
    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
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
                {meetingId}
            </Divider>
            <Row className={styles.videoCallContainer} gutter={[16, 16]}>
                <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className={styles.videoContainer}>
                            {meetingId ? (
                                <MeetingProvider
                                    config={{
                                        meetingId,
                                        micEnabled: true,
                                        webcamEnabled: true,
                                        name: "C.V. Raman",
                                        
                                    }}
                                    token={authToken}
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
                                <JoinScreen
                                    getMeetingAndToken={getMeetingAndToken}
                                    
                                />
                            )}
                        </div>
                    </Col>
                    {/* <Col
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        className={styles.timevideo}
                    >
                        <Badge color="#f50" text="00:00:00" />
                    </Col>
                    <Col
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        className={styles.controlContainer}
                    >
                        <Row justify="center" align="middle" gutter={[8, 8]}>
                            <Col
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                className={styles.iconcontrol}
                            >
                                <FaVideoSlash
                                    style={{
                                        fontSize: "2.5rem",
                                    }}
                                />
                            </Col>
                            <Col
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                className={styles.iconcontrol}
                            >
                                <MdOutlineAddIcCall
                                    style={{
                                        fontSize: "2.5rem",
                                    }}
                                />
                            </Col>
                            <Col
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                className={styles.iconcontrol}
                            >
                                <BsMicMuteFill
                                    style={{
                                        fontSize: "2.5rem",
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col> */}
                </Col>
                <Col xl={8} lg={8} md={24} sm={24} xs={24}>
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
                </Col>
            </Row>
        </div>
    );
    // return authToken && meetingId ? (
    //     <MeetingProvider
    //         config={{
    //             meetingId,
    //             micEnabled: true,
    //             webcamEnabled: true,
    //             name: "C.V. Raman",
    //         }}
    //         token={authToken}
    //     >
    //         <MeetingConsumer>
    //             {() => (
    //                 <MeetingView
    //                     meetingId={meetingId}
    //                     onMeetingLeave={onMeetingLeave}
    //                 />
    //             )}
    //         </MeetingConsumer>
    //     </MeetingProvider>
    // ) : (
    //     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    // );
};

export default VideoCall_Content;
