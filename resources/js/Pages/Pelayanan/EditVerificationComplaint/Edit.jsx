import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { PiKeyThin } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { useForm, usePage } from "@inertiajs/react";
import Typography from "@/Components/Atoms/Typography";
import Input from "@/Components/Input/Input";
import Select from "@/Components/Molecules/Select";
import Button from "@/Components/Atoms/Button";

const Edit = () => {
    // Destructure props from usePage()
    const {
        flash,
        errors,
        allComplainType,
        allComplaintMediaType,
        subdistricts,
        defaultComplaintStatus,
        oldDataFormOnSession,
        detailComplaint,
        ...props
    } = usePage().props;

    const {
        certificate_no,
        complaint_type,
        complaint_media_type,
        user_email,
        subdistrict,
        village,
        description,
        archives,
    } = detailComplaint;

    const {
        data,
        setData,
        patch,
        processing,
        errors: formErrors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        deskripsiPenolakan: "",
        confirmation: "",
    });

    const handlerDataChange = (e) => {
        const { id, value } = e.target;

        setData((data) => {
            const res = {
                ...data,
                [id]: value,
            };

            if (res[id] !== null || res[id !== ""]) {
                clearErrors(id);
            }

            return res;
        });
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("pelayanan.complaint-verification-dashboard-update", { id: detailComplaint.id}), {
            onSuccess: () => reset(),
            onError: () => setError(errors),
        });
    };

    console.log(data, "ini detailComplaint");

    return (
        <>
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-2 lg:px-6 mx-auto grid">
                    <form
                        className="flex flex-wrap gap-5 px-2 lg:px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <Typography
                            tag="h4"
                            className="mb-4 text-lg font-semibold basis-full"
                        >
                            Verifikasi Pengaduan
                        </Typography>

                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"complainType"}
                                    title={"Jenis Pengaduan"}
                                    value={complaint_type.id}
                                    onChange={handlerDataChange}
                                    disabled={true}
                                    theme={
                                        formErrors.complainType
                                            ? "error"
                                            : "primary"
                                    }
                                    message={formErrors.complainType}
                                    children={
                                        <>
                                            <Select.Option
                                                title={complaint_type.name}
                                                value={complaint_type.id}
                                            />
                                        </>
                                    }
                                />
                            }
                        />
                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"complainMediaType"}
                                    title={"Jenis Media Pengaduan"}
                                    value={complaint_media_type.id}
                                    onChange={handlerDataChange}
                                    theme={
                                        formErrors.complainMediaType
                                            ? "error"
                                            : "primary"
                                    }
                                    disabled={true}
                                    message={formErrors.complainMediaType}
                                    children={
                                        <>
                                            <Select.Option
                                                title={
                                                    complaint_media_type.name
                                                }
                                                value={complaint_media_type.id}
                                                disabled
                                                hidden
                                            />
                                        </>
                                    }
                                />
                            }
                        />
                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"userEmail"}
                                labelName={"Email Pelapor Pengaduan"}
                                message={formErrors.userEmail}
                                children={
                                    <Input.InputEmail
                                        id={"userEmail"}
                                        inputSize="md"
                                        theme={
                                            formErrors.userEmail
                                                ? "error"
                                                : "primary"
                                        }
                                        leftIcon={
                                            <MdAlternateEmail
                                                className={`w-7 h-7 ${
                                                    formErrors.userEmail
                                                        ? "text-error"
                                                        : "text-primary"
                                                } opacity-70`}
                                            />
                                        }
                                        value={user_email}
                                        disabled={true}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>
                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"subdistricts"}
                                    title={"Kecamatan"}
                                    value={subdistrict.id}
                                    onChange={handlerDataChange}
                                    theme={
                                        formErrors.subdistricts
                                            ? "error"
                                            : "primary"
                                    }
                                    message={formErrors.subdistricts}
                                    disabled={true}
                                    children={
                                        <>
                                            <Select.Option
                                                title={subdistrict.name}
                                                value={subdistrict.id}
                                                disabled
                                                hidden
                                            />
                                        </>
                                    }
                                />
                            }
                        />
                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"village"}
                                    title={"Desa"}
                                    value={village.id}
                                    onChange={handlerDataChange}
                                    disabled={true}
                                    theme={
                                        formErrors.village ? "error" : "primary"
                                    }
                                    message={formErrors.village}
                                    children={
                                        <>
                                            <Select.Option
                                                title={village.name}
                                                value={village.id}
                                                disabled
                                                hidden
                                            />
                                        </>
                                    }
                                />
                            }
                        />
                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"certificateNumber"}
                                labelName={"Nomor Sertifikat"}
                                message={formErrors.certificateNumber}
                                disabled={true}
                                children={
                                    <Input.InputText
                                        id={"certificateNumber"}
                                        inputSize="md"
                                        theme={
                                            formErrors.certificateNumber
                                                ? "error"
                                                : "primary"
                                        }
                                        leftIcon={
                                            <PiKeyThin
                                                className={`w-7 h-7 ${
                                                    formErrors.certificateNumber
                                                        ? "text-error"
                                                        : "text-primary"
                                                } opacity-70`}
                                            />
                                        }
                                        value={certificate_no}
                                        disabled={true}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>

                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"description"}
                                labelName={"Masukan Deskripsi Permasalahan"}
                                message={formErrors.description}
                                disabled={true}
                                children={
                                    <Input.InputTextarea
                                        id={"description"}
                                        inputSize="md"
                                        theme={
                                            formErrors.description
                                                ? "error"
                                                : "primary"
                                        }
                                        value={description}
                                        disabled={true}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>

                        <div className="carousel w-full min-h-max">
                            {archives.length > 0
                                ? archives.map((data, i) => {
                                      return (
                                          <div
                                              id={`item${i + 1}`}
                                              className="carousel-item w-full"
                                          >
                                              <img
                                                  src={data.resource}
                                                  className="w-full"
                                              />
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                        <div className="flex justify-center w-full py-2 gap-2">
                            {archives.length > 0
                                ? archives.map((data, i) => {
                                      return (
                                          <a
                                              href={`#item${i + 1}`}
                                              className="btn btn-xs capitalize"
                                          >
                                              {`item ${i + 1}`}
                                          </a>
                                      );
                                  })
                                : null}
                        </div>

                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"deskripsiPenolakan"}
                                labelName={"Masukan Deskripsi Penolakan"}
                                message={formErrors.deskripsiPenolakan}
                                disabled={true}
                                children={
                                    <Input.InputTextarea
                                        id={"deskripsiPenolakan"}
                                        inputSize="md"
                                        theme={
                                            formErrors.deskripsiPenolakan
                                                ? "error"
                                                : "primary"
                                        }
                                        value={data.deskripsiPenolakan}
                                        onChange={handlerDataChange}
                                        required
                                    />
                                }
                            />
                        </Input>

                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"confirmation"}
                                    title={"Aksi Untuk Permohonan"}
                                    value={data.confirmation}
                                    onChange={handlerDataChange}
                                    theme={
                                        formErrors.confirmation ? "error" : "primary"
                                    }
                                    required
                                    message={formErrors.confirmation}
                                    children={
                                        <>
                                            <Select.Option
                                                title={
                                                    "Pilih Aksi Untuk Permohonan"
                                                }
                                                value={""}
                                                disabled
                                                hidden
                                            />
                                            <Select.Option
                                                title={"Tolak Pengaduan"}
                                                value={"ditolak"}
                                            />
                                            <Select.Option
                                                title={"Setujui Pengaduan"}
                                                value={"disetujui"}
                                            />
                                        </>
                                    }
                                />
                            }
                        />

                        <div className="flex gap-4 w-full">
                            <Button
                                theme={"primary"}
                                maxWidth="md"
                                height="lg"
                                className={"mt-5"}
                                type="submit"
                                disabled={processing}
                            >
                                Simpan Pengaduan
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout2 title={`Verifikasi Pengaduan`}>
        {page}
    </AuthenticatedLayout2>
);

export default Edit;
