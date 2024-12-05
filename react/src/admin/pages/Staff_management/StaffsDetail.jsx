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
import style from "../../modules/staffManagement/style/StaffsDetail.module.scss";
import Statistics_staff from "../../modules/staffManagement/compoments/statistics_page";
import Staff_calendar from "../../modules/staffManagement/compoments/staff_calendar";
import Staff_history_shift from "../../modules/staffManagement/compoments/staff_history_shift";
import useUsersActions from "../../modules/staffManagement/hooks/useUserAction";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
console.log(style);

const { Title, Text } = Typography;

const StaffsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getusersById } = useUsersActions();
    const [UserData, setUserData] = useState({});
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            getusersById(id);
        } else {
            navigate("/admin/nhanvien");
        }
    }, [id]);

    useEffect(() => {
        if (user.user.data) {
            setUserData(user.user.data);
        } else {
            setUserData({});
        }
    }, [user]);

    return (
        <Row gutter={[16, 16]}>
            {/* Thông tin cơ bản */}
            <Col span={24}>
                <Card>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                            <Image
                                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${
                                    UserData?.id || 0
                                }`}
                                fallback="https://via.placeholder.com/150"
                            />
                        </Col>
                        <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                            <Title level={2} className={style.title_name}>
                                {UserData?.full_name || "N/A"}
                            </Title>
                            <Text type="secondary">
                                {UserData?.position?.name || "Không có chức vụ"}
                            </Text>
                            <Divider />
                            <Descriptions
                                column={{ xs: 1, sm: 1, md: 2 }}
                                layout="vertical"
                            >
                                <Descriptions.Item label="Họ và tên">
                                    {UserData?.full_name || "Không có tên"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Chức vụ">
                                    {UserData?.position?.name ||
                                        "Không có chức vụ"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    {UserData?.email || "Không có email"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">
                                    {UserData?.phone ||
                                        "Không có số điện thoại"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Giới tính">
                                    {UserData?.gender || "Không có giới tính"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">
                                    {UserData?.address || "Không có địa chỉ"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày sinh">
                                    {UserData?.date_of_birth ||
                                        "Không có ngày sinh"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Ghi chú">
                                    {UserData?.note || "Không có ghi chú"}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            </Col>
            {/* Thống kê và các tab */}
            <Col span={24}>
                <Card>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Thống kê dữ liệu" key="1">
                            <Statistics_staff data={UserData} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Ca làm việc" key="2">
                            <Staff_calendar data={UserData?.shifts || []} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Lịch sử làm việc" key="3">
                            <Staff_history_shift
                                data={UserData?.appointments || []}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    );
};

export default StaffsDetail;
