import React, { useEffect } from "react";
import {
    Button,
    Col,
    Row,
    Select,
    Input,
    notification,
    DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import ShiftTable from "../../modules/ShiftManagement/compoments/ShiftTable";
import ShiftActions from "../../modules/ShiftManagement/compoments/ShiftActions";

import ShiftCalendar from "../../modules/ShiftManagement/compoments/ShiftCalendar";

import useModal from "../../modules/appointments/hooks/openmodal";
import ModalAddShift from "../../modules/ShiftManagement/compoments/Modal_add";
import ModalAddShiftEdit from "../../modules/ShiftManagement/compoments/ModalEditShif";

import { useSelector } from "react-redux";
import useShiftAction from "../../modules/ShiftManagement/hooks/useShiftAction";

import debounce from "lodash/debounce";
import ModalAddstaff from "../../modules/ShiftManagement/compoments/Modal_add_staff";
const ShiftManagement = () => {
    const [api, contextHolder] = notification.useNotification();
    const [shiftselected, setShiftSelected] = React.useState(null);
    const { shifts, shift, loading, error } = useSelector(
        (state) => state.shifts
    );
    const [errorEdit, setErrorEdit] = React.useState(null);
    const {
        getshifts,
        getshiftsById,
        shiftupdate,
        shiftadd,
        searchshifts,
        shiftdelete,
        addShiftStaffAction,
    } = useShiftAction();
    useEffect(() => {
        getshifts();
    }, []);

    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
        showModal: showModal2,
    } = useModal();
    const {
        isModalOpen: isModalOpen3,
        handleOk: handleOk3,
        handleCancel: handleCancel3,
        showModal: showModal3,
    } = useModal();

    const [searchquery, setSearchQuery] = React.useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    const handleSearch = debounce((value) => {
        if (value === "Invalid Date") {
            const date = dayjs(new Date()).format("YYYY-MM-DD");
            value = date;
        }

        setSearchQuery((prev) => ({ ...prev, search: value }));
    }, 300);
    const pagnation = shifts.meta || {};
    const handleDelete = async (id) => {
        try {
            const res = await shiftdelete(id);
            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Xóa ca làm việc thành công",
                });
                getshifts();
            } else if (res.meta.requestStatus === "rejected") {
                api.error({
                    message: "Xóa ca làm việc thất bại",
                    description: res.payload.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (
            searchquery.search ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 5
        ) {
            searchshifts(searchquery);
        } else {
            getshifts();
        }
    }, [searchquery]);

    const handlechangePage = (page, pagination) => {
        setSearchQuery((prev) => ({
            ...prev,
            page: page,
            per_page: pagination,
        }));
    };

    const handleAddShift = async (value) => {
        try {
            const res = await shiftadd(value);
            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm ca làm việc thành công",
                });
                handleCancel();
            } else if (res.meta.requestStatus === "rejected") {
                api.error({
                    message: "Thêm ca làm việc thất bại",
                    description: res.payload.message,
                });

                setErrorEdit((prev) => res.payload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await getshiftsById(id);
            if (res.meta.requestStatus === "fulfilled") {
                showModal2();
            }
        } catch (error) {}
    };
    const handleEditSubmit = async (values) => {
        try {
            const res = await shiftupdate(values);

            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Cập nhật ca làm việc thành công",
                });
                handleCancel2();
            } else if (res.meta.requestStatus === "rejected") {
                api.error({
                    message: "Cập nhật ca làm việc thất bại",
                    description: res.payload.message,
                });

                setErrorEdit((prev) => res.payload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dataSource =
        shifts.data.map((shift) => ({
            key: shift.id,
            shift_date: shift.shift_date,
            start_time: shift.start_time,
            end_time: shift.end_time,
            max_customers: shift.max_customers,
        })) || [];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Ca",
            dataIndex: "start_time",
            key: "name_shift",
            render: (text) => (
                <span>
                    {text === "08:00:00"
                        ? "Ca Sáng"
                        : text === "14:00:00"
                        ? "Ca Chiều"
                        : "Ca Tối"}
                </span>
            ),
        },
        {
            title: "ngày tháng",
            dataIndex: "shift_date",
            key: "shift_date",
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: "Thời gian kết thúc",
            dataIndex: "end_time",
            key: "end_time",
        },
        {
            title: "tối đa",
            dataIndex: "max_customers",
            key: "max_customers",
            render: (text) => <span>{text} Người</span>,
        },
        {
            title: "Hành Động",
            key: "action",
            render: (text, record) => (
                <ShiftActions record={record} onClick={handleActionClick} />
            ),
        },
    ];
    const handleaddstaff = (record) => {
        if (record) {
            setShiftSelected(record);
            showModal3();
        }
    };
    const onaddstaff = async (value) => {
        try {
            console.log(value);

            const res = await addShiftStaffAction(value);
            if (res.meta.requestStatus === "fulfilled") {
                api.success({
                    message: "Thêm nhân viên vào ca làm việc thành công",
                });
                handleCancel3();
            } else {
                api.error({
                    message: "Thêm nhân viên vào ca làm việc thất bại",
                    description: res.payload.errors.shift_id[0],
                });
            }
        } catch (error) {}
    };
    const handleActionClick = (key, record) => {
        switch (key.key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate(`/admin/staffs/${record.key}`);
                break;
            case "3":
                handleaddstaff(record);
                break;
            case "4":
                handleDelete(record.key);
                break;
            default:
                break;
        }
    };
    const handleAddstaff = async (value) => {};

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
                        <PlusOutlined /> Thêm Ca Mới
                    </Button>
                    <ModalAddShift
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        loading={loading}
                        handleAddShift={handleAddShift}
                        error={error}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xl={2} md={2} xs={24}>
                    <h3 className="text-center">Tìm kiếm</h3>
                </Col>
                <Col xl={6} md={6} xs={24}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                        onChange={(date) =>
                            handleSearch(dayjs(date).format("YYYY-MM-DD"))
                        }
                    />
                </Col>
            </Row>
            <ShiftTable
                dataSource={dataSource}
                columns={columns}
                onClick={handleActionClick}
                pagination={pagnation}
                onChangePage={handlechangePage}
                loading={loading}
            />
            <ModalAddShiftEdit
                isModalOpen={isModalOpen2}
                handleOk={handleOk2}
                handleCancel={handleCancel2}
                loading={loading}
                data={shift.data}
                handleEditSubmit={handleEditSubmit}
                error={errorEdit}
            />
            <ModalAddstaff
                isModalOpen={isModalOpen3}
                handleOk={handleOk3}
                handleCancel={handleCancel3}
                loading={loading}
                shift={shiftselected}
                handleAddShift={onaddstaff}
                error={error}
            />
            <ShiftCalendar />
            {contextHolder}
        </div>
    );
};

export default ShiftManagement;
