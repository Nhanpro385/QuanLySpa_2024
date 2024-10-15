import React, { useEffect } from "react";
import {
    Card,
    Col,
    Row,
    Input,
    Button,
    Table,
    Form,
    message,
    Space,
    InputNumber,
    Alert,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { Snowflake } from "@theinternetfolks/snowflake";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../../modules/appointments/hooks/openmodal";
import PositionsModalEdit from "../../../modules/staffManagement/compoments/PositionsModalEdit";
import {
    PositionsGet,
    PositionsAdd,
    PositionsDelete,
    PositionsGetById,
    PositionsUpdate,
} from "../../../redux/slices/PositionsSlice";
import { useDispatch, useSelector } from "react-redux";

const Positions = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const dispatch = useDispatch();
    const { Positions, loading, error, Position } = useSelector(
        (state) => state.Positions
    );

    useEffect(() => {
        dispatch(PositionsGet());
    }, [dispatch]);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            wage: 0,
            note: "",
        },
    });

    const dataSource = (Positions && Positions.data) || [];
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "wage",
            key: "wage",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => editCate(record.id)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={() => deleteCate(record.id)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const onSubmit = async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            status: 1,
            wage: data.wage,
            note: data.note,
        };

        try {
            const resultAction = await dispatch(PositionsAdd(payload));

            if (PositionsAdd.fulfilled.match(resultAction)) {
                messageApi.success("Thêm vị trí thành công!");
                reset();
            } else {
                if (resultAction.payload?.errors) {
                    Object.keys(resultAction.payload.errors).forEach((key) => {
                        setError(key, {
                            type: "server",
                            message: resultAction.payload.errors[key][0],
                        });
                        messageApi.error(resultAction.payload.errors[key][0]);
                    });
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi thêm mới vị trí.");
        }
    };

    const editCate = async (id) => {
        try {
            const resultAction = await dispatch(PositionsGetById(id));

            if (PositionsGetById.fulfilled.match(resultAction)) {
                setValue("name", resultAction.payload.name);
                setValue("wage", resultAction.payload.wage);
                setValue("note", resultAction.payload.note);
                showModal();
            } else {
                messageApi.error("Không thể lấy thông tin vị trí.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi lấy thông tin.");
        }
    };

    const deleteCate = async (id) => {
        try {
            const resultAction = await dispatch(PositionsDelete(id));
            if (PositionsDelete.fulfilled.match(resultAction)) {
                messageApi.success("Xoá vị trí thành công!");
                dispatch(PositionsGet()); // Cập nhật danh sách sau khi xóa
            } else {
                messageApi.error("Có lỗi xảy ra khi xoá vị trí.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi xoá vị trí.");
        }
    };

    const handleEditSubmit = async (data) => {
        try {
            const resultAction = await dispatch(PositionsUpdate(data));

            if (PositionsUpdate.fulfilled.match(resultAction)) {
                messageApi.success("Cập nhật vị trí thành công!");
                handleCancel();
                dispatch(PositionsGet()); // Cập nhật danh sách sau khi cập nhật
            } else {
                messageApi.error("Có lỗi xảy ra khi cập nhật.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageApi.error("Có lỗi xảy ra khi cập nhật vị trí.");
        }
    };

    return (
        <>
            {contextHolder} {/* Đặt contextHolder vào đây */}
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Danh mục Chức vụ">
                        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên danh mục"
                                        validateStatus={errors.name ? "error" : ""}
                                    >
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Tên danh mục là bắt buộc",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Tên phải có ít nhất 8 ký tự.",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                        {errors.name && (
                                            <p style={{ color: "red" }}>
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Lương cơ bản theo giờ"
                                        validateStatus={errors.wage ? "error" : ""}
                                    >
                                        <Controller
                                            name="wage"
                                            control={control}
                                            defaultValue={0}
                                            rules={{
                                                required: "Lương là bắt buộc",
                                                min: {
                                                    value: 1000,
                                                    message:
                                                        "Lương phải lớn hơn 1000",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <InputNumber
                                                    className="w-100"
                                                    suffix="VNĐ"
                                                    min={1000}
                                                    formatter={(value) =>
                                                        `${value}`.replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )
                                                    }
                                                    parser={(value) =>
                                                        value?.replace(
                                                            /\$\s?|(,*)/g,
                                                            ""
                                                        )
                                                    }
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.wage && (
                                            <p style={{ color: "red" }}>
                                                {errors.wage.message}
                                            </p>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Ghi chú"
                                        validateStatus={errors.note ? "error" : ""}
                                    >
                                        <Controller
                                            name="note"
                                            control={control}
                                            render={({ field }) => (
                                                <Input.TextArea
                                                    rows={4}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.note && (
                                            <p style={{ color: "red" }}>
                                                {errors.note.message}
                                            </p>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Thêm Mới
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Danh sách danh mục sản phẩm">
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            rowKey="id"
                            loading={loading}
                        />
                    </Card>
                    <PositionsModalEdit
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        Position={Position}
                        handleEditSubmit={handleEditSubmit}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Positions;
