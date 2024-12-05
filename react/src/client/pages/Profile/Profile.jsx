import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import ProfilePage from "../../modules/Profile/components/Profile";
import MenuProfile from "../../modules/Profile/components/MenuProfile";
import ServiceHistory from "../../modules/Profile/components/ServiceHistory";
import BookingConsultant from "../BookingConsultant/BookingConsultant";
import StreatmentsHistory from "../../modules/Profile/components/streatmentsHistory";
import { Col, Row } from "antd";

const Profile = () => {
    const location = useLocation(); // Get the current location (URL)

    // Conditional rendering based on the current URL
    const renderContent = () => {
        switch (location.pathname) {
            case "/thongtincanhan/tuvandatlich":
                return <BookingConsultant />;
            case "/thongtincanhan/lichsudichvu":
                return <ServiceHistory />;
            case "/thongtincanhan/lichsudieutri":
                return <StreatmentsHistory />;
            default:
                return <ProfilePage />;
        }
    };

    return (
        <div className="container">
            <Row gutter={[16, 16]}>
                <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                    <MenuProfile />
                </Col>
                <Col xxl={18} xl={18} lg={18} md={18} sm={18} xs={18}>
                    {renderContent()} {/* Render content based on the URL */}
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
