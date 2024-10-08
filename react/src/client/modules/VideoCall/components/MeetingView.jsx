import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import { Badge, Button, Col, Row, Tag } from "antd";

function MeetingView({ meetingId, onMeetingLeave }) {
    const [joined, setJoined] = useState(null);
    const { join, participants} = useMeeting({
        onMeetingJoined: () => setJoined("JOINED"),
        onMeetingLeft: onMeetingLeave,
    });
    console.log(participants);

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    return (
        <div className="container">
            <h3>
                Mã Cuộc thoại Video:{" "}
                <Tag
                    style={{
                        padding: "5px 10px",
                        fontSize: "2rem",
                    }}
                    color="blue"
                >
                    {meetingId}
                </Tag>
            </h3>
            {joined === "JOINED" ? (
                <Row>
                    {[...participants.keys()].map((participantId, value) => (
                        <Col
                            style={{
                                borderRadius: "10px",
                            }}
                            xl={24}
                            key={participantId}
                        >
                            <ParticipantView
                                participantId={participantId}
                                key={participantId}
                            />
                        </Col>
                    ))}
                    <Col xl={24}>
                        <Controls  />
                    </Col>
                </Row>
            ) : joined === "JOINING" ? (
                <p>Đang tham gia cuộc họp...</p>
            ) : (
                <Button type="primary" size="large" onClick={joinMeeting}>
                    Tham gia
                </Button>
            )}
        </div>
    );
}

export default MeetingView;
