import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { usePage } from "@inertiajs/react";
import Table from "@/Components/Tables/Table";
import Notif1 from "@/Components/Notifications/Notif1";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CardCount from "@/Components/Molecules/Cards/CardCount";
import { IoSearchOutline } from "react-icons/io5";
import Input from "@/Components/Input/Input";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import { FaRegEdit } from "react-icons/fa";
import DateConverter from "@/utils/DateTime/DateConverter";
import { MdNewReleases } from "react-icons/md";

const Index = () => {
    // Destructure props from usePage()
    const {
        countComplaint,
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

    const handlerSearch = async () => {
        setLoading(true);
        const res = await axios.get(route("pelayanan.complaints-index"), {
            params: {
                confirmed: 0,
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
                    title={"Total Pengaduan Yang Belum Diverifikasi"}
                    value={countComplaint}
                    theme="secondary"
                    icon={<MdNewReleases className="w-5 h-5" />}
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
                        <Table.Th>waktu pengaduan dibuat</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.TableHead>
                    <Table.TableBody>
                        {loading === false ? (
                            searchResults !== null && deferredSearch !== "" ? (
                                searchResults.data.length > 0 ? (
                                    searchResults.data.map((data, index) => (
                                        <Table.Tr key={index}>
                                            <Table.TdProfile
                                                name={data.user.full_name}
                                                email={data.user.email}
                                                src={data.user.avatar}
                                            />
                                            <Table.TdStatus
                                                status={
                                                    data.complaint_status.name
                                                }
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
                                                        data
                                                            .complaint_media_type
                                                            .description
                                                    }
                                                >
                                                    {
                                                        data
                                                            .complaint_media_type
                                                            .name
                                                    }
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
                                            <Table.TdBasic>
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
                                            </Table.TdBasic>
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
                            ) : paginationComplaint.data.length > 0 ? (
                                paginationComplaint.data.map((data, index) => (
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
                                        <Table.TdBasic>
                                            {DateConverter(data.created_at)}
                                        </Table.TdBasic>
                                        <Table.TdBasic>
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
                                        </Table.TdBasic>
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
                {searchResults === null && (
                    <Table.Footer
                        showFrom={paginationComplaint.from}
                        showTo={paginationComplaint.to}
                        total={paginationComplaint.total}
                        links={paginationComplaint.links}
                        last_page_url={paginationComplaint.last_page_url}
                        first_page_url={paginationComplaint.first_page_url}
                    />
                )}
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
