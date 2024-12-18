import React from "react";

import ServiceHistoryPage from "../../modules/Profile/components/ServiceHistory";

const ServiceHistory = () => {
    document.title = "Lịch sử dịch vụ";
    return (
        <div>
            <ServiceHistoryPage />
        </div>
    );
};

export default ServiceHistory;
