import Button from "@/Components/Button/Button";
import Input from "@/Components/Input/Input";
import Modal from "@/Components/Molecules/Modal";
import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Edit = () => {
    const props = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState({
        newPassword: "",
        confirmNewPassword: "",
        imNotBot: "",
    });
    const {
        data,
        setData,
        patch,
        processing,
        errors,
        isDirty,
        setError,
        clearErrors,
        reset,
        cancel,
        transform ,
    } = useForm({
        newPassword: "",
        confirmNewPassword: "",
        imNotBot: "",
    });

    const HandlerButtonClick = () => {
        setIsModalOpen(!isModalOpen);
        reset("imNotBot");
        clearErrors("imNotBot");
    };

    const handlerDataChange = async (e) => {
        const { id, value } = e.target;

        if (id === "imNotBot") {
            setData((data) => {
                const newData = { ...data, ["imNotBot"]: value };

                const { imNotBot } = newData;

                imNotBot !== props.detailAccountData.email
                    ? setError({
                          imNotBot: "Emails do not match.",
                      })
                    : clearErrors("imNotBot");

                return newData;
            });
        }

        setData((data) => {
            const newData = { ...data, [id]: value };

            // Update state dengan nilai baru
            const { newPassword, confirmNewPassword } = newData;

            newPassword !== confirmNewPassword
                ? setError({
                      confirmNewPassword: "Passwords do not match.",
                      newPassword: "Passwords do not match.",
                  })
                : clearErrors("confirmNewPassword", "newPassword");

            return newData;
        });
    };

    const HandlerSavePassword = (e) => {
        e.preventDefault();
        const { confirmNewPassword, imNotBot } = data;

        transform((data) => {
            return { newPassword: data.newPassword };
        })

        if (imNotBot !== props.detailAccountData.email) {
            setError({
                imNotBot: "Emails do not match.",
            });
            return cancel();
        }

        patch(
            `http://localhost:8000/super-admin/dashboard-manages-worker-accounts/${props.detailAccountData.id}`,
            { preserveScroll: true, onSuccess: () => reset("newPassword", "confirmNewPassword", "imNotBot") }
        );
    };

    useEffect(() => {
        setIsModalOpen(false)
    },[props.errors.newPassword])

    console.log(props.detailAccountData);

    return (
        <>
            <main className="h-full pb-16 overflow-y-auto">
                <div className="container px-6 mx-auto grid">
                    <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Elements
                    </h4>
                    <form className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <Input>
                            <Input.Label labelName={"Name"} />
                            <Input.InputText
                                disabled={true}
                                value={props.detailAccountData.full_name}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Email"} />
                            <Input.InputText
                                disabled={true}
                                value={props.detailAccountData.email}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Role"} />
                            <Input.InputText
                                disabled={true}
                                value={props.detailAccountData.roles[0].name}
                            />
                        </Input>
                        <Input>
                            <Input.Label labelName={"Password"} />
                            <Input.InputPassword
                                id="newPassword"
                                placeholder={"Isi Password Baru"}
                                message={
                                    props.flash.message || errors.newPassword
                                }
                                theme={
                                    props.flash.message || errors.newPassword
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
                                    props.flash.message || errors.newPassword
                                }
                                theme={
                                    props.flash.message || errors.newPassword
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
                            <Button.Title children={"Ubah Password"} />
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
                                        "{props.detailAccountData.email}"
                                    </span>{" "}
                                    untuk konfirmasi.
                                </p>
                                <Input>
                                    <Input.InputText
                                        id={"imNotBot"}
                                        placeholder={`Ketik ${props.detailAccountData.email} untuk konfirmasi`}
                                        onChange={handlerDataChange}
                                        message={errors.imNotBot}
                                        theme={
                                            errors.imNotBot
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
                                    disabled={errors.imNotBot || !data.imNotBot || processing}
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
        title={`Dashboard Manages Worker Accounts Edit Password`}
    >
        {page}
    </AuthenticatedLayout2>
);

export default Edit;
