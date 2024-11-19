import React from "react";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ShiftActions = ({ onClick, record }) => {
    const items = [
        { key: "1", label: <Button block>Sửa Ca Làm</Button> },
        { key: "2", label: <Button block>Chi tiết Ca</Button> },
        {
            key: "4",
            label: (
                <Button block danger>
                    Xóa Ca
                </Button>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items, onClick: (key) => onClick(key, record) }}
            trigger={["click"]}
        >
            <Button type="primary">
                <Space>
                    Hành động
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};

export default ShiftActions;
