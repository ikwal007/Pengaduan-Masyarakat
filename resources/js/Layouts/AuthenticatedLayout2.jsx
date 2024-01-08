import Header1 from "@/Components/Headers/Header1";
import Aside from "@/Components/Sidebars/Aside";
import Desktop from "@/Components/Sidebars/Desktop";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";

const AuthenticatedLayout2 = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/* <!-- Desktop sidebar --> */}
                <Desktop />
                {/* <!-- Mobile sidebar -->
                <!-- Backdrop --> */}

                <div className="flex flex-col flex-1 w-full">
                    {/* header */}
                    <Header1 />
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                {title}
                            </h2>
                            {/* <!-- Children --> */}
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AuthenticatedLayout2;
