import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Image,
    Input,
    Row,
    Tabs,
    Statistic,
    Descriptions,
    Typography,
} from "antd";
import style from "../../modules/Customer/style/CustomerDetail.module.scss";

import Appoiment_history_detail from "../../modules/Customer/compoment/appoiment_history_detail";
import useCustomerActions from "../../modules/Customer/hooks/useCustomerActions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Customer_history_consulations from "../../modules/Customer/compoment/Customer_history_consulations";
console.log(style);

const { Title, Text } = Typography;

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCustomerById } = useCustomerActions();
    const [CustomerData, setCustomerData] = useState({});
    const customer = useSelector((state) => state.customers);

    useEffect(() => {
        if (id) {
            getCustomerById(id);
        } else {
            navigate("/admin/khachhang");
        }
    }, [id]);

    useEffect(() => {
        console.log(customer);
        if (customer.customer.data) {
            setCustomerData(customer.customer.data);
        }
    }, [customer]);

    return (
        <Row gutter={[16, 16]}>
            {/* Thông tin cơ bản */}
            <Col span={24}>
                <Card>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                            <Image
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${
                                    CustomerData?.id || 0
                                }`}
                                fallback="https://via.placeholder.com/150"
                            />
                        </Col>
                        <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                            <Title level={2} className={style.title_name}>
                                {CustomerData?.full_name || "Không tìm thấy"}
                            </Title>
                            {CustomerData?.created_by && (
                                <Title level={5} color="gray">
                                    Người tạo :{" "}
                                    {CustomerData?.created_by?.full_name ||
                                        "Không tìm thấy"}
                                    {" - "}
                                    {CustomerData?.created_by?.role ||
                                        "Không tìm thấy"}
                                </Title>
                            )}

                            <Divider />
                            <Descriptions
                                column={{ xs: 1, sm: 1, md: 2 }}
                                layout="vertical"
                            >
                                <Descriptions.Item label="Họ và tên">
                                    {CustomerData?.full_name || "Không có tên"}
                                </Descriptions.Item>

                                <Descriptions.Item label="Email">
                                    {CustomerData?.contact_email ||
                                        "Không có email"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">
                                    {CustomerData?.phone ||
                                        "Không có số điện thoại"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Giới tính">
                                    {CustomerData?.gender ||
                                        "Không có giới tính"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">
                                    {CustomerData?.address ||
                                        "Không có địa chỉ"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày sinh">
                                    {CustomerData?.date_of_birth ||
                                        "Không có ngày sinh"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ghi chú">
                                    {CustomerData?.note || "Không có ghi chú"}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Col>
            {/* Thống kê và các tab */}
            <Col span={24}>
                <Card>
                    <Tabs defaultActiveKey="3">
                        <Tabs.TabPane tab="Lịch sử dịch vụ" key="3">
                            <Appoiment_history_detail
                                data={CustomerData?.appointments || []}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Lịch sử tư vấn" key="4">
                            <Customer_history_consulations
                                data={CustomerData?.consulations || []}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    );
};

export default CustomerDetail;
