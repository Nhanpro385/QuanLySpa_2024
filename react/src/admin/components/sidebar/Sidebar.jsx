import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SolutionOutlined,
    CalendarOutlined,
    ShoppingOutlined,
    TagsOutlined,
    ShopOutlined,
    SettingOutlined,
    CommentOutlined, // Thêm icon cho mục quản lý bình luận
    PhoneOutlined, // Thêm icon cho mục quản lý liên hệ
} from "@ant-design/icons"; // Thêm các icon khác từ @ant-design/icons
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
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
    // Trang chủ
    getItem(
        <Link
            className="text-decoration-none text-black fs-2 text-center"
            to="/admin"
        >
            Sakura spa
        </Link>,
        "1"
    ),

    // Quản lý khách hàng
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/khachhang"
        >
            Quản lý khách Hàng
        </Link>,
        "sub1",
        <UserOutlined />, // Icon quản lý khách hàng
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

    // Quản lý lịch hẹn
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/appointments"
        >
            Quản lý lịch hẹn
        </Link>,
        "sub2",
        <CalendarOutlined />, // Icon lịch hẹn
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/appointments"
                >
                    Danh sách lịch hẹn
                </Link>,
                "5"
            ),
        ]
    ),

    // Quản lý nhân viên
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/nhanvien"
        >
            Quản lý nhân viên
        </Link>,
        "sub3",
        <TeamOutlined />, // Icon quản lý nhân viên
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien"
                >
                    Danh sách nhân viên
                </Link>,
                "7"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/them"
                >
                    Thêm nhân viên
                </Link>,

                "6"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/chucvu"
                >
                    Chức vụ
                </Link>,
                "21"
            ),
        ]
    ),

    // Quản lý dịch vụ
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/services"
        >
            Quản lý dịch vụ
        </Link>,
        "sub4",
        <SolutionOutlined />, // Icon dịch vụ
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/services"
                >
                    Danh sách dịch vụ
                </Link>,
                "8"
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
        ]
    ),

    // Quản lý sản phẩm
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/products"
        >
            Quản lý sản phẩm
        </Link>,
        "sub5",
        <ShoppingOutlined />, // Icon sản phẩm
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products"
                >
                    Danh sách sản phẩm
                </Link>,
                "9"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products/add"
                >
                    Thêm sản phẩm
                </Link>,
                "10"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/product_categories"
                >
                    Danh mục sản phẩm
                </Link>,
                "12"
            ),
        ]
    ),

    // Quản lý khuyến mãi
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/promotions"
        >
            Quản lý khuyến mãi
        </Link>,
        "sub6",
        <TagsOutlined />, // Icon khuyến mãi
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/promotions"
                >
                    Danh sách khuyến mãi
                </Link>,
                "11"
            ),
        ]
    ),

    // Quản lý kho
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/warehouse"
        >
            Quản lý kho
        </Link>,
        "14",
        <ShopOutlined />, // Icon kho
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse"
                >
                    Danh sách kho
                </Link>,
                "15"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/import"
                >
                    Nhập kho
                </Link>,
                "16"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/export"
                >
                    Xuất kho
                </Link>,
                "17"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/inventory"
                >
                    Quản lý Tồn Kho
                </Link>,
                "20"
            ),
        ]
    ),

    // Quản lý ca làm việc
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/shifmanagement"
        >
            Quản Ca Làm Việc
        </Link>,
        "sub7",
        <SettingOutlined /> // Icon ca làm việc
    ),

    // Quản lý bình luận và đánh giá
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/CommentManagement"
        >
            Quản lý bình luận và đánh giá
        </Link>,
        "18",
        <CommentOutlined /> // Icon bình luận
    ),

    // Quản lý liên hệ
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/ContactManagement"
        >
            Quản lý liên hệ
        </Link>,
        "19",
        <PhoneOutlined /> // Icon liên hệ
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/thanhtoan"
        >
            Quản lý thanh toán
        </Link>,
        "2",
        <DesktopOutlined />
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
