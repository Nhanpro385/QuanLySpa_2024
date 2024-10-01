import React from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./config/routes";
import { Provider } from 'react-redux';
import store from '@admin/redux/store/store.jsx';



const AppAdmin = () => {
  return (
    <Provider store={store}>
    <Routes>
      {PublicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Nếu bạn cần phải xử lý các route con khác, bạn có thể thêm ở đây */}
    </Routes>
    </Provider>
  );
};

export default AppAdmin;
