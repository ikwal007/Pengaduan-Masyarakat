import { IoMdArrowRoundBack } from "react-icons/io";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import Button from "@/Components/Atoms/Button";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { useForm, usePage } from "@inertiajs/react";
import Typography from "@/Components/Atoms/Typography";
import Select from "@/Components/Molecules/Select";

const Edit = () => {
    // Destructure errors, and detailAccountData from usePage.props
    const { detailComplaint, allComplaintStatus } = usePage().props;

    const {
        user,
        subdistrict,
        village,
        certificate_no,
        complaint_status,
        complaint_handling,
        description,
    } = detailComplaint;

    // Destructure properties from useForm
    const {
        data,
        setData,
        patch,
        processing,
        errors: formErrors,
        isDirty,
        setError,
        clearErrors,
        reset,
        cancel,
        transform,
    } = useForm({
        complaintHandlingStatus:
            complaint_handling[0].complaint_status.id || "",
    });

    // Handler for input changes
    const handlerDataChange = async (e) => {
        const { id, value } = e.target;

        // Logic for handling other inputs
        setData((data) => {
            const newData = { ...data, [id]: value };

            return newData;
        });
    };

    const submit = (e) => {
        e.preventDefault();
        patch(
            route(
                "complaint-handling.update",
                detailComplaint.complaint_handling[0].id
            )
        );
    };

    return (
        <>
            <div className="w-max p-2">
                <GlobalLink
                    href={route("complaint-handling.index")}
                    className="flex items-center group"
                >
                    <IoMdArrowRoundBack />
                    Kembali
                </GlobalLink>
            </div>
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-6 mx-auto grid">
                    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Data Penanganan Pengaduan
                    </h4>
                    <form
                        className="px-8 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-3"
                        onSubmit={submit}
                    >
                        <div className="flex gap-3">
                            <Typography tag="h4">Name :</Typography>
                            <Typography tag="h4" className="capitalize">
                                {user.full_name}
                            </Typography>
                        </div>
                        <div className="flex gap-3">
                            <Typography tag="h4">Email :</Typography>
                            <Typography tag="h4">{user.email}</Typography>
                        </div>
                        <div className="flex gap-3">
                            <Typography tag="h4">
                                Sertifikat Number :
                            </Typography>
                            <Typography tag="h4">{certificate_no}</Typography>
                        </div>
                        <div className="flex gap-3">
                            <Typography tag="h4">Status Pengaduan :</Typography>
                            <Typography tag="h4">
                                {complaint_status.name}
                            </Typography>
                        </div>
                        <div className="flex items-center space-x-10">
                            <Typography tag="h4">
                                Status Penanganan :
                            </Typography>
                            <Select
                                className={"basis-2/5"}
                                children={
                                    <Select.Label
                                        id={"complaintHandlingStatus"}
                                        value={data.complaintHandlingStatus}
                                        onChange={handlerDataChange}
                                        theme={
                                            formErrors.complaintHandlingStatus
                                                ? "error"
                                                : "primary"
                                        }
                                        message={
                                            formErrors.complaintHandlingStatus
                                        }
                                        children={
                                            <>
                                                {allComplaintStatus &&
                                                    allComplaintStatus.map(
                                                        ({ id, name }, i) => (
                                                            <Select.Option
                                                                title={name}
                                                                value={id}
                                                                key={i}
                                                            />
                                                        )
                                                    )}
                                            </>
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="flex gap-3">
                            <Typography tag="h4">Kecamatan :</Typography>
                            <Typography tag="h4" className="capitalize">
                                {subdistrict.name}
                            </Typography>
                        </div>
                        <div className="flex gap-3">
                            <Typography tag="h4">Kecamatan :</Typography>
                            <Typography tag="h4" className="capitalize">
                                {village.name}
                            </Typography>
                        </div>
                        <div className="flex flex-col">
                            <Typography tag="h4">Uraian Pengaduan :</Typography>
                            <Typography tag="h4" className="ml-10 capitalize">
                                {description}
                            </Typography>
                        </div>

                        <Button className={"mt-4"} type="submit" maxWidth="max">
                            Simpan Perubahan
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout2
        title={`Dashboard Mengelola Pengaduan | Edit Penanganan Pengaduan`}
    >
        {page}
    </AuthenticatedLayout2>
);

export default Edit;
