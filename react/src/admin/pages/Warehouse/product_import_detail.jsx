import { Button, Card, Table, Descriptions, Space } from "antd";
import React, { useEffect, useState } from "react";
import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";



const ProductImportDetail = () => {
    const { id } = useParams();
    const warehouse = useSelector((state) => state.warehouse);
    const { getImportDetailAction } = usewarehouseAction();
    const [dataDetail, setDataDetail] = useState({});
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        getImportDetailAction(id);
    }, []);

    useEffect(() => {
        if (warehouse?.import?.detail?.data) {
            const detailData = warehouse?.import?.detail?.data;
            setDataDetail(detailData);
            setDataSource(
                detailData?.details?.map((item, index) => ({
                    key: index + 1,
                    name: item?.product?.name,
                    sku: item?.product?.sku,
                    old_quantity: item?.quantity_olded,
                    import_quantity: item?.quantity_import,
                    old_import_price: parseInt(item?.cost_olded).toLocaleString() + " VNĐ",
                    new_import_price: parseInt(item?.cost_import).toLocaleString() + " VNĐ",
                    price: parseInt(item?.unit_price).toLocaleString() + " VNĐ",
                }))
            );
        }
    }, [warehouse]);

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "Số lượng tồn (cũ)",
            dataIndex: "old_quantity",
            key: "old_quantity",
        },
        {
            title: "Số lượng nhập (mới)",
            dataIndex: "import_quantity",
            key: "import_quantity",
        },
        {
            title: "Giá nhập (cũ)",
            dataIndex: "old_import_price",
            key: "old_import_price",
        },
        {
            title: "Giá nhập (mới)",
            dataIndex: "new_import_price",
            key: "new_import_price",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
        },
    ];

    return (
        <Card title={`Chi tiết nhập sản phẩm: #${id}`} bordered>
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* Mô tả thông tin nhập */}
                <Descriptions title="Thông tin nhập hàng" bordered column={2}>
                    <Descriptions.Item label="Mã nhập">
                        {dataDetail?.id || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {parseInt(dataDetail?.total_amount || 0).toLocaleString() + " VNĐ"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhà cung cấp">
                        {dataDetail?.supplier?.name || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Liên hệ nhà cung cấp">
                        {dataDetail?.supplier?.contact || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">
                        {dataDetail?.note || "Không có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {dataDetail?.status === 1 ? "Hoàn thành" : "Đang xử lý"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {dayjs(dataDetail?.created_at).format(
                            "DD/MM/YYYY HH:mm"
                        ) || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {dayjs(dataDetail?.updated_at).format(
                            "DD/MM/YYYY HH:mm"
                        ) || "N/A"}
                    </Descriptions.Item>
                </Descriptions>

                {/* Bảng chi tiết sản phẩm */}
                <Table
                    title={() => "Danh sách sản phẩm nhập"}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                    }}
                    bordered
                />
            </Space>

            <Button
                type="primary"
                style={{ marginTop: "16px" }}
                onClick={() => {
                    window.history.back();
                }}
            >
                Quay lại
            </Button>
        </Card>
    );
};

export default ProductImportDetail;
