import React, { useEffect, useState } from "react";
import { Card, Col, Row, message } from "antd";
import { useSelector } from "react-redux";
import useModal from "../../modules/appointments/hooks/openmodal";
import CategoriesForm from "../../modules/product/compoments/CategoriesForm";
import CategoriesTable from "../../modules/product/compoments/CategoriesTable";
import ModalEditCategory from "../../modules/product/compoments/categoriesEditModal";
import { Snowflake } from "@theinternetfolks/snowflake";
import usecategoriesActions from "../../modules/product/hooks/useCategoriesProduct";
const ProductCategories = () => {
    const {
        addcategories,
        getcategories,
        updatecategories,
        deletecategories,
        getcategoriesById,
    } = usecategoriesActions();
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [apiError, setApiError] = useState(null);
    const { categories, loading, error, category } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        getcategories();
    }, []);

    const dataSource = categories.data || [];

    const handleFormSubmit = async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            status: 1,
            description: data.description,
        };

        const resultAction = await addcategories(payload);

        if (resultAction.meta.requestStatus === "fulfilled") {
            messageApi.success("Thêm danh mục thành công!");
        } else {
            setApiError(resultAction.payload.errors);
            messageApi.error(resultAction.payload.message || "Có lỗi xảy ra!");
        }
    };

    const editCate = (id) => {
        const result = getcategoriesById(id);
        if (result.meta.requestStatus === "fulfilled") {
            showModal();
        } else {
            messageApi.error("Có lỗi xảy ra khi lấy danh mục.");
        }
    };

    const deleteCate = async (id) => {
        const result = await deletecategories(id);
        console.log(result);

        if (result.meta.requestStatus === "fulfilled") {
            messageApi.success("Danh mục đã được xóa!");
        } else {
            messageApi.error("Có lỗi xảy ra khi xóa danh mục.");
        }
    };

    return (
        <>
            <h1 className="text-center">Quản Lý Danh Mục Sản Phẩm</h1>
            <Row gutter={[16, 16]}>
                {contextHolder}
                <Col span={24}>
                    <Card title="Danh mục sản phẩm">
                        <CategoriesForm
                            onSubmit={handleFormSubmit}
                            error={apiError}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Danh sách danh mục sản phẩm">
                        <CategoriesTable
                            dataSource={dataSource}
                            loading={loading}
                            editCate={editCate}
                            deleteCate={deleteCate}
                        />
                    </Card>
                    <ModalEditCategory
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        category={category}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ProductCategories;
