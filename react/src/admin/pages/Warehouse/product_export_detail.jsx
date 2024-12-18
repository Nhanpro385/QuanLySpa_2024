import { Button, Card, Table, Descriptions, Space } from "antd";
import React, { useEffect, useState } from "react";
import usewarehouseAction from "../../modules/warehouse/hooks/usewarehouseaction";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";


const ProductExportDetail = () => {
    const { id } = useParams();
    const warehouse = useSelector((state) => state.warehouse);
    const { getExportDetailAction } = usewarehouseAction();
    const [dataDetail, setDataDetail] = useState({});
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        getExportDetailAction(id);
    }, []);

    useEffect(() => {
        if (warehouse?.export?.detail?.data) {
            const detailData = warehouse?.export?.detail?.data;
            setDataDetail(detailData);
            setDataSource(
                detailData?.details?.map((item, index) => ({
                    key: index + 1,
                    name: item?.product?.name,
                    bar_code: item?.product?.bar_code,
                    old_quantity: item?.quantity_olded,
                    export_quantity: item?.quantity_export,
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
            title: "Mã vạch",
            dataIndex: "bar_code",
            key: "bar_code",
        },
        {
            title: "Số lượng tồn (cũ)",
            dataIndex: "old_quantity",
            key: "old_quantity",
        },
        {
            title: "Số lượng xuất",
            dataIndex: "export_quantity",
            key: "export_quantity",
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
        },
    ];

    return (
        <Card title={`Chi tiết xuất sản phẩm: #${id}`} bordered>
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* Mô tả thông tin xuất */}
                <Descriptions title="Thông tin xuất hàng" bordered column={2}>
                    <Descriptions.Item label="Mã xuất">
                        {dataDetail?.id || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {parseInt(dataDetail?.total_amount || 0).toLocaleString() + " VNĐ"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">
                        {dataDetail?.note || "Không có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {dataDetail?.status ? "Hoàn thành" : "Đang xử lý"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người tạo">
                        {dataDetail?.created_by?.name || "N/A"}
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
                    title={() => "Danh sách sản phẩm xuất"}
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

export default ProductExportDetail;
