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
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import { MdDeleteForever } from "react-icons/md";
import usePusher from "@/utils/Pusher/usePusher";

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
    const [showNotification, setShowNotification] = useState(true);
    const [filteredComplaints, setFilteredComplaints] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

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
        setLoading(true);
        const { id, value } = e.target;
        setSelectedStatus(value);
        if (value == "semua") {
            setFilteredComplaints(null);
            setLoading(false);
        } else {
            const res = paginationComplaint.data.filter(
                (data) => data.complaint_status.id === value
            );

            setFilteredComplaints({ ...paginationComplaint, data: res });
            setLoading(false);
        }
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

            {/* Main Table Component */}
            <Table>
                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>No</Table.Th>
                        <Table.Th>Nama Pemohon</Table.Th>
                        <Table.Th>
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
                        </Table.Th>
                        <Table.Th>media</Table.Th>
                        <Table.Th>kecamatan</Table.Th>
                        <Table.Th>desa</Table.Th>
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
                                        colSpan="7"
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
                                    colSpan="7"
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
