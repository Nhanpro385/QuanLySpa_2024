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
import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";
const Consultant = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [editForm] = Form.useForm(); // Form instance for editing
    const {
        getconsulations,
        searchconsulations,
        acceptConsulations,
        getbyidconsulations,
        updateconsulations,
    } = useconsulationsAction();
    const consulations = useSelector((state) => state.consulations);
    const [consultationsData, setConsultationsData] = useState([]);
    const pagnation = consulations?.consulations?.meta || {};
    const [searchquery, setsearchquery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });
    useEffect(() => {
        getconsulations();
    }, []);

    useEffect(() => {
        console.log(consulations);
        if (
            !consulations?.loading &&
            consulations?.consulations &&
            consulations?.consulations?.data
        ) {
            setConsultationsData(
                consulations?.consulations?.data.map((e) => ({
                    ...e, // Spread tất cả các thuộc tính từ e
                    key: e.id, // Thêm trường key từ e.id
                }))
            );
        } else {
            setConsultationsData([]);
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

    const handleEdit = async (record) => {
        try {
            const res = await getbyidconsulations(record.id);
            if (res.payload.status === "success") {
                setSelectedConsultation(res.payload.data);
                editForm.setFieldsValue(res.payload.data);

                setIsEditModalOpen(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditOk = async () => {
        try {
            const payload = {
                status: editForm.getFieldValue("status"),
                consulation: editForm.getFieldValue("consulation"),
                treatment_plan: editForm.getFieldValue("treatment_plan"),
                skin_condition: editForm.getFieldValue("skin_condition"),
            };
            const res = await updateconsulations({
                id: selectedConsultation.id,
                data: payload,
            });
            if (res.payload.status == 404) {
                api.error({
                    message: res.payload.message || "Không tìm thấy lịch hẹn",
                    description: "Cập nhật lịch hẹn",
                    duration: 3,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedConsultation(null); // Clear selected record
    };
    const Onsearch = debounce((value) => {
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
    const handleAccept = async (id, status) => {
        try {
            if (status == 1) {
                navigate("/admin/tuvankhachhang/videocall/" + id);
            } else if (status == 0) {
                const res = await acceptConsulations(id);
                console.log(res);

                if (res.payload.status == "success") {
                    api.success({
                        message:
                            res.payload.message ||
                            "Chấp nhận thành công lịch hẹn",
                        description: "Duyệt lịch hẹn",
                        duration: 3,
                    });
                    getconsulations();
                } else {
                    api.success({
                        message:
                            res.payload.message ||
                            "Chấp nhận không thành công lịch hẹn",
                        description: "Duyệt lịch hẹn",
                        duration: 3,
                    });
                }
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
                handleAccept(record.id, record.status);
                break;
            default:
                break;
        }
    };

    return (
        <Card extra={
            <Button
                type="primary"
                icon={<Loading3QuartersOutlined />}
                loading={consulations.loading}
                onClick={() => {
                    getconsulations();
                }}
            >
              Làm mới
            </Button>
        }>
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
                            <Option value={1}>Đang Tư Vấn</Option>
                            <Option value={2}>Đã tư vấn</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Kế hoạch tư vấn" name="treatment_plan">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tình trạng da" name="skin_condition">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default Consultant;
