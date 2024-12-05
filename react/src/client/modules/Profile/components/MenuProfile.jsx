import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { UserOutlined, AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import style from "../style/Profile.module.scss";

const MenuProfile = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      {/* Button to toggle the Drawer */}
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ marginBottom: 16 }}
      >
        Open Menu
      </Button>

      {/* Drawer Component */}
      <Drawer
        title="Profile Menu"
        placement="left"
        onClose={onClose}
        open={open}
        width={256}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className={style.menu}
        >
          <Menu.Item key="1" icon={<UserOutlined />} className={style.menuItem}>
            <Link className={style.nameItemMenu} to="/thongtincanhan">
              Thông tin cá nhân
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<AppstoreOutlined />}
            className={style.menuItem}
          >
            <Link
              className={style.nameItemMenu}
              to="/thongtincanhan/tuvandatlich"
            >
              Tư vấn đặt lịch
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ClockCircleOutlined />}
            className={style.menuItem}
          >
            <Link
              className={style.nameItemMenu}
              to="/thongtincanhan/lichsudichvu"
            >
              Lịch sử dịch vụ
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ClockCircleOutlined />}
            className={style.menuItem}
          >
            <Link
              className={style.nameItemMenu}
              to="/thongtincanhan/lichsudieutri"
            >
              Lịch sử điều trị
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default MenuProfile;
