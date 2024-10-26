import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { Button, Col, Row } from "antd";
import useParticipantHook from "../hooks/useParticipant";
function Controls() {
    const { leave, toggleMic, toggleWebcam, changeMic } = useMeeting();
  

    
    
    return (
        <Row gutter={[8,8]} align="middle" justify="center">
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
        </Row>
    );
}

export default Controls;
