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
import Customer_history_Detail_modal from "./customer_history_Detail_modal";
import useModal from "../../appointments/hooks/openmodal";
// import style from "../style/staff_history_shift.module.scss";

dayjs.extend(customParseFormat);

const Appoiment_history_detail = ({ data }) => {
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
            title: "Thời gian bắt đầu",
            dataIndex: "start_time",
            key: "start_time",
            render: (text) => <Space>{text}</Space>,
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_price_services",
            key: "total_price_services",
            render: (text) => (
                <Space>
                    <DollarOutlined style={{ marginRight: "8px" }} />
                    {text?.toLocaleString() || 0} VND
                </Space>
            ),
        },
        {
            title: "Ngày hẹn",
            dataIndex: "appointment_date",
            key: "appointment_date",
            render: (text) => (
                <Space>
                    <CalendarOutlined style={{ marginRight: "8px" }} />
                    {text}
                </Space>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => <Tag color="green">{status}</Tag>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button 
                    type="primary"
                onClick={() => handleShowDetail(record)}>
                  Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div className="mt-3">
            <Table
                // className={style.table}
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={{ pageSize: 8 }}
            />

            <Customer_history_Detail_modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                appoitmentData={DataSelected}
            />
        </div>
    );
};

export default Appoiment_history_detail;