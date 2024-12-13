import React, { useEffect } from "react";
import {
    Button,
    Col,
    Row,
    notification,
    DatePicker,
    Card,
    Space,
    Popconfirm,
    Dropdown,
    Tag,
} from "antd";
import {
    Loading3QuartersOutlined,
    DownOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import ShiftTable from "../../modules/ShiftManagement/compoments/ShiftTable";

import ShiftCalendar from "../../modules/ShiftManagement/compoments/ShiftCalendar";

import useModal from "../../modules/appointments/hooks/openmodal";
import ModalAddShift from "../../modules/ShiftManagement/compoments/Modal_add";
import ModalAddShiftEdit from "../../modules/ShiftManagement/compoments/ModalEditShif";

import { useSelector } from "react-redux";
import useShiftAction from "../../modules/ShiftManagement/hooks/useShiftAction";

import debounce from "lodash/debounce";
import ModalAddstaff from "../../modules/ShiftManagement/compoments/Modal_add_staff";
import Modal_shitf_detail from "../../modules/ShiftManagement/compoments/Modal_shitf_detail";
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
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
    } = useForm();
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
    const {
        isModalOpen: isModalOpen4,
        handleOk: handleOk4,
        handleCancel: handleCancel4,
        showModal: showModal4,
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
                if (res.payload.errors) {
                    Object.keys(res.payload.errors).map((key) => {
                        api.error({
                            message: "Thêm ca làm việc thất bại",
                            description: res.payload.errors[key][0],
                        });
                    });
                    return;
                }
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
        console.log(values);
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

    const handleDetail = async (record) => {
        try {
            const res = await getshiftsById(record.key);

            if (res.meta.requestStatus === "fulfilled") {
                setShiftSelected(() => res.payload.data);
                showModal4();
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
            status: shift.status,
        })) || [];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },

        {
            title: "Ngày tháng",
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
            title: "Tối đa Khách",
            dataIndex: "max_customers",
            key: "max_customers",
            render: (text) => <span>{text} Người</span>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (text) =>
                text == 1 ? (
                    <Tag color="green">Đang hoạt động</Tag>
                ) : (
                    <Tag color="red">Đã kết thúc</Tag>
                ),
        },
        {
            title: "Hành Động",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleEdit(record.key)}
                                    >
                                        Sửa Ca Làm
                                    </Button>
                                ),
                            },
                            {
                                key: "2",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleDetail(record)}
                                    >
                                        Chi tiết Ca
                                    </Button>
                                ),
                            },
                            {
                                key: "3",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handleaddstaff(record)}
                                    >
                                        Thêm nhân viên{" "}
                                    </Button>
                                ),
                            },
                            {
                                key: "4",
                                label: (
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa ca làm việc này không?"
                                        onConfirm={() =>
                                            handleDelete(record.key)
                                        }
                                        okText="Có"
                                        cancelText="Không"
                                    >
                                        <Button block danger>
                                            Xóa Ca
                                        </Button>
                                    </Popconfirm>
                                ),
                            },
                        ],
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
    const handleaddstaff = async (record) => {
        try {
            if (record) {
                const res = await getshiftsById(record.key);
                if (res.meta.requestStatus === "fulfilled") {
                    setShiftSelected(res.payload.data);
                    showModal3();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onaddstaff = async (value) => {
        try {
            const res = await addShiftStaffAction(value);

            if (res.meta.requestStatus == "fulfilled") {
                api.success({
                    message: "Thêm nhân viên vào ca làm việc thành công",
                });
                handleCancel3();
                reset();
            } else {
                api.error({
                    message: "Thêm nhân viên vào ca làm việc thất bại",
                    description: res.payload.errors.shift_id[0],
                });
            }
        } catch (error) {}
    };

    return (
        <div>
            {contextHolder}
            <h1 className="text-center">Quản Lý Ca Làm Việc</h1>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 16 }}
                gutter={[16, 16]}
            >
                <Col xl={20} md={18} sm={24} xs={24}>
                    <h2>Danh Sách Ca Làm Việc</h2>
                </Col>
                <Col xl={4} md={6} sm={24} xs={24}>
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
                <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
                    <DatePicker
                        className="w-100"
                        format={"DD/MM/YYYY"}
                        onChange={(date) =>
                            handleSearch(dayjs(date).format("YYYY-MM-DD"))
                        }
                    />
                </Col>
            </Row>
            <Card
                extra={
                    <Button
                        icon={<LoadingOutlined />}
                        type="primary"
                        onClick={() => getshifts()}
                        loading={loading}
                    >
                        Làm mới
                    </Button>
                }
            >
                <ShiftTable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagnation}
                    onChangePage={handlechangePage}
                    loading={loading}
                />
            </Card>
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
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                Controller={Controller}
            />
            <Modal_shitf_detail
                isOpen={isModalOpen4}
                onClose={handleCancel4}
                selectedShif={shiftselected}
            />
            <ShiftCalendar data={shifts?.data || []} />
        </div>
    );
};

export default ShiftManagement;
