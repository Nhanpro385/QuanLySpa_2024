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

import { ConfigProvider } from "antd";
import ForgotPage from "./admin/modules/authen/compoment/forgotPage";

const App = () => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "#E05265" } }}>
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
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="/admin/dangnhap" element={<LoginPage />} />
                <Route path="/admin/quenmatkhau" element={<ForgotPage />} />
                
          
            
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
        </ConfigProvider>
    );
};

export default App;
