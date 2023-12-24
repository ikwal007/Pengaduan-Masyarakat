import Chart1 from "@/Components/Charts/Chart1";
import Header1 from "@/Components/Headers/Header1";
import Desktop from "@/Components/Sidebars/Desktop";
import { Head } from "@inertiajs/react";
import React from "react";

const AuthenticatedLayout2 = ({ children, title }) => {

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/* <!-- Desktop sidebar --> */}
                <Desktop />
                {/* <!-- Mobile sidebar -->
                <!-- Backdrop --> */}
                <div
                    x-show="isSideMenuOpen"
                    x-transition:enter="transition ease-in-out duration-150"
                    x-transition:enter-start="opacity-0"
                    x-transition:enter-end="opacity-100"
                    x-transition:leave="transition ease-in-out duration-150"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                    className="fixed inset-0 z-10 flex items-end bg-blac bg-opacity-50 sm:items-center sm:justify-center"
                ></div>
                {/* aside */}
                <div className="flex flex-col flex-1 w-full">
                    {/* header */}
                    <Header1 />
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                {title}
                            </h2>
                            {/* <!-- CTA --> */}

                            {/* <!-- Cards --> */}

                            {/* <!-- New Table --> */}

                            {/* <!-- Charts --> */}
                            {/* <Chart1 /> */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AuthenticatedLayout2;
