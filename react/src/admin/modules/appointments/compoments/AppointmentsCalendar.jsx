import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set Vietnamese locale
moment.locale("vi");
const localizer = momentLocalizer(moment);

const now = new Date();

export default function AppointmentsCalendar({ data }) {
    

    const initialEvents = data
        ? data.map((item) => {
              const startDateTime = new Date(
                  item.appointment_date + "T" + item.start_time
              );
              const endDateTime = new Date(
                  item.appointment_date + "T" + item.start_time
              );

              return {
                  id: item.id,
                  title: item.title || "Sự kiện không có tiêu đề", // Default title
                  start: startDateTime,
                  end: endDateTime,
              };
          })
        : [];


    const [eventsData, setEventsData] = useState(initialEvents);

    return (
        <div className="App">
            <Calendar
                
                selectable
                localizer={localizer}
                defaultDate={now}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(event) => alert(event.title)}
                messages={{
                    allDay: "Cả ngày",
                    previous: "Trước",
                    next: "Sau",
                    today: "Hôm nay",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                    agenda: "Lịch trình",
                    noEventsInRange:
                        "Không có sự kiện trong khoảng thời gian này",
                    showMore: (total) => `+${total} sự kiện`,
                }}
                components={{
                    event: ({ event }) => (
                        <span>
                            <strong>{event.title}</strong>
                            <br />
                            {moment(event.start).format("HH:mm")} -{" "}
                            {moment(event.end).format("HH:mm")}
                        </span>
                    ),
                }}
            />
        </div>
    );
}
