import React from "react";

import { AboutUsPage } from "../../modules/AboutUs/components";
import { SliderAboutUs } from "../../modules/AboutUs/components";
import { AboutUsBottom } from "../../modules/AboutUs/components";

const AboutUs = () => {
    document.title = "Giới thiệu";
    return (
        <div>
            <SliderAboutUs />
            <AboutUsPage />
            <AboutUsBottom />
        </div>
    );
};

export default AboutUs;
