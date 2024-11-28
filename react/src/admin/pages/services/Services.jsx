import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Row, Col, notification } from "antd";
import ServicesAdd from "./add_services";
import useModal from "../../modules/appointments/hooks/openmodal";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ServiceModalEdit from "../../modules/services/compoments/ServiceModalEdit";
import ServiceTable from "../../modules/services/compoments/ServiceTable";
import { useSelector } from "react-redux";
import useServicesActions from "../../modules/services/hooks/useServices";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
function Services() {
    const {
        addservices,
        getservices,
        updateservices,
        deleteservices,
        getservicesById,
        searchservices,
    } = useServicesActions();
    const [api, contextHolder] = notification.useNotification();
    const [ServiceData, setServiceData] = useState([]);
    const Navigate = useNavigate();
    const services = useSelector((state) => state.services);

    const [errorEdit, setErrorEdit] = useState(null);

    const pagination = services.services.meta || {};
    const [Searchquery, setSearchquery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();
    const [editService, setEditService] = useState(null);
    useEffect(() => {
        if (services.services.data && !services.loading) {
            setServiceData(
                services.services.data.map((service) => ({
                    key: service.id,
                    name: service.name,
                    price: service.price.toLocaleString("vi-VN"), // Chỉ sử dụng "vi-VN" để định dạng số
                    duration: service.duration,
                    status: service.status,
                }))
            );
        }
    }, [services]);

    const handleEdit = async (record) => {
        try {
            const res = await getservicesById(record.key);
            console.log(res);

            if (res.payload.status === "success") {
                setEditService(res.payload.data);
                showModal2();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleViewDetails = (record) => {
        Modal.info({
            title: "Chi tiết dịch vụ",
            content: (
                <div>
                    <p>Tên dịch vụ: {record.name}</p>
                    <p>Giá: {record.price}</p>
                    <p>Thời gian: {record.duration}</p>
                    <p>Trạng thái: {record.status}</p>
                </div>
            ),
            onOk() {},
        });
    };
    const onSearch = debounce((value) => {
        setSearchquery({ ...Searchquery, search: value });
    }, 500);
    const handleChangepage = (page, pagination) => {
        setSearchquery({ ...Searchquery, page, per_page: pagination });
    };

    useEffect(() => {
        getservices();
    }, []);
    useEffect(() => {
        if (
            Searchquery.search ||
            Searchquery.page !== 1 ||
            Searchquery.per_page !== 5
        ) {
            searchservices(Searchquery);
        } else {
            getservices();
        }
    }, [Searchquery]);
    const handledelete = async (record) => {
        try {
            const res = await deleteservices(record.key);
            if (res.payload.status === "success") {
                getservices();
                api.success({
                    message: "Xóa dịch vụ thành công",
                });
            } else {
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmitEdit = async (data) => {
        try {
            console.log(data);

            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);
            }
            if (data.image_url.length > 0) {
                data.image_url.forEach((file) => {
                    formData.append("image_url[]", file.originFileObj);
                });
            }
            const res = await updateservices({ data: formData, id: data.id });
            if (res.payload.status === "success") {
                getservices();
                api.success({
                    message: "Cập nhật dịch vụ thành công",
                });
                handleCancel2();
            } else {
                setErrorEdit((prev) => res.payload.errors);
                api.error({
                    message: "Cập nhật dịch vụ thất bại",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const onAddproduct = (record) => {
        console.log(record);

        Navigate("/admin/dichvu/themsanphamdichvu/" + record.key);
    };
    const onEditproduct = (record) => {
        Navigate("/admin/dichvu/chinhsuasanpham/" + record.id);
    };
    return (
        <div>
            {contextHolder}
            <h1 className="text-center">Quản lý dịch vụ</h1>
            <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
                <Col xl={16} md={12} sm={24} xs={24}>
                    <h2>Danh Sách Dịch Vụ</h2>
                </Col>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Button
                        type="primary"
                        onClick={() => {
                            Navigate("/admin/dichvu/them");
                        }}
                        block
                    >
                        <PlusOutlined />
                        Thêm dịch vụ mới
                    </Button>
                </Col>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Link to="/admin/danhmucdichvu">
                        <Button color="primary" variant="outlined" block>
                            <PlusOutlined />
                            Thêm Loại dịch vụ
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xl={4} md={6} sm={24} xs={24}>
                    <Input.Search
                        className="mb-3 w-100"
                        placeholder="Tìm dịch vụ theo tên..."
                        onSearch={onSearch}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </Col>
            </Row>

            <ServiceTable
                dataSource={ServiceData}
                onEdit={handleEdit}
                onDelete={handledelete}
                onViewDetails={handleViewDetails}
                pagination={pagination}
                handleChangepage={handleChangepage}
                loading={services.loading}
                onAddproduct={onAddproduct}
                onEditproduct={onEditproduct}
            />

            <ServiceModalEdit
                isModalOpen={isModalOpen2}
                handleOk={handleOk2}
                handleCancel={handleCancel2}
                service={editService}
                handleSubmitEdit={handleSubmitEdit}
                error={errorEdit}
            />
        </div>
    );
}

export default Services;
