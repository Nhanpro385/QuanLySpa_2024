import React from "react";
import SliderHome from "../modules/Home/components/SliderHome";
import { HomeContent } from "../modules/Home/components/HomeContent";
const Home = () => {
    document.title = "Trang chủ";
    return (
        <div>
            <SliderHome />
            <HomeContent />
        </div>
    );
};
export default Home;
