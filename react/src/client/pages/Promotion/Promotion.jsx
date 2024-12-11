import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import PromotionPage from "../../modules/Promotion/components/Promotion";

const Promotion = () => {
    
    return (
        <div className="container">
            <PromotionPage />
        </div>
    );
};

export default Promotion;
