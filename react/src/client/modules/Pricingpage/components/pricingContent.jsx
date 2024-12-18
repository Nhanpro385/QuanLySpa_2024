import React, { useEffect, useState } from "react";

import {
    Col,
    Divider,
    Row,
    Table,
    Collapse,
    Badge,
    Tag,
    Typography,
    Button,
    Card,
    List,
    Result,
    Space,
    Grid,
} from "antd";
const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const { Text } = Typography;
const { useBreakpoint } = Grid;
import baner from "../../../assets/images/banderprice.png";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FrownOutlined } from "@ant-design/icons";

const PricingContent = () => {
    const navigate = useNavigate();
    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [cateService, setCateService] = useState([]);
    const [loading, setLoading] = useState(true);

    const serviceCategories = useSelector((state) => state.serviceCategories);
    const screens = useBreakpoint();

    useEffect(() => {
        getServiceCategoriesClient(50);
    }, []);

    useEffect(() => {
        if (serviceCategories.ServiceCategories?.data) {
            const data = serviceCategories.ServiceCategories.data.filter(
                (cate) => cate.service.length > 0
            );

            setCateService(
                data.map((cate) => ({
                    ...cate,
                    key: cate.id,
                }))
            );
        }
        setLoading(false);
    }, [serviceCategories]);

  

    const isServiceNew = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const diffTime = currentDate - createdDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        return diffDays <= 7;
    };

    const renderMobileView = (cate) => (
        <List
            dataSource={cate.service}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        title={
                            <Text strong>
                                {item.name}{" "}
                                {isServiceNew(item.created_at) && (
                                    <Tag color="#e05265">Mới</Tag>
                                )}
                            </Text>
                        }
                        className="w-100"
                    >
                        <h3>Giá niêm yết: {parseInt(item?.price).toLocaleString()} VNĐ</h3>
                        <Row gutter={[16, 16]} className="mt-3">
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Button
                                    block
                                    type="primary"
                                    onClick={() =>
                                        navigate(
                                            `/datlichhen?dichvu=${item.id}`
                                        )
                                    }
                                >
                                    Đặt lịch ngay
                                </Button>
                            </Col>
                            <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Button
                                    block
                                    danger
                                    onClick={() =>
                                        navigate(`/dichvu/${item.id}`)
                                    }
                                >
                                    Xem chi tiết
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </List.Item>
            )}
        />
    );

    return (
        <div>
            <Row>
                <Col span={24}>
                    <img style={{ width: "100%" }} src={baner} alt="baner" />
                </Col>
                <Divider orientation="center">
                    <h1
                        style={{
                            fontFamily: "Anton, sans-serif",
                            fontSize: "4rem",
                        }}
                    >
                        Bảng giá chi tiết
                    </h1>
                </Divider>
                <Col span={24} className="container mb-5">
                    {cateService.length > 0 ? (
                        cateService.map((cate, index) => (
                            <Collapse
                                defaultActiveKey={["1"]}
                                size="large"
                                accordion
                                key={index}
                                className="mb-3"
                            >
                                <Panel
                                    header={
                                        <strong
                                            style={{
                                                color: "#e05265",
                                            }}
                                        >
                                            {cate.name} ({cate.service.length})
                                        </strong>
                                    }
                                    key={index}
                                >
                                    {screens.lg ? (
                                        <Table
                                            bordered={true}
                                            pagination={false}
                                            dataSource={cate?.service?.map(
                                                (e, index) => ({
                                                    key: index,
                                                    ...e,
                                                })
                                            )}
                                            scroll={{ x: 768 }}
                                        >
                                            <Column
                                                title="Tên dịch vụ"
                                                dataIndex="name"
                                                key="name"
                                                render={(name, record) => (
                                                    <Row>
                                                        <Col
                                                            xxl={20}
                                                            xl={20}
                                                            lg={20}
                                                            md={20}
                                                            sm={20}
                                                            xs={24}
                                                        >
                                                            <Text strong>
                                                                {name}
                                                            </Text>
                                                        </Col>
                                                        <Col
                                                            xxl={4}
                                                            xl={4}
                                                            lg={4}
                                                            md={4}
                                                            sm={4}
                                                            xs={24}
                                                        >
                                                            {isServiceNew(
                                                                record.created_at
                                                            ) && (
                                                                <Text>
                                                                    <Tag color="#e05265">
                                                                        Mới
                                                                    </Tag>
                                                                </Text>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                )}
                                            />
                                            <ColumnGroup title="Thông tin chi tiết">
                                                <Column
                                                    title="Giá niêm yết"
                                                    dataIndex="price"
                                                    key="price"
                                                    align="center"
                                                    render={(price) =>
                                                        parseInt(price).toLocaleString() + " VNĐ"
                                                    }
                                                />
                                                <Column
                                                    title="Thao tác"
                                                    key="action"
                                                    align="center"
                                                    dataIndex="action"
                                                    render={(text, record) => (
                                                        <Space>
                                                            <Button
                                                                type="primary"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/datlichhen?dichvu=${record.id}`
                                                                    )
                                                                }
                                                            >
                                                                Đặt lịch ngay
                                                            </Button>
                                                            <Button
                                                                danger
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/dichvu/${record.id}`
                                                                    )
                                                                }
                                                            >
                                                                Xem chi tiết
                                                            </Button>
                                                        </Space>
                                                    )}
                                                />
                                            </ColumnGroup>
                                        </Table>
                                    ) : (
                                        renderMobileView(cate)
                                    )}
                                </Panel>
                            </Collapse>
                        ))
                    ) : (
                        <Result
                            icon={<FrownOutlined />}
                            title="Không có Danh mục dịch vụ nào"
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default PricingContent;
