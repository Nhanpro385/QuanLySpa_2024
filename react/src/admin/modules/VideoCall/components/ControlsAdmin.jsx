import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { Button, Col, Row } from "antd";
import useParticipantHook from "../hooks/useParticipant";
import useconsulationsAction from "../../consulations/hooks/useconsulationsAction";
import { useNavigate } from "react-router-dom";
function ControlsAdmin({ meetingId: idmeet, joined, setJoined }) {
    const navigate = useNavigate();
    const {
        leave,
        toggleMic,
        toggleWebcam,
        changeMic,
        end,
        meetingId,
        disableWebcam,
    } = useMeeting({
        onMeetingStateChanged,
    });
    const { updateconsulations } = useconsulationsAction();
    function onMeetingStateChanged(data) {
        const { state } = data;

        switch (state) {
            case "CLOSING":
                setJoined(null);
                navigate("/admin/tuvankhachhang/videocall/" + idmeet);
                disableWebcam();
                break;
            case "CLOSED":
                // updateconsulations({
                //     id: idmeet,
                //     data: {
                //         status: 3,
                //     },
                // });
                break;
        }
    }
    return (
        <Row gutter={[8, 8]} align="middle" justify="center">
            <Col xl={6} lg={6} md={6} xs={12}>
                <Button type="primary" block onClick={() => leave()}>
                    Rời khỏi cuộc họp
                </Button>
            </Col>
            <Col xl={6} lg={6} md={6} xs={12}>
                <Button type="primary" block onClick={() => toggleMic()}>
                    Tắt/Bật Mic
                </Button>
            </Col>

            <Col xl={6} lg={6} md={6} xs={12}>
                <Button type="primary" block onClick={() => toggleWebcam()}>
                    Tắt/Bật Webcam
                </Button>
            </Col>
            {joined == "JOINED" ? (
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Button type="primary" block onClick={() => end()}>
                        Kết thúc cuộc gọi
                    </Button>
                </Col>
            ) : (
                ""
            )}
        </Row>
    );
}

export default ControlsAdmin;
