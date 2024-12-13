import { Button, Card, Col, Input, Row, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import useModal from "../../modules/appointments/hooks/openmodal";
import ModalDetailinventory from "../../modules/warehouse/compoments/modalDetailinventory";
import ModalHistoryInventory from "../../modules/warehouse/compoments/ModalHistoryInventory";
import { LoadingOutlined } from "@ant-design/icons";
const ProductInventory = () => {
    useEffect(() => {
        document.title = "Quản lý tồn kho";
    }, []);
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const {
        isModalOpen: isModalOpen2,
        showModal: showModal2,
        handleOk: handleOk2,
        handleCancel: handleCancel2,
    } = useModal();
    const warehouse = useSelector((state) => state.warehouse);
    console.log(warehouse);

    const {
        getInventoryAction,
        searchInventoryAction,
        getInventoryDetailAction,
        historyinventoryAction,
    } = usewarehouseAction();
    const [dataSource, setDataSource] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchquery, setSearchquery] = useState({
        page: 1,
        per_page: 10,
        search: "",
    });

    useEffect(() => {
        getInventoryAction();
    }, []);

    useEffect(() => {
        if (
            warehouse?.inventory?.data?.data &&
            warehouse?.inventory?.data?.data?.length > 0
        ) {
            setDataSource(
                warehouse?.inventory?.data?.data?.map((item, index) => ({
                    key: index + 1,
                    ...item,
                }))
            );

            setPagination(warehouse?.inventory?.data?.meta);
        }
    }, [warehouse.inventory]);
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: ["product", "name"],
            key: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity) =>
                quantity > 0 ? (
                    <Tag color="green">{quantity}</Tag>
                ) : (
                    <Tag color="red">{quantity}</Tag>
                ),
        },

        {
            title: "Ngày nhập",
            dataIndex: "date",
            key: "date",
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: "Hạn sử dụng",
            dataIndex: ["product", "date"],
            key: "date_expiration",
        },

        {
            title: "Thao tác",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        loading={warehouse?.inventory?.loading}
                        onClick={() => handleShowDetail(record.id)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleShowHistory(record)}
                    >
                        Lịch sử Nhập xuất
                    </Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        if (
            searchquery.search !== "" ||
            searchquery.page !== 1 ||
            searchquery.per_page !== 10
        ) {
            searchInventoryAction(searchquery);
        } else {
            getInventoryAction();
        }
    }, [searchquery]);
    const handelPageChange = (page, pageSize) => {
        setSearchquery({
            ...searchquery,
            page,
            per_page: pageSize,
        });
    };
    const debouncedSearch = debounce((value) => {
        setSearchquery({
            ...searchquery,
            search: value,
        });
    }, 500);
    const handleShowDetail = async (id) => {
        try {
            const res = await getInventoryDetailAction(id);
            console.log();

            showModal();
        } catch (error) {
            console.log(error);
        }
    };
    const handleShowHistory = async (record) => {
        try {
            const res = await historyinventoryAction(record?.product?.id);
            console.log(res);
            showModal2();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 className="text-center">Quản lý tồn kho sản phẩm </h1>
            <Card
                extra={
                    <Button
                        icon={<LoadingOutlined />}
                        type="primary"
                        loading={warehouse?.inventory?.loading}
                        onClick={() => getInventoryAction()}
                    >
                        Làm mới
                    </Button>
                }
            >
                {/* <Row>
                    <Col span={12} style={{ marginBottom: 10 }}>
                        <Select defaultValue="all" style={{ width: 120 }}>
                            <Select.Option value="all">Tất cả</Select.Option>
                            <Select.Option value="expired">
                                Hết hạn
                            </Select.Option>
                            <Select.Option value="nearly_expired">
                                Sắp hết hạn
                            </Select.Option>
                        </Select>
                    </Col>
                    <Col
                        span={12}
                        style={{ marginBottom: 10, textAlign: "right" }}
                    >
                        <Input.Search
                            onChange={(e) => debouncedSearch(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm"
                            style={{ width: 200 }}
                        />
                    </Col>
                </Row> */}
                <Table
                    columns={columns}
                    loading={warehouse.inventory.loading}
                    dataSource={dataSource}
                    pagination={{
                        current: pagination.current_page,
                        pageSize: pagination.per_page,
                        total: pagination.total,
                        showQuickJumper: true,
                        // showSizeChanger: true,
                        onChange: handelPageChange,
                        showTotal: (total) => `Tổng ${total} sản phẩm`,
                    }}
                />
            </Card>
            <ModalDetailinventory
                isOpen={isModalOpen}
                onClose={handleCancel}
                data={warehouse?.inventory?.detail?.data}
            />
            <ModalHistoryInventory
                isOpen={isModalOpen2}
                onClose={handleCancel2}
                data={warehouse?.inventory?.history?.data}
            />
        </div>
    );
};

export default ProductInventory;
