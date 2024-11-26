import React, { useEffect, useState } from "react";
import { Card, Col, Row, Alert, message, Input, Select } from "antd";
import { useSelector } from "react-redux";
import {
    ServiceCategoriesAdd,
    ServiceCategoriesDelete,
    ServiceCategoriesGet,
    ServiceCategoriesGetById,
} from "../../redux/slices/servicesCategoriesSlice";
import { Snowflake } from "@theinternetfolks/snowflake";
import useModal from "../../modules/appointments/hooks/openmodal";
import ServiceCategoryForm from "../../modules/services/compoments/ServiceCategoryForm";
import ServiceCategoryTable from "./../../modules/services/compoments/ServiceCategoryTable";
import ModalEditServiceCategory from "../../modules/services/compoments/ServiceCategoriesEditModal";
import { useForm } from "react-hook-form";
import useServiceCategoriesActions from "../../modules/services/hooks/useServiceCategories";
import debounce from "lodash/debounce";

const ServiceCategories = () => {
    const {
        addServiceCategories,
        getServiceCategories,
        updateServiceCategories,
        deleteServiceCategories,
        getServiceCategoriesById,
        searchServiceCategories,
    } = useServiceCategoriesActions();

    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    // const { ServiceCategories, loading, error, category } = useSelector(
    //     (state) => state.ServiceCategories
    // );
    const ServiceCategories = useSelector((state) => state.serviceCategories);

    const [categoryData, setCategoryData] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        getServiceCategories();
    }, []);

    useEffect(() => {
        if (submissionStatus === "success") {
            messageApi.success("Thêm mới thành công");
            reset();
            setSubmissionStatus(null);
        } else if (submissionStatus === "error") {
            messageApi.error("Thêm mới thất bại");
            setSubmissionStatus(null);
        }
    }, [submissionStatus, messageApi, reset]);

    const onSubmit = handleSubmit(async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            status: 1,
            parent_id: "",
            description: data.description,
        };

        const resultAction = await addServiceCategories(payload);
        if (resultAction.meta.requestStatus === "fulfilled") {
            setSubmissionStatus("success");
        } else {
            setSubmissionStatus("error");
        }
    });

    const editCate = (record) => {
        getServiceCategoriesById(record.key);
        showModal();
    };

    const deleteCate = async (record) => {
        const resultAction = await deleteServiceCategories(record.key);
        if (resultAction.meta.requestStatus === "fulfilled") {
            messageApi.success("Xóa thành công");
        }
    };

    // Combined search and sort effect
    useEffect(() => {
        if (
            searchQuery.search ||
            searchQuery.page !== 1 ||
            searchQuery.per_page !== 5
        ) {
            searchServiceCategories(searchQuery);
        } else {
            getServiceCategories();
        }
    }, [searchQuery]);

    const handleSearchChange = debounce((value) => {
        setSearchQuery((prev) => ({
            page: 1,
            search: value,
        }));
    }, 500); // Debounce to reduce rapid calls

    const handlePageChange = (page, pagination) => {
        setSearchQuery((prev) => ({
            ...prev,
            page,
            per_page: pagination,
        }));
    };
    useEffect(() => {
        if (ServiceCategories.error) {
            Object.keys(ServiceCategories.error.errors).forEach((key) => {
                setError(key, {
                    type: "server",
                    message: ServiceCategories.error.errors[key][0],
                });
            });
        }
    }, [ServiceCategories.error]);
    useEffect(() => {
        if (
            ServiceCategories.ServiceCategories.data &&
            !ServiceCategories.loading
        ) {
            setCategoryData(
                ServiceCategories.ServiceCategories.data.map((category) => ({
                    key: category.id,
                    name: category.name,
                    description: category.description,
                }))
            );
        }
    }, [ServiceCategories]);
    const pagination = ServiceCategories.ServiceCategories.meta || {};

    return (
        <>
            <h1 className="text-center">Danh mục Loại Dịch Vụ</h1>
            {contextHolder}
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Danh mục Loại Dịch Vụ">
                        <ServiceCategoryForm
                            onSubmit={onSubmit}
                            errors={errors}
                            errorMessage={ServiceCategories.error}
                            control={control}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Danh sách danh mục sản phẩm">
                        <Row className="mb-2" gutter={[16, 16]}>
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={24}
                                sm={24}
                                xs={24}
                            >
                                <Input.Search
                                    placeholder="Tìm kiếm theo : tên , id và danh mục dịch vụ   "
                                    onSearch={handleSearchChange}
                                    onChange={(e) =>
                                        handleSearchChange(e.target.value)
                                    }
                                    allowClear
                                    enterButton="Tìm kiếm"
                                />
                            </Col>
                        </Row>
                        <ServiceCategoryTable
                            dataSource={categoryData}
                            loading={ServiceCategories.loading}
                            editCate={editCate}
                            deleteCate={deleteCate}
                            pagination={pagination}
                            handlePageChange={handlePageChange}
                        />
                    </Card>
                    <ModalEditServiceCategory
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        category={ServiceCategories.category}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ServiceCategories;
