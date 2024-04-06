import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie, FaUserCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { usePage } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import Notif1 from "@/Components/Notifications/Notif1";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import { IoSearchOutline } from "react-icons/io5";
import Input from "@/Components/Input/Input";
import Pusher from "pusher-js";
import axios from "axios";

const Index = () => {
    // Destructure props from usePage()
    const {
        countWorkerAccounts,
        countMasyarakat,
        allAccountWorkerDatas,
        flash,
    } = usePage().props;
    const [show, setShow] = useState(true);
    const [dataWorkerAccounts, setDataWorkerAccounts] = useState(
        allAccountWorkerDatas
    );
    const [data, setData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const deferredSearch = useDeferredValue(keyword);
    const isFirstMount = useRef(true);

    const handlerSearch = async () => {
        setLoading(true);
        const res = await axios.get(
            route("super-admin.worker-accounts-index"),
            {
                params: {
                    keyword: deferredSearch,
                },
            }
        );
        setLoading(false);
        setSearchResults(res.data);
    };

    const handlerDataWorkerAccountsChange = async () => {
        const res = await axios.get(
            route("super-admin.get-all-worker-accounts-index"),
            {
                params: {
                    keyword: deferredSearch,
                },
            }
        );
        setDataWorkerAccounts(res.data);
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

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("515f5459102b8e74d3ae", {
            app_id: "1731889",
            secret: "ed1c32d26e2374f6ef09",
            cluster: "ap1",
        });

        pusher
            .subscribe("user-status")
            .bind("App\\Events\\SuperAdmin\\UserStatusUpdated", (data) => {
                setData(data);
                handlerDataWorkerAccountsChange();
            });

        return () => {
            pusher.unbind("App\\Events\\SuperAdmin\\UserStatusUpdated");
            pusher.unsubscribe("user-status");
            pusher.disconnect();
        };
    }, []);

    console.log(data);

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
                <div className="flex lg:justify-end lg:mt-5 lg:mr-32 w-full">
                    <Input className={"basis-2/5"}>
                        <Input.Label>
                            <Input.InputText
                                maxWidth="xl"
                                placeholder="Search Pengaduan ..."
                                onChange={(e) => setKeyword(e.target.value)}
                                leftIcon={<IoSearchOutline />}
                            />
                        </Input.Label>
                    </Input>
                </div>

                {/* Main Table Component */}
                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>User Info</Table.Th>
                        <Table.Th>status</Table.Th>
                        <Table.Th>role</Table.Th>
                        <Table.Th>action</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {loading === false ? (
                            searchResults !== null && deferredSearch !== "" ? (
                                searchResults.data.length > 0 ? (
                                    searchResults.data.map(
                                        (
                                            {
                                                full_name,
                                                email,
                                                avatar,
                                                status,
                                                roles,
                                                id,
                                            },
                                            index
                                        ) => (
                                            <Table.Tr key={index}>
                                                <Table.TdProfile
                                                    name={full_name}
                                                    email={email}
                                                    src={avatar}
                                                />
                                                <Table.TdStatus
                                                    status={status}
                                                    theme={
                                                        status === "online"
                                                            ? "success"
                                                            : "warning"
                                                    }
                                                />
                                                <Table.TdBasic>
                                                    <div className="tooltip tooltip-left">
                                                        {roles[0].name}
                                                    </div>
                                                </Table.TdBasic>
                                                <Table.TdBasic
                                                    className={"flex gap-2"}
                                                >
                                                    <GlobalLink
                                                        href={route(
                                                            "super-admin.dashboard-manages-worker-accounts-show",
                                                            id
                                                        )}
                                                        children={
                                                            <IoMdEye className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                        }
                                                        theme="daisyui-info"
                                                        maxWidth="max"
                                                        className="btn-outline group"
                                                    />
                                                    <GlobalLink
                                                        href={route(
                                                            "super-admin.dashboard-manages-worker-accounts-edit-password",
                                                            id
                                                        )}
                                                        children={
                                                            <MdEdit className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                        }
                                                        theme="daisyui-waring"
                                                        maxWidth="max"
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
                            ) : dataWorkerAccounts.data.length > 0 ? (
                                dataWorkerAccounts.data.map(
                                    (
                                        {
                                            full_name,
                                            email,
                                            avatar,
                                            status,
                                            roles,
                                            id,
                                        },
                                        index
                                    ) => (
                                        <Table.Tr key={index}>
                                            <Table.TdProfile
                                                name={full_name}
                                                email={email}
                                                src={avatar}
                                            />
                                            <Table.TdStatus
                                                status={status}
                                                theme={
                                                    status === "online"
                                                        ? "success"
                                                        : "warning"
                                                }
                                            />
                                            <Table.TdBasic>
                                                <div className="tooltip tooltip-left">
                                                    {roles[0].name}
                                                </div>
                                            </Table.TdBasic>
                                            <Table.TdBasic
                                                className={"flex gap-2"}
                                            >
                                                <GlobalLink
                                                    href={route(
                                                        "super-admin.dashboard-manages-worker-accounts-show",
                                                        id
                                                    )}
                                                    children={
                                                        <IoMdEye className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                    }
                                                    theme="daisyui-info"
                                                    maxWidth="max"
                                                    className="btn-outline group"
                                                />
                                                <GlobalLink
                                                    href={route(
                                                        "super-admin.dashboard-manages-worker-accounts-edit-password",
                                                        id
                                                    )}
                                                    children={
                                                        <MdEdit className="w-5 h-5 group-hover:text-white transition duration-300 ease-in-out" />
                                                    }
                                                    theme="daisyui-waring"
                                                    maxWidth="max"
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
                    showFrom={
                        searchResults?.data.length > 0
                            ? searchResults.from
                            : allAccountWorkerDatas.from
                    }
                    showTo={
                        searchResults?.data.length > 0
                            ? searchResults.to
                            : allAccountWorkerDatas.to
                    }
                    total={
                        searchResults?.data.length > 0
                            ? searchResults.total
                            : allAccountWorkerDatas.total
                    }
                    links={
                        searchResults?.data.length > 0
                            ? searchResults.links
                            : allAccountWorkerDatas.links
                    }
                    last_page_url={
                        searchResults?.data.length > 0
                            ? searchResults.last_page_url
                            : allAccountWorkerDatas.last_page_url
                    }
                    first_page_url={
                        searchResults?.data.length > 0
                            ? searchResults.first_page_url
                            : allAccountWorkerDatas.first_page_url
                    }
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
