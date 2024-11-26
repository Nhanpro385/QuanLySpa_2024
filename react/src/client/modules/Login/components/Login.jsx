import React from "react";

import { Row, Col, Button, Divider } from "antd";
import style from "../style/Login.module.scss";

const Login = () => (
  <Row justify="center" align="middle" className={style.container}>
    <Col xs={22} sm={16} md={12} lg={8} xl={6} className={style.boxForm}>
      <h2>Đăng nhập</h2>
      <form>
        <div className={style.formInput}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Nhập email" />
        </div>
        <div className={style.formInput}>
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" id="password" placeholder="Mật khẩu" />
        </div>
        <div className={style.formInput}>
          <a href="/quenmatkhau">Quên mật khẩu?</a>
        </div>
        <div className={style.formInput}>
          <button type="submit">ĐĂNG NHẬP</button>
        </div>
      </form>
      <p>Bạn chưa có tài khoản? <a href="#">Đăng ký ngay</a> </p>
      <p>Hoặc</p>
      <button className={style.btnLoginGoogle}>ĐĂNG NHẬP VỚI GOOGLE</button>
    </Col>
  </Row>
);

export default Login;
