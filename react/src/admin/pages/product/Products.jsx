import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Image,
    message,
    Row,
    Col,
    Input,
    Select,
    DatePicker,
    Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useproductActions from "@admin/modules/product/hooks/useProduct";

import { useSelector } from "react-redux";
import TableProduct from "./tableProduct";
import useModal from "@admin/modules/appointments/hooks/openmodal";
import ModalEditProduct from "../../modules/product/compoments/ModalEditProduct";

function Products() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const { product, loading } = useSelector((state) => state.products);
    const {
        getproduct,
        updateproduct,
        deleteproduct,
        getproductById,
        searchproduct,
    } = useproductActions();
    const { Option } = Select;

    const [searchQuery, setSearchQuery] = useState({
        id: "",
        name: "",
        date: "",
        category: "",
        page: "",
    });
    const [inputValue, setInputValue] = useState("");
    const [typesearch, setType] = useState({
        type: "name",
    });
    console.log(product);

    useEffect(() => {
        getproduct();
    }, []);
    useEffect(() => {
        searchproduct(searchQuery);
    }, [searchQuery]);

    // New useEffect to update inputValue when typesearch.type changes
    useEffect(() => {
        setInputValue(searchQuery[typesearch.type] || "");
    }, [typesearch, searchQuery]);

    const [dataEdit, setDataEdit] = useState({});
    const navigation = useNavigate();
    // const dataSource =
    //     product.data.map((item) => ({
    //         key: item.id,
    //         name: item.name,
    //         image_url: (
    //             <Image src="http://127.0.0.1:8000/storage/app/uploads/1729000364_123.png" />
    //         ),
    //         price: item.price,
    //         quantity: item.quantity,
    //         capacity: item.capacity,
    //         date: item.date,
    //         status: item.status,
    //     })) || [];
    const dataSource = (product.data || []).map((item) => ({
        key: item.id,
        name: item.name,
        image_url: (
            <Image src="http://127.0.0.1:8000/storage/app/uploads/1729000364_123.png" />
        ),
        price: item.price,
        quantity: item.quantity,
        capacity: item.capacity,
        date: item.date,
        status: item.status,
    }));

    const pagination = product.meta || [];
    const handleAdd = () => {
        navigation("/admin/products/add");
    };

    const handleEdit = async (record) => {
        try {
            const result = await getproductById(record);

            if (result.meta.requestStatus === "fulfilled") {
                setDataEdit(result.payload.data);
                showModal();
            } else {
                message.error("Không tìm thấy sản phẩm");
            }
        } catch (error) {
            message.error("Không tìm thấy sản phẩm");
        }
    };

    const handleDelete = async (record) => {
        const result = await deleteproduct(record);
        if (result.meta.requestStatus === "fulfilled") {
            message.success("Xóa sản phẩm thành công");
            getproduct();
        } else {
            message.error("Xóa sản phẩm thất bại");
        }
    };

    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, [typesearch.type]: value }));
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        setSearchQuery((prev) => ({ ...prev, [typesearch.type]: value }));
    };
    const handlechangepage = (page) => {
        setSearchQuery((prev) => ({ ...prev, page: page }));
        console.log(page);
    };
    return (
        <div>
            <h1 className="text-center">Quản Lý Sản Phẩm</h1>
            <Row gutter={[16, 16]} className="mb-2">
                <Col xl={18} md={12} xs={24}>
                    <h2>Danh Sách Sản Phẩm</h2>
                </Col>
                <Col xl={6} md={12} xs={24}>
                    <Button type="primary" onClick={handleAdd} block>
                        <PlusOutlined />
                        Thêm sản phẩm mới
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xxl={8} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Input.Search
                        placeholder="Tìm kiếm sản phẩm"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        value={inputValue}
                        onSearch={onSearch}
                        onChange={handleInputChange}
                        className="w-100"
                        addonBefore={
                            <Select
                                defaultValue="name"
                                style={{ width: 120 }}
                                onChange={(value) => {
                                    setType({ type: value });
                                }}
                            >
                                <Option value="id">ID</Option>
                                <Option value="name">Tên</Option>
                                <Option value="category">Danh mục</Option>
                            </Select>
                        }
                    />
                </Col>
                <Col xxl={4} xl={6} lg={6} md={6} sm={24} xs={24}>
                    <DatePicker
                        placeholder="Ngày"
                        onChange={(date, dateString) =>
                            setSearchQuery((prev) => ({
                                ...prev,
                                date: dateString,
                            }))
                        }
                        className="w-100"
                    />
                </Col>
            </Row>
            <Row gutter={[8, 8]} className="mb-2 mt-2">
                {Object.keys(searchQuery).map((key) => {
                    if (searchQuery[key] !== "" && key !== "page") {
                        return (
                            <Col key={key} style={{ marginBottom: "8px" }}>
                                <Tag color="blue">
                                    <Row
                                        gutter={8}
                                        align="middle"
                                        justify="space-between"
                                    >
                                        <Col>
                                            <span style={{ fontWeight: 500 }}>
                                                {key}: {searchQuery[key]}
                                            </span>
                                        </Col>
                                        <Col>
                                            <span
                                                style={{
                                                    cursor: "pointer",
                                                    fontWeight: "bold",
                                                    color: "#f5222d",
                                                }}
                                                onClick={() => {
                                                    // Function to clear this specific searchQuery item
                                                    setSearchQuery((prev) => ({
                                                        ...prev,
                                                        [key]: "",
                                                    }));
                                                }}
                                            >
                                                x
                                            </span>
                                        </Col>
                                    </Row>
                                </Tag>
                            </Col>
                        );
                    }
                })}
            </Row>
            <TableProduct
                dataSource={dataSource}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                pagination={pagination}
                handlePageChange={handlechangepage}
                loading={loading}
            />
            <ModalEditProduct
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                productData={dataEdit}
            />
        </div>
    );
}

export default Products;
