// ServiceCategories.jsx
import React, { useEffect, useState } from "react"; // Added useState
import { Card, Col, Row, Alert, message } from "antd";
import { useSelector } from "react-redux";
import {
    ServiceCategoriesAdd,
    ServiceCategoriesDelete,
    ServiceCategoriesGet,
    ServiceCategoriesGetById,
} from "../../redux/slices/servicesCategoriesSlice";
import { Snowflake } from "@theinternetfolks/snowflake";
import useModal from "../../modules/appointments/hooks/openmodal";
import ServiceCategoryForm from "../../modules/services/compoments/ServiceCategoryForm"; // Adjust path as necessary
import ServiceCategoryTable from "./../../modules/services/compoments/ServiceCategoryTable"; // Adjust path as necessary
import ModalEditServiceCategory from "../../modules/services/compoments/ServiceCategoriesEditModal";
import { useForm } from "react-hook-form"; // Import useForm
import useServiceCategoriesActions from "../../modules/services/hooks/useServiceCategories";

const ServiceCategories = () => {
    const {
        addServiceCategories,
        getServiceCategories,
        updateServiceCategories,
        deleteServiceCategories,
        getServiceCategoriesById,
    } = useServiceCategoriesActions();
    
    const [messageApi, contextHolder] = message.useMessage();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const { ServiceCategories, loading, error, category } = useSelector(
        (state) => state.ServiceCategories
    );

    // State to track submission status
    const [submissionStatus, setSubmissionStatus] = useState(null);

    // Initialize the form
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getServiceCategories();
    }, []);

    // Effect to show messages based on submission status
    useEffect(() => {
        if (submissionStatus === 'success') {
            messageApi.success("Thêm mới thành công");
            reset();
            setSubmissionStatus(null); // Reset submission status
        } else if (submissionStatus === 'error') {
            messageApi.error("Thêm mới thất bại");
            setSubmissionStatus(null); // Reset submission status
        }
    }, [submissionStatus, messageApi, reset]);

    const onSubmit = handleSubmit(async (data) => {
        const payload = {
            id: Snowflake.generate(),
            name: data.name,
            status: 1,
            description: data.description,
        };

        const resultAction = await addServiceCategories(payload);
        if (resultAction.meta.requestStatus === "fulfilled") {
            setSubmissionStatus('success'); // Update submission status to success
        } else {
            setSubmissionStatus('error'); // Update submission status to error
        }
    });

    const editCate = (id) => {
        getServiceCategoriesById(id);
        showModal();
    };

    const deleteCate = async (id) => {
        const resultAction = await deleteServiceCategories(id);
        if (resultAction.meta.requestStatus === "fulfilled") {
            messageApi.success("Xóa thành công");
        }
    };

    const dataSource = (ServiceCategories.data || []).map((item) => ({
        ...item,
        key: item.id,
    }));

    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Danh mục Loại Dịch Vụ">
                        {error && (
                            <Alert message={<span>{error.message}</span>} type="error" />
                        )}
                        <ServiceCategoryForm
                            onSubmit={onSubmit}
                            errors={errors}
                            control={control} // Pass control to form
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Danh sách danh mục sản phẩm">
                        <ServiceCategoryTable
                            dataSource={dataSource}
                            loading={loading}
                            editCate={editCate}
                            deleteCate={deleteCate}
                        />
                    </Card>
                    <ModalEditServiceCategory
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

export default ServiceCategories;
