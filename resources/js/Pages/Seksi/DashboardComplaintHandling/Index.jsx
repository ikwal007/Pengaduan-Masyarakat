import Card from "@/Components/Cards/Card";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
// import { useEcho } from "@/utils/EchoContext";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie, FaUserCheck, FaClipboardUser } from "react-icons/fa6";
import { MdEdit, MdModeEditOutline } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { usePage } from "@inertiajs/react";
import {
    LuClipboardCheck,
    LuClipboardCopy,
    LuClipboardList,
    LuClipboardSignature,
    LuClipboardX,
} from "react-icons/lu";
import Table from "@/Components/Tables/Table";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import Notif1 from "@/Components/Notifications/Notif1";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import { IoSearchOutline } from "react-icons/io5";
import Input from "@/Components/Input/Input";

const Index = () => {
    // Destructure props from usePage()
    const {
        auth,
        countComplaint,
        countComplaintByStatusProsessing,
        countComplaintByStatusPending,
        countComplaintByStatusDone,
        countComplaintByStatusReject,
        paginationComplaint,
        flash,
        ...props
    } = usePage().props;
    // const echo = useEcho();
    const [show, setShow] = useState(true);
    const [searchResults, setSearchResults] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const deferredSearch = useDeferredValue(keyword);
    const isFirstMount = useRef(true);

    const complaintStatus = (status) => {
        switch (status) {
            case "diproses":
                return "info";
                break;
            case "ditunda":
                return "warning";
                break;
            case "diselesaikan":
                return "success";
                break;
            case "ditolak":
                return "error";
                break;
        }
    };

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
                    title={"Total Pengaduan"}
                    value={countComplaint}
                    theme="primary"
                    icon={<FaClipboardUser className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total Pengaduan Proses"}
                    value={countComplaintByStatusProsessing}
                    theme="info"
                    icon={<LuClipboardSignature className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total Pengaduan Selesai"}
                    value={countComplaintByStatusDone}
                    theme="success"
                    icon={<LuClipboardCheck className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total Pengaduan Ditolak"}
                    value={countComplaintByStatusReject}
                    theme="danger"
                    icon={<LuClipboardX className="w-5 h-5" />}
                />
                <CardCount
                    title={"Total Pengaduan Ditunda"}
                    value={countComplaintByStatusPending}
                    theme="warning"
                    icon={<LuClipboardList className="w-5 h-5" />}
                />
            </div>

            {/* Main Table Component */}
            <Table>
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
                            ) : paginationComplaint.data.length > 0 ? (
                                paginationComplaint.data.map(
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
    <AuthenticatedLayout2 title={`Dashboard Pengaduan`}>
        {page}
    </AuthenticatedLayout2>
);

export default Index;
