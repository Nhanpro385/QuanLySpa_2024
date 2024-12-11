import React from "react";
import { Table, Button, Dropdown, Space, Tag, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const StreatmentsTable = ({
    sreatment,
    handelDetail,
    handleDelete,
    loading,
    handelPageChange,
    pageconfig,
}) => {
    const navigate = useNavigate();
    const dataSource = sreatment.map((item, index) => ({
        ...item,
        key: index,
    }));


    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            render: (text, record) => record?.customer?.name || "Không có",
        },
        {
            title: "Tổng số tiền",
            dataIndex: "payment_total",
            key: "payment_total",
            render: (text, record) =>
                record.payment_total.toLocaleString() + " VNĐ",
        },
        {
            title: "Ngày Điều trị",
            dataIndex: "appointment_date",
            key: "appointment_date",
            render: (text, record) =>
                record?.appointment?.appointment_date || "Không có",
        },
        {
            title: "Phản hồi ",
            dataIndex: "feedback",
            key: "feedback",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                if (record?.status === 1) {
                    return <Tag color="green">Đã hoàn thành</Tag>;
                } else {
                    return <Tag color="red">Chưa hoàn thành</Tag>;
                }
            },
        },
        {
            title: "Thao Tác",
            key: "action",
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: (
                                    <Button
                                        block
                                        onClick={() =>
                                            navigate(
                                                `/admin/khachhang/lichsutrilieu/chinhsua/${record?.id}`
                                            )
                                        }
                                    >
                                        {" "}
                                        Sửa{" "}
                                    </Button>
                                ),
                            },
                            {
                                key: "2",
                                label: (
                                    <Button
                                        block
                                        onClick={() => handelDetail(record)}
                                    >
                                        {" "}
                                        Chi tiết{" "}
                                    </Button>
                                ),
                            },
                            {
                                key: "3",
                                label: (
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        onConfirm={() =>
                                            handleDelete(record.id)
                                        }
                                        okText="Có"
                                        cancelText="Không"
                                    >
                                        <Button block danger>
                                            {" "}
                                            Xóa{" "}
                                        </Button>
                                    </Popconfirm>
                                ),
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <Button type="primary" onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hành động
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            ),
        },
    ];

    const items = [
        { key: "1", label: <Button block> Sửa </Button> },
        { key: "2", label: <Button block> Chi tiết </Button> },
        {
            key: "3",
            label: (
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <Table
        scroll={{ x: 768 }}
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{
                current: pageconfig.current_page,
                pageSize: pageconfig.per_page,
                total: pageconfig.total,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                onChange: handelPageChange,
                showTotal: (total) => `Tổng ${total} khách hàng`,
            }}
        />
    );
};

export default StreatmentsTable;
