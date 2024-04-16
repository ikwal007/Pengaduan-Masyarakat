import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { PiKeyThin } from "react-icons/pi";
// import { useEcho } from "@/utils/EchoContext";
import { MdAlternateEmail } from "react-icons/md";
import { useForm, usePage } from "@inertiajs/react";
import Notif1 from "@/Components/Notifications/Notif1";
import { useEffect, useState } from "react";
import Typography from "@/Components/Atoms/Typography";
import Input from "@/Components/Input/Input";
import Select from "@/Components/Molecules/Select";
import Button from "@/Components/Atoms/Button";

const Create = () => {
    // Destructure props from usePage()
    const {
        auth,
        flash,
        errors,
        allComplainType,
        defaultComplaintMediaTypeForMasyarakat,
        subdistricts,
        defaultComplaintStatus,
    } = usePage().props;

    const [subdistrictSelected, setSubdistrictSelected] = useState([]);

    const [show, setShow] = useState(true);

    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        reset,
        errors: errorForm,
        setError,
        clearErrors,
    } = useForm({
        complainType: "",
        complainMediaType: defaultComplaintMediaTypeForMasyarakat,
        userEmail: auth.user.email,
        subdistricts: "",
        village: "",
        certificateNumber: "",
        description: "",
        complainStatus: defaultComplaintStatus.id,
    });

    const handlerDataChange = (e) => {
        const { id, value } = e.target;

        if (id === "subdistricts") {
            const newData = subdistricts.find(
                (subdistricts) => subdistricts.id === String(value)
            );

            setSubdistrictSelected(newData);
        }

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

    const getVillageOptions = () => {
        if (subdistrictSelected && subdistrictSelected.village) {
            return subdistrictSelected.village.map(({ id, name }) => (
                <option key={id} value={id}>
                    {name}
                </option>
            ));
        }
        return [];
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("complaint.store"), {
            onSuccess: () => reset(),
            onError: () => setError(errors),
        });
    };

    useEffect(() => {
        setShow(true);
    }, [flash]);

    return (
        <>
            {flash.message && show && (
                <Notif1 message={flash.message} show={show} setShow={setShow} />
            )}

            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-6 mx-auto grid">
                    <form
                        className="flex flex-wrap gap-5 px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                        onSubmit={submit}
                    >
                        <Typography
                            tag="h4"
                            className="mb-4 text-lg font-semibold basis-full"
                        >
                            Buat Pengaduan
                        </Typography>

                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"complainType"}
                                    title={"Jenis Pengaduan"}
                                    value={data.complainType}
                                    onChange={handlerDataChange}
                                    theme={
                                        formErrors.complainType
                                            ? "error"
                                            : "primary"
                                    }
                                    message={formErrors.complainType}
                                    children={
                                        <>
                                            <Select.Option
                                                title={"Pilih Jenis Pengaduan"}
                                                value={""}
                                                disabled
                                                hidden
                                            />
                                            {allComplainType &&
                                                allComplainType.map(
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
                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"subdistricts"}
                                    title={"Kecamatan"}
                                    value={data.subdistricts}
                                    onChange={handlerDataChange}
                                    theme={
                                        formErrors.subdistricts
                                            ? "error"
                                            : "primary"
                                    }
                                    message={formErrors.subdistricts}
                                    children={
                                        <>
                                            <Select.Option
                                                title={"Pilih Kecamatan"}
                                                value={""}
                                                disabled
                                                hidden
                                            />
                                            {subdistricts &&
                                                subdistricts.map(
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
                        <Select
                            className={"basis-2/5"}
                            children={
                                <Select.Label
                                    id={"village"}
                                    title={"Desa"}
                                    value={data.village}
                                    onChange={handlerDataChange}
                                    disabled={
                                        subdistrictSelected.length == 0 ||
                                        data.village == null
                                    }
                                    theme={
                                        formErrors.village ? "error" : "primary"
                                    }
                                    message={formErrors.village}
                                    children={
                                        <>
                                            <Select.Option
                                                title={"Pilih Kecamatan"}
                                                value={""}
                                                disabled
                                                hidden
                                            />
                                            {getVillageOptions()}
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
                                        value={data.certificateNumber}
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
                                children={
                                    <Input.InputTextarea
                                        id={"description"}
                                        inputSize="md"
                                        theme={
                                            formErrors.description
                                                ? "error"
                                                : "primary"
                                        }
                                        value={data.description}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>

                        <div className="w-full">
                            <Button
                                theme={"primary"}
                                maxWidth="md"
                                height="lg"
                                className={"mt-5"}
                                type="submit"
                            >
                                Upload Pengaduan
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

Create.layout = (page) => (
    <AuthenticatedLayout2 title={`Buat Pengaduan`}>{page}</AuthenticatedLayout2>
);

export default Create;
