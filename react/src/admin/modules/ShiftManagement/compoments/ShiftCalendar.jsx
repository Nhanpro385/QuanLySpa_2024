import React from "react";
import { Col } from "antd";
import { ScheduleXCalendar } from "@schedule-x/react";

const ShiftCalendar = ({ calendarApp }) => (
    <Col>
        <h2 className="mb-5">Lịch Làm Việc</h2>
        <ScheduleXCalendar calendarApp={calendarApp} />
    </Col>
);

export default ShiftCalendar;
