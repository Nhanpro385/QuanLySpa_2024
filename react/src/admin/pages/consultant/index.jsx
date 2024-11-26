import React, { useEffect, useState, useMemo } from "react";
import {
    Layout,
    Form,
    Input,
    Button,
    Select,
    Card,
    Modal,
    Tag,
    Row,
    notification,
    Col,
} from "antd";
import ConsultationTable from "../../modules/consulations/compoments/ConsultationTable";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
import useconsulationsAction from "../../modules/consulations/hooks/useconsulationsAction";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
const Consultant = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [editForm] = Form.useForm(); // Form instance for editing
    const { getconsulations, searchconsulations, acceptConsulations } =
        useconsulationsAction();
    const consulations = useSelector((state) => state.consulations);
    const [consultationsData, setConsultationsData] = useState([]);
    const pagnation = consulations.consulations.meta || {};
    const [searchquery, setsearchquery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    useEffect(() => {
        getconsulations();
    }, []);

    useEffect(() => {
        if (!consulations.loading && consulations.consulations) {
            setConsultationsData(
                consulations.consulations.data.map((e) => ({
                    ...e, // Spread tất cả các thuộc tính từ e
                    key: e.id, // Thêm trường key từ e.id
                }))
            );
        }
    }, [consulations]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state
    const [selectedConsultation, setSelectedConsultation] = useState(null); // Selected record

    const handleFinish = (values) => {
        setConsultationsData([
            ...consultationsData,
            { ...values, key: consultationsData.length },
        ]);
        form.resetFields();
    };

    const handleEdit = (record) => {
        setSelectedConsultation(record);
        editForm.setFieldsValue(record); // Set form values
        setIsEditModalOpen(true); // Show modal
    };

    const handleEditOk = () => {
        editForm
            .validateFields()
            .then((values) => {
                const updatedData = consultationsData.map((item) =>
                    item.key === selectedConsultation.key
                        ? { ...values, key: item.key }
                        : item
                );
                setConsultationsData(updatedData);
                setIsEditModalOpen(false); // Close modal
                setSelectedConsultation(null); // Clear selected record
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedConsultation(null); // Clear selected record
    };
    const Onsearch = debounce((value) => {
        console.log(value);

        setsearchquery({ ...searchquery, search: value });
    }, 500);
    const onchangePage = (page, pagination) => {
        setsearchquery({ ...searchquery, page: page, per_page: pagination });
    };
    useEffect(() => {
        if (
            searchquery.search !== "" ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 5
        ) {
            searchconsulations(searchquery);
        } else {
            getconsulations();
        }
    }, [searchquery]);
    const handleAccept = async (id) => {
        try {
            const res = await acceptConsulations(id);
            if (res.payload.status === "true") {
                api.success({
                    message:
                        res.payload.message || "Chấp nhận thành công lịch hẹn",
                    description: "Duyệt lịch hẹn",
                    duration: 3,
                });
                navigate(
                    "/admin/tuvantructuyen/videocall/" + id
                );
            } else {
                api.success({
                    message:
                        res.payload.message ||
                        "Chấp nhận không thành công lịch hẹn",
                    description: "Duyệt lịch hẹn",
                    duration: 3,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                handleAccept(record.id);
                break;
            default:
                break;
        }
    };

    return (
        <Card>
            {contextHolder}
            <Form
                form={form}
                layout="inline"
                onFinish={handleFinish}
                style={{ marginBottom: "20px" }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Input.Search
                            placeholder="Tìm kiếm lịch tư vấn"
                            type="text"
                            name="search"
                            onSearch={Onsearch}
                            onChange={(e) => Onsearch(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </Col>
                </Row>
            </Form>

            <ConsultationTable
                consultationsData={consultationsData}
                onClick={onClick}
                pagination={pagnation}
                onchangePage={onchangePage}
                loading={consulations.loading}
            />

            {/* Modal for editing consultation */}
            <Modal
                title="Chỉnh sửa thông tin tư vấn"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên khách hàng!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn trạng thái!",
                            },
                        ]}
                    >
                        <Select placeholder="Trạng thái">
                            <Option value="Đang chờ">Đang chờ</Option>
                            <Option value="Đang tư vấn">Đang tư vấn</Option>
                            <Option value="Hoàn thành">Hoàn thành</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Dịch vụ"
                        name="service"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn dịch vụ!",
                            },
                        ]}
                    >
                        <Select placeholder="Dịch vụ">
                            <Option value="Dịch vụ A">Dịch vụ A</Option>
                            <Option value="Dịch vụ B">Dịch vụ B</Option>
                            <Option value="Dịch vụ C">Dịch vụ C</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Kế hoạch tư vấn" name="consultationPlan">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tình trạng da" name="skinStatus">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default Consultant;
