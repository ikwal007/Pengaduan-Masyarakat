import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

const Index = () => {
    const props = usePage().props;
    return (
        <>
            
            ok
        </>
    );
};

Index.layout = (page) => <AuthenticatedLayout2 title={`Dashboard Manages Worker Accounts`}>{page}</AuthenticatedLayout2>;

export default Index;
