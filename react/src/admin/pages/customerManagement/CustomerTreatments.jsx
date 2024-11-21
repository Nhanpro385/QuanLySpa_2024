import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Input,
    Row,
    Col,
    Dropdown,
    Space,
    Select,
    message,
} from "antd";
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
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                navigate(`/admin/khachhang/lichsutrilieu/chinhsua/${record.id}`);
                break;
            case "2":
                handelDetail(record);
                break;
            case "3":
                handleDelete(record.id);
                break;

            default:
                break;
        }
    };
    const handelDetail = async (record) => {
        try {
            await getStreatmentById(record.id);
            if (streatments.streament && streatments.loading === false) {
                setStreatmentsDetail(streatments.streament.data);
            }
            showModal();
        } catch (error) {
            message.error("Đã xảy ra lỗi khi lấy thông tin lịch sử trị liệu");
        }
    };

    const onSearch = (value) => {
        setSearchQuery((prev) => ({ ...prev, search: value }));
    };
    const handelPageChange = (page, pagination) => {
        setSearchQuery((prev) => ({ ...prev, page }));
    };
   
    const handleDelete = async (id) => {
        try {
           const resultAction = await deleteStreatment(id);
           getStreatments();
            message.success("Xóa lịch sử trị liệu thành công");
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa lịch sử trị liệu");
        }
    };

    return (
        <Card>
            <h1 className="text-center mb-4">
                Quản lý Lịch sử Trị liệu của khách hàng
            </h1>
            <Row gutter={[16, 16]} className="mb-3">
                <Col xl={21} md={18} sm={12} xs={24}></Col>
                <Col xl={3} md={6} sm={12} xs={24}>
                    <Link to="/admin/khachhang/them">
                        <Button block type="primary">
                            <PlusOutlined />
                            Thêm mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xl={12} md={12} sm={12} xs={24}>
                    <Input.Search
                        placeholder="Tìm kiếm......"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="middle"
                        onSearch={onSearch}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </Col>
            </Row>

            <StreatmentsTable
                sreatment={streatmentData}
                onClick={onClick}
                loading={streatments.loading}
                handelPageChange={handelPageChange}
                pageconfig={pageconfig}
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
