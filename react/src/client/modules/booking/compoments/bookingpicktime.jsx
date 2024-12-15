import React, { useState, useEffect } from "react";
import { Row, Col, Button, Divider, Result } from "antd";
import Slider from "react-slick";
import useShiftAction from "../../../../admin/modules/ShiftManagement/hooks/useShiftAction";
import dayjs from "dayjs";
dayjs.locale("vi"); // Cài đặt ngôn ngữ là tiếng Việt
import { useSelector } from "react-redux";
import style from "../styles/bookingpicktime.module.scss";
const settingstimedate = {
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
];
function getTimeSlots(shift) {
    const startTime = parseTime(shift.start_time);
    const endTime = parseTime(shift.end_time);
    const dateShift = new Date(shift.shift_date); // Ngày của ca làm việc
    const slots = [];
    const now = new Date();

    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
        const nextTime = new Date(currentTime);
        nextTime.setMinutes(currentTime.getMinutes() + 30); // Thêm 30 phút

        // So sánh ngày hiện tại và ngày của ca làm việc
        const isSameDay = now.toDateString() === dateShift.toDateString();

        slots.push({
            start_time: currentTime.toTimeString().slice(0, 5), // Giờ:Phút
            end_time: nextTime.toTimeString().slice(0, 5),
            status: isSameDay && now > nextTime ? "disabled" : "active", // Chỉ dis nếu ngày và thời gian trùng
        });

        currentTime = nextTime;
    }

    return slots;
}
function parseTime(timeStr) {
    const [hours, minutes, seconds] = timeStr
        .split(":")
        .map((num) => parseInt(num));
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
}

const BookingPickTime = ({
    activeDate,
    setActiveDate,
    styles,
    time,
    setTime,
}) => {
    const { getShiftClientAction } = useShiftAction();
    const [shiftsData, setShiftsData] = useState([]);
    const [listShift, setListShift] = useState([]);
    const [listTime, setListTime] = useState([]);

    const ShiftSlice = useSelector((state) => state.shifts);

    // Get shift data from Redux when it changes
    useEffect(() => {
        getShiftClientAction(14);
    }, []);

    useEffect(() => {
        if (ShiftSlice.shifts?.data) {
            setShiftsData(ShiftSlice.shifts.data);
        }
    }, [ShiftSlice.shifts]);
    const handleClickTime = (time) => {
        console.log("time id", time.shift_id);

        setTime(time);
    };

    useEffect(() => {
        const today = new Date();

        const next7Days = [];

        // Generate next 7 days from today
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);

            const formattedDate = dayjs(nextDay).format("YYYY-MM-DD");
            const dayName = dayjs(nextDay).format("dddd");

            next7Days.push({
                day: weekdays[dayjs(nextDay).day()],
                date: formattedDate,
                shifts: [],
            });
        }

        // Assign shifts to corresponding days
        next7Days.forEach((date, index) => {
            const filteredData = shiftsData.filter(
                (item) => item.shift_date == date.date
            );

            const formattedShifts = filteredData.map((item) => ({
                ...item,
                timeSlots: getTimeSlots(item),
            }));

            next7Days[index].shifts = formattedShifts;
        });

        setListShift(next7Days);
    }, [shiftsData]);

    console.log(listTime);
    useEffect(() => {
        if (listShift.length > 0) {
            setListTime(listShift[activeDate]?.shifts);
        }
    }, [activeDate]);

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px 4px rgba(0, 0, 0, 0.1)",
                marginTop: "20px",
            }}
            className="container"
        >
            <Col>
                {/* <Row align="middle" justify="start">
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <Divider orientation="left">
                            <strong>4. Chọn thời gian</strong>
                        </Divider>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16}>
                        <Row align="middle" justify="start">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#E05265",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Đã chọn</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#838383",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Đã đặt</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#bef3d9",
                                        color: "#fff",
                                        padding: "10px 30px",
                                        borderRadius: "5px",
                                        marginRight: "10px",
                                    }}
                                ></div>
                                <span>Còn trống</span>
                            </div>
                        </Row>
                    </Col>
                </Row> */}

                {/* Slider to select dates */}
                <Slider {...settingstimedate}>
                    {listShift.map((dateItem, index) => (
                        <div key={index} className="p-3 text-center">
                            <div
                                style={{
                                    boxShadow:
                                        "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    borderRadius: "10px",
                                    padding: "10px",
                                }}
                                className={
                                    activeDate === index ? styles.active : ""
                                }
                                onClick={() => {
                                    setActiveDate(index);
                                }}
                            >
                                <div>
                                    <span>
                                        <strong>{dateItem.day}</strong>
                                    </span>
                                </div>
                                <div>
                                    <span>{dateItem.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {listTime?.length === 0 && (
                    <Result
                        status="error"
                        title="Không tìm thấy lịch làm việc"
                        subTitle="Vui lòng chọn ngày khác hoặc liên hệ với chúng tôi để được hỗ trợ"
                    />
                )}

                <Row className="mt-3 mb-3" gutter={[12, 12]}>
                    {listTime?.map((shift, index) => {
                        const now = dayjs();
                        const [endHour, endMinute, endSecond] = shift?.end_time
                            .split(":")
                            .map(Number);
                        const endTimeToday = new Date();
                        endTimeToday.setHours(endHour, endMinute, endSecond, 0);

                        return (
                            <Col
                                xxl={24}
                                xl={24}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                key={index}
                                className={style.shift}
                            >
                                <Divider orientation="left">
                                    <h1 className={style.shiftTitle}>
                                        Ca làm việc: {index + 1}
                                    </h1>
                                </Divider>

                                <Row gutter={[16, 16]} justify={"center"}>
                                    {shift.timeSlots.map((slot, idx) => {
                                        return (
                                            <Col
                                                xxl={4}
                                                xl={4}
                                                lg={4}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                                key={idx}
                                            >
                                                <Button
                                                    type="default"
                                                    block
                                                    disabled={
                                                        slot.status ===
                                                        "disabled"
                                                    }
                                                    onClick={() =>
                                                        handleClickTime({
                                                            shift_id: shift.id,
                                                            start_time:
                                                                slot.start_time,
                                                            index: idx,
                                                            date: listShift[
                                                                activeDate
                                                            ].date,
                                                        })
                                                    }
                                                    className={`${style.slot} ${
                                                        time?.index === idx &&
                                                        time?.shift_id ===
                                                            shift.id &&
                                                        time?.start_time ===
                                                            slot?.start_time
                                                            ? style.active
                                                            : ""
                                                    }`}
                                                >
                                                    {slot.start_time} -{" "}
                                                    {slot.end_time}
                                                </Button>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                        );
                    })}
                </Row>

                {/* Payment and additional service buttons */}
            </Col>
        </Row>
    );
};

export default BookingPickTime;
