import { Link } from "@inertiajs/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const themeColors = {
    primary: {
        text: "text-purple-700",
        darkText: "dark:text-purple-100",
        background: "bg-purple-100",
        darkBackground: "dark:bg-purple-700",
    },
    error: {
        text: "text-red-700",
        darkText: "dark:text-red-100",
        background: "bg-red-100",
        darkBackground: "dark:bg-red-700",
    },
    success: {
        text: "text-green-700",
        darkText: "dark:text-green-100",
        background: "bg-green-100",
        darkBackground: "dark:bg-green-700",
    },
    warning: {
        text: "text-orange-700",
        darkText: "dark:text-orange-100",
        background: "bg-orange-100",
        darkBackground: "dark:bg-orange-700",
    },
    info: {
        text: "text-blue-700",
        darkText: "dark:text-blue-100",
        background: "bg-blue-100",
        darkBackground: "dark:bg-blue-700",
    },
};

const Table = ({ children }) => (
    <div className={`w-full overflow-hidden rounded-lg shadow-xs mb-5`}>
        {children}
    </div>
);

const TableMain = ({ children, className }) => {
    return (
        <div className={`w-full overflow-x-auto ${className}`}>
            <table className="w-full whitespace-no-wrap">{children}</table>
        </div>
    );
};

const TableFooter = ({
    links,
    showFrom,
    showTo,
    total,
    first_page_url,
    last_page_url,
}) => {
    return (
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
                Showing {showFrom}-{showTo} of {total}
            </span>
            <span className="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul className="inline-flex items-center gap-2">
                        <li>
                            <Link
                                href={first_page_url}
                                className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple`}
                            >
                                <MdArrowBackIos className="w-5 h-5 hover:text-purple-600" />
                            </Link>
                        </li>
                        {links.length > 0 &&
                            links.map((link, index) => {
                                // Temukan indeks data dengan link.active == true
                                const activeIndex = links.findIndex(
                                    (item) => item.active
                                );
                                // Tampilkan hanya jika bukan index pertama atau index terakhir
                                if (
                                    index !== 0 &&
                                    index !== links.length - 1 &&
                                    index >= activeIndex - 2 &&
                                    index <= activeIndex + 2
                                ) {
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className={`${
                                                    link.active &&
                                                    "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600"
                                                } hover:text-white hover:bg-purple-600 px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                } else {
                                    return null; // Jangan tampilkan link untuk index pertama dan terakhir
                                }
                            })}
                        <li>
                            <Link
                                href={last_page_url}
                                className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple`}
                            >
                                <MdArrowForwardIos className="w-5 h-5 hover:text-purple-600" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </span>
        </div>
    );
};

const TableHead = ({ children }) => (
    <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            {children}
        </tr>
    </thead>
);

const Th = ({ children }) => <th className="px-4 py-3">{children}</th>;

const TableBody = ({ children }) => (
    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        {children}
    </tbody>
);

const Tr = ({ children, className }) => (
    <tr className={`text-gray-700 dark:text-gray-400 ${className}`}>
        {children}
    </tr>
);

const TdProfile = ({ name, role }) => (
    <td className="px-4 py-3">
        <div className="flex items-center text-sm">
            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                    className="object-cover w-full h-full rounded-full"
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    alt=""
                    loading="lazy"
                />
                <div
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                ></div>
            </div>
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {role}
                </p>
            </div>
        </div>
    </td>
);

const TdBasic = ({ children, className, ...props }) => (
    <td {...props} className={`gap-2 px-4 py-3 text-sm ${className}`}>
        {children}
    </td>
);

const TdStatus = ({ theme = "primary", status, description }) => {
    const { text, background, darkBackground, darkText } = themeColors[theme];

    return (
        <td className="px-4 py-3 text-xs">
            <div
                className="tooltip tooltip-left"
                data-tip={description}
            >
                <span
                    className={`px-2 py-1 font-semibold leading-tight ${text} ${background} rounded-full ${darkBackground} ${darkText}`}
                >
                    {status}
                </span>
            </div>
        </td>
    );
};

Table.TableHead = TableHead;
Table.Th = Th;
Table.TableBody = TableBody;
Table.Tr = Tr;
Table.TdProfile = TdProfile;
Table.TdBasic = TdBasic;
Table.TdStatus = TdStatus;
Table.Main = TableMain;
Table.Footer = TableFooter;

export default Table;
