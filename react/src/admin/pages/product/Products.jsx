import React, { useEffect, useState } from "react";
import {
    Button,
    message,
    Row,
    Col,
    notification,
    Input,
    Select,
    Tag,
    Card,
} from "antd";
import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useproductActions from "@admin/modules/product/hooks/useProduct";
import { useSelector } from "react-redux";
import TableProduct from "./tableProduct";
import useModal from "@admin/modules/appointments/hooks/openmodal";
import ModalEditProduct from "../../modules/product/compoments/ModalEditProduct";
import ModalProductDetail from "../../modules/product/compoments/ModalProductDetail";
import debounce from "lodash/debounce";
function Products() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();
    const [productData, setProductData] = useState([]);
    const [productDataDetail, setProductDataDetail] = useState({});
    const [ErrorEdit, setErrorEdit] = useState({});
    const product = useSelector((state) => state.products);
    const [api, contextHolder] = notification.useNotification();
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
                product?.products?.data?.map((item) => ({
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

            if (result.payload.status == "success") {
                setDataEdit(result.payload.data);
                showModal();
            } else {
                api.error({
                    message: "Lỗi",
                    description: result.payload.message || "Đã xảy ra lỗi",
                    duration: 3,
                });
            }
        } catch (error) {
            api.error({
                message: "Lỗi",
                description: "Đã xảy ra lỗi",
                duration: 3,
            });
        }
    };

    const handleDelete = async (record) => {
        const result = await deleteproduct(record);

        if (result.payload.status == "success") {
            api.success({
                message: "Xóa sản phẩm thành công",
                duration: 3,
            });
            getproduct();
        } else {
            api.error({
                message: "Xóa sản phẩm thất bại",
                description: result.payload.message || "Đã xảy ra lỗi",
                duration: 3,
            });
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
            console.log(result);

            if (result.payload.status === "success") {
                api.success({
                    message: "Cập nhật sản phẩm thành công",
                    duration: 3,
                });

                getproduct();
                handleCancel();
                return true;
            } else {
                api.error({
                    message: "Cập nhật sản phẩm thất bại",
                    duration: 3,
                    description: result.payload.message || "Đã xảy ra lỗi",
                });
                if (result.payload.errors) {
                    setErrorEdit((prev) => result.payload.errors);
                }
                return false;
            }
        } catch (error) {
            api.error({
                message: "Cập nhật sản phẩm thất bại",
                duration: 3,
                description: error.message || "Đã xảy ra lỗi",
            });
        }
    };
    const handleDetail = async (record) => {
        try {
            const result = await getproductById(record);

            if (result.payload.status == "success") {
                setProductDataDetail(result.payload.data);
                showModal2();
            } else {
                api.error({
                    message: "Lỗi",
                    description: result.payload.message || "Đã xảy ra lỗi",
                    duration: 3,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card
            extra={
                <Button
                    icon={<Loading3QuartersOutlined />}
                    type="primary"
                    onClick={() => getproduct()}
                    loading={product.loading}
                >
                    Làm mới
                </Button>
            }
        >
            {contextHolder}
            <h1 className="text-center">Quản Lý Sản Phẩm</h1>
            <Row gutter={[16, 16]} className="mb-2" justify="end">
                <Col xxl={4} xl={6} md={8} xs={24}>
                    <Button type="primary" onClick={handleAdd} block>
                        <PlusOutlined />
                        Thêm sản phẩm mới
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-3">
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
                handleDetail={handleDetail}
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
                ErrorEdit={ErrorEdit}
            />
            <ModalProductDetail
                isOpen={isModalOpen2}
                onClose={handleCancel2}
                ProductData={productDataDetail}
            />
        </Card>
    );
}

export default Products;
