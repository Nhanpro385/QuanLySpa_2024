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
    List
} from "antd";
const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const { Text } = Typography;
import baner from "../../../assets/images/banderprice.png";
import useServiceCategoriesActions from "../../../../admin/modules/services/hooks/useServiceCategories";

import { useSelector } from "react-redux";

const PricingContent = () => {

    const { getServiceCategoriesClient } = useServiceCategoriesActions();
    const [cateService, setCateService] = useState([]);
    const [loading, setLoading] = useState(true);
    const serviceCategories = useSelector((state) => state.serviceCategories);

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const data = cateService.flatMap((cate) =>
        cate.service.map((service, index) => ({
            key: `${cate.id}-${index}`,
            serviceName: service.name,
            price: service.price,
            action: (
                <>
                    <Button size="small" shape="round" type="primary">
                        Đặt lịch
                    </Button>
                    <Divider type="vertical" />
                    <Button size="small" shape="round" type="primary">
                        Tư vấn
                    </Button>
                </>
            ),
        }))
    );

    // const data = [
    //     {
    //         key: "1",
    //         serviceName: (
    //             <span>
    //                 Điều trị mụn chuẩn y khoa <Tag color="#E05265">Hot</Tag>
    //             </span>
    //         ),
    //         price: "1.000.000",
    //         priceHSSV: "500.000",
    //         action: (
    //             <>
    //                 <Button size="small" shape="round" type="primary">
    //                     Đặt lịch
    //                 </Button>
    //                 <Divider type="vertical" />
    //                 <Button size="small" shape="round" type="primary">
    //                     Tư vấn
    //                 </Button>
    //             </>
    //         ),
    //     },
    //     {
    //         key: "2",
    //         serviceName: (
    //             <span>
    //                 Chiếu ánh sáng sinh học{" "}
    //                 <Tag color="#E05265">Khuyến mãi</Tag>
    //             </span>
    //         ),
    //         price: (
    //             <div>
    //                 <Text delete>1.000.000</Text>
    //                 <Divider type="vertical" />
    //                 <Text>800.000</Text>
    //             </div>
    //         ),
    //         priceHSSV: "500.000",
    //         style: {
    //             backgroundColor: "#FFDCDC",
    //         },
    //         action: (
    //             <>
    //                 <Button size="small" shape="round" type="primary">
    //                     Đặt lịch
    //                 </Button>
    //                 <Divider type="vertical" />
    //                 <Button size="small" shape="round" type="primary">
    //                     Tư vấn
    //                 </Button>
    //             </>
    //         ),
    //     },
    //     {
    //         key: "3",
    //         serviceName: "Mặt nạ điều trị mụn và kiểm soát nhờn",
    //         price: "1.000.000",
    //         priceHSSV: "500.000",
    //         action: (
    //             <>
    //                 <Button size="small" shape="round" type="primary">
    //                     Đặt lịch
    //                 </Button>
    //                 <Divider type="vertical" />
    //                 <Button size="small" shape="round" type="primary">
    //                     Tư vấn
    //                 </Button>
    //             </>
    //         ),
    //     },
    //     {
    //         key: "4",
    //         serviceName: "Lấy nhân mụn Y khoa",
    //         price: "1.000.000",
    //         priceHSSV: "500.000",
    //         action: (
    //             <>
    //                 <Button size="small" shape="round" type="primary">
    //                     Đặt lịch
    //                 </Button>
    //                 <Divider type="vertical" />
    //                 <Button size="small" shape="round" type="primary">
    //                     Tư vấn
    //                 </Button>
    //             </>
    //         ),
    //     },
    // ];
    
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
                <Col span={24} className="container">
                    <Collapse defaultActiveKey={["1"]} size="large" accordion>
                        <Panel header="Bảng giá dịch vụ trị mụn" key="1">
                            <Table
                                bordered={true}
                                pagination={false}
                                dataSource={data}
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
                                    dataIndex="serviceName"
                                    key="serviceName"
                                />
                                <ColumnGroup
                                    style={{ backgroundColor: "#FFDCDC" }}
                                    title="Điều trị vùng da mặt"
                                >
                                    <Column
                                        title="Giá niêm yết"
                                        dataIndex="price"
                                        key="price"
                                        align="center"
                                        render={(price) => formatPrice(price)}
                                    />
                                    <Column
                                        title="Thao tác"
                                        key="action"
                                        align="center"
                                        dataIndex="action"
                                    />
                                </ColumnGroup>
                            </Table>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export default PricingContent;
