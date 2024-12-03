import React, { useEffect } from "react";
import { Col, Form, Input, Modal, Row, notification } from "antd";
import { useForm, Controller } from "react-hook-form";

const ChangepassModal = ({
    isModalOpen,
    handleOk,
    handleCancel,
    handleChangePass,
    errorsAuth,
}) => {
    const [api, contextHolder] = notification.useNotification();
    const {
        control,
        handleSubmit,
        setError,
        reset,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm();

    const newPassword = watch("password");

    // useEffect(() => {
    //     if (errorsAuth) {
    //         if (Object.keys(errorsAuth.error).length > 0) {
    //             Object.keys(errorsAuth.error).map((key) => {
    //                 setError(key, {
    //                     type: "manual",
    //                     message: errorsAuth.error[key][0],
    //                 });
    //             });
    //         } else {
    //             api[errorsAuth.status]({
    //                 message: errorsAuth.message,
    //             });
    //             clearErrors();
    //         }
    //     }
    // }, [errorsAuth]);
    const onSubmit = (data) => {
        if (data.password !== data.password_confirmation) {
            setError("password_confirmation", {
                type: "manual",
                message: "Mật khẩu không khớp",
            });
            return;
        }
        handleChangePass(data);
    };

    return (
        <Modal
            title="Thay Đổi Mật Khẩu"
            open={isModalOpen}
            onOk={handleSubmit(onSubmit)}
            onCancel={handleCancel}
        >
            {contextHolder}
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Mật khẩu cũ"
                            validateStatus={errors.current_password && "error"}
                            help={errors.current_password?.message}
                        >
                            <Controller
                                name="current_password"
                                control={control}
                                rules={{
                                    required: "Mật khẩu cũ không được bỏ trống",
                                }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Mật khẩu cũ"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mật khẩu mới"
                            validateStatus={errors.password && "error"}
                            help={errors.password?.message}
                        >
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required:
                                        "Mật khẩu mới không được bỏ trống",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Mật khẩu mới phải có ít nhất 6 ký tự",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Mật khẩu mới"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Nhập lại mật khẩu mới"
                            validateStatus={
                                errors.password_confirmation && "error"
                            }
                            help={errors.password_confirmation?.message}
                        >
                            <Controller
                                name="password_confirmation"
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập lại mật khẩu",
                                    validate: (value) =>
                                        value === newPassword ||
                                        "Mật khẩu không khớp",
                                }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Nhập lại mật khẩu mới"
                                    />
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ChangepassModal;
