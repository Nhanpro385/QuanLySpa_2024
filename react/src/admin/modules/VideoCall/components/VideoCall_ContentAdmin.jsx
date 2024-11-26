import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Row, Divider, Result, notification } from "antd";

import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";

import JoinScreenAdmin from "./JoinScreenAdmin";
import MeetingViewAdmin from "./MeetingViewAdmin";
import useChat from "../hooks/useChat";
import styles from "../styles/Videocall.module.scss";
import {
    VIDEOSDK_TOKEN,
    createMeeting,
    validateMeeting,
} from "../services/API";
import { useParams } from "react-router-dom";
const VideoCall_ContentAdmin = () => {
    console.log(VIDEOSDK_TOKEN);
    
    const { idmeet } = useParams();

    const [api, contextHolder] = notification.useNotification();

    const [meetingId, setMeetingId] = useState(null); // id của cuộc gọi
    useEffect(() => {
        validateMeeting({ roomId: idmeet, token: VIDEOSDK_TOKEN }).then(
            ({ meetingId, err }) => {
                if (err) {
                    api.error({
                        message: err,
                        description: "lỗi",
                        duration: 4,
                    });
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

    return (
        <div className="container">
            <Divider orientation="left">Cuộc gọi video</Divider>
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
                                            <MeetingViewAdmin
                                                meetingId={meetingId}
                                                onMeetingLeave={onMeetingLeave}
                                            />
                                        )}
                                    </MeetingConsumer>
                                </MeetingProvider>
                            ) : (
                                <>
                                    <JoinScreenAdmin
                                        getMeetingAndToken={getMeetingAndToken}
                                    />
                                    <Result
                                        status="404"
                                        title="Không tìm thấy cuộc gọi"
                                        className="w-100"
                                        subTitle="vui lòng kiểm tra lại đường dẫn và có thông báo về cuộc gọi"
                                        extra={
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    window.history.back()
                                                }
                                            >
                                                Quay lại
                                            </Button>
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default VideoCall_ContentAdmin;
