import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, message } from "antd";
import { useSelector } from "react-redux";
import useModal from "../../modules/appointments/hooks/openmodal";
import ProductServiceForm from "../../modules/services/compoments/ProductServiceForm";
import ProductServiceTable from "../../modules/services/compoments/ProductServiceTable";

import useServicesActions from "../../modules/services/hooks/useServices";
import useproductActions from "../../modules/product/hooks/useProduct";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";
import { set } from "lodash";
const ProductServiceAdd = () => {
    const { id: idservice } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [apiError, setApiError] = useState(null);
    const { getproduct } = useproductActions();
    const { addProduct, getservicesById, updateProduct } = useServicesActions();
    const product = useSelector((state) => state.products);
    const services = useSelector((state) => state.services);
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 50,
    });
    const [productdata, setProductData] = useState([]);
    const [productSelected, setProductSelected] = useState([]);
    const [ProductService, setProductService] = useState([]);

    useEffect(() => {
        if (idservice) {
            getproduct(50);
            getservicesById(idservice);
        }
    }, [idservice]);
    useEffect(() => {
        if (services.service.data && !services.loading) {
            setProductService(
                services.service.data.products.map((item) => ({
                    key: item.id,
                    ...item,
                }))
            );
        }
    }, [services.service.data]);

    useEffect(() => {
        if (product.product.data) {
            setProductData(
                product.product.data.map((item) => ({
                    key: item.id,
                    ...item,
                }))
            );
        }
    }, [product]);

    const pagination = {};
    const category = {};
    const onSearch = debounce((value) => {
        setSearchQuery({
            ...searchQuery,
            search: value,
        });
    }, 300);

    const handleFormSubmit = async (data) => {
        try {
            const payload = {
                products: productSelected.map((item) => ({
                    product_id: item.id,
                    quantity_used: item.quantity,
                })),
            };

            const result = await addProduct({
                id: id,
                data: payload,
            });
            if (result.meta.requestStatus === "fulfilled") {
                messageApi.success("Danh mục đã được thêm!");
                getservicesById(id);
            } else {
                messageApi.error("Có lỗi xảy ra khi thêm danh mục.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlesetProductSelected = (value) => {
        setProductSelected(value);
    };
    const handleUpdateProductSelected = (index, value) => {
        const newProductSelected = [...productSelected];
        newProductSelected[index] = value;
        setProductSelected(newProductSelected);
    };
    const handleDeleteProductSelected = (index) => {
        const newProductSelected = [...productSelected];
        newProductSelected.splice(index, 1);
        setProductSelected(newProductSelected);
    };
    const handleEditProduct = (data) => {
        console.log(data);
    };
    const handleDeleteProduct = async (id) => {
        try {
            const newProductService = ProductService.filter(
                (item) => item.id !== id
            );
            const result = await updateProduct({
                id: idservice,
                data: {
                    products: newProductService.map((item) => ({
                        product_id: item.id,
                        quantity_used: item.quantity_used,
                    })),
                },
            });
            if (result.meta.requestStatus === "fulfilled") {
                messageApi.success("Danh mục đã được xóa!");
                getservicesById(idservice);
            } else {
                messageApi.error("Có lỗi xảy ra khi xóa danh mục.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <h1 className="text-center">Thêm danh mục sản phẩm Của Dịch Vụ</h1>
            <Row gutter={[16, 16]}>
                {contextHolder}
                <Col span={24}>
                    <Card title="Danh mục sản phẩm">
                        <ProductServiceForm
                            dataproduct={productdata}
                            onSubmit={handleFormSubmit}
                            error={apiError}
                            productSelected={handlesetProductSelected}
                            dataselected={productSelected}
                            handleUpdateProductSelected={
                                handleUpdateProductSelected
                            }
                            handleDeleteProductSelected={
                                handleDeleteProductSelected
                            }
                            handleFormSubmit={handleFormSubmit}
                            onSearch={onSearch}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Danh sách danh mục sản phẩm">
                        <ProductServiceTable
                            dataSource={ProductService}
                            loading={services.loading}
                            pagination={pagination}
                            handleDeleteProduct={handleDeleteProduct}
                            handleEditProduct={handleEditProduct}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductServiceAdd;
