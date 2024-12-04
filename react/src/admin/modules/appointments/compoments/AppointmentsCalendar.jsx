import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Popover } from "antd";

const now = new Date();

export default function AppointmentsCalendar({ data }) {
    const [eventsData, setEventsData] = useState([]);
    dayjs.locale("vi");
    const localizer = dayjsLocalizer(dayjs);
    // useEffect to update eventsData when `data` changes
    useEffect(() => {
        if (data) {
            const updatedEvents = data.map((item) => {
                const startDateTime = new Date(
                    item.appointment_date + "T" + item.start_time
                );
                console.log(startDateTime);

                const endDateTime = new Date(
                    item.appointment_date + "T" + item.expected_time
                );
                console.log(item);

                return {
                    id: item.id,
                    title:
                        item.customer?.full_name ||
                        "Của khách hàng ngày " + item.appointment_date,
                    start: startDateTime,
                    end: endDateTime,
                    service_name: item?.services
                        ?.map((service) => service.name)
                        .join(", "),
                };
            });

            setEventsData(updatedEvents);
        }
    }, [data]); // Dependency on `data`

    return (
        <div className="App">
            <Calendar
                selectable
                localizer={localizer}
                defaultDate={now}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(event) => console.log(event.service_name)}
                messages={{
                    allDay: "Cả ngày",
                    previous: "Trước",
                    next: "Sau",
                    today: "Hôm nay",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                    date: "Ngày",
                    time: "Thời gian",
                    event: "Sự kiện",
                    agenda: "Lịch trình",
                    work_week: "Tuần làm việc",
                    yesterday: "Hôm qua",
                    tomorrow: "Ngày mai",
                    noEventsInRange:
                        "Không có sự kiện trong khoảng thời gian này",
                    showMore: (total) => `+${total} sự kiện`,
                }}
                components={{
                    event: ({ event }) => (
                        <Popover
                            content={"Dịch vụ: " + event.service_name}
                            trigger={"click"}
                        >
                            <div>
                                <strong>{event.title}</strong>
                                <br />
                            </div>
                        </Popover>
                    ),
                }}
            />
        </div>
    );
}
