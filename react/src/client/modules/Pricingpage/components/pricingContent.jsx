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
} from "antd";
const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const { Text } = Typography;
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

    useEffect(() => {
        getServiceCategoriesClient(50);
    }, []);

    useEffect(() => {
        console.log(serviceCategories);

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };
    const isServiceNew = (createdAt) => {
        const createdDate = new Date(createdAt); // Chuyển đổi ngày tạo
        const currentDate = new Date(); // Ngày hiện tại

        // Tính sự chênh lệch ngày (đơn vị: milliseconds)
        const diffTime = currentDate - createdDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24); // Chuyển đổi sang ngày

        return diffDays <= 7; // True nếu <= 7 ngày
    };
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
                                <Panel header={cate.name} key={index}>
                                    <Table
                                        bordered={true}
                                        pagination={false}
                                        dataSource={cate?.service?.map(
                                            (e, index) => ({
                                                key: index,
                                                ...e,
                                            })
                                        )}
                                    >
                                        <Column
                                            rowScope={2}
                                            title={
                                                <div>
                                                    <p
                                                        style={{
                                                            fontSize: "2rem",

                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Danh sách các dịch vụ
                                                    </p>
                                                </div>
                                            }
                                            dataIndex="name"
                                            key="name"
                                            render={(name, record) => (
                                                <Space>
                                                    <Text strong>{name}</Text>
                                                    {isServiceNew(
                                                        record.created_at
                                                    ) && (
                                                      <Tag color="#e05265">Mới</Tag>

                                                    )}
                                                </Space>
                                            )}
                                        />
                                        <ColumnGroup
                                            style={{
                                                backgroundColor: "#FFDCDC",
                                            }}
                                            title="Điều trị vùng da mặt"
                                        >
                                            <Column
                                                title="Giá niêm yết"
                                                dataIndex="price"
                                                key="price"
                                                align="center"
                                                render={(price) =>
                                                    parseInt(
                                                        price
                                                    ).toLocaleString() + " VNĐ"
                                                }
                                            />
                                            <Column
                                                title="Thao tác"
                                                key="action"
                                                align="center"
                                                dataIndex="action"
                                                render={(text, record) => (
                                                    <Button
                                                        type="primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/datlichhen?dichvu=${record.id}`
                                                            )
                                                        }
                                                    >
                                                        Đặt lịch
                                                    </Button>
                                                )}
                                            />
                                        </ColumnGroup>
                                    </Table>
                                </Panel>
                            </Collapse>
                        ))
                    ) : (
                        <Result
                            icon={<FrownOutlined />}
                            title="Không có Danh mục dịch ?vụ nào"
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default PricingContent;
