import React from "react";
import { Button, Menu } from "antd";

const ServiceActions = ({
    record,
    onEdit,
    onDelete,
    onAddproduct,
    onEditproduct,
    onViewDetails,
}) => {
    const items = [
        {
            key: "1",
            label: (
                <Button block onClick={() => onEdit(record)}>
                    Sửa
                </Button>
            ),
        },
        {
            key: "2",
            label: (
                <Button block onClick={() => onViewDetails(record)}>
                    Chi tiết
                </Button>
            ),
        },
        {
            key: "3",
            label: (
                <Button block onClick={() => onAddproduct(record)}>
                    Thêm sản phẩm Dịch vụ
                </Button>
            ),
        },
        {
            key: "4",
            label: (
                <Button block danger onClick={() => onDelete(record)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return <Menu items={items} />;
};

export default ServiceActions;
