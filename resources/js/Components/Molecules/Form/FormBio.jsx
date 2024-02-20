import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Input from "../../Input/Input";
import { FaPhoneSquareAlt, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from "../../Atoms/Button";
import { FaUserPen } from "react-icons/fa6";

const FormBio = () => {
    // Destructure errors, and auth from usePage.props
    const { errors, auth } = usePage().props;

    // State for preview image
    const [previewImage, setPreviewImage] = useState(null);

    // Destructure properties from useForm
    const {
        data,
        setData,
        post,
        processing,
        errors: formErrors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        fullName: auth.user.full_name,
        email: auth.user.email,
        phoneNumber: auth.user.phone_number.replace(/-/g, ""),
        avatar: auth.user.avatar || "",
    });

    // Handler for input changes
    const handlerDataChange = async (e) => {
        const { id, value, type, files } = e.target;

        // Logic for handling other inputs
        setData((data) => {
            const newData = {
                ...data,
                [id]: type === "file" ? files[0] : value,
            };

            id === 'fullName' && value !== '' ? clearErrors("fullName") : null
            id === 'email' && value !== '' ? clearErrors("email") : null
            id === 'phoneNumber' && value !== '' ? clearErrors("phoneNumber") : null
            id === 'avatar' && value !== '' ? clearErrors("avatar") : null

            return newData;
        });

        // Logic for handling file input to preview image
        if (type === "file" && files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    // Handler for saving password
    const HandlerSaveProfile = (e) => {
        e.preventDefault();

        // Perform patch request
        post(`http://localhost:8000/profile/${auth.user.id}`, {
            preserveScroll: true,
            onError: () => setError(errors)
        });
    };

    return (
        <form
            className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
            encType="multipart/form-data"
            onSubmit={HandlerSaveProfile}
        >
            <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                Profile Edit
            </h4>
            <div className="w-max mx-auto">
                <Input maxWidth="max">
                    <Input.Label htmlFor={"avatar"} message={formErrors.avatar}>
                        <div className="flex flex-col items-center">
                            {previewImage || data.avatar ? (
                                <div className="flex relative w-max bg-purple-500 rounded-full hover:cursor-pointer overflow-hidden border-4 border-purple-600 group">
                                    <img
                                        src={
                                            previewImage ||
                                            (data.avatar
                                                ? import.meta.env.VITE_APP_URL+data.avatar
                                                : "")
                                        }
                                        alt="Preview"
                                        className="w-40 h-40"
                                    />
                                    <div className="flex justify-center items-center absolute bg-gray-600 w-40 h-20 translate-y-40 group-hover:translate-y-20 transition ease-in-out duration-300 rounded-b-full opacity-80 text-white">
                                        Ubah Foto
                                    </div>
                                </div>
                            ) : (
                                <div className="flex relative w-max bg-purple-500 rounded-full hover:cursor-pointer overflow-hidden group">
                                    <FaUserCircle className="text-white w-40 h-40" />
                                    <div className="flex justify-center items-center absolute bg-gray-600 w-40 h-20 translate-y-40 group-hover:translate-y-20 transition ease-in-out duration-300 rounded-b-full opacity-80 text-white">
                                        Ubah Foto
                                    </div>
                                </div>
                            )}
                        </div>
                    </Input.Label>
                    <Input.InputFile
                        id={"avatar"}
                        name={"avatar"}
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={handlerDataChange}
                    />
                </Input>
            </div>
            <Input>
                <Input.Label
                    htmlFor={"fullName"}
                    labelName={"Nama"}
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
                                <FaUserPen className={`w-7 h-7 ${formErrors.phoneNumber ? "text-error" : "text-primary"} opacity-70`} />
                            }
                            value={data.fullName}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>
            <Input>
                <Input.Label
                    htmlFor={"email"}
                    labelName={"Email"}
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
                                <MdEmail className={`w-7 h-7 ${formErrors.phoneNumber ? "text-error" : "text-primary"} opacity-70`} />
                            }
                            value={data.email}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>
            <Input>
                <Input.Label
                    htmlFor={"phoneNumber"}
                    labelName={"No Telp"}
                    message={formErrors.phoneNumber}
                    children={
                        <Input.InputNumber
                            id={"phoneNumber"}
                            inputSize="md"
                            theme={
                                formErrors.phoneNumber
                                    ? "error"
                                    : "primary"
                            }
                            leftIcon={
                                <FaPhoneSquareAlt className={`w-7 h-7 ${formErrors.phoneNumber ? "text-error" : "text-primary"} opacity-70`} />
                            }
                            value={data.phoneNumber}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>
            <Button className={"mt-4"} maxWidth="max" type={"submit"} disabled={processing}>
                Ubah Profile
            </Button>
        </form>
    );
};

export default FormBio;
