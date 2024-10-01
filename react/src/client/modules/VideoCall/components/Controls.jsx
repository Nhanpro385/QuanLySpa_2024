import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { Button, Col, Row } from "antd";

function Controls({mic,webcam}) {
    const { leave, toggleMic, toggleWebcam, changeMic } = useMeeting();
   

    return (
        <Row gutter={8}>
            <Col xl={4} lg={4} md={4} xs={4}>
                <Button type="primary" block onClick={() => leave()}>
                    Rời khỏi cuộc họp
                </Button>
            </Col>
            <Col xl={4} lg={4} md={4} xs={4}>
                <Button type="primary" block onClick={() => toggleMic()}>
                    Tắt/Bật Mic
                </Button>
            </Col>

            <Col xl={4} lg={4} md={4} xs={4}>
                <Button type="primary" block onClick={() => toggleWebcam()}>
                    Tắt/Bật Webcam
                </Button>
            </Col>
        </Row>
    );
}

export default Controls;
