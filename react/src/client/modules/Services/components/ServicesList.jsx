import React, { useEffect, useState } from "react";
import { Row, Col, List, Card } from "antd";
import style from "../style/ServicesList.module.scss";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";
import { useSelector } from "react-redux";

const Services_List = () => {
    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [cateService, setCateService] = useState([]);
    const serviceCategories = useSelector((state) => state.serviceCategories);

    useEffect(() => {
        getServiceCategoriesClient();
    }, [getServiceCategoriesClient]);

    useEffect(() => {
        const categories = serviceCategories.ServiceCategories?.data ?? [];
        const filteredCategories = categories
            .filter((item) => item.services?.length > 0)
            .map((item) => ({
                key: item.id,
                title: item.name,
                description: item.description,
            }));
        setCateService(filteredCategories);
    }, [serviceCategories]);

    return (
        <div className={style.container}>
            <Row justify="center">
                <Col
                    className={style.boxTitleServicesTop}
                    xl={18}
                    lg={16}
                    md={18}
                    sm={22}
                    xs={24}
                >
                    <h1>Các Dịch Vụ Điều Trị Tại Sakura Spa</h1>
                </Col>
            </Row>
            <div className={style.boxServicesList}>
                <Row>
                    <Col span={24}>
                        <Row justify="center" gutter={[16, 16]}>
                            {cateService.length > 0 ? (
                                <List
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 4,
                                        lg: 4,
                                        xl: 6,
                                        xxl: 3,
                                    }}
                                    dataSource={cateService}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card title={item.title}>
                                                {item.description}
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <div className={style.noServices}>
                                    <p>
                                        Hiện không có dịch vụ nào để hiển thị.
                                    </p>
                                </div>
                            )}
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Services_List;
