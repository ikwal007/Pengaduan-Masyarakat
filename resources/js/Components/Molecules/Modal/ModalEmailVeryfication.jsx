import Button from "@/Components/Atoms/Button";
import Modal from "@/Components/Atoms/Modal";
import Input from "@/Components/Input/Input";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const ModalEmailVeryfication = ({ isModalOpen, setIsModalOpen, HandlerSavePassword }) => {
    const { auth } = usePage().props;

    const {
        data,
        setData,
        processing,
        setError,
        reset,
        clearErrors,
        errors: formErrors,
    } = useForm({
        imNotBot: "",
    });

    const handlerDataChange = (e) => {
        const { id, value } = e.target;
        setData((data) => {
            const newData = {
                ...data,
                [id]: value,
            };

            // Update state with new values

            if (newData.imNotBot !== auth.user.email) {
                setError({
                    imNotBot: "Emails do not match.",
                })
            } else {
                clearErrors("imNotBot")
            }

            return newData;
        });
    };
    const HandlerButtonClick = (e) => {
        setIsModalOpen(false);
        HandlerSavePassword(e)
        reset();
    };
    return (
        <Modal show={isModalOpen} close={HandlerButtonClick}>
            {/*  Modal body */}
            <form onSubmit={HandlerButtonClick}>
                <div className="mt-4 mb-6">
                    {/* Modal title */}
                    <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Konfirmasi Email Pengguna
                    </p>
                    {/* Modal description  */}
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Apa anda yakin mengubah password? jika iya maka ketik
                        tulisan didalam input dari data{" "}
                        <span className="font-black text-base text-red-600">
                            "{auth.user.email}"
                        </span>{" "}
                        untuk konfirmasi.
                    </p>
                    <Input>
                        <Input.Label
                            message={formErrors.imNotBot}
                            children={
                                <Input.InputEmail
                                    id={"imNotBot"}
                                    placeholder={`Ketik ${auth.user.email} untuk konfirmasi`}
                                    onChange={handlerDataChange}
                                    value={data.imNotBot}
                                    theme={
                                        formErrors.imNotBot
                                            ? "error"
                                            : "primary"
                                    }
                                />
                            }
                        />
                    </Input>
                </div>
                <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                    <Button type="button" onClick={HandlerButtonClick}>
                        Cancel
                    </Button>
                    <Button theme={"primary"} type="submit" disabled={!data.imNotBot}>
                        verify
                    </Button>
                </footer>
            </form>
        </Modal>
    );
};

export default ModalEmailVeryfication;
