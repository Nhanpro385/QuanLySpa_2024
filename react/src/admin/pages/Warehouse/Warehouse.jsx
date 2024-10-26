import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Input,
    Radio,
    Row,
    Space,
    Table,
    Tag,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Warehouse = () => {
    const navigate = useNavigate();
    const [selectedFunction, setSelectedFunction] = useState("import"); // State lưu giá trị chức năng chọn

    const onClick = ({ key, record }) => {
        console.log(record);

        switch (key) {
            case "1":
                console.log("Edit");
                break;
            case "2":
                navigate("/admin/warehouse/import/" + record.key);
                break;
            case "3":
                console.log("History");
                break;
            case "4":
                console.log("Delete");
                break;
            default:
                break;
        }
    };

    const dataSource = [
        {
            key: "1",
            name: "Mặt nạ y tế",
            responsible: "Trần Phi Hào",
            quantity: 3000,
            total_price: "10.000.000",
            import_date: "23/9/2024",
            expiration_date: "23/9/2025",
            status: <Tag color="green">Còn hàng</Tag>,
        },
    ];

    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết hàng nhập </Button>,
        },
        {
            key: "4",
            label: (
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Người chịu trách nhiệm",
            dataIndex: "responsible",
            key: "responsible",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Tổng giá",
            dataIndex: "total_price",
            key: "total_price",
        },
        {
            title: "Ngày nhập",
            dataIndex: "import_date",
            key: "import_date",
        },
        {
            title: "Ngày hết hạn",
            dataIndex: "expiration_date",
            key: "expiration_date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },

        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <span>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (e) => onClick({ key: e.key, record }),
                        }}
                        trigger={["click"]}
                    >
                        <Button
                            type="primary"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Space>
                                Hành động
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </span>
            ),
        },
    ];

    const options = [
        { label: "Nhập hàng", value: "import" },
        { label: "Xuất hàng", value: "export" },
    ];
    const importandexport = (selectedFunction) => {
        if (selectedFunction === "import") {
            navigate("/admin/warehouse/import");
        } else {
            navigate("/admin/warehouse/export");
        }
    }
    return (
        <Card title="Quản lý Kho hàng">
            <Row gutter={[16, 16]} className="mb-3" align="middle">
                <Col xl={3} md={6} xs={24}>
                    <h4>Chọn chức năng: </h4>
                </Col>
                <Col xl={6} md={6} xs={24}>
                    <Radio.Group
                        block
                        options={options}
                        onChange={(e) => setSelectedFunction(e.target.value)} // Cập nhật chức năng khi thay đổi
                        value={selectedFunction}
                        optionType="button"
                    />
                </Col>
                <Col xl={4} md={6} xs={24}>
                    <Input.Search placeholder="Tìm kiếm" enterButton />
                </Col>
                <Col xl={3} md={6} xs={24}>
                    <Button
                        block
                        type="primary"
                        onClick={() => importandexport(selectedFunction)}
                    >
                        <PlusOutlined />
                        {/* Thay đổi nút theo chức năng đã chọn */}
                        {selectedFunction === "import"
                            ? "Nhập hàng"
                            : "Xuất hàng"}
                    </Button>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
        </Card>
    );
};

export default Warehouse;
