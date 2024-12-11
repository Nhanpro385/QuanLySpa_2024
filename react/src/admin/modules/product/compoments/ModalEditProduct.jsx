// src/admin/components/ModalEditProduct.jsx
import React, { useEffect, useState, useRef } from "react";
import {
    Modal,
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Upload,
    InputNumber,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import usecategoriesActions from "@admin/modules/product/hooks/useCategoriesProduct";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import JoditEditor from "jodit-react";
const ModalEditProduct = ({
    //desktop.postman.com/?desktopVersion=11.21.0&userId=33123400&teamId=6563168&region=us
    https: visible,
    onCancel,
    productData,
    isModalOpen,
    handleOk,
    handleCancel,
    handleSubmitEdit,
    ErrorEdit,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        setError,
        getValues,
        clearErrors,
    } = useForm({
        shouldFocusError: false, // Không tự động focus trường lỗi
    });
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const { getcategories, searchcategories } = usecategoriesActions();
    const categories = useSelector((state) => state.categories);
    const [CategoryData, setCategoryData] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 50,
    });
    useEffect(() => {
        if (
            !categories?.loading &&
            categories?.categories &&
            categories?.categories?.data?.length > 0
        ) {
            setCategoryData(
                categories?.categories?.data?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                }))
            );
        }
    }, [categories]);
    useEffect(() => {
        if (ErrorEdit) {
            if (Object.keys(ErrorEdit).length > 0) {
                Object.keys(ErrorEdit).forEach((key) => {
                    setError(key, {
                        type: "manual",
                        message: ErrorEdit[key],
                    });
                });
            } else {
                clearErrors();
            }
        }
    }, [ErrorEdit]);
    const onSearch = debounce((value) => {
        setSearchQuery({ ...searchQuery, search: value });
    }, 500);
    useEffect(() => {
        if (searchQuery.search !== "") {
            searchcategories(searchQuery);
        } else {
            getcategories(50);
        }
    }, [searchQuery]);
    useEffect(() => {
        getcategories(50);
        console.log(productData);

        if (productData) {
            Object.keys(productData).forEach((key) => {
                if (key == "date") {
                    setValue(key, dayjs(productData[key]));
                } else if (key == "category_id") {
                    setValue(key, productData[key]?.id);
                } else if (key == "description") {
                    setContent(productData[key]);
                } else {
                    setValue(key, productData[key]);
                }
            });
        }
    }, [productData, setValue]);

    const onSubmit = async (data) => {
        console.log(data.category_id);

        if (fileList.length == 0) {
            const payload = {
                id: productData.id,
                name: data.name,
                price: data.price,
                cost: data.cost,
                capacity: data.capacity,
                bar_code: data.bar_code,
                date: dayjs(data.date).format("YYYY-MM-DD"),

                description: data.description,
                category_id: data.category_id || null,
                priority: 1,
            };
            handleSubmitEdit(payload.id, payload).then((result) => {
                if (result) {
                    setFileList([]);
                    reset();
                    handleCancel();
                }
            });
        } else {
            const payload = {
                id: productData.id,
                name: data.name,
                price: data.price,
                cost: data.cost,
                capacity: data.capacity,
                bar_code: data.bar_code,
                date: dayjs(data.date).format("YYYY-MM-DD"),
                image_url: fileList[0].originFileObj,
                description: data.description,
                category_id: data.category_id || null,
                priority: 1,
            };

            handleSubmitEdit(payload.id, payload).then((result) => {
                if (result) {
                    setFileList([]);
                    reset();
                    handleCancel();
                }
            });
        }
    };

    return (
        <Modal
            title="Chỉnh sửa sản phẩm"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Cập nhật
                </Button>,
            ]}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[16, 16]}>
                    {/* Tên sản phẩm */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Vui lòng nhập Tên sản phẩm!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Tên sản phẩm"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <Input
                                        className="w-100"
                                        {...field}
                                        placeholder="Tên sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Mã sản phẩm */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Mã sản phẩm">
                                    <Input
                                        {...field}
                                        placeholder="Mã sản phẩm"
                                        disabled // Không cho chỉnh sửa
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Danh mục */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="category_id"
                            control={control}
                            rules={{ required: "Vui lòng chọn Danh mục!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Danh mục"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <Select
                                        {...field}
                                        placeholder="Chọn danh mục"
                                        options={CategoryData} // Dữ liệu danh mục đã chuẩn hóa
                                        value={field.value} // Giá trị đã chọn
                                        onChange={(value) =>
                                            field.onChange(value)
                                        } // Cập nhật giá trị khi chọn
                                        filterOption={false}
                                        showSearch
                                        onSearch={onSearch}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Mã vạch */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="bar_code"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Mã vạch">
                                    <Input
                                        {...field}
                                        placeholder="Mã vạch sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Dung lượng */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="capacity"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Dung lượng">
                                    <InputNumber
                                        className="w-100"
                                        {...field}
                                        placeholder="Dung lượng sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Giá vốn */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="cost"
                            control={control}
                            rules={{ required: "Vui lòng nhập Giá vốn!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Chi phí"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <InputNumber
                                        className="w-100"
                                        suffix="VNĐ"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        {...field}
                                        placeholder="Giá vốn"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Giá sản phẩm */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: "Vui lòng nhập Giá sản phẩm!" }}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Giá Bán"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                >
                                    <InputNumber
                                        className="w-100"
                                        suffix="VNĐ"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        {...field}
                                        placeholder="Giá sản phẩm"
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Ngày sản xuất */}
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Item
                                    label="Ngày sản xuất"
                                    validateStatus={
                                        fieldState.error ? "error" : ""
                                    }
                                    help={
                                        fieldState.error
                                            ? fieldState.error.message
                                            : ""
                                    }
                                    rules={{
                                        required:
                                            "Vui lòng chọn ngày sản xuất!",
                                    }}
                                >
                                    <DatePicker className="w-100" {...field} />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Mô tả */}
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Mô tả">
                                    {/* <Input.TextArea
                                        {...field}
                                        placeholder="Mô tả sản phẩm"
                                    /> */}
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        tabIndex={1}
                                        onBlur={(newContent) => {
                                            setContent(newContent);
                                            field.onChange(newContent); // Update the form state
                                        }}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>

                    {/* Hình ảnh */}
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item label="Tải lên hình ảnh">
                            <Controller
                                name="image_url"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn ảnh sản phẩm!",
                                }}
                                render={({ field }) => (
                                    <Upload
                                        {...field}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={({ fileList }) => {
                                            setFileList(fileList);
                                            field.onChange(fileList);
                                        }}
                                        beforeUpload={() => false}
                                        name="image_url"
                                        maxCount={1}
                                        multiple
                                    >
                                        {fileList.length < 1 && (
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Tải ảnh lên
                                                </div>
                                            </div>
                                        )}
                                    </Upload>
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalEditProduct;
