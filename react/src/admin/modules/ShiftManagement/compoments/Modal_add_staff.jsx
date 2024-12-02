import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    Button,
    notification,
    Select,
    Table,
    Card,
} from "antd";

import useUsersActions from "../../staffManagement/hooks/useUserAction";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const { TextArea } = Input;
import debounce from "lodash/debounce";
import { get } from "lodash";
function ModalAddstaff({
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddShift,
    shift,
    error,
    control,
    handleSubmit,
    setValue,
    reset,
    errors,
    Controller,
}) {
    const { getstaffshift, searchusers } = useUsersActions();
    const [userData, setUserData] = useState([]);
    const user = useSelector((state) => state.user);
    const [api, contextHolder] = notification.useNotification();
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        limit: 100,
    });

    useEffect(() => {
        if (error?.errors) {
            Object.keys(error.errors).forEach((key) => {
                if (["staff_ids"].includes(key)) {
                    setValue(key, error.errors[key][0]);
                } else {
                    api.error({
                        message: error.errors[key][0],
                    });
                }
            });
        }
    }, [error]);
    useEffect(() => {
        if (shift) {
            console.log(shift);
        }
    }, [shift]);

    useEffect(() => {
        getstaffshift(100);
    }, [isModalOpen]);
    useEffect(() => {
        if (user?.users?.data && !user.loading) {
            setUserData(
                user?.users?.data.map((item) => ({ ...item, key: item.id }))
            );
        }
    }, [user]);

    const onSubmit = (data) => {
        handleAddShift({
            staff_ids: data.user_id,
            shift_id: shift.id,
        });
    };
    const handleSearch = debounce((value) => {
        setSearchQuery({
            ...searchQuery,
            search: value,
        });
    }, 300);
    useEffect(() => {
        if (searchQuery.search !== "") {
            searchusers(searchQuery);
        } else {
            getstaffshift(100);
        }
    }, [searchQuery]);
    return (
        <Modal
            title="Thêm nhân viên vào ca làm việc"
            width={800}
            open={isModalOpen}
            onOk={handleSubmit(onSubmit)} // Ensure onOk triggers handleSubmit
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Lưu
                </Button>,
            ]}
        >
            {contextHolder}
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Chọn nhân viên"
                            validateStatus={errors.user_id ? "error" : ""}
                            help={errors.user_id?.message}
                        >
                            <Controller
                                name="user_id"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ngày!",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        style={{ width: "100%" }}
                                        placeholder="Chọn nhân viên"
                                        options={userData.map((item) => ({
                                            label: item.full_name,
                                            value: item.id,
                                        }))}
                                        mode="multiple"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.label
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                        onSearch={handleSearch}
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Card title="Danh sách nhân viên đã trong ca">
                            <Table
                                dataSource={shift?.staffs}
                                columns={[
                                    {
                                        title: "STT",
                                        dataIndex: "index",
                                        key: "index",
                                        render: (text, record, index) =>
                                            index + 1,
                                    },
                                    {
                                        title: "Tên nhân viên",
                                        dataIndex: "name",
                                        key: "name",
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalAddstaff;
