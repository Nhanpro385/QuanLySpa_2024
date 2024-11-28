import React from "react";
import ReactPlayer from "react-player";
import useParticipantHook from "../hooks/useParticipant";
import { Col, Row } from "antd";
import user from "../../../assets/images/user.png";
function ParticipantViewAdmin({ participantId, nameuser }) {
    const { micRef, videoStream, webcamOn, micOn, displayName, isLocal } =
        useParticipantHook(participantId);

    return (
        <div
            key={participantId}
            style={{
                borderRadius: "10px",
                overflow: "hidden",
                textAlign: "center", // Center the name
                height: "100%",
                minHeight: "400px",
            }}
        >
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn ? (
                <Row>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <ReactPlayer
                            playsinline
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            url={videoStream}
                            onError={(err) =>
                                console.log("participant video error", err)
                            }
                        />
                    </Col>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h2 style={{ color: "black", marginTop: "10px" }}>
                            {displayName}
                        </h2>
                    </Col>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        {!micOn && (
                            <p style={{ color: "black", marginTop: "10px" }}>
                                Mic đã tắt
                            </p>
                        )}
                    </Col>
                </Row>
            ) : (
                <Row
                    justify="center"
                    align="middle"
                    style={{ height: "100%" }}
                    className="bg-dark"
                >
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <img src={user} alt="user" style={{ width: "400px" }} />
                    </Col>{" "}
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <p style={{ color: "white" }}>Không có video</p>
                    </Col>
                    {/* nếu mic tẳt */}
                    {!micOn && (
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                            <p style={{ color: "white" }}>Mic đã tắt</p>
                        </Col>
                    )}
                </Row>
            )}
        </div>
    );
}

export default ParticipantViewAdmin;
