import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SolutionOutlined,
    CalendarOutlined,
    ShoppingOutlined,
    TagsOutlined,
    ShopOutlined,
    SettingOutlined,
    CommentOutlined,
    PhoneOutlined,
    HomeFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { get } from "react-hook-form";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(
        <Link className="text-decoration-none text-black fs-4" to="/admin">
            Trang chủ
        </Link>,
        "1",
        <HomeFilled />
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/khachhang"
        >
            Quản lý khách Hàng
        </Link>,
        "2",
        <UserOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/khachhang"
                >
                    Danh sách khách hàng
                </Link>,
                "3"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/khachhang/them"
                >
                    Thêm khách hàng
                </Link>,
                "4"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/lichhen"
        >
            Quản lý lịch hẹn
        </Link>,
        "5",
        <CalendarOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/lichhen"
                >
                    Danh sách lịch hẹn
                </Link>,
                "6"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/lichhen/them"
                >
                    Thêm lịch hẹn
                </Link>,
                "7"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/nhanvien"
        >
            Quản lý nhân viên
        </Link>,
        "7",
        <TeamOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien"
                >
                    Danh sách nhân viên
                </Link>,
                "8"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/them"
                >
                    Thêm nhân viên
                </Link>,
                "9"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/chucvu"
                >
                    Chức vụ
                </Link>,
                "10"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/services"
        >
            Quản lý dịch vụ
        </Link>,
        "11",
        <SolutionOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/services"
                >
                    Danh sách dịch vụ
                </Link>,
                "12"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/categoriesService"
                >
                    Danh mục dịch vụ
                </Link>,
                "13"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/services/them"
                >
                    Thêm dịch vụ
                </Link>,
                "14"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/products"
        >
            Quản lý sản phẩm
        </Link>,
        "14",
        <ShoppingOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products"
                >
                    Danh sách sản phẩm
                </Link>,
                "15"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products/add"
                >
                    Thêm sản phẩm
                </Link>,
                "16"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/product_categories"
                >
                    Danh mục sản phẩm
                </Link>,
                "17"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/promotions"
        >
            Quản lý khuyến mãi
        </Link>,
        "18",
        <TagsOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/promotions"
                >
                    Danh sách khuyến mãi
                </Link>,
                "19"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/warehouse"
        >
            Quản lý kho
        </Link>,
        "20",
        <ShopOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse"
                >
                    Danh sách kho
                </Link>,
                "21"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/import"
                >
                    Nhập kho
                </Link>,
                "22"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/export"
                >
                    Xuất kho
                </Link>,
                "23"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/inventory"
                >
                    Quản lý Tồn Kho
                </Link>,
                "24"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/shifmanagement"
        >
            Quản lý ca làm việc
        </Link>,
        "25",
        <SettingOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/shifmanagement"
                >
                    Quản lý ca làm việc
                </Link>,
                "26"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/CommentManagement"
        >
            Quản lý bình luận và đánh giá
        </Link>,
        "27",
        <CommentOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/CommentManagement"
                >
                    Danh sách bình luận
                </Link>,
                "28"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/ContactManagement"
        >
            Quản lý liên hệ
        </Link>,
        "29",
        <PhoneOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/ContactManagement"
                >
                    Danh sách liên hệ
                </Link>,
                "30"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/thanhtoan"
        >
            Quản lý thanh toán
        </Link>,
        "31",
        <DesktopOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/thanhtoan"
                >
                    Quản lý thanh toán
                </Link>,
                "32"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/nhacungcap"
        >
            Quản lý Nhà Cung Cấp
        </Link>,
        "33",
        <FileOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhacungcap"
                >
                    Quản lý Nhà Cung Cấp
                </Link>,
                "34"
            ),
        ]
    ),
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme="light"
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
            />
        </Sider>
    );
}

export default Sidebar;
