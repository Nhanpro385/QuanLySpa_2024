import React from "react";
import {
    Table,
    Button,
    Tag,
    Dropdown,
    Space,
    Modal,
    Card,
    Col,
    Row,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Import từ @schedule-x
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

// Khai báo các items cho Dropdown
const items = [
    {
        key: "1",
        label: <Button block> Sửa </Button>,
    },
    {
        key: "2",
        label: <Button block> Chi tiết </Button>,
    },
    {
        key: "4",
        label: (
            <Button block danger>
                Xóa
            </Button>
        ),
    },
];
//khai báo hook
import useModal from "../../modules/appointments/hooks/openmodal";
import ModalAppointment from "../../modules/appointments/compoments/appoitnmentsAddmodal";
function Appointments() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const navigate = useNavigate();
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate("/admin/appointments/detail/" + record.key);
                break;
            case "3":
                break;
            case "4":
                break;
            default:
                break;
        }
    };
    const dataSource = [
        {
            key: "1",
            id: "1",
            service_id: "Trị mụn",
            title: "Tuấn trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            date: "12/09/2024",
            status: <Tag color="green">Đã chấp nhận</Tag>,
        },
        {
            key: "2",
            id: "2",
            title: "Tuấn trị mụn",

            service_id: "Trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            status: <Tag color="red">Từ chối</Tag>,
            date: "14/09/2024",
        },
        {
            id: "3",
            key: "3",
            title: "Tuấn trị mụn",
            service_id: "Trị mụn",
            customer_id: "Trịnh Trần Phương Tuấn",
            employee_id: "Nguyễn Văn A",
            start: "2024-09-19 00:00",
            end: "2024-09-19 02:00",
            status: <Tag color="warning">Đang đợi</Tag>,
            date: "13/09/2024",
        },
    ];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Dich Vụ",
            dataIndex: "service_id",
            key: "service_id",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customer_id",
            key: "customer_id",
        },
        {
            title: "Tên Nhân Viên",
            dataIndex: "employee_id",
            key: "employee_id",
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: "start",
            key: "start",
        },
        {
            title: "Ngày hẹn",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },

        {
            title: "Chi tiết",
            key: "action",
            render: (text, record) => (
                <span>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (e) => onClick({ key: e.key, record }),
                        }}
                        trigger={["click"]}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                Hành động
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </span>
            ),
        },
    ];

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

    // Function to match appointments with the calendar date

    return (
        <>
        <h1 className="text-center">Quản lý lịch hẹn</h1>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Row className="m-2" justify={"space-between"}>
                            <h2>Danh Sách Đặt Lịch</h2>
                            <Button type="primary" onClick={showModal}>
                                <PlusOutlined /> Thêm lịch hẹn
                            </Button>
                            <ModalAppointment
                                isModalOpen={isModalOpen}
                                handleOk={handleOk}
                                handleCancel={handleCancel}
                            ></ModalAppointment>
                        </Row>

                        <Table
                            style={{ overflowX: "auto" }}
                            dataSource={dataSource}
                            columns={columns}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <ScheduleXCalendar calendarApp={calendar} />
                </Col>
            </Row>
        </>
    );
}

export default Appointments;
