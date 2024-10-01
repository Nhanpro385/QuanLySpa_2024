import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Tệp App chính cho client
const root = ReactDOM.createRoot(document.getElementById("root"));

import GlobalStyles from "./client/components/GlobalStyles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

root.render(
    <React.StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.StrictMode>
);
