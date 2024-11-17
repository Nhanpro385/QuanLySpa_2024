import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, message } from "antd";
import { useSelector } from "react-redux";
import useModal from "../../modules/appointments/hooks/openmodal";
import CategoriesForm from "../../modules/product/compoments/CategoriesForm";
import CategoriesTable from "../../modules/product/compoments/CategoriesTable";
import ModalEditCategory from "../../modules/product/compoments/categoriesEditModal";
import { Snowflake } from "@theinternetfolks/snowflake";
import usecategoriesActions from "../../modules/product/hooks/useCategoriesProduct";
import debounce from "lodash/debounce";
const ProductCategories = () => {
    const {
        addcategories,
        getcategories,
        updatecategories,
        deletecategories,
        getcategoriesById,
        searchcategories,
    } = usecategoriesActions();
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [apiError, setApiError] = useState(null);
    const { categories, loading, error, category } = useSelector(
        (state) => state.categories
    );
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
    });
    console.log(categories);
    
    useEffect(() => {
        if (searchQuery.search || searchQuery.page !== 1) {
            searchcategories(searchQuery);
        }
    }, [searchQuery]);
    useEffect(() => {
        getcategories({ page: 1 ,per_page: 5});
    }, []);

    const dataSource = Array.isArray(categories?.data) ? categories.data : [];
    const pagination = categories.meta || {};
    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };
    const handlePageChange = (page) => {
        setSearchQuery((prev) => ({ ...prev, page }));
    };
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

    const editCate = async (id) => {
        try {
            const result = await getcategoriesById(id);

            if (result.meta.requestStatus === "fulfilled") {
                showModal();
            } else {
                messageApi.error("Có lỗi xảy ra khi lấy danh mục.");
            }
        } catch (error) {
            messageApi.error("Có lỗi xảy ra khi lấy danh mục.");
        }
    };

    const deleteCate = async (id) => {
        const result = await deletecategories(id);
     

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
                        <Row className="m-2" justify={"space-between"}>
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={24}
                            >
                                <Input.Search
                                    placeholder="Tìm kiếm"
                                    onSearch={onSearch}
                                    enterButton="Tìm kiếm"
                                    allowClear
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <CategoriesTable
                            dataSource={dataSource}
                            loading={loading}
                            editCate={editCate}
                            deleteCate={deleteCate}
                            pagination={pagination}
                            handlePageChange={handlePageChange}
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
