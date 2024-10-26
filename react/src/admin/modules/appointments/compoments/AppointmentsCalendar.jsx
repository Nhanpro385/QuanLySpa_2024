// src/components/AppointmentsCalendar.js
import React from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
    createCalendar,
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createResizePlugin } from "@schedule-x/resize";
import "@schedule-x/theme-default/dist/index.css";


const AppointmentsCalendar = ({ formattedDate }) => {
    const calendar = useCalendarApp({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        selectedDate: formattedDate,
        defaultView: viewWeek.name,
        events: [
            {
                id: "3",
                title: "Tuấn trị mụn",
                start: "2024-09-19 00:00",
                end: "2024-09-19 02:00",
            },
        ],
        calendars: {
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

export default AppointmentsCalendar;
