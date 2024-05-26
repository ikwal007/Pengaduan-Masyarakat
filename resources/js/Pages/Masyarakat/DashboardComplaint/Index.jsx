import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { FaClipboardUser } from "react-icons/fa6";
import { router, usePage } from "@inertiajs/react";
import {
    LuClipboardCheck,
    LuClipboardList,
    LuClipboardSignature,
    LuClipboardX,
} from "react-icons/lu";
import Table from "@/Components/Tables/Table";
import Notif1 from "@/Components/Notifications/Notif1";
import { useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import Select from "@/Components/Molecules/Select";
import { FaFilter, FaRegEdit, FaRegEye } from "react-icons/fa";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import usePusher from "@/utils/Pusher/usePusher";
import DateConverter from "@/utils/DateTime/DateConverter";
import Button from "@/Components/Atoms/Button";
import Typography from "@/Components/Atoms/Typography";
import { IoCloseOutline } from "react-icons/io5";
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const Index = () => {
    const today = new Date();
    const isoString = today.toISOString().split('T')[0];
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
    } = usePage().props;
    const [showNotification, setShowNotification] = useState(true);
    const [filteredComplaints, setFilteredComplaints] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [dateValue, setDateValue] = useState(parseDate(isoString));
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const complaintStatus = (status) => {
        switch (status) {
            case "diproses":
                return "info";
            case "ditunda":
                return "warning";
            case "diselesaikan":
                return "success";
            case "ditolak":
                return "error";
        }
    };

    const handlerDataChange = (e) => {
        const { value } = e.target;
        setSelectedStatus(value);
    };

    const handlePusherEvent = (data) => {
        router.reload({
            only: [
                "countComplaint",
                "countComplaintByStatusProsessing",
                "countComplaintByStatusPending",
                "countComplaintByStatusDone",
                "countComplaintByStatusReject",
                "paginationComplaint",
                "allStatus",
            ],
        });
    };

    usePusher(
        auth,
        "notification-to-masyarakat",
        "ComplaintRegister",
        handlePusherEvent
    );

    const handlerSubmitFilter = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                route("masyarakat.complaints-filter-by-date", {
                    email: auth.user.email,
                    dateFilter: dateValue,
                    statusFilter: selectedStatus,
                }),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setFilteredComplaints(data.data);
            setLoading(false);
            setShowFilterModal(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            {flash.message && showNotification && (
                <Notif1
                    message={flash.message}
                    show={showNotification}
                    setShow={setShowNotification}
                />
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

            <div className="flex gap-5 justify-end ">
                <Button
                    maxWidth="max"
                    theme="danger"
                    className={
                        "group relative overflow-hidden flex items-center"
                    }
                    onClick={() => setFilteredComplaints(null)}
                >
                    <MdDelete className={"w-5 h-5"} />
                    <Typography
                        theme="primary"
                        tag="span"
                        className={
                            "absolute group-hover:relative ml-2 transition-transform transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-700 ease-in-out capitalize"
                        }
                    >
                        hapus filter
                    </Typography>
                </Button>
                <Button
                    maxWidth="max"
                    className={
                        "group relative overflow-hidden flex items-center"
                    }
                    onClick={() => setShowFilterModal(true)}
                >
                    <FaFilter className={"w-5 h-5"} />
                    <Typography
                        theme="primary"
                        tag="span"
                        className={
                            "absolute group-hover:relative ml-2 transition-transform transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-700 ease-in-out capitalize"
                        }
                    >
                        tambahkan filter
                    </Typography>
                </Button>
            </div>

            {showFilterModal && (
                <div className="absolute grid justify-items-center content-center bg-black/50 top-0 left-0 right-0 bottom-0 z-20">
                    <div className="bg-white dark:bg-zinc-800 opacity-100 flex flex-col relative rounded-xl max-w-xl p-5 gap-3">
                        <div className="flex flex-col gap-5">
                            <Calendar
                                aria-label="Date"
                                value={dateValue}
                                onChange={setDateValue}
                            />
                            <Select>
                                <Select
                                    className={"basis-2/5"}
                                    children={
                                        <Select.Label
                                            id={"confirmation"}
                                            value={selectedStatus}
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
                        </div>
                        <div className="flex gap-5">
                            <Button
                                maxWidth="max"
                                className={"!opacity-100"}
                                onClick={() => setShowFilterModal(false)}
                            >
                                <IoCloseOutline className={"w-5 h-5"} />
                            </Button>
                            <Button
                                maxWidth="max"
                                theme="warning"
                                onClick={handlerSubmitFilter}
                            >
                                <FaFilter className={"w-5 h-5"} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Table Component */}
            <Table>
                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>No</Table.Th>
                        <Table.Th>Nama Pemohon</Table.Th>
                        <Table.Th>Status Pengaduan</Table.Th>
                        <Table.Th>media</Table.Th>
                        <Table.Th>kecamatan</Table.Th>
                        <Table.Th>desa</Table.Th>
                        <Table.Th>waktu pengaduan dibuat</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {loading === false ? (
                            filteredComplaints?.data.length > 0 ? (
                                filteredComplaints.data.map((data, index) => (
                                    <Table.Tr key={index}>
                                        <Table.TdBasic>
                                            {index + 1}
                                        </Table.TdBasic>
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
                                        <Table.TdBasic>
                                            {DateConverter(data.created_at)}
                                        </Table.TdBasic>
                                        {data.complaint_status.slug ===
                                        "ditolak" ? (
                                            <Table.TdBasic className="flex gap-4 w-full">
                                                <GlobalLink
                                                    href={route(
                                                        "complaint.edit",
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
                                                    as={"button"}
                                                    method="delete"
                                                    href={route(
                                                        "complaint.destroy",
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
                            ) : paginationComplaint?.data.length > 0 ? (
                                paginationComplaint.data.map((data, index) => (
                                    <Table.Tr key={index}>
                                        <Table.TdBasic>
                                            {index + 1}
                                        </Table.TdBasic>
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
                                        <Table.TdBasic>
                                            {DateConverter(data.created_at)}
                                        </Table.TdBasic>
                                        {data.complaint_status.slug ===
                                        "ditolak" ? (
                                            <Table.TdBasic className="flex gap-4 w-full">
                                                <GlobalLink
                                                    href={route(
                                                        "complaint.edit",
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
                                                    as={"button"}
                                                    method="delete"
                                                    href={route(
                                                        "complaint.destroy",
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
                                        colSpan="8"
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
                                    colSpan="8"
                                    className="text-center"
                                />
                            </Table.Tr>
                        )}
                    </Table.TableBody>
                </Table.Main>
                {filteredComplaints?.data?.length > 0 ? (<Table.Footer2
                    showFrom={filteredComplaints?.from}
                    showTo={filteredComplaints?.to}
                    total={filteredComplaints?.total}
                    links={filteredComplaints?.links}
                    last_page_url={filteredComplaints?.last_page_url}
                    first_page_url={filteredComplaints?.first_page_url}
                    setFilteredComplaints={setFilteredComplaints}
                    setLoading={setLoading}
                />) : (<Table.Footer
                    showFrom={paginationComplaint.from}
                    showTo={paginationComplaint.to}
                    total={paginationComplaint.total}
                    links={paginationComplaint.links}
                    last_page_url={paginationComplaint.last_page_url}
                    first_page_url={paginationComplaint.first_page_url}
                />)}
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
