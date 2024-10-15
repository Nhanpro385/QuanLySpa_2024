import React, { useEffect } from "react";
import {
    Card,
    Col,
    Row,
    Input,
    Button,
    Table,
    Form,
    Alert,
    message,
    Space,
} from "antd";
import { useForm, Controller } from "react-hook-form";

import { Snowflake } from "@theinternetfolks/snowflake";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../modules/appointments/hooks/openmodal";
import {
    categoriesAdd,
    categoriesUpdate,
    categoriesGet,
    categoriesDelete,
    categoriesGetById,
} from "../../redux/slices/CategoriesProductSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalEditCategory from "../../modules/product/compoments/categoriesEditModal";

// import ModalEditCategory from "../../modules/product/compoments/categoriesEditModal";
const ProductCategories = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const dispatch = useDispatch();
    const { categories, loading, error, category } = useSelector(
        (state) => state.categories
    );
    useEffect(() => {
        dispatch(categoriesGet());
    }, [dispatch]);
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    const dataSource = categories.data || [];

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: "Tên Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
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
            description: data.description,
        };

        const resultAction = await dispatch(categoriesAdd(payload));

        if (categoriesAdd.fulfilled.match(resultAction)) {
            // Reset form only if successful
            reset();
        } else {
            // Set server errors for each field
            if (resultAction.payload?.errors) {
                Object.keys(resultAction.payload.errors).forEach((key) => {
                    setError(key, {
                        type: "server",
                        message: resultAction.payload.errors[key][0],
                    });
                });
            }
        }
    };
    const editCate = (id) => {
        dispatch(categoriesGetById(id));
        showModal();
    };
    const deleteCate = (id) => {
        dispatch(categoriesDelete(id));
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card title="Danh mục sản phẩm">
                    {/* {error && (
                        <Alert
                            message={<span>{error.message}</span>}
                            type="error"
                        />
                    )} */}
                    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                        <Form.Item
                            label="Tên danh mục"
                            validateStatus={errors.name ? "error" : ""}
                        >
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Tên danh mục là bắt buộc",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "Tên danh mục phải có ít nhất 10 ký tự",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.name && (
                                <p style={{ color: "red" }}>
                                    {errors.name.message}
                                </p>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            validateStatus={errors.description ? "error" : ""}
                        >
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Mô tả là bắt buộc" }}
                                render={({ field }) => (
                                    <Input size="large" {...field} />
                                )}
                            />
                            {errors.description && (
                                <p style={{ color: "red" }}>
                                    {errors.description.message}
                                </p>
                            )}
                        </Form.Item>
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
                        // loading={loading}
                        rowKey="id" // Use the unique id for rowKey
                    />
                </Card>
                <ModalEditCategory
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    category={category}
                 
                ></ModalEditCategory>
            </Col>
        </Row>
    );
};

export default ProductCategories;
