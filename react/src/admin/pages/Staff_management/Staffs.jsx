import React, { useEffect, useState } from "react";
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
import ModalEditStaff from "../../modules/staffManagement/compoments/staffmodaledit";
import useModal from "../../modules/appointments/hooks/openmodal";
import debounce from "lodash/debounce";
function Staffs() {
    const { getusers, updateusers, deleteusers, getusersById, searchusers } =
        useUsersActions();
    const { Option } = Select;
    const navigate = useNavigate();
    const [errorForm, setErrorForm] = React.useState(null);
    const [userEdit, setUserEdit] = React.useState(null);
    const [searchquery, setSearchQuery] = useState({
        page: 1,
    });
    const [searchType, setSearchType] = useState("full_name");
    const { users, user } = useSelector((state) => state.user);
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    useEffect(() => {
        getusers();
    }, []);
    console.log(users);
    
    const dataSource =
        users.data.map((user) => ({
            key: user.id,
            fullname: user.full_name,
            age: user.age,
            phone: user.phone,
            address: user.address,
            role: user.role,
        })) || [];
    const pagination = users.meta || {};
    const handleEdit = async (key) => {
        try {
            const res = await getusersById(key);
            if (res.meta.requestStatus === "fulfilled") {
                setUserEdit(res.payload.data);
                showModal();
            }
        } catch (err) {
            message.error("Lỗi");
        }
    };
    const handleEditSubmit = async (values) => {
        try {
            const res = await updateusers(values);
            if (res.meta.requestStatus === "fulfilled") {
                getusers();
                message.success("Cập nhật thành công");
                handleCancel();
            } else {
                setErrorForm((prev) => res.payload.errors);
                message.error("Cập nhật thất bại");
            }
        } catch (err) {
            message.error("Cập nhật thất bại");
        }
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
        navigate("/admin/nhanvien/them");
    };
    useEffect(() => {
        searchusers(searchquery);
    }, [searchquery]);

    const onSearch = debounce((value) => {
        if (searchType === "full_name") {
            setSearchQuery({ ...searchquery, full_name: value });
        }
        if (searchType === "phone") {
            setSearchQuery({ ...searchquery, phone: value });
        }
        if (searchType === "id") {
            setSearchQuery({ ...searchquery, id: value });
        }
    }, 500);
    const handlePageChange = (page) => {
        setSearchQuery({ ...searchquery, page: page });
    };
    console.log(searchquery);
    
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
                <Col xxl={8} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Search
                        placeholder="Tìm theo Tên hoặc số điện thoại và ID"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        addonBefore={
                            <Select
                                defaultValue="full_name"
                                onChange={(value) => setSearchType(value)}
                            >
                                <Option value="id">ID</Option>
                                <Option value="full_name">Tên</Option>
                                <Option value="phone">Số điện thoại</Option>
                            </Select>
                        }
                        onSearch={onSearch}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <StaffTable
                dataSource={dataSource}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                pagination={pagination}
                handlePageChange={handlePageChange}
            />
            <ModalEditStaff
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                staff={user.data}
                handleEditSubmit={handleEditSubmit}
                errorForm={errorForm}
            />
            <Col>
                <ScheduleXCalendar calendarApp={calendar} />
            </Col>
        </div>
    );
}

export default Staffs;
