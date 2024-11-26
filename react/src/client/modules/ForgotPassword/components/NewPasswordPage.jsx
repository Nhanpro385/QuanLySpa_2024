import React from "react";

import { Row, Col, Button, Divider } from "antd";
import style from "../style/ForgotPasswordPage.module.scss";

const NewPasswordPage = () => (
    <Row justify="center" align="middle" className={style.container}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6} className={style.boxForm}>
            <h2>Mật khẩu mới</h2>
            <form>
                <div className={style.formInput}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Nhập email" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="password">Mật khẩu mới</label>
                    <input type="password" id="password" placeholder="Nhập mật khẩu mới" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="phone">Nhập lại mật khẩu mới</label>
                    <input type="password" id="re_password" placeholder="Nhập lại mật khẩu mới" />
                </div>
                <div className={style.formInput}>
                    <a href="/login">Quay lại đăng nhập</a>
                </div>
                <div className={style.formInput}>
                    <button type="submit">CẬP NHẬT MẬT KHẨU</button>
                </div>
            </form>
        </Col>
    </Row>
);

export default NewPasswordPage;
