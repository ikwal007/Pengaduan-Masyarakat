import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout2";
import React from "react";
import { NextUIProvider } from '@nextui-org/react';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", {
            eager: true,
        });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout ||
            ((page) => <AuthenticatedLayout children={page} />);
        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <React.StrictMode>
                <NextUIProvider>
                    <App {...props} />
                </NextUIProvider>
            </React.StrictMode>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
