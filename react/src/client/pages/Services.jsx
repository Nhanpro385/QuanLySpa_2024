import React from "react";

import { SliderServices } from "../modules/Services/components";
import { ServicesList } from "../modules/Services/components";
import { RegimenList } from "../modules/Services/components";
import { ServicesDetail } from "../modules/Services/components";

const Services = () => {
    return (
        <div>
            <SliderServices />
            <ServicesList />
            <RegimenList />
            <ServicesDetail />
        </div>
    );
};
export default Services;
