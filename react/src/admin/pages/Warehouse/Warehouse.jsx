import { DownOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import dayjs from "dayjs";
const Warehouse = () => {
    const navigate = useNavigate();
    const [selectedFunction, setSelectedFunction] = useState("import");
    const warehouse = useSelector((state) => state.warehouse);
    const {
        warehouseGetExport,
        warehouseGetImport,
        searchWarehouseExportAction,
        searchWarehouseImportAction,
    } = usewarehouseAction();
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchquery, setSearchquery] = useState({
        page: 1,
        per_page: 10,
        search: "",
    });
    useEffect(() => {
        if (selectedFunction === "import") {
            setDataSource([]);
            warehouseGetImport();
        } else {
            setDataSource([]);
            warehouseGetExport();
        }
    }, [selectedFunction]);

    useEffect(() => {
        if (
            selectedFunction == "import" &&
            warehouse?.import?.data?.data?.length > 0
        ) {
            setDataSource(
                warehouse.import.data.data.map((item, index) => ({
                    key: index + 1,
                    ...item,
                }))
            );
            setPagination(warehouse.import.data.meta);
        } else if (
            selectedFunction == "export" &&
            warehouse?.export?.data?.data?.length > 0
        ) {
            setDataSource(
                warehouse.export.data.data.map((item, index) => ({
                    key: index + 1,
                    ...item,
                }))
            );
            setPagination(warehouse.export.data.meta);
        }
    }, [warehouse]);
    useEffect(() => {
        if (selectedFunction == "import") {
            if (
                searchquery.search !== "" ||
                searchquery.page !== 1 ||
                searchquery.per_page !== 10
            ) {
                console.log(searchquery);
                searchWarehouseImportAction(searchquery);
            } else {
                warehouseGetImport();
            }
        } else {
            if (
                searchquery.search !== "" ||
                searchquery.page !== 1 ||
                searchquery.per_page !== 10
            ) {
                searchWarehouseExportAction(searchquery);
            } else {
                warehouseGetExport();
            }
        }
    }, [searchquery]);

    const handleFunctionChange = (value) => {
        setSelectedFunction(value);
    };
    const handlePageChange = (page, pageSize) => {
        setSearchquery({ ...searchquery, page, per_page: pageSize });
    };
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                if (selectedFunction == "import") {
                    navigate("/admin/warehouse/import/detail/" + record.id);
                } else {
                    navigate("/admin/warehouse/export/detail/" + record.id);
                }
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

    const items = [
        {
            key: "1",
            label: <Button block>Sửa</Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết hàng nhập </Button>,
        },
    ];

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },

        {
            title: "Người chịu trách nhiệm",
            dataIndex: ["created_by", "name"],
            key: "created_by",
            render: (text) => <span>{text || "Sử dụng trong hệ thống"}</span>,
        },
        {
            title: "Số lượng",
            dataIndex: ["details", "quantity"],
            key: "quantity",
            render: (text, record) =>
                record.details.reduce(
                    (a, b) => a + (b.quantity_export || b.quantity_import),
                    0
                ),
        },
        {
            title: "Tổng giá",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (text) => (
                <span>{parseInt(text).toLocaleString()} VNĐ</span>
            ),
        },
        {
            title: "Ngày nhập",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
        },

        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) =>
                text === 1 || text == true ? (
                    <Tag color="green">Đã xác nhận</Tag>
                ) : (
                    <Tag color="red">Chưa xác nhận</Tag>
                ),
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
        if (selectedFunction == "import") {
            navigate("/admin/warehouse/import");
        } else {
            navigate("/admin/warehouse/export");
        }
    };
    const handleEdit = (record) => {
        if (selectedFunction == "import") {
            navigate("/admin/warehouse/import/Edit/" + record.id);
        } else {
            navigate("/admin/warehouse/export/Edit/" + record.id);
        }
    };
    return (
        <Card
            title="Quản lý Kho hàng"
            extra={
                <Button
                    type="primary"
                    icon={<LoadingOutlined />}
                    onClick={() => selectedFunction === "import" ? warehouseGetImport() : warehouseGetExport()}
                    loading={warehouse.import.loading || warehouse.export.loading}
                >
                    Làm mới
                </Button>
            }
        >
            <Row gutter={[16, 16]} className="mb-3" align="middle">
                <Col xl={3} md={6} xs={24}>
                    <h4>Chọn chức năng: </h4>
                </Col>
                <Col xl={6} md={6} xs={24}>
                    <Radio.Group
                        block
                        options={options}
                        onChange={(e) => handleFunctionChange(e.target.value)}
                        value={selectedFunction}
                        optionType="button"
                    />
                </Col>
                {/* <Col xl={4} md={6} xs={24}>
                    <Input.Search placeholder="Tìm kiếm" enterButton />
                </Col> */}
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
            <Table
                dataSource={dataSource}
                scroll={{ x: 768 }}
                columns={columns}
                loading={warehouse.import.loading || warehouse.export.loading}
                pagination={{
                    current: pagination.current_page,
                    pageSize: pagination.per_page,
                    total: pagination.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `Tổng ${total} mục`,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    responsive: true,
                    onChange: handlePageChange,
                }}
            />
        </Card>
    );
};

export default Warehouse;
