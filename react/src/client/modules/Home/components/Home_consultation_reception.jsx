import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Col,
    Row,
    Input,
    Button,
    Checkbox,
    notification,
    Image,
    Divider,
} from "antd";

import { useForm, Controller } from "react-hook-form";
import style from "../Styles/Home_consultation_reception.module.scss"; // Import SCSS
import { createMeeting, VIDEOSDK_TOKEN } from "../../VideoCall/services/API";
const { Meta } = Card;
const options = [
    {
        label: "Mụn Đầu Đen",
        value: "1",
        url: "https://tamanhhospital.vn/wp-content/uploads/2023/11/hinh-anh-mun-dau-den-o-ma.jpg",
    },
    {
        label: "Mụn Đầu Trắng",
        value: "2",
        url: "https://images-1.eucerin.com/~/media/eucerin/local/vn/tre-so-sinh-noi-mun-dau-trang/20210609093614404456mundautrangmax1800x1800.jpg?la=vi-vn",
    },
    {
        label: "Mụn Đỏ",
        value: "3",
        url: "https://www.vietskin.vn/wp-content/uploads/2019/07/mun-sung-do.jpg",
    },
    {
        label: "Mụn Mủ",
        value: "4",
        url: "https://www.vietskin.vn/wp-content/uploads/2019/06/mun-mu.jpg",
    },
    {
        label: "Mụn Nang",
        value: "5",
        url: "https://medlatec.vn/media/12795/content/20201203_mun-nang-2.jpg",
    },
    {
        label: "Mụn Bọc",
        value: "6",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcKJWetN0uyCdQwSIGqRDoVsZaZjrWVr7zA&s",
    },
    {
        label: "Mụn Viêm",
        value: "7",
        url: "https://images-1.eucerin.com/~/media/eucerin/local/vn/mun-viem/mun-viem-new-1.jpg?la=vi-vn",
    },
    {
        label: "Mụn Cystic",
        value: "8",
        url: "https://khoahoclanda.com/wp-content/uploads/2017/01/MUN-TRUNG-CA-NANG.jpg",
    },
    {
        label: "Mụn Sinh Lý",
        value: "9",
        url: "https://vinmec-prod.s3.amazonaws.com/images/20190529_075246_910718_mun-rop-sinh-duc.max-800x800.jpg",
    },
    {
        label: "Khác",
        value: "10",
        url: "https://th.bing.com/th/id/OIP.JFJrgIUq4OQ_IC6e4RNrrgHaEs?w=297&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
];
import { useAuth } from "../../../config/AuthContext";
import useconsulationsAction from "../../../../admin/modules/consulations/hooks/useconsulationsAction";
const Home_consultation_reception = () => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm();
    const { isLoggedIn, user } = useAuth();
    const [api, contextHolder] = notification.useNotification();
    const { addconsulations } = useconsulationsAction();
    const [isVideoCall, setIsVideoCall] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State để theo dõi trạng thái loading
    const consultationRef = useRef(null);
    useEffect(() => {
        if (window.location.hash === "#tuvan") {
            console.log("scroll");

            consultationRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true); // Bắt đầu loading
        try {
            if (data.issues) {
                const skinconditions = data.issues.join(", ");
                const meetingId = await createMeeting({
                    token: VIDEOSDK_TOKEN,
                });
                const payload = {
                    description: data.description,
                    skin_condition: skinconditions,
                    id: meetingId,
                };
                const res = await addconsulations(payload);
                if (res.payload.status === "true") {
                    api.success({
                        message: "Yêu cầu của bạn đã được gửi thành công",
                        placement: "topRight",
                    });
                } else {
                    api.error({
                        message: "Yêu cầu của bạn đã được gửi thất bại",
                        description: "vui lòng thử lại sau",
                        placement: "topRight",
                    });
                }
                reset();
            } else {
                setError("issues", {
                    type: "manual",
                    message: "Vui lòng chọn ít nhất 1 vấn đề",
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false); // Dừng loading
        }
    };

    return (
        <section className="container">
            <div className=" pt-5 pb-5">
                <h1 className={style.sectiontitle}>
                    “Các Vấn Đề Về Mụn Mà Bạn Đang Gặp Phải”
                </h1>
                {contextHolder}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Row gutter={[16, 16]}>
                            {options.map((item, index) => (
                                <Col xs={12} md={8} key={index}>
                                    <Card
                                        hoverable
                                        cover={
                                            <Image
                                                alt="example"
                                                src={item.url}
                                                height={130}
                                            />
                                        }
                                    >
                                        <Meta title={item.label} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                  
                    <Col
                        xs={24}
                        lg={12}
                        className={style.formcontainer}
                        ref={consultationRef}
                    >
                        <div className={style.boxForm}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className={style.formtitle}>
                                    Bạn đang gặp những vấn đề nào về mụn để tư vấn
                                    qua video call với chuyên gia?
                                </h3>
                                <p className={style.formdescription}>
                                    Đừng để những vấn đề về mụn làm bạn mất tự tin. Hãy liên
                                    hệ với Sakura Spa để khắc phục ngay.
                                </p>

                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Controller
                                            name="issues"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox.Group {...field}>
                                                    <Row
                                                        gutter={[16, 16]}
                                                        justify="start"
                                                    >
                                                        {options.map((item) => (
                                                            <Col
                                                                xxl={8}
                                                                xl={12}
                                                                lg={12}
                                                                md={12}
                                                                sm={12}
                                                                xs={12}
                                                                key={item.value}
                                                            >
                                                                <Checkbox
                                                                    key={item.value}
                                                                    value={
                                                                        item.label
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </Checkbox>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </Checkbox.Group>
                                            )}
                                        />
                                        {errors.issues && (
                                            <p
                                                className="error-text"
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                Vui lòng chọn ít nhất 1 vấn đề
                                            </p>
                                        )}
                                    </Col>
                                    <Col span={24}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.TextArea
                                                    {...field}
                                                    size="large"
                                                    placeholder="Mô tả vấn đề của bạn *"
                                                />
                                            )}
                                        />
                                        {errors.description && (
                                            <p
                                                className="error-text"
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                Mô tả vấn đề của bạn là bắt buộc
                                            </p>
                                        )}
                                    </Col>
                                </Row>

                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-button mt-3"
                                    loading={isLoading} // Hiển thị loading
                                    {...(isLoggedIn ? {} : { disabled: true })}
                                >
                                    {isLoggedIn
                                        ? "Gửi yêu cầu"
                                        : "Đăng nhập để gửi yêu cầu"}
                                </Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Home_consultation_reception;
