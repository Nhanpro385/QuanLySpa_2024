import React, { useEffect, useState } from "react";
import { Row, Col, List, Card, Spin, Button, Result, Divider } from "antd";
import style from "../style/ServicesList.module.scss";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";
import { useSelector } from "react-redux";
import ServicesDetail from "./ServicesDetail";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";

const Services_List = () => {
    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [cateService, setCateService] = useState([]);
    const [loading, setLoading] = useState(true);
    const serviceCategories = useSelector((state) => state.serviceCategories);
    const [selectedCate, setSelectedCate] = useState(null);
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
    
    const onHandleClick = (item) => {
        setSelectedCate(item);
    };
    useEffect(() => {
        if (cateService.length > 0) {
            setSelectedCate(cateService[0]); // Select the first category
        }
    }, [cateService]);
    return (
        <div className="container">
            <Row justify="center">
                <Col
                    className={style.boxTitleServicesTop}
                    xl={18}
                    lg={16}
                    md={14}
                    sm={24}
                    xs={24}
                >
                   <Divider orientation="left">
                        <h2>Loại dịch vụ</h2>
                    </Divider>
                </Col>
            </Row>

            <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    {loading ? (
                        <Spin tip="Đang tải dịch vụ..." />
                    ) : cateService.length > 0 ? (
                        <List
                            grid={{
                                gutter: 16,
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 4,
                                xxl: 5,
                            }}
                            pagination={{
                                position: "bottom",
                                align: "center",
                            }}
                            dataSource={cateService}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card
                                        onClick={() => onHandleClick(item)}
                                        style={{ height: "100%" }}
                                        className={
                                            style.cardServices +
                                            " " +
                                            (selectedCate?.id === item.id
                                                ? style.active
                                                : "")
                                        }
                                        // title={item.title}
                                    >
                                        <div
                                            className={style.cardServicesTitle}
                                        >
                                            {item.name}
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div className={style.noServices}>
                            <Result
                                icon={<FrownOutlined />}
                                title="Không có Danh mục dịch vụ nào"
                                extra={
                                    <p>
                                        Hãy thử tải lại trang hoặc liên hệ với
                                        chúng tôi để được hỗ trợ
                                    </p>
                                }
                            />
                        </div>
                    )}
                </Col>
            </Row>
            <ServicesDetail listservices={selectedCate} />
        </div>
    );
};

export default Services_List;
