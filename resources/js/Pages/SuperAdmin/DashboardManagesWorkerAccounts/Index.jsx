import Card from "@/Components/Cards/Card";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
// import { useEcho } from "@/utils/EchoContext";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie, FaUserCheck } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { usePage } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import Notif1 from "@/Components/Notifications/Notif1";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";

const Index = () => {
    // Destructure props from usePage()
    const {
        countWorkerAccounts,
        countMasyarakat,
        allAccountWorkerDatas,
        flash,
    } = usePage().props;
    // const echo = useEcho();
    const [show, setShow] = useState(true);
    const [searchResults, setSearchResults] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const deferredSearch = useDeferredValue(keyword);
    const isFirstMount = useRef(true);

    const handlerSearch = async () => {
        setLoading(true);
        const res = await axios.get(route("seksi.complaints-index"), {
            params: {
                seksisName: auth.user.full_name,
                keyword: deferredSearch,
            },
        });
        setLoading(false);
        setSearchResults(res.data);
    };

    useEffect(() => {
        if (isFirstMount.current) {
            // Set isFirstMount ke false setelah komponen pertama kali dimuat
            isFirstMount.current = false;
            return;
        }
        if (deferredSearch) {
            handlerSearch();
        }
    }, [deferredSearch]);

    // useEffect(() => {
    //     const channel = echo.channel("user-status");

    //     channel.listen("UpdateUserStatusListener", (data) => {
    //         console.log("ini adalah callback event: ", data);
    //     });

    //     // return () => {
    //     //   listener.stopListening(); // Unbind the event listener when the component unmounts
    //     // };
    // }, [echo]);

    return (
        <>
            {flash.message && show && (
                <Notif1 message={flash.message} show={show} setShow={setShow} />
            )}

            {/* <!-- Cards --> */}
            <div className="grid place-content-center gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                <CardCount
                    title={"Total Worker Accounts"}
                    value={countWorkerAccounts}
                    theme="primary"
                    icon={<FaUserTie className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total User Accounts"}
                    value={countMasyarakat}
                    theme="info"
                    icon={<HiMiniUserGroup className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total User Online"}
                    value={999}
                    theme="success"
                    icon={<FaUserCheck className="w-5 h-5" />}
                />
            </div>

            {/* Main Table Component */}
            <Table>
                {/* <!-- Search input --> */}
                <div className="flex lg:justify-end flex-1 lg:mt-5 lg:mr-32 w-full">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                            type="text"
                            placeholder="Search for projects"
                            aria-label="Search"
                        />
                    </div>
                </div>

                {/* Main Table Component */}
                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>Nama Pemohon</Table.Th>
                        <Table.Th>status</Table.Th>
                        <Table.Th>media</Table.Th>
                        <Table.Th>kecamatan</Table.Th>
                        <Table.Th>desa</Table.Th>
                        <Table.Th>Tindakan</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {loading === false ? (
                            searchResults !== null && deferredSearch !== "" ? (
                                searchResults.data.length > 0 ? (
                                    searchResults.data.map(
                                        (
                                            { complaint, complaint_status, id },
                                            index
                                        ) => (
                                            <Table.Tr key={index}>
                                                <Table.TdProfile
                                                    name={
                                                        complaint.user.full_name
                                                    }
                                                    email={complaint.user.email}
                                                    src={complaint.user.avatar}
                                                />
                                                <Table.TdStatus
                                                    status={
                                                        complaint_status.name
                                                    }
                                                    description={
                                                        complaint_status.description
                                                    }
                                                    theme={complaintStatus(
                                                        complaint_status.slug
                                                    )}
                                                />
                                                <Table.TdBasic>
                                                    <div
                                                        className="tooltip tooltip-left"
                                                        data-tip={
                                                            complaint
                                                                .complaint_media_type
                                                                .description
                                                        }
                                                    >
                                                        {
                                                            complaint
                                                                .complaint_media_type
                                                                .name
                                                        }
                                                    </div>
                                                </Table.TdBasic>
                                                <Table.TdBasic>
                                                    {complaint.subdistrict.name}
                                                </Table.TdBasic>
                                                <Table.TdBasic>
                                                    {complaint.village.name}
                                                </Table.TdBasic>
                                                <Table.TdBasic>
                                                    <GlobalLink
                                                        href={route(
                                                            "complaint-handling.edit",
                                                            id
                                                        )}
                                                        children={
                                                            <MdEdit className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                        }
                                                        theme="daisyui-waring"
                                                        className="btn-outline group"
                                                    />
                                                </Table.TdBasic>
                                            </Table.Tr>
                                        )
                                    )
                                ) : (
                                    <Table.Tr>
                                        <Table.TdBasic
                                            children={"no data record"}
                                            colSpan="6"
                                            className="text-center"
                                        />
                                    </Table.Tr>
                                )
                            ) : allAccountWorkerDatas.data.length > 0 ? (
                                allAccountWorkerDatas.data.map(
                                    (
                                        { complaint, complaint_status, id },
                                        index
                                    ) => (
                                        <Table.Tr key={index}>
                                            <Table.TdProfile
                                                name={complaint.user.full_name}
                                                email={complaint.user.email}
                                                src={complaint.user.avatar}
                                            />
                                            <Table.TdStatus
                                                status={complaint_status.name}
                                                description={
                                                    complaint_status.description
                                                }
                                                theme={complaintStatus(
                                                    complaint_status.slug
                                                )}
                                            />
                                            <Table.TdBasic>
                                                <div
                                                    className="tooltip tooltip-left"
                                                    data-tip={
                                                        complaint
                                                            .complaint_media_type
                                                            .description
                                                    }
                                                >
                                                    {
                                                        complaint
                                                            .complaint_media_type
                                                            .name
                                                    }
                                                </div>
                                            </Table.TdBasic>
                                            <Table.TdBasic>
                                                {complaint.subdistrict.name}
                                            </Table.TdBasic>
                                            <Table.TdBasic>
                                                {complaint.village.name}
                                            </Table.TdBasic>
                                            <Table.TdBasic>
                                                <GlobalLink
                                                    href={route(
                                                        "complaint-handling.edit",
                                                        id
                                                    )}
                                                    children={
                                                        <MdEdit className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                    }
                                                    theme="daisyui-waring"
                                                    className="btn-outline group"
                                                />
                                            </Table.TdBasic>
                                        </Table.Tr>
                                    )
                                )
                            ) : (
                                <Table.Tr>
                                    <Table.TdBasic
                                        children={"no data record"}
                                        colSpan="6"
                                        className="text-center"
                                    />
                                </Table.Tr>
                            )
                        ) : (
                            <Table.Tr>
                                <Table.TdBasic
                                    children={
                                        <span className="loading loading-dots loading-lg"></span>
                                    }
                                    colSpan="6"
                                    className="text-center"
                                />
                            </Table.Tr>
                        )}
                    </Table.TableBody>
                </Table.Main>
                <Table.Footer
                    showFrom={paginationComplaint.from}
                    showTo={paginationComplaint.to}
                    total={paginationComplaint.total}
                    links={paginationComplaint.links}
                    last_page_url={paginationComplaint.last_page_url}
                    first_page_url={paginationComplaint.first_page_url}
                />
            </Table>
        </>
    );
};

Index.layout = (page) => (
    <AuthenticatedLayout2 title={`Dashboard Manages Worker Accounts`}>
        {page}
    </AuthenticatedLayout2>
);

export default Index;
