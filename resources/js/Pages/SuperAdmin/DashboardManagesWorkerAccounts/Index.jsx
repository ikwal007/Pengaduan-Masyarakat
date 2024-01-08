import Card from "@/Components/Cards/Card";
import Notif1 from "@/Components/Notifications/Notif1";
import Table1 from "@/Components/Tables/Table1";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
// import { useEcho } from "@/utils/EchoContext";
import React, { useEffect, useState } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie, FaUserCheck, FaTrash } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { usePage } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import Button from "@/Components/Button/Button";

const Index = () => {
    // Destructure props from usePage()
    const { countWorkerAccounts, countMasyarakat, allAccountWorkerDatas } =
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

    console.log("all worker accounts: ", allAccountWorkerDatas);

    return (
        <>
            {/* <Notif1 /> */}

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
                                        <Button theme={"warning"}>
                                            <Button.Icon
                                                children={
                                                    <MdModeEditOutline className="w-4 h-4" />
                                                }
                                            />
                                        </Button>
                                        <Button theme="danger">
                                            <Button.Icon
                                                children={
                                                    <FaTrash className="w-4 h-4" />
                                                }
                                            />
                                        </Button>
                                        <Button theme={"info"}>
                                            <Button.Icon
                                                children={
                                                    <IoMdEye className="w-4 h-4" />
                                                }
                                            />
                                        </Button>
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
                <Table.Footer showFrom={allAccountWorkerDatas.from} showTo={allAccountWorkerDatas.to} total={allAccountWorkerDatas.total} links={allAccountWorkerDatas.links} last_page_url={allAccountWorkerDatas.last_page_url} first_page_url={allAccountWorkerDatas.first_page_url} />
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
