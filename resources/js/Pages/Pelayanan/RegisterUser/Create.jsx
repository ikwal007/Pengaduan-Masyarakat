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
import { FaRegUser } from "react-icons/fa";

const Create = () => {
    // Destructure props from usePage()
    const {
        flash,
        errors,
        allComplainType,
        allComplaintMediaType,
        subdistricts,
        defaultComplaintStatus,
        ...props
    } = usePage().props;

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
        email: "",
        fullName: "",
        password: "Password01*",
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
        post(route("pelayanan.store_user"), {
            onSuccess: () => reset(),
            onError: () => setError(errors),
        });
    };

    useEffect(() => {
        setShow(true);
    }, [flash]);

    console.log("ini errors: ", formErrors);

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
                            Formulir User Baru
                        </Typography>

                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"email"}
                                labelName={"Email Pelapor Pengaduan"}
                                message={formErrors.email}
                                children={
                                    <Input.InputEmail
                                        id={"email"}
                                        inputSize="md"
                                        theme={
                                            formErrors.email
                                                ? "error"
                                                : "primary"
                                        }
                                        leftIcon={
                                            <MdAlternateEmail
                                                className={`w-7 h-7 ${
                                                    formErrors.email
                                                        ? "text-error"
                                                        : "text-primary"
                                                } opacity-70`}
                                            />
                                        }
                                        value={data.email}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>

                        <Input className={"basis-2/5"}>
                            <Input.Label
                                htmlFor={"fullName"}
                                labelName={"Nama Lengkap"}
                                message={formErrors.fullName}
                                children={
                                    <Input.InputText
                                        id={"fullName"}
                                        inputSize="md"
                                        theme={
                                            formErrors.fullName
                                                ? "error"
                                                : "primary"
                                        }
                                        leftIcon={
                                            <FaRegUser
                                                className={`w-7 h-7 ${
                                                    formErrors.fullName
                                                        ? "text-error"
                                                        : "text-primary"
                                                } opacity-70`}
                                            />
                                        }
                                        value={data.fullName}
                                        onChange={handlerDataChange}
                                    />
                                }
                            />
                        </Input>

                        <div className="w-full">
                            <Button
                                theme={"primary"}
                                maxWidth="md"
                                className={"mt-5"}
                                disabled={processing}
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
    <AuthenticatedLayout2 title={`Buat User Yang Belum Memiliki Akun`}>
        {page}
    </AuthenticatedLayout2>
);

export default Create;
