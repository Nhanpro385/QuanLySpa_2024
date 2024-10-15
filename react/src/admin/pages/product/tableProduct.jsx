import React from 'react';
import { Table, Button, Dropdown, Space ,Popconfirm  } from 'antd';

import { DownOutlined } from '@ant-design/icons';
const TableProduct = ({ dataSource, handleEdit, handleDelete }) => {
    const items = [
        {
            key: "1",
            label: <Button block> Sửa </Button>,
        },
        {
            key: "2",
            label: <Button block> Chi tiết </Button>,
        },
        {
            key: "4",
            label: (
                
                <Button block danger>
                    Xóa
                </Button>
            ),
        },
    ];
    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record.key);
                break;
            case "2":
                navigate("/admin/appointments/detail/" + record.key);
                break;
            case "3":
                    
                break;
            case "4":
                handleDelete(record.key);
                break;
            default:
                break;
        }
    };
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh",
            dataIndex: "image_url",
            key: "image_url",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Dung tích",
            dataIndex: "capacity",
            key: "capacity",
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            
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
    return (
        <Table dataSource={dataSource} columns={columns} />
    );
}
export default TableProduct;