import React from "react";

import { Row, Col, Button, Divider } from "antd";
import style from "../style/ForgotPasswordPage.module.scss";

const ForgotPasswordPage = () => (
    <Row justify="center" align="middle" className={style.container}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6} className={style.boxForm}>
            <h2>Quên mật khẩu</h2>
            <form>
                <div className={style.formInput}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Nhập email" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="phone">Số điện thoại</label>
                    <input type="text" id="phone" placeholder="Nhập số điện thoại" />
                </div>
                <div className={style.formInput}>
                    <a href="/login">Quay lại đăng nhập</a>
                </div>
                <div className={style.formInput}>
                    <button type="submit">GỬI YÊU CẦU</button>
                </div>
            </form>
        </Col>
    </Row>
);

export default ForgotPasswordPage;
