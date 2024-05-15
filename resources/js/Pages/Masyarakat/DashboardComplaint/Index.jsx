import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { FaClipboardUser } from "react-icons/fa6";
import { usePage } from "@inertiajs/react";
import {
    LuClipboardCheck,
    LuClipboardList,
    LuClipboardSignature,
    LuClipboardX,
} from "react-icons/lu";
import Table from "@/Components/Tables/Table";
import Notif1 from "@/Components/Notifications/Notif1";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import axios from "axios";
import Select from "@/Components/Molecules/Select";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import { MdDeleteForever } from "react-icons/md";

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
        allStatus,
        flash,
        ...props
    } = usePage().props;
    // const echo = useEcho();
    const [show, setShow] = useState(true);
    const [searchResults, setSearchResults] = useState(paginationComplaint);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const deferredSearch = useDeferredValue(keyword);
    const isFirstMount = useRef(true);
    const [status, setStatus] = useState("");

    const complaintStatus = (status) => {
        switch (status) {
            case "diproses":
                return "info";
                break;
            case "ditunda":
                return "error";
                break;
            case "diselesaikan":
                return "success";
                break;
            case "ditolak":
                return "warning";
                break;
        }
    };

    const handlerDataChange = (e) => {
        setLoading(true);
        const { id, value } = e.target;
        setStatus(value);
        if (value == "semua") {
            setSearchResults({ ...paginationComplaint });
            setLoading(false);
        } else {
            const res = paginationComplaint.data.filter(
                (data) => data.complaint_status.id === value
            );

            setSearchResults({ ...paginationComplaint, data: res });
            setLoading(false);
        }
    };
    const handlerSearch = async () => {
        setLoading(true);
        const res = await axios.get(route("masyarakat.complaints-index"), {
            params: {
                keyword: deferredSearch,
                email: auth.user.email,
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
                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>Nama Pemohon</Table.Th>
                        <Table.Th>
                            <Select>
                                <Select
                                    className={"basis-2/5"}
                                    children={
                                        <Select.Label
                                            id={"confirmation"}
                                            value={status}
                                            onChange={handlerDataChange}
                                            theme={"ghost"}
                                            required
                                            children={
                                                <>
                                                    <Select.Option
                                                        title={
                                                            "Status Pengaduan"
                                                        }
                                                        value={""}
                                                        disabled
                                                        hidden
                                                    />
                                                    <Select.Option
                                                        title={
                                                            "Semua Status Pengaduan"
                                                        }
                                                        value={"semua"}
                                                    />
                                                    {allStatus.length > 0 &&
                                                        allStatus.map(
                                                            (data, index) => (
                                                                <Select.Option
                                                                    key={index}
                                                                    title={
                                                                        data.name
                                                                    }
                                                                    value={
                                                                        data.id
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </>
                                            }
                                        />
                                    }
                                />
                            </Select>
                        </Table.Th>
                        <Table.Th>media</Table.Th>
                        <Table.Th>kecamatan</Table.Th>
                        <Table.Th>desa</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {loading === false ? (
                            searchResults?.data.length > 0 ? (
                                searchResults.data.map((data, index) => (
                                    <Table.Tr key={index}>
                                        <Table.TdProfile
                                            name={data.user.full_name}
                                            email={data.user.email}
                                            src={data.user.avatar}
                                        />
                                        <Table.TdStatus
                                            status={data.complaint_status.name}
                                            description={
                                                data.complaint_status
                                                    .description
                                            }
                                            theme={complaintStatus(
                                                data.complaint_status.slug
                                            )}
                                        />
                                        <Table.TdBasic>
                                            <div
                                                className="tooltip tooltip-left"
                                                data-tip={
                                                    data.complaint_media_type
                                                        .description
                                                }
                                            >
                                                {data.complaint_media_type.name}
                                            </div>
                                        </Table.TdBasic>
                                        <Table.TdBasic>
                                            {data.subdistrict.name}
                                        </Table.TdBasic>
                                        <Table.TdBasic>
                                            {data.village.name}
                                        </Table.TdBasic>
                                        {data.complaint_status.slug ===
                                        "ditolak" ? (
                                            <Table.TdBasic className="flex gap-4 w-full">
                                                <GlobalLink
                                                    href={route(
                                                        "pelayanan.complaint-verification-dashboard-edit",
                                                        {
                                                            id: data.id,
                                                        }
                                                    )}
                                                    children={
                                                        <FaRegEdit className="w-5 h-5" />
                                                    }
                                                    theme="warning"
                                                    maxWidth="max"
                                                />
                                                <GlobalLink
                                                    href={route(
                                                        "pelayanan.complaint-verification-dashboard-edit",
                                                        {
                                                            id: data.id,
                                                        }
                                                    )}
                                                    children={
                                                        <MdDeleteForever className="w-5 h-5" />
                                                    }
                                                    theme="danger"
                                                    maxWidth="max"
                                                />
                                            </Table.TdBasic>
                                        ) : (
                                            <Table.TdBasic>
                                                <GlobalLink
                                                href={route(
                                                    "complaint.show",
                                                    {
                                                        complaint: data.id,
                                                    }
                                                )}
                                                children={
                                                    <FaRegEye className="w-5 h-5" />
                                                }
                                                theme="info"
                                                maxWidth="max"
                                            />
                                            </Table.TdBasic>
                                        )}
                                    </Table.Tr>
                                ))
                            ) : (
                                <Table.Tr>
                                    <Table.TdBasic
                                        children={"no data record"}
                                        colSpan="5"
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
                                    colSpan="5"
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
