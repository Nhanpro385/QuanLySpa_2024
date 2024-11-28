import React, { useState, useEffect, useRef } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import { Button, Col, Row, Modal } from "antd";

function MeetingView({ meetingId, onMeetingLeave }) {
    const [joined, setJoined] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true); // Camera state
    const [isMicOn, setIsMicOn] = useState(true); // Microphone state
    const videoRef = useRef(null);
    const { join, participants, leave } = useMeeting({
        onMeetingJoined: () => setJoined("JOINED"),
        onMeetingLeft: onMeetingLeave,
    });

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: isCameraOn,
                    audio: isMicOn,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };

        if (isModalVisible) {
            getUserMedia();
        }

        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                }
            }
        };
    }, [isModalVisible, isCameraOn, isMicOn]); // Dependency on camera and mic state

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        handleCancel();
        joinMeeting();
    };

    const toggleCamera = () => {
        setIsCameraOn((prev) => !prev);
        const stream = videoRef.current.srcObject;
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled; // Toggle camera track
        }
    };

    const toggleMic = () => {
        setIsMicOn((prev) => !prev);
        const stream = videoRef.current.srcObject;
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled; // Toggle microphone track
        }
    };

    return (
        <div className="container">
            <Row className="mb-4" gutter={[16, 16]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <h1 style={{ textAlign: "center" }}>
                        Gọi thoại tư vấn trực tuyến
                    </h1>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Controls />
                </Col>
            </Row>

            {joined === "JOINED" ? (
                <Row gutter={[16, 16]}>
                    {[...participants.keys()].map((participantId) => (
                        <Col
                            xxl={12}
                            xl={12}
                            lg={12}
                            md={12}
                            sm={24}
                            xs={24}
                            key={participantId}
                        >
                            <ParticipantView participantId={participantId} />
                        </Col>
                    ))}
                </Row>
            ) : joined === "JOINING" ? (
                <p>Đang tham gia cuộc họp...</p>
            ) : (
                <>
                    <Row gutter={[16, 16]} align="middle" justify="center">
                        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                            <Button
                                type="primary"
                                size="middle"
                                onClick={handleOpenModal}
                                block
                            >
                                Tham gia
                            </Button>
                        </Col>
                    </Row>

                    {/* Modal for Camera and Audio Review */}
                    <Modal
                        title="Xem trước Camera và Âm thanh"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={handleConfirm}
                            >
                                Tham gia cuộc họp
                            </Button>,
                        ]}
                    >
                        <div style={{ textAlign: "center" }}>
                            <h4>Kiểm tra camera và âm thanh của bạn:</h4>
                            {isCameraOn ? (
                                <video
                                    ref={videoRef} // Set the reference to the video element
                                    autoPlay
                                    playsInline
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "200px", // Set a fixed height for the black box
                                        backgroundColor: "black", // Black box when camera is off
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                    }}
                                >
                                    <p>Camera đã tắt</p>
                                </div>
                            )}
                            <p>
                                Nhấn vào nút 'Tham gia cuộc họp' nếu mọi thứ đều
                                ổn.
                            </p>
                            <Button onClick={toggleCamera}>
                                {isCameraOn ? "Tắt Camera" : "Mở Camera"}
                            </Button>
                            <Button
                                onClick={toggleMic}
                                style={{ marginLeft: "10px" }}
                            >
                                {isMicOn ? "Tắt Mic" : "Mở Mic"}
                            </Button>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default MeetingView;
