import React, { useRef } from "react";
import { Card, Col, Row } from "antd";

import {
    Home_about,
    Home_service,
    Home_doctor,
    Home_facilities,
    Home_consultation_reception,
    Home_quote,
} from "./index";

import Home_Blog from "./Home_Blog";

export const HomeContent = () => {
    return (
        <div style={{ paddingBottom: "50px" }}>
            <Home_about />
            <Home_quote />

            <Home_consultation_reception id="#consultation_reception" />

            <Home_service />
            <section style={{ marginTop: "36px" }} className="container">
                <h1 className="text-center">
                    Sakura Spa Tiên Phong “Trị Mụn Chuẩn Y Khoa” <br />
                    Từ Năm 2024
                </h1>
                <p className="text-center" style={{ fontSize: "16px" }}>
                    Cam kết 100% khách hàng nhận được 3 lợi ích thiết thực, xóa
                    bỏ rào cản khi điều trị mụn
                </p>
            </section>
            {/* <Home_doctor /> */}
            <Home_facilities />
            {/* <Home_Blog /> */}
        </div>
    );
};
