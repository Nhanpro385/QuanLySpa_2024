import React, { useState, useEffect } from "react";
import { Button, Col, Row, Divider, Result, notification, Spin } from "antd";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import MeetingView from "./MeetingView";
import useAuthActions from "../../../../admin/modules/authen/hooks/useAuth";
import { useSelector } from "react-redux";
import styles from "../styles/Videocall.module.scss";
import { VIDEOSDK_TOKEN, validateMeeting } from "../services/API";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const VideoCall_Content = () => {
    const nagigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const { idmeet } = useParams();
    const { authGetmeClient } = useAuthActions();
    const auth = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [meetingId, setMeetingId] = useState(null); // ID cuộc gọi

    useEffect(() => {
        authGetmeClient();
    }, [idmeet]);

    useEffect(() => {
        if (auth?.user?.data?.consulations) {
            const consultation = auth?.user?.data?.consulations.find(
                (item) => item.id === idmeet
            );

            if (consultation?.status === 2) {
                setMeetingId(2);
                setLoading(false); // Dừng loading
                api.error({
                    message: "Không tìm thấy cuộc gọi",
                    description: "Vui lòng kiểm tra lại mã phòng.",
                    duration: 4,
                });
            } else {
                console.log(consultation?.status);

                console.error(
                    "Không tìm thấy consultation với idmeet:",
                    idmeet
                );

                setLoading(false); // Dừng loading
            }
        }
    }, [auth, idmeet]);

    useEffect(() => {
        validateMeeting({ roomId: idmeet, token: VIDEOSDK_TOKEN }).then(
            ({ meetingId, err }) => {
                if (err) {
                    api.error({
                        message:
                            err === "Room not found."
                                ? "Không tìm thấy phòng"
                                : "",
                        description:
                            err === "Room not found."
                                ? "Vui lòng kiểm tra lại mã phòng"
                                : "Lỗi",
                        duration: 4,
                    });
                    setLoading(false); // Dừng loading
                } else {
                    setMeetingId(meetingId);
                    setLoading(false); // Dừng loading
                }
            }
        );
    }, [idmeet]);

    const onMeetingLeave = () => {
        setMeetingId(2);
    };

    return (
        <div className="container mt-5 mb-5">
            {contextHolder}
            <Divider orientation="left">Cuộc gọi video</Divider>
            <Spin spinning={loading} tip="Đang tải, vui lòng chờ...">
                {/* Nội dung hiển thị khi logic hoàn thành */}
                <Row className={styles.videoCallContainer} gutter={[16, 16]}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <div className={styles.videoContainer}>
                                {meetingId === 2 ? (
                                    <Result
                                        status="info"
                                        title="Cuộc gọi đã kết thúc"
                                        className="w-100"
                                        subTitle="Cảm ơn bạn đã tham gia cuộc gọi."
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
                                ) : meetingId ? (
                                    <MeetingProvider
                                        config={{
                                            meetingId,
                                            micEnabled: true,
                                            webcamEnabled: true,
                                            name:
                                                auth?.user?.data?.full_name ||
                                                "chưa tìm thấy",
                                        }}
                                        token={VIDEOSDK_TOKEN}
                                    >
                                        <MeetingConsumer>
                                            {() => (
                                                <MeetingView
                                                    meetingId={meetingId}
                                                    onMeetingLeave={
                                                        onMeetingLeave
                                                    }
                                                />
                                            )}
                                        </MeetingConsumer>
                                    </MeetingProvider>
                                ) : (
                                    <Result
                                        status="404"
                                        title="Không tìm thấy cuộc gọi"
                                        className="w-100"
                                        subTitle="Vui lòng kiểm tra lại đường dẫn hoặc mã phòng."
                                        extra={
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    nagigate("/thongtincanhan/tuvandatlich")
                                                }
                                            >
                                                Quay lại
                                            </Button>
                                        }
                                    />
                                )}
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default VideoCall_Content;
