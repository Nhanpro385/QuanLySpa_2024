import React, { useEffect, useState } from "react";
import { Row, Col, List, Card, Spin, Button } from "antd";
import style from "../style/ServicesList.module.scss";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";
import { useSelector } from "react-redux";
import ServicesDetail from "./ServicesDetail";

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
                    <h1>Loại dịch vụ tại Sapa Sakura </h1>
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
                                        className={
                                            style.cardServices +
                                            " " +
                                            (selectedCate?.id === item.id
                                                ? style.active
                                                : "")
                                        }
                                        title={item.title}
                                    >
                                        {item.name}
                                    </Card>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div className={style.noServices}>
                            <p>Hiện không có dịch vụ nào để hiển thị.</p>
                        </div>
                    )}
                </Col>
            </Row>
            <ServicesDetail listservices={selectedCate} />
        </div>
    );
};

export default Services_List;
