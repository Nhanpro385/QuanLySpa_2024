import React from "react";
import { Carousel } from "antd";
import  ConsultingFrom  from "./ConsultingFrom";

const contentStyle = {
    width: "100%",
};
import baner1 from "../../../assets/images/baner1home.png";
const SliderHome = () => (
    <div style={contentStyle}>
        <Carousel autoplay dotPosition="right">
            <div>
                <img style={{ width: "100%" }} src={baner1} alt="baner1" />
            </div>
        </Carousel>
        <ConsultingFrom />
    </div>
);
export default SliderHome;
