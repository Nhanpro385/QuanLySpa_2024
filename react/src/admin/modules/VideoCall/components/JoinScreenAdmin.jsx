import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";


function JoinScreenAdmin({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
  

    const onClick = async () => {
        await getMeetingAndToken(meetingId); 
    };

    // Function to start the camera feed


    return (
        <div style={{ width: "100%", position: "relative" }}>
            <Row justify="center" align="middle" gutter={16}>
                
                <Col xl={12}>
                    <Input
                        type="text"
                        size="large"
                        onChange={(e) => setMeetingId(e.target.value)}
                        placeholder="Nhập mã cuộc họp"
                        style={{
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                        }}
                    />
                </Col>
                <Col xl={12}>
                    <Row justify="center" align="middle" gutter={16}>
                        <Col xl={12}>
                            <Button block type="primary" onClick={onClick}>
                                Tham gia cuộc họp
                            </Button>
                        </Col>
                        <Col xl={12}>
                            <Button block type="primary" onClick={onClick}>
                                Tạo cuộc họp
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default JoinScreenAdmin;
