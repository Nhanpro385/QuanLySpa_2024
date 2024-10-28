import React from "react";
import { Row, Col, Button, Divider } from "antd";
import style from "../style/Register.module.scss";

const Register = () => (
    <Row justify="center" align="middle" className={style.container}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6} className={style.boxForm}>
            <h2>Đăng ký</h2>
            <form action="">
                <div className={style.formInput}>
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" placeholder="Họ và tên" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Email" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="">Mật khẩu</label>
                    <input type="password" placeholder="Mật khẩu" />
                </div>
                <div className={style.formInput}>
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input type="password" placeholder="Nhập lại mật khẩu" />
                </div>
                <div className={style.formInput}>
                    <button type="submit">ĐĂNG KÝ</button>
                </div>
            </form>
            <p className={style.registerText}>
                <p>Bạn đã có tài khoản? <a href="#">Đăng nhập</a> </p>
            </p>
        </Col>
    </Row>
)

export default Register;
