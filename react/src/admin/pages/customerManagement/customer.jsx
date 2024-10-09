import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Card,
    Input,
    Row,
    Col,
    Dropdown,
    Space,
    Select,
    message,
    Form,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    CustomerGet,
    CustomerUpdate,
    CustomerDelete,
} from "../../redux/slices/CustomerSlice"; // Ensure you have an update action
import ModalEditCustomer from "../../modules/Customer/compoment/modaledit";
import useModal from "../../modules/appointments/hooks/openmodal";

function Customer() {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector(
        (state) => state.customers
    );
    const navigate = useNavigate();
    const { isModalOpen, showModal, handleCancel } = useModal();
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [formErrors, setFormErrors] = useState({}); // Trạng thái lỗi cho form

    useEffect(() => {
        dispatch(CustomerGet());
    }, [dispatch]);

    const onClick = ({ key, record }) => {
        switch (key) {
            case "1":
                handleEdit(record);
                break;
            case "2":
                navigate(`/admin/user/Detail/${record.id}`);
                break;
            case "3":
                navigate(`/admin/khachhang/lichsugiaodich/${record.id}`);
                break;
            case "4":
                handleDelete(record.id);
                break;
            default:
                break;
        }
    };

    const handleEdit = (record) => {
        setCurrentCustomer(record);
        showModal();
    };

    const handleEditSubmit = async (updatedCustomer) => {
        setFormErrors({});

        const errors = {};

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const resultAction = await dispatch(
                CustomerUpdate(updatedCustomer)
            );
            if (CustomerUpdate.fulfilled.match(resultAction)) {
                message.success("Khách hàng đã được cập nhật");
                handleCancel();
            } else {
                message.error("Cập nhật khách hàng không thành công");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi khi cập nhật khách hàng");
        }
    };

    const handleDelete = (id) => {
        dispatch(CustomerDelete(id));
        message.success("Khách hàng đã được xóa");
    };

    const dataSource = (customers.data || []).map((item) => ({
        ...item,
        key: item.id,
    }));

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Năm Sinh",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: "Tuổi",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Thao Tác",
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
            key: "3",
            label: <Button block> Lịch sử giao dịch </Button>,
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

    return (
        <Card>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h2>Danh Sách Người Dùng</h2>

                <Link to="/admin/khachhang/them">
                    <Button block type="primary">
                        <PlusOutlined />
                        Thêm Người Dùng mới
                    </Button>
                </Link>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={3}>
                    <Select
                        style={{ width: 120 }}
                        className="mb-3 w-100"
                        placeholder="Giới tính"
                    >
                        <Select.Option value="nam">Nam</Select.Option>
                        <Select.Option value="nu">Nữ</Select.Option>
                    </Select>
                </Col>
                <Col span={5}>
                    <Input.Search placeholder="Tìm kiếm......" />
                </Col>
            </Row>

            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            {/* Modal for editing customer */}
            <ModalEditCustomer
                isModalOpen={isModalOpen}
                handleOk={handleEditSubmit}
                customer={currentCustomer}
                handleCancel={handleCancel}
                formErrors={formErrors} // Truyền lỗi tới modal
            />
        </Card>
    );
}

export default Customer;
