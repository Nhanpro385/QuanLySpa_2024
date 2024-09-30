import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import DefaultLayout from "./client/components/layout/DefaultLayout"; // Layout mặc định cho client
import AdminLayout from "./admin/components/layout/AdminLayout"; // Layout mặc định cho admin
import AppClient from "./client/app"; // Nội dung định tuyến cho client
import AdminApp from "./admin/app"; // Ứng dụng admin
import LoginPage from "./admin/pages/authen/loginPage";
import ForgotPage from "./admin/pages/authen/forgotPage";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes cho client */}
                <Route
                    path="*"
                    element={
                        <DefaultLayout>
                            <AppClient />
                        </DefaultLayout>
                    }
                />

                {/* Routes cho admin */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminLayout>
                            <AdminApp />
                        </AdminLayout>
                    }
                />
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/forgot" element={<ForgotPage />} />
                {/* Redirect từ bất kỳ route không hợp lệ nào về trang chủ */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
