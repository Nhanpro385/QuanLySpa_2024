import React from "react";
import { VideoCall_Content } from "../modules/VideoCall/components/";


const Videocall = () => {
    document.title = "Tư vấn trực tuyến";
    return (
        <div>
            <VideoCall_Content />
        </div>
    );
};

export default Videocall;
