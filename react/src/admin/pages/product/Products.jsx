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
import debounce from "lodash/debounce";
function Products() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [productData, setProductData] = useState([]);
    const product = useSelector((state) => state.products);
    const {
        getproduct,
        updateproduct,
        deleteproduct,
        getproductById,
        searchproduct,
    } = useproductActions();
    const { Option } = Select;

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        getproduct();
    }, []);

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchproduct(searchQuery);
        } else {
            getproduct();
        }
    }, [searchQuery]);
    useEffect(() => {
        if (!product.loading && product.products) {
            setProductData(
                product.products.data.map((item) => ({
                    key: item.id,
                    name: item.name,
                    image_url: item.image_url,
                    price: item.price,
                    quantity: item.quantity || "Dữ liệu không có",
                    capacity: item.capacity || "Dữ liệu không có",
                    date: item.date,
                    status:
                        item.status === 1 ? (
                            <Tag color="green">Đang Hoạt Động</Tag>
                        ) : (
                            <Tag color="red">Ngừng Hoạt Động</Tag>
                        ),
                }))
            );
        }
    }, [product]);
    const [dataEdit, setDataEdit] = useState({});
    const navigation = useNavigate();

    const pagination = product.products.meta || {};
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

    const handleInputChange = (e) => {
        setSearchQuery({ ...searchQuery, search: e });
    };
    const handlechangepage = (page, pagination) => {
        setSearchQuery({ ...searchQuery, page, per_page: pagination });
    };
    const handleSubmitEdit = async (id, data) => {
        try {
            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);
            }

            const result = await updateproduct({
                id,
                data: formData,
            });

            if (result.meta.requestStatus === "fulfilled") {
                message.success("Cập nhật sản phẩm thành công");
                getproduct();
                handleCancel();
                return true;
            } else {
                message.error("Cập nhật sản phẩm thất bại");
                return false;
            }
        } catch (error) {
            message.error("Cập nhật sản phẩm thất bại");
        }
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
                        onSearch={handleInputChange}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="w-100"
                    />
                </Col>
            </Row>

            <TableProduct
                dataSource={productData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                pagination={pagination}
                handlePageChange={handlechangepage}
                loading={product.loading}
            />
            <ModalEditProduct
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                productData={dataEdit}
                handleSubmitEdit={handleSubmitEdit}
            />
        </div>
    );
}

export default Products;
