import React from "react";
import { Table, Button, Tag, Space } from "antd";
import {
    CalendarOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    RightCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Customer_history_Detail_modal_consulations from "./customer_history_Detail_modal_consulations";
import useModal from "../../appointments/hooks/openmodal";

// Extend dayjs with the custom parse format plugin
dayjs.extend(customParseFormat);

const Customer_history_consulations = ({ data }) => {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [DataSelected, setDataSelected] = React.useState({});

    const handleShowDetail = (data) => {
        setDataSelected(() => data);
        showModal();
    };

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên khách hàng",
            dataIndex: ["customer", "full_name"],
            key: "full_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: ["customer", "phone"],
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: ["customer", "email"],
            key: "email",
        },

        {
            title: "Nhân viên phụ trách",
            dataIndex: ["staff_id", "fullname"],
            key: "fullname",
            render: (text) => <Space>{text || "Chưa cập nhật"}</Space>,
        },
        {
            title: "Thời gian bắt đầu",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => (
                <Space>{dayjs(text).format("DD/MM/YYYY HH:mm")}</Space>
            ),
        },
        {
            title: "Kế hoạch điều trị",
            dataIndex: "treatment_plan",
            key: "treatment_plan",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === 0 ? (
                    <Tag color="red">Chưa hoàn thành</Tag>
                ) : (
                    <Tag color="green">Đã hoàn thành</Tag>
                ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleShowDetail(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div className="mt-3">
            <Table
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 8 }}
            />

            <Customer_history_Detail_modal_consulations
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                appoitmentData={DataSelected}
            />
        </div>
    );
};

export default Customer_history_consulations;
