import React from "react";
import { Button, Menu } from "antd";

const ServiceActions = ({ record, onEdit, onDelete, onViewDetails }) => {
    const items = [
        { key: "1", label: <Button onClick={() => onEdit(record)}>Sửa</Button> },
        { key: "2", label: <Button onClick={() => onViewDetails(record)}>Chi tiết</Button> },
        { key: "3", label: <Button danger onClick={() => onDelete(record.id)}>Xóa</Button> },
    ];

    return <Menu items={items} />;
};

export default ServiceActions;
