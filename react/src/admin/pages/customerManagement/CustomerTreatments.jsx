import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, notification, DatePicker } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useModal from "../../modules/appointments/hooks/openmodal";

import useStreatmentsAction from "../../modules/streatment/hooks/useStreatmentsAction";
import debounce from "lodash/debounce";
import StreatmentsTable from "../../modules/streatment/compoments/streatmentTable";
import ModalStreatmentDetail from "../../modules/streatment/compoments/ModalStreatmentDetail";
const StreatMents = () => {
    const {
        getStreatments,
        searchStreatment,
        getStreatmentById,
        deleteStreatment,
    } = useStreatmentsAction(); // Use the customer actions hook
    useEffect(() => {
        document.title = "Lịch sử trị liệu";
    }, []);
    const [api, contextHolder] = notification.useNotification();
    const streatments = useSelector((state) => state.streatments);
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    const navigate = useNavigate();
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();

    const [streatmentData, setStreatmentData] = useState([]);
    const [streatmentsDetail, setStreatmentsDetail] = useState({});
    const [pageconfig, setPageconfig] = useState({});

    useEffect(() => {
        getStreatments();
    }, []);
    useEffect(() => {
        if (
            !streatments.loading &&
            streatments.streatments &&
            streatments.streatments.meta
        ) {
            setStreatmentData(streatments.streatments.data);
            setPageconfig(streatments.streatments.meta);
        }
    }, [streatments.streatments]);

    useEffect(() => {
        if (searchQuery.search || searchQuery.page !== 1) {
            searchStreatment(searchQuery);
        } else {
            getStreatments();
        }
    }, [searchQuery]);

    const handelDetail = async (record) => {
        try {
            const res = await getStreatmentById(record.id);
            console.log(res);

            if (streatments.streament && streatments.loading === false) {
               

                setStreatmentsDetail((prev) => res.payload.data);
            }
            showModal();
        } catch (error) {
            api.error({
                message: "Lỗi",
                description: res ? res.payload.message : "Đã xảy ra lỗi",
                duration: 3,
            });
        }
    };

    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };
    const handelPageChange = (page, pagination) => {
        setSearchQuery((prev) => ({ ...prev, page, per_page: pagination }));
    };

    const handleDelete = async (id) => {
        try {
            const resultAction = await deleteStreatment(id);
            console.log(resultAction);

            if (resultAction?.meta?.requestStatus === "fulfilled") {
                getStreatments();
                api.success({
                    message: "Xóa lịch sử trị liệu thành công",
                    duration: 3,
                });
            } else {
                api.error({
                    message: "Không thể xóa lịch sử trị liệu",
                    description:
                        resultAction.payload.message || "Vui lòng thử lại sau",
                    duration: 3,
                });
            }
        } catch (error) {
            api.error({
                message: "Không thể xóa lịch sử trị liệu",
                description: "Vui lòng thử lại sau",
                duration: 3,
            });
        }
    };

    return (
        <Card
            extra={
                <Button
                    type="primary"
                    onClick={() => getStreatments()}
                    loading={streatments.loading}
                >
                    Làm mới
                </Button>
            }
        >
            {contextHolder}
            <h1 className="text-center mb-4">
                Quản lý Lịch sử Trị liệu của khách hàng
            </h1>
            <Row gutter={[16, 16]} className="mb-3">
                <Col xl={21} md={18} sm={12} xs={24}></Col>
                <Col xl={3} md={6} sm={12} xs={24}>
                    <Link to="/admin/khachhang/lichsutrilieu/them">
                        <Button block type="primary">
                            <PlusOutlined />
                            Thêm mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* <Row gutter={[16, 16]} className="mb-4">
                <Col xl={6} md={6} sm={6} xs={24}>
                    <DatePicker
                        className="w-100"
                        allowClear
                        size="middle"
                        placeholder="Chọn ngày"
                        onChange={(date, dateString) => {
                            onSearch(dateString);
                        }}
                    />
                </Col>
            </Row> */}

            <StreatmentsTable
                sreatment={streatmentData}
                loading={streatments.loading}
                handelPageChange={handelPageChange}
                pageconfig={pageconfig}
                handelDetail={handelDetail}
                handleDelete={handleDelete}
            />

            <ModalStreatmentDetail
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                selectStreatment={streatmentsDetail}
            />
        </Card>
    );
};

export default StreatMents;
