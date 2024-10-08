import React from "react";
import ReactPlayer from "react-player";
import useParticipantHook from "../hooks/useParticipant";

function ParticipantView({ participantId, nameuser }) {
    const { micRef, videoStream, webcamOn, micOn, displayName, isLocal } =
        useParticipantHook(participantId);


    return (
        <div key={participantId}>
            {/* <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} |
                Mic: {micOn ? "ON" : "OFF"}
            </p> */}
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn ? (
                <ReactPlayer
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    width={"100%"}
                    height={"100%"}
                    onError={(err) =>
                        console.log("participant video error", err)
                    }
                />
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                    }}
                ></div>
            )}
        </div>
    );
}

export default ParticipantView;
