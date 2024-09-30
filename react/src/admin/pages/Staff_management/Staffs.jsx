import React from "react";
import { Table, Button, Col, Row, Select, Input } from "antd";
const { Search } = Input;
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
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
        label: <Button block> Sửa </Button>,
    },
    {
        key: "2",
        label: <Button block> Chi tiết </Button>,
    },
    {
        key: "3",
        label: <Button block> Lịch sử làm việc </Button>,
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
function Staffs() {
    const navigate = useNavigate();
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate(`/admin/staffs/${record.key}`);
                break;
            case "3":
                navigate(`/admin/staffs/${record.key}`);

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
            fullname: "Trịnh Trần Phương Tuấn",
            age: 55,
            phone: "0982731275",
            address: "10 Downing Street",
            role: "Quản lý",
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
            title: "Tuổi",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
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

    const handleEdit = (key) => {
        console.log("Edit", key);
    };

    const handleDelete = (key) => {
        console.log("Delete", key);
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <Row>
                    <Col>
                        <h2>Danh Sách Nhân Viên</h2>
                    </Col>
                    <Col></Col>
                </Row>
                <Button type="primary" onClick={handleAdd}>
                    Thêm
                </Button>
            </div>
            <Row className="mb-3" gutter={[16, 16]}>
                <Col span={3}>
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
                <Col span={3}>
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
                <Col span={6}>
                    <Search
                        placeholder="Tìm theo Tên hoặc số điện thoại"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        onSearch={onSearch}
                    />
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
            <Col>
                <ScheduleXCalendar calendarApp={calendar} />
            </Col>
        </div>
    );
}

export default Staffs;
