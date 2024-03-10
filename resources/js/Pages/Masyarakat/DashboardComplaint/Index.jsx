import Card from "@/Components/Cards/Card";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
// import { useEcho } from "@/utils/EchoContext";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie, FaUserCheck, FaClipboardUser } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
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
import { useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import { IoSearchOutline } from "react-icons/io5";

const Index = () => {
    // Destructure props from usePage()
    const {
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
                <div className="flex lg:justify-end flex-1 lg:mt-5 lg:mr-32 w-full">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <IoSearchOutline className="w-4 h-4" />
                        </div>
                        <input
                            className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                            type="text"
                            placeholder="Search for projects"
                            aria-label="Search"
                        />
                    </div>
                </div>

                <Table.Main className="mt-5">
                    <Table.TableHead>
                        <Table.Th>Nama Pemohon</Table.Th>
                        <Table.Th>status</Table.Th>
                        <Table.Th>media</Table.Th>
                        <Table.Th>kecamatan</Table.Th>
                        <Table.Th>desa</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {paginationComplaint.data.length > 0 ? (
                            paginationComplaint.data.map((data, index) => (
                                <Table.Tr key={index}>
                                    <Table.TdProfile
                                        name={data.user.full_name}
                                        email={data.user.email}
                                        src={data.user.avatar}
                                    />
                                    <Table.TdStatus
                                        status={data.complaint_status.name}
                                        description={data.complaint_status.description}
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
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.TdBasic
                                    children={"no data record"}
                                    colSpan="4"
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
