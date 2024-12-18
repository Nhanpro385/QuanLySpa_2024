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
    Table,
    notification,
} from "antd";

import baner2 from "../assets/images/baner2.png";
import anh4 from "../assets/images/image4.png";
import styles from "../modules/booking/styles/Booking.module.scss";
import BookingListService from "../modules/booking/compoments/bookingListService";
import BookingPickTime from "../modules/booking/compoments/bookingpicktime";
import useServiceCategoriesActions from "../../admin/modules/services/hooks/useServiceCategories";
import { useSelector } from "react-redux";
import ListBookingServiceTable from "../modules/booking/compoments/listBookingServiceTable";
import { useNavigate, useLocation } from "react-router-dom";
const Appbooking = () => {
    document.title = "Đặt lịch";
    const [idService, setIdService] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const iddichvu = params.get("dichvu");

        setIdService(iddichvu);
    }, [location.search]);

    const [api, contextHolder] = notification.useNotification();
    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [service, setService] = useState([]); // Dịch vụ
    const [activeService, setActiveService] = useState(0);
    const [activeDate, setActiveDate] = useState(null); // Ngày đặt lịch
    const [time, setTime] = useState(null); // Thời gian

    const [NoteData, setNoteData] = useState(""); // Ghi chú

    const [ServicesCategories, setServicesCategories] = useState([]); // danh sách dịch vụ
    const ServiceCategoriesSlice = useSelector(
        (state) => state.serviceCategories
    );
    const navigate = useNavigate();
    const OnchangeNote = (e) => {
        setNoteData(e.target.value);
    };

    const onSubmit = (data) => {
        if (!time) {
            api.error({
                message: "Vui lòng chọn thời gian đặt lịch",
            });
            return;
        }
        if (service.length === 0) {
            api.error({
                message: "Vui lòng chọn dịch vụ",
            });
            return;
        }
        console.log(time);

        const payload = {
            shift_id: time.shift_id,
            services: service.map((ser) => ({
                service_id: ser.id,
                quantity: ser.quantity,
                name: ser.name,
                price: ser.price,
            })),
            totalprice: service.reduce(
                (total, ser) => total + ser.quantity * ser.price,
                0
            ), // Tính tổng giá
            time: time.start_time, // Thời gian
            start_time: `${time.start_time}:00`, // Thời gian bắt đầu
            note: NoteData, // Chú thích
            date: time.date, // Ngày đặt lịch
        };

        localStorage.setItem("booking", JSON.stringify(payload));
        navigate("/thongtindatlich");
    };
    useEffect(() => {
        getServiceCategoriesClient(50);
    }, []);
    useEffect(() => {
        if (ServiceCategoriesSlice.ServiceCategories?.data) {
            const data = ServiceCategoriesSlice.ServiceCategories.data.filter(
                (cate) => cate.service.length > 0
            );

            setServicesCategories(
                data.map((cate) => ({
                    ...cate,
                    key: cate.id,
                }))
            );
        }
    }, [ServiceCategoriesSlice]);
    useEffect(() => {
        // Kiểm tra xem dịch vụ có tồn tại trong `service` hay không
        if (service.filter((ser) => ser.id == idService).length == 0) {
            ServicesCategories.forEach((cate, index) => {
                cate.service.forEach((ser, index2) => {
                    // Nếu tìm thấy dịch vụ khớp với `idService`
                    if (ser.id === idService) {
                        // Cập nhật activeService với key của `ServicesCategories`
                        setActiveService(index);

                        // Cập nhật state `service` với dịch vụ và thêm quantity
                        setService([
                            ...service,
                            {
                                ...ser,
                                quantity: 1,
                            },
                        ]);
                    }
                });
            });
        }
    }, [ServicesCategories, idService]); // Thêm idService vào dependencies để theo dõi sự thay đổi.

    return (
        <div
            style={{
                backgroundColor: "#FFF3F3",
            }}
        >
            {contextHolder}
            <img src={baner2} alt="baner2" width="100%" />

            <Row justify="center" align="middle" className="mb-4">
                <Col span={12}>
                    <Steps
                        size="small"
                        current={0}
                        style={{
                            marginTop: "30px",
                        }}
                        items={[
                            {
                                title: "Đặt Lịch",
                            },
                            {
                                title: "Thông Tin Đặt Lịch",
                            },
                            {
                                title: "Xác Nhận Đặt Lịch",
                            },
                        ]}
                    />
                </Col>
            </Row>

            <Row
                justify="center"
                align="middle"
                className="container"
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Col>
                    <Divider orientation="left">
                        <strong>1.Chọn dịch vụ</strong>
                    </Divider>

                    <BookingListService
                        activeService={activeService}
                        setActiveService={setActiveService}
                        service={service}
                        setService={setService}
                        ServicesCategories={ServicesCategories}
                    />
                </Col>
            </Row>

            <ListBookingServiceTable
                service={service}
                setService={setService}
            />
            <BookingPickTime
                time={time}
                setTime={setTime}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                styles={styles}
            />

            <Card
                className="container"
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
                    marginTop: "20px",
                }}
            >
                <Row justify="center" align="middle" gutter={[16, 16]}>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h3>Ghi chú cho Spa (nếu có)</h3>
                        <Input.TextArea
                            placeholder="Ghi chú"
                            style={{ width: "100%" }}
                            value={NoteData}
                            onChange={OnchangeNote}
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            size="large"
                            onClick={() => onSubmit()}
                        >
                            Tiếp theo
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
export default Appbooking;
