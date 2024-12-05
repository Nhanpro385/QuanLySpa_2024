import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import ProfilePage from "../../modules/Profile/components/Profile";



const Profile = () => {
    
  

    return (
        <div className="container">
            <ProfilePage />
        </div>
    );
};

export default Profile;
