import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { Popover } from "antd";

const now = new Date();

export default function ShiftCalendar({ data }) {
   

    const [eventsData, setEventsData] = useState([]);
    dayjs.locale("vi");
    const localizer = dayjsLocalizer(dayjs);
    // useEffect to update eventsData when `data` changes
    useEffect(() => {
        if (data) {
            const updatedEvents = data.map((item) => {
                const startDateTime = new Date(
                    item.shift_date + "T" + item.start_time
                );

                const endDateTime = new Date(
                    item.shift_date + "T" + item.end_time
                );

                return {
                    id: item.id,
                    title: item?.start_time + " - " + item?.end_time,
                    start: startDateTime,
                    end: endDateTime,
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
                onSelectEvent={(event) => console.log(event)}
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
                        <div>
                            <strong>{event.title}</strong>
                            <br />
                        </div>
                    ),
                }}
            />
        </div>
    );
}
