import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Col,
    Row,
    Divider,
    Result,
    notification,
    Descriptions,
} from "antd";

import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import useconsulationsAction from "../../consulations/hooks/useconsulationsAction";
import JoinScreenAdmin from "./JoinScreenAdmin";
import MeetingViewAdmin from "./MeetingViewAdmin";
import useAuthActions from "../../authen/hooks/useAuth";
import styles from "../styles/Videocall.module.scss";
import {
    VIDEOSDK_TOKEN,
    createMeeting,
    validateMeeting,
} from "../services/API";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const VideoCall_ContentAdmin = () => {
    const consulations = useSelector((state) => state.consulations);
    const auth = useSelector((state) => state.auth);

    const { getbyidconsulations } = useconsulationsAction();
    const { authGetmeAdmin } = useAuthActions();
    const [ConsultationsDetail, setConsultationsDetail] = useState({});
    const { idmeet } = useParams();
    const [meetingId, setMeetingId] = useState(null); // id của cuộc gọi

    const items = [
        {
            key: "1",
            label: "Tên khách hàng",
            children:
                ConsultationsDetail?.customer?.full_name || "không tìm thấy",
        },
        {
            key: "2",
            label: "Số điện thoại",
            children: ConsultationsDetail?.customer?.phone || "không tìm thấy",
        },
        {
            key: "3",
            label: "Email",
            children: ConsultationsDetail?.customer?.email || "không tìm thấy",
        },
        {
            key: "4",
            label: "Tình trạng da của khách hàng",
            children: ConsultationsDetail?.skin_condition || "không tìm thấy",
        },
    ];
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        if (consulations.consulation && !consulations.loading) {
            if (consulations.consulation) {
                setConsultationsDetail(consulations.consulation.data);
            } else {
                api.warning({
                    message: "Không tìm thấy khách hàng",
                    description: "Vui lòng kiểm tra lại thông tin",
                    duration: 5,
                });
            }
        }
    }, [consulations]);
    useEffect(() => {
        getbyidconsulations(idmeet);
        authGetmeAdmin();
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
                } else {
                    setMeetingId(meetingId);
                }
            }
        );
    }, [idmeet]);
    const getMeetingAndToken = async (id) => {
        // Hàm này sẽ tạo cuộc gọi mới hoặc sử dụng cuộc gọi đã tồn tại
        const meetingId =
            id == null ? await createMeeting({ token: VIDEOSDK_TOKEN }) : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return (
        <div className="container">
            {contextHolder}
            <Row className={styles.videoCallContainer} gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className={styles.videoContainer}>
                            {meetingId ? (
                                <MeetingProvider
                                    config={{
                                        meetingId,
                                        micEnabled: true,
                                        webcamEnabled: true,
                                        name: `${auth?.user?.data?.full_name} - ${auth?.user?.data?.position?.name}`,
                                    }}
                                    token={VIDEOSDK_TOKEN}
                                >
                                    <MeetingConsumer>
                                        {() => (
                                            <MeetingViewAdmin
                                                meetingId={meetingId}
                                                onMeetingLeave={onMeetingLeave}
                                            />
                                        )}
                                    </MeetingConsumer>
                                </MeetingProvider>
                            ) : (
                                <>
                                    <Result
                                        status="404"
                                        title="Không tìm thấy cuộc gọi"
                                        className="w-100"
                                        subTitle="Vui lòng kiểm tra lại đường dẫn và có thông báo về cuộc gọi"
                                        extra={
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    getMeetingAndToken(idmeet)
                                                }
                                            >
                                                Quay lại
                                            </Button>
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </Col>
                </Col>
                <Col span={24}>
                    <Descriptions
                        bordered
                        title="Thông tin của khách hàng đang cần tư vấn"
                        items={items}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default VideoCall_ContentAdmin;
