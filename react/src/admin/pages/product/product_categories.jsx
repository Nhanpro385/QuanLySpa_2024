import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, notification } from "antd";
import { useSelector } from "react-redux";
import useModal from "../../modules/appointments/hooks/openmodal";
import CategoriesForm from "../../modules/product/compoments/CategoriesForm";
import CategoriesTable from "../../modules/product/compoments/CategoriesTable";
import ModalEditCategory from "../../modules/product/compoments/categoriesEditModal";
import { Snowflake } from "@theinternetfolks/snowflake";
import usecategoriesActions from "../../modules/product/hooks/useCategoriesProduct";
import debounce from "lodash/debounce";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const ProductCategories = () => {
    useEffect(() => {
        document.title = "Quản lý danh mục sản phẩm";
    }, []);
    const {
        addcategories,
        getcategories,
        updatecategories,
        deletecategories,
        getcategoriesById,
        searchcategories,
    } = usecategoriesActions();
    const [api, contextHolder] = notification.useNotification();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [apiError, setApiError] = useState(null);
    const categories = useSelector((state) => state.categories);

    const [categoriesData, setCategoriesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchcategories(searchQuery);
        } else {
            getcategories();
        }
    }, [searchQuery]);
    useEffect(() => {
        getcategories();
    }, []);
    useEffect(() => {
        console.log(categories);
        if (categories.categories.data && !categories.loading) {
            setCategoriesData(
                categories.categories.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
    }, [categories]);

    const pagination = categories.categories.meta || {};
    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };
    const handlePageChange = (page, pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: pagination }));
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
            api.success({
                message: "Thêm danh mục thành công!",
            });
        } else {
            setApiError(resultAction.payload.errors);
            api.error({
                message: "Thêm danh mục thất bại!",
                description: resultAction.payload.message || "",
            });
        }
    };

    const editCate = async (id) => {
        try {
            const result = await getcategoriesById(id);

            if (result.meta.requestStatus === "fulfilled") {
                showModal();
            } else {
                api.error({
                    message: "Có lỗi xảy ra khi lấy danh mục.",
                    description: result.payload.message || "",
                });
            }
        } catch (error) {
            api.error({
                message: "Có lỗi xảy ra khi lấy danh mục.",
                description: "Không thể lấy danh mục.",
            });
        }
    };

    const deleteCate = async (id) => {
        const result = await deletecategories(id);

        if (result.meta.requestStatus === "fulfilled") {
            api.success({
                message: "Xóa danh mục thành công!",
                description: result.payload.message || "",
            });
            getcategories();
        } else {
            api.error({
                message: "Xóa danh mục thất bại!",
                description: result.payload.message || "",
            });
        }
    };

    return (
        <div>
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
                    <Card
                        title="Danh sách danh mục sản phẩm"
                        extra={
                            <Button
                                icon={<Loading3QuartersOutlined />}
                                type="primary"
                                onClick={() => getcategories()}
                                loading={categories.loading}
                            >
                                Làm mới
                            </Button>
                        }
                    >
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
                            dataSource={categoriesData}
                            loading={categories.loading}
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
                        category={categories.category || {}}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProductCategories;
