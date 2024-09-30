import React from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createResizePlugin } from "@schedule-x/resize";
import "@schedule-x/theme-default/dist/index.css";

const Staff_calendar = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const calendar = useCalendarApp({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        selectedDate: formattedDate,
        defaultView: viewWeek.name,
        events: [
            {
                id: "1",
                title: "Ca làm việc sáng",
                start: "2024-09-19 08:00",
                end: "2024-09-19 12:00",
            },
            {
                id: "2",
                title: "Nghỉ trưa",
                start: "2024-09-19 12:00",
                end: "2024-09-19 13:00",
            },
            {
                id: "3",
                title: "Tuấn trị mụn",
                start: "2024-09-19 14:00",
                end: "2024-09-19 16:00",
            },
            {
                id: "4",
                title: "Ca làm việc chiều",
                start: "2024-09-19 16:00",
                end: "2024-09-19 20:00",
            },
            {
                id: "5",
                title: "Họp nhóm",
                start: "2024-09-20 10:00",
                end: "2024-09-20 11:00",
            },
            {
                id: "6",
                title: "Khách hàng trị liệu",
                start: "2024-09-21 09:00",
                end: "2024-09-21 10:30",
            },
        ],
        calendars: {
            work: {
                colorName: "work",
                lightColors: {
                    main: "#28a745",
                    container: "#e3f9e5",
                    onContainer: "#0f3e16",
                },
                darkColors: {
                    main: "#a1f0ba",
                    onContainer: "#003f20",
                    container: "#446b52",
                },
            },
            leisure: {
                colorName: "leisure",
                lightColors: {
                    main: "#1c7df9",
                    container: "#d2e7ff",
                    onContainer: "#002859",
                },
                darkColors: {
                    main: "#c0dfff",
                    onContainer: "#dee6ff",
                    container: "#426aa2",
                },
            },
        },
        plugins: [
            createDragAndDropPlugin(),
            createEventModalPlugin(),
            createResizePlugin(),
        ],
    });

    return <ScheduleXCalendar calendarApp={calendar} />;
};

export default Staff_calendar;
