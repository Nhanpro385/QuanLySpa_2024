import React, { useState } from "react";
import {
    MenuOutlined,
    HomeFilled,
    UserOutlined,
    CalendarOutlined,
    TeamOutlined,
    SolutionOutlined,
    ShoppingOutlined,
    TagsOutlined,
    ShopOutlined,
    SettingOutlined,
    CommentOutlined,
    PhoneOutlined,
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
        disabled: false,
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
            Quản lý khách hàng
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
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/khachhang/lichsutrilieu"
                >
                    Lịch sử trị liệu
                </Link>,
                "5"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/khachhang/lichsutrilieu/them"
                >
                    Thêm lịch sử trị liệu
                </Link>,
                "6"
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
        "7",
        <CalendarOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/lichhen"
                >
                    Danh sách lịch hẹn
                </Link>,
                "8"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/lichhen/them"
                >
                    Thêm lịch hẹn
                </Link>,
                "9"
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
        "10",
        <TeamOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien"
                >
                    Danh sách nhân viên
                </Link>,
                "11"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/them"
                >
                    Thêm nhân viên
                </Link>,
                "12"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhanvien/chucvu"
                >
                    Chức vụ
                </Link>,
                "13"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/dichvu"
        >
            Quản lý dịch vụ
        </Link>,
        "14",
        <SolutionOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/dichvu"
                >
                    Danh sách dịch vụ
                </Link>,
                "15"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/danhmucdichvu"
                >
                    Danh mục dịch vụ
                </Link>,
                "16"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/dichvu/them"
                >
                    Thêm dịch vụ
                </Link>,
                "17"
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
        "18",
        <ShoppingOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products"
                >
                    Danh sách sản phẩm
                </Link>,
                "19"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/products/add"
                >
                    Thêm sản phẩm
                </Link>,
                "20"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/product_categories"
                >
                    Danh mục sản phẩm
                </Link>,
                "21"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/khuyenmai"
        >
            Quản lý khuyến mãi
        </Link>,
        "22",
        <TagsOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/khuyenmai"
                >
                    Danh sách khuyến mãi
                </Link>,
                "23"
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
        "24",
        <ShopOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse"
                >
                    Danh sách kho
                </Link>,
                "25"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/import"
                >
                    Nhập kho
                </Link>,
                "26"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/export"
                >
                    Xuất kho
                </Link>,
                "27"
            ),
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/warehouse/inventory"
                >
                    Quản lý tồn kho
                </Link>,
                "28"
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
        "29",
        <SettingOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/shifmanagement"
                >
                    Quản lý ca làm việc
                </Link>,
                "30"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/CommentManagement"
        >
            Quản lý bình luận
        </Link>,
        "31",
        <CommentOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/CommentManagement"
                >
                    Danh sách bình luận
                </Link>,
                "32"
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
        "33",
        <PhoneOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/ContactManagement"
                >
                    Danh sách liên hệ
                </Link>,
                "34"
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
        "35",
        <DesktopOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/thanhtoan"
                >
                    Quản lý thanh toán
                </Link>,
                "36"
            ),
        ]
    ),
    getItem(
        <Link
            className="text-decoration-none text-black fs-4"
            to="/admin/nhacungcap"
        >
            Quản lý nhà cung cấp
        </Link>,
        "37",
        <HomeOutlined />,
        [
            getItem(
                <Link
                    className="text-decoration-none text-black fs-4"
                    to="/admin/nhacungcap"
                >
                    Quản lý nhà cung cấp
                </Link>,
                "38"
            ),
        ]
    ),

    // getItem(
    //     <Link
    //         className="text-decoration-none text-black fs-4"
    //         to="/admin/tuvankhachhang"
    //     >
    //         Quản lý Tư Vấn Trực Tuyến
    //     </Link>,
    //     "39",
    //     <FileOutlined />,
    //     [
    //         getItem(
    //             <Link
    //                 className="text-decoration-none text-black fs-4"
    //                 to="/admin/tuvankhachhang"
    //             >
    //                 Danh sách lịch hẹn tư vấn
    //             </Link>,
    //             "40"
    //         ),
    //     ]
    // ),
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Xác định màn hình nhỏ hơn 768px

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);

    const SidebarContent = (
        <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
        />
    );

    return isMobile ? (
        <>
            <Button
                icon={<MenuOutlined />}
                type="primary"
                onClick={toggleDrawer}
                style={{ margin: "16px" }}
            />
            <Drawer
                title="Menu"
                placement="left"
                closable
                onClose={toggleDrawer}
                visible={drawerVisible}
                width={250}
            >
                {SidebarContent}
            </Drawer>
        </>
    ) : (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            theme="light"
        >
            <div className="demo-logo-vertical" />
            {SidebarContent}
        </Sider>
    );
};

export default Sidebar;
