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

const Index = () => {
    // Destructure props from usePage()
    const { countWorkerAccounts, countMasyarakat, allAccountWorkerDatas, flash } =
        usePage().props;
    // const echo = useEcho();

    // useEffect(() => {
    //     const channel = echo.channel("user-status");

    //     channel.listen("UpdateUserStatusListener", (data) => {
    //         console.log("ini adalah callback event: ", data);
    //     });

    //     // return () => {
    //     //   listener.stopListening(); // Unbind the event listener when the component unmounts
    //     // };
    // }, [echo]);

    console.log(flash.message);

    return (
        <>
            <Notif1 />

            {/* <!-- Cards --> */}
            <div className="grid justify-content-between gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                <Card>
                    <Card.Icon
                        color={"orange"}
                        bgColor={"orange"}
                        icon={<FaUserTie className="w-5 h-5" />}
                    />
                    <Card.Info
                        title={"Total Worker Accounts"}
                        value={countWorkerAccounts}
                    />
                </Card>
                <Card>
                    <Card.Icon
                        color={"green"}
                        bgColor={"green"}
                        icon={<HiMiniUserGroup className="w-5 h-5" />}
                    />
                    <Card.Info
                        title={"Total User Accounts"}
                        value={countMasyarakat}
                    />
                </Card>
                <Card>
                    <Card.Icon
                        color={"blue"}
                        bgColor={"blue"}
                        icon={<FaUserCheck className="w-5 h-5" />}
                    />
                    <Card.Info title={"Total User Online"} value={999} />
                </Card>
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

                <Table.Main>
                    <Table.TableHead>
                        <Table.Th>profile</Table.Th>
                        <Table.Th>role</Table.Th>
                        <Table.Th>status</Table.Th>
                        <Table.Th>action</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {allAccountWorkerDatas.data.length > 0 ? (
                            allAccountWorkerDatas.data.map((data, index) => (
                                <Table.Tr key={index}>
                                    <Table.TdProfile
                                        name={data.full_name}
                                        role={data.email}
                                    />
                                    <Table.TdBasic>
                                        {data.roles.map((role) => role.name)}
                                    </Table.TdBasic>
                                    <Table.TdStatus
                                        status={data.status}
                                        theme={
                                            data.status === "online"
                                                ? "success"
                                                : "danger"
                                        }
                                    />
                                    <Table.TdBasic className={"flex"}>
                                        <GlobalLink
                                            theme={"warning"}
                                            href={`${
                                                import.meta.env.VITE_APP_URL
                                            }/super-admin/dashboard-manages-worker-accounts/${
                                                data.id
                                            }/edit-password`}
                                        >
                                            <GlobalLink.Icon
                                                children={
                                                    <MdModeEditOutline className="w-4 h-4" />
                                                }
                                            />
                                        </GlobalLink>
                                        <GlobalLink
                                            href={
                                                import.meta.env.VITE_APP_URL +
                                                "/super-admin/dashboard-manages-worker-accounts/" +
                                                data.id
                                            }
                                            theme={"info"}
                                        >
                                            <GlobalLink.Icon
                                                children={
                                                    <IoMdEye className="w-4 h-4" />
                                                }
                                            />
                                        </GlobalLink>
                                    </Table.TdBasic>
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.TdBasic />
                                <Table.TdBasic children={"no data record"} />
                                <Table.TdBasic />
                            </Table.Tr>
                        )}
                    </Table.TableBody>
                </Table.Main>
                <Table.Footer
                    showFrom={allAccountWorkerDatas.from}
                    showTo={allAccountWorkerDatas.to}
                    total={allAccountWorkerDatas.total}
                    links={allAccountWorkerDatas.links}
                    last_page_url={allAccountWorkerDatas.last_page_url}
                    first_page_url={allAccountWorkerDatas.first_page_url}
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
