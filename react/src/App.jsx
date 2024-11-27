import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import DefaultLayout from "./client/components/layout/DefaultLayout"; // Layout mặc định cho client

import AppClient from "./client/app"; // Nội dung định tuyến cho client
import AdminApp from "./admin/app"; // Ứng dụng admin

import { ConfigProvider } from "antd";

import { useSelector } from "react-redux";
const App = () => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "#E05265" } }}>
            <Router>
                <Routes>
                    {/* Routes cho client */}
                    <Route path="*" element={<AppClient />} />

                    {/* Routes cho admin */}
                    <Route path="/admin/*" element={<AdminApp />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
};

export default App;
