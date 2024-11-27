import React from "react";

import { Link } from 'react-router-dom';
import { Row, Col, Button, Input, Avatar, Menu } from "antd";
import { UserOutlined, AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import style from "../style/Profile.module.scss";

const { SubMenu } = Menu;

const MenuProfile = () => (
    <Menu mode="vertical" defaultSelectedKeys={['1']} className={style.menu}>
        <Menu.Item key="1" icon={<UserOutlined />} className={style.menuItem}>
            <Link className={style.nameItemMenu} to="/thongtincanhan">Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />} className={style.menuItem}>
            <Link className={style.nameItemMenu} to="/tuvandatlich">Tư vấn đặt lịch</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ClockCircleOutlined />} className={style.menuItem}>
            <Link className={style.nameItemMenu} to="/lichsudichvu">Lịch sử dịch vụ</Link>
        </Menu.Item>
    </Menu>
);

export default MenuProfile;
