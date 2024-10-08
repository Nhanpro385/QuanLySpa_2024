import React from "react";
import { Table, Button, Row, Col, Card, Progress } from "antd";
import {
    EllipsisOutlined,
    ClockCircleOutlined,
    FireOutlined,
} from "@ant-design/icons";
import fire from "../../assets/images/icons8-fire.gif";
import { useNavigate } from "react-router-dom";
function Promotions() {
    const navigate = useNavigate();
    const dataSource = [
        {
            key: "1",
            name: "Khuyến mãi tháng 4",
            condition: "Sale 40% cho hóa đơn 1 triệu",
            reduced: "40%",
            start_time: "01/04/2024",
            end_time: "30/04/2024",
            progress: 60,
            target: 500,
            achieved: 300,
        },
        {
            key: "2",
            name: "Khuyến mãi tháng 5",
            condition: "Giảm 30% cho khách hàng mới",
            reduced: "30%",
            start_time: "01/05/2024",
            end_time: "31/05/2024",
            progress: 45,
            target: 400,
            achieved: 180,
        },
        {
            key: "3",
            name: "Khuyến mãi mùa hè",
            condition: "Sale 50% cho tất cả dịch vụ",
            reduced: "50%",
            start_time: "01/06/2024",
            end_time: "30/06/2024",
            progress: 80,
            target: 600,
            achieved: 480,
        },
    ];

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Điều kiện áp dụng",
            dataIndex: "condition",
            key: "condition",
        },
        {
            title: "Giá giảm",
            dataIndex: "reduced",
            key: "reduced",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "end_time",
            key: "end_time",
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDelete(record.key)}
                    >
                        Xóa
                    </Button>
                </span>
            ),
        },
    ];

    const handleEdit = (key) => {
        console.log("Edit", key);
    };

    const handleDelete = (key) => {
        console.log("Delete", key);
    };

    const handleAdd = () => {
        navigate("/admin/promotions/add");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h2>Danh Sách Chương Trình Khuyến Mãi</h2>
                <Button type="primary" onClick={handleAdd}>
                    <FireOutlined />
                    Thêm mới chương trình
                </Button>
            </div>

            {/* Promotion Table */}
            <Table dataSource={dataSource} columns={columns} />

            {/* Promotion Cards */}
            <Row gutter={[16, 16]}>
                {dataSource.map((promotion) => (
                    <Col span={8} key={promotion.key}>
                        <Card
                            bordered={false}
                            actions={[<EllipsisOutlined key="ellipsis" />]}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <div>
                                <h4>{promotion.name}</h4>
                                <span>{promotion.condition}</span>
                                <Progress
                                    percent={promotion.progress}
                                    showInfo={false}
                                    strokeColor={{
                                        "0%": "#108ee9",
                                        "100%": "#87d068",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "12px",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <img src={fire} alt="fire" width="24px" />
                                    <span
                                        style={{
                                            fontSize: "19px",
                                        }}
                                    >
                                        {promotion.achieved}
                                    </span>
                                </div>
                                <div>
                                    <ClockCircleOutlined
                                        style={{ marginRight: "4px" }}
                                    />
                                    {promotion.achieved}/{promotion.target}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Promotions;
