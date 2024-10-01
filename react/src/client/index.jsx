import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppClient from "./app";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppClient />
    </StrictMode>
);
