import React from "react";

import LoginPage from "../modules/Login/components/Login";

const Login = () => {
    document.title = "Đăng nhập";
    return (
        <div>
            <LoginPage />
        </div>
    );
};

export default Login;
