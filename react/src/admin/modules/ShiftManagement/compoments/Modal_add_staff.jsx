import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    TimePicker,
    Switch,
    Button,
    Space,
    Select,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import useUsersActions from "../../staffManagement/hooks/useUserAction";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const { TextArea } = Input;

function ModalAddstaff({
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddShift,
    shift,
    error,
}) {
    const { getstaffshift } = useUsersActions();
    const [userData, setUserData] = useState([]);
    const user = useSelector((state) => state.user);
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm();
    useEffect(() => {
        console.log(error);
    }, [error]);
    useEffect(() => {
        if (shift) {
            console.log(shift);
        }
    }, [shift]);

    useEffect(() => {
        getstaffshift(50);
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
            staff_id: data.user_id,
            shift_id: shift.key,
        });
    };

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
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
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
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default ModalAddstaff;
