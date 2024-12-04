import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Popover } from "antd";
import dayjs from "dayjs";

const now = new Date();

export default function Staff_calendar({ data }) {
    dayjs.locale("vi");
    const localizer = dayjsLocalizer(dayjs);

    const [eventsData, setEventsData] = useState([]);
    console.log(eventsData);
    
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
                    title: "Ca làm việc - " + item.shift_date,

                    start: startDateTime,
                    end: endDateTime,
                    date: item.shift_date,
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
                // onSelectEvent={(event) => console.log(event.date)}
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
                            content={
                                "Thời gian: " + event.start.toLocaleTimeString()
                            }
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
