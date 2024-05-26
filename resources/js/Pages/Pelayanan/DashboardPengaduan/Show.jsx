import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { usePage } from "@inertiajs/react";
import Typography from "@/Components/Atoms/Typography";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import { IoMdArrowRoundBack } from "react-icons/io";

const Show = () => {
    // Menggunakan usePage() untuk mendapatkan detail pengaduan dari props
    const { detailComplaint } = usePage().props;

    const {
        certificate_no,
        complaint_status,
        complaint_media_type,
        user_email,
        subdistrict,
        village,
        user,
        description,
        archives,
    } = detailComplaint;

    return (
        <>
            <div className="w-max p-2">
                <GlobalLink
                    href={route("pelayanan.dashboard-complaints-index")}
                    className="flex items-center group"
                >
                    <IoMdArrowRoundBack />
                    Kembali
                </GlobalLink>
            </div>
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-2 lg:px-6 mx-auto grid">
                    <div className="flex flex-wrap gap-5 px-2 lg:px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <Typography
                            tag="h4"
                            className="mb-4 text-lg font-semibold basis-full text-center"
                        >
                            Data Pengaduan
                        </Typography>

                        <div className="flex w-full flex-wrap">
                            <Typography tag="p" children={"1."} />
                            <Typography
                                tag="p"
                                className={"lg:w-[200px] lg:pl-5 pl-3"}
                                children={"Identitas Pemohon"}
                            />
                            <Typography
                                tag="p"
                                className={"px-3"}
                                children={":"}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"A."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"Nama Pemohon"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={user.full_name}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"B."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"Alamat"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={subdistrict.name}
                            />
                            <Typography tag="p" children={","} />
                            <Typography
                                tag="p"
                                className={"lg:pl-2 pl-7"}
                                children={village.name}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"C."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"E-mail"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={user.email}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"D."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"Nomor Telepon"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={user.phone_number}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"E."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"Nomor Sertifikat"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={certificate_no}
                            />
                        </div>
                        <div className="flex w-full pl-5 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={"F."} />
                                <Typography
                                    tag="p"
                                    className={"lg:w-[150px] lg:pl-5 pl-3"}
                                    children={"Status Pengaduan"}
                                />
                                <Typography
                                    tag="p"
                                    className={"px-3 lg:max-w-max"}
                                    children={":"}
                                />
                            </div>
                            <Typography
                                tag="p"
                                className={"pl-7 lg:pl-0"}
                                children={complaint_status.name}
                            />
                        </div>
                        <div className="flex w-full flex-wrap">
                            <Typography tag="p" children={"2."} />
                            <Typography
                                tag="p"
                                className={"lg:w-[200px] lg:pl-5 pl-3"}
                                children={"Uraian Pengaduan"}
                            />
                            <Typography
                                tag="p"
                                className={"px-3"}
                                children={":"}
                            />
                        </div>
                        <div className="flex w-full pl-8 lg:pl-10 flex-wrap">
                            <div className="flex w-full lg:max-w-max flex-wrap">
                                <Typography tag="p" children={description} />
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap">
                            <Typography tag="p" children={"3."} />
                            <Typography
                                tag="p"
                                className={"lg:w-[200px] lg:pl-5 pl-3"}
                                children={"Bukti Yang Dilampirkan"}
                            />
                            <Typography
                                tag="p"
                                className={"px-3"}
                                children={":"}
                            />
                        </div>
                        <div className="flex w-full px-10 flex-wrap">
                            <div className="w-full bg-red-500">
                                {archives.length > 0 ? (
                                    archives.map((archive, index) => (
                                        <img
                                            key={index}
                                            src={archive.resource}
                                            alt={`Bukti ${index + 1}`}
                                            className="w-full"
                                        />
                                    ))
                                ) : (
                                    <Typography
                                        tag="p"
                                        className={"px-3"}
                                        children={
                                            "Tidak ada bukti yang dilampirkan"
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout2 title={`Pelayanan - Detail Pengaduan`}>
        {page}
    </AuthenticatedLayout2>
);

export default Show;
