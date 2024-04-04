import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import GlobalLink from "@/Components/Atoms/GlobalLink";
import Button from "@/Components/Atoms/Button";
import Input from "@/Components/Input/Input";
import Modal from "@/Components/Atoms/Modal";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { useForm, usePage } from "@inertiajs/react";
import Typography from "@/Components/Atoms/Typography";

const Edit = () => {
    // Destructure errors, and detailAccountData from usePage.props
    const { errors, detailAccountData } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        newPassword: "",
        confirmNewPassword: "",
        imNotBot: "",
    });

    // Handler for button click to toggle modal
    const HandlerButtonClick = () => {
        setIsModalOpen(!isModalOpen);
        reset("imNotBot");
        clearErrors("imNotBot");
    };

    // Handler for input changes
    const handlerDataChange = async (e) => {
        const { id, value } = e.target;

        // Logic for handling "imNotBot" input
        if (id === "imNotBot") {
            setData((data) => {
                const newData = { ...data, [id]: value };

                // Check if emails match
                const { imNotBot } = newData;
                imNotBot !== detailAccountData.email
                    ? setError({
                          imNotBot: "Emails do not match.",
                      })
                    : clearErrors("imNotBot");

                return newData;
            });
        }

        // Logic for handling other inputs
        setData((data) => {
            const newData = { ...data, [id]: value };

            // Update state with new values
            const { newPassword, confirmNewPassword } = newData;

            // Check if passwords match
            newPassword !== confirmNewPassword
                ? setError({
                      confirmNewPassword: "Passwords do not match.",
                      newPassword: "Passwords do not match.",
                  })
                : clearErrors("confirmNewPassword", "newPassword");

            return newData;
        });
    };

    // Handler for saving password
    const HandlerSavePassword = (e) => {
        e.preventDefault();

        // Transform data to include only newPassword
        transform((data) => {
            return { newPassword: data.newPassword };
        });

        // Perform patch request
        patch(
            `http://localhost:8000/super-admin/dashboard-manages-worker-accounts/${detailAccountData.id}`,
            {
                preserveScroll: true,
                onSuccess: () =>
                    reset("newPassword", "confirmNewPassword", "imNotBot"),
            }
        );
    };

    // Close modal on errors.newPassword
    useEffect(() => {
        setIsModalOpen(false);
    }, [errors.newPassword]);

    return (
        <>
            <div className="w-max p-2">
                <GlobalLink
                    href={route(
                        "super-admin.dashboard-manages-worker-accounts-index"
                    )}
                    className="flex items-center group"
                >
                    <IoMdArrowRoundBack />
                    <Typography theme="primary" tag="span">
                        Kembali
                    </Typography>
                </GlobalLink>
            </div>
            <main className="h-full pb-16 overflow-y-auto mt-5">
                <div className="container px-6 mx-auto grid">
                    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Data Pengguna
                    </h4>
                    <form className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <Input>
                            <Input.Label labelName={"Name"} />
                            <Input.InputText
                                disabled={true}
                                value={detailAccountData.full_name}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Email"} />
                            <Input.InputText
                                disabled={true}
                                value={detailAccountData.email}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Role"} />
                            <Input.InputText
                                disabled={true}
                                value={detailAccountData.roles[0].name}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Password"} />
                            <Input.InputPassword
                                id="newPassword"
                                placeholder={"Isi Password Baru"}
                                message={
                                    formErrors.newPassword || errors.newPassword
                                }
                                theme={
                                    formErrors.newPassword || errors.newPassword
                                        ? "danger"
                                        : "primary"
                                }
                                value={data.newPassword}
                                onChange={handlerDataChange}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Re-Password"} />
                            <Input.InputPassword
                                id="confirmNewPassword"
                                placeholder={"Re-Password"}
                                requaired
                                message={
                                    formErrors.confirmNewPassword ||
                                    errors.newPassword
                                }
                                theme={
                                    formErrors.confirmNewPassword ||
                                    errors.newPassword
                                        ? "danger"
                                        : "primary"
                                }
                                value={data.confirmNewPassword}
                                onChange={handlerDataChange}
                            />
                        </Input>
                        <Button
                            className={"mt-4"}
                            onClick={HandlerButtonClick}
                            disabled={!isDirty}
                        >
                            <Typography
                                theme="primary"
                                tag="span"
                                children={"Ubah Password"}
                            />
                        </Button>
                    </form>

                    <Modal show={isModalOpen} close={HandlerButtonClick}>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={HandlerSavePassword}>
                            <div className="mt-4 mb-6">
                                {/* <!-- Modal title --> */}
                                <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    Modal header
                                </p>
                                {/* <!-- Modal description --> */}
                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                    Apa anda yakin mengubah password? jika iya
                                    maka ketik tulisan didalam input dari data{" "}
                                    <span className="font-black text-base text-red-600">
                                        "{detailAccountData.email}"
                                    </span>{" "}
                                    untuk konfirmasi.
                                </p>
                                <Input>
                                    <Input.InputText
                                        id={"imNotBot"}
                                        placeholder={`Ketik ${detailAccountData.email} untuk konfirmasi`}
                                        onChange={handlerDataChange}
                                        message={formErrors.imNotBot}
                                        theme={
                                            formErrors.imNotBot
                                                ? "danger"
                                                : "primary"
                                        }
                                        value={data.imNotBot}
                                    />
                                </Input>
                            </div>
                            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                                <Button
                                    className="w-full px-5 py-3 text-sm font-medium leading-5 text-whit text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                    type="submit"
                                    onClick={HandlerButtonClick}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    theme={"primary"}
                                    type="submit"
                                    disabled={
                                        formErrors.imNotBot ||
                                        !data.imNotBot ||
                                        processing
                                    }
                                >
                                    Accept
                                </Button>
                            </footer>
                        </form>
                    </Modal>
                </div>
            </main>
        </>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout2
        title={`Dashboard Mengelola Akun Pekerja | Edit Password`}
    >
        {page}
    </AuthenticatedLayout2>
);

export default Edit;
