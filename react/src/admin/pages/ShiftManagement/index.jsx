import React from "react";
import { Table, Button, Col, Row, Select, Input } from "antd";
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

const items = [
    {
        key: "1",
        label: <Button block>Sửa Ca Làm</Button>,
    },
    {
        key: "2",
        label: <Button block>Chi tiết Ca</Button>,
    },
    {
        key: "4",
        label: (
            <Button block danger>
                Xóa Ca
            </Button>
        ),
    },
];
import useModal from "../../modules/appointments/hooks/openmodal";
import ModalAddShift from "../../modules/ShiftManagement/compoments/Modal_add";
import ModalAddShiftEdit from "../../modules/ShiftManagement/compoments/ModalEditShif";
const ShiftManagement = () => {
    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
        showModal: showModal2,
    } = useModal();
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate(`/admin/staffs/${record.key}`);
                break;
            case "3":
                navigate("/admin/user/history/4");
                break;
            case "4":
                handleDelete(record.key);
                break;
            default:
                break;
        }
    };

    const dataSource = [
        {
            key: "1",
            fullname: "Trịnh Trần Phương Tuấn",
            shift: "Ca Sáng",
            startTime: "08:00",
            endTime: "12:00",
            role: "Quản lý",
        },
        {
            key: "2",
            fullname: "Nguyễn Văn A",
            shift: "Ca Chiều",
            startTime: "13:00",
            endTime: "17:00",
            role: "Nhân viên",
        },
    ];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Ca Làm Việc",
            dataIndex: "shift",
            key: "shift",
        },
        {
            title: "Thời Gian Bắt Đầu",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "Thời Gian Kết Thúc",
            dataIndex: "endTime",
            key: "endTime",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items,
                        onClick: (e) => onClick({ key: e.key, record }),
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary">
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    const handleAddShift = () => {
        console.log("Thêm Ca Mới");
    };
    const handleEdit = (id) => {
        showModal2();
        console.log("Edit", id);
    };
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const calendar = useCalendarApp({
        views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
        selectedDate: formattedDate,
        defaultView: viewWeek.name,
        events: [
            {
                id: "3",
                title: "Ca Sáng - Trần Phi Hào",
                start: "2024-09-19 08:00",
                end: "2024-09-19 12:00",
            },
            {
                id: "4",
                title: "Ca Chiều - Trần Phi Hào",
                start: "2024-09-19 13:00",
                end: "2024-09-19 17:00",
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
            <h1 className="text-center">Quản Lý Ca Làm Việc</h1>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 16 }}
                gutter={[16, 16]}
            >
                <Col xl={20} md={20} sm={24} xs={24}>
                    <h2>Danh Sách Ca Làm Việc</h2>
                </Col>
                <Col xl={4} md={4} sm={24} xs={24}>
                    <Button type="primary" onClick={showModal} block>
                        <PlusOutlined></PlusOutlined>
                        Thêm Ca Mới
                    </Button>
                    <ModalAddShift
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xl={3} md={6} xs={24}>
                    <Select
                        className="w-100"
                        placeholder="Chức Vụ"
                        options={[
                            { value: "1", label: "Nhân viên" },
                            { value: "2", label: "Quản lý" },
                        ]}
                    />
                </Col>
                <Col xl={3} md={6} xs={24}>
                    <Select
                        className="w-100"
                        placeholder="Ca Làm Việc"
                        options={[
                            { value: "1", label: "Ca Sáng" },
                            { value: "2", label: "Ca Chiều" },
                            { value: "3", label: "Ca Tối" },
                        ]}
                    />
                </Col>
                <Col xl={6} md={6} xs={24}>
                    <Search
                        placeholder="Tìm theo Tên hoặc số điện thoại"
                        enterButton="Tìm kiếm"
                    />
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
            <ModalAddShiftEdit
                isModalOpen={isModalOpen2}
                handleOk={handleOk2}
                handleCancel={handleCancel2}
            />
            <Col>
                <h2 className="mb-5">Lịch Làm Việc</h2>
                <ScheduleXCalendar calendarApp={calendar} />
            </Col>
        </div>
    );
};

export default ShiftManagement;
