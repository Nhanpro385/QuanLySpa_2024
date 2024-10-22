import React, { useEffect } from "react";
import { Table, Button, Col, Row, Select, Input, message } from "antd";
const { Search } = Input;
import { Dropdown, Space } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
import StaffTable from "../../modules/staffManagement/compoments/StaffTable";
import useUsersActions from "../../modules/staffManagement/hooks/useUserAction";
import { useSelector } from "react-redux";
function Staffs() {
    const { addusers, getusers, updateusers, deleteusers, getusersById } =
        useUsersActions();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.user);
    useEffect(() => {
        getusers();
    }, []);

    const dataSource =
        users.data.map((user) => ({
            key: user.id,
            fullname: user.full_name,
            age: user.age,
            phone: user.phone,
            address: user.address,
            role: user.role,
        })) || [];

    const handleEdit = (key) => {
        console.log("Edit", key);
    };

    const handleDelete = async (key) => {
        try {
            const res = await deleteusers(key);
            if (res.meta.requestStatus === "fulfilled") {
                getusers();
                message.success("Xóa thành công");
            }
        } catch (err) {
            message.error("Xóa thất bại");
        }
    };

    const handleAdd = () => {
        console.log("Add");
    };

    const onSearch = (value) => {};
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const calendar = useCalendarApp({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        selectedDate: formattedDate,
        defaultView: viewWeek.name,
        events: [
            {
                id: "3",

                title: "Trần Phi Hào",
                description: "ca2",
                start: "2024-09-19 00:00",
                end: "2024-09-19 02:00",
            },
        ],

        plugins: [
            createDragAndDropPlugin(),
            createEventModalPlugin(),
            createResizePlugin(),
        ],
    });

    return (
        <div>
            <h1 className="text-center">Quản lý nhân viên</h1>
            <Row className="mb-3" gutter={[16, 16]}>
                <Col xxl={21} xl={20} lg={18} md={18} sm={12} xs={24}>
                    <h2>Danh Sách Nhân Viên</h2>
                </Col>
                <Col xxl={3} xl={4} lg={6} md={6} sm={12} xs={24}>
                    <Button type="primary" onClick={handleAdd} block>
                        <PlusOutlined />
                        Thêm Nhân Viên
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3" gutter={[16, 16]}>
                <Col xl={3} lg={3} md={6} sm={6} xs={24}>
                    <Select
                        className="w-100"
                        placeholder="Chức Vụ"
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: "1",
                                label: "Nhân viên",
                            },
                            {
                                value: "2",
                                label: "Bảo vệ",
                            },
                        ]}
                    />
                </Col>{" "}
                <Col xl={3} lg={3} md={6} sm={6} xs={24}>
                    <Select
                        className="w-100"
                        placeholder="Giơi tính"
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: "1",
                                label: "Nam",
                            },
                            {
                                value: "2",
                                label: "Nu",
                            },
                        ]}
                    />
                </Col>
                <Col xl={6} lg={6} md={12} sm={12} xs={24}>
                    <Search
                        placeholder="Tìm theo Tên hoặc số điện thoại"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        onSearch={onSearch}
                    />
                </Col>
            </Row>
            <StaffTable
                dataSource={dataSource}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            <Col>
                <ScheduleXCalendar calendarApp={calendar} />
            </Col>
        </div>
    );
}

export default Staffs;
