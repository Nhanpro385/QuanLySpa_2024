import React, { useEffect, useRef, useState } from "react";
import {
    Steps,
    Col,
    Row,
    Form,
    Input,
    Button,
    Select,
    Card,
    Divider,
} from "antd";

import { useForm, Controller, set } from "react-hook-form";
import baner2 from "../assets/images/baner2.png";
import anh4 from "../assets/images/image4.png";
import styles from "../modules/booking/styles/Booking.module.scss";
import BookingListService from "../modules/booking/compoments/bookingListService";
import BookingPickTime from "../modules/booking/compoments/bookingpicktime";
import useServiceCategoriesActions from "../../admin/modules/services/hooks/useServiceCategories";
import { useSelector } from "react-redux";
const Appbooking = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [service, setService] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [activeDate, setActiveDate] = useState(null);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [ServicesCategories, setServicesCategories] = useState([]);
    const ServiceCategoriesSlice = useSelector(
        (state) => state.serviceCategories
    );
    const onSubmit = (data) => {
        console.log(data);
    };
    useEffect(() => {
        getServiceCategoriesClient(50);
    }, []);
    useEffect(() => {
        if (ServiceCategoriesSlice.ServiceCategories?.data) {
            const data = ServiceCategoriesSlice.ServiceCategories.data.filter(
                (cate) => cate.service.length > 0
            );
            console.log(data);
            setServicesCategories(
                data.map((cate) => ({
                    ...cate,
                    key: cate.id,
                }))
            );
        }
    }, [ServiceCategoriesSlice]);
    return (
        <div
            style={{
                backgroundColor: "#FFF3F3",
            }}
        >
            <img src={baner2} alt="baner2" width="100%" />

            <Row justify="center" align="middle">
                <Col span={12}>
                    <Steps
                        size="small"
                        current={0}
                        style={{
                            marginTop: "30px",
                        }}
                        items={[
                            {
                                title: "Đặt lịch",
                            },
                            {
                                title: "Thông tin Đăt lịch",
                            },
                            {
                                title: "Thanh toán",
                            },
                            {
                                title: "Hoàn tất",
                            },
                        ]}
                    />
                </Col>
            </Row>

            <Row
                justify="center"
                align="middle"
                style={{
                    marginTop: "30px",
                }}
            >
                <Col
                    span={20}
                    style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Form
                        name="basic"
                        layout="inline"
                        wrapperCol={{ span: 24 }}
                    >
                        <Divider orientation="left">
                            <strong>3.Chọn dịch vụ</strong>
                        </Divider>

                        <BookingListService
                            activeService={activeService}
                            setActiveService={setActiveService}
                            service={service}
                            setService={setService}
                            ServicesCategories={ServicesCategories}
                        />
                        <BookingPickTime
                            activeDate={activeDate}
                            setActiveDate={setActiveDate}
                            styles={styles}
                        />
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
export default Appbooking;
