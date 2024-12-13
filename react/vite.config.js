import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@admin": path.resolve(__dirname, "src/admin"),
            "@client": path.resolve(__dirname, "src/client"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    define: {
        "process.env": process.env,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler", // or "modern"
            },
        },
    },
});
