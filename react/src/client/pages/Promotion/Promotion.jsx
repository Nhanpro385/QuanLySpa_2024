import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import PromotionPage from "../../modules/Promotion/components/Promotion";

const Promotion = () => {
    document.title = "Khuyến mãi";
    return (
        <div className="container mb-4">
            <PromotionPage />
        </div>
    );
};

export default Promotion;
