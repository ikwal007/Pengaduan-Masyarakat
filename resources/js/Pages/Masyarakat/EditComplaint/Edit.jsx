import AuthenticatedLayout2 from "@/Layouts/AuthenticatedLayout2";
import { PiKeyThin } from "react-icons/pi";
import { router, useForm, usePage } from "@inertiajs/react";
import Notif1 from "@/Components/Notifications/Notif1";
import { useEffect, useState } from "react";
import Typography from "@/Components/Atoms/Typography";
import Input from "@/Components/Input/Input";
import Select from "@/Components/Molecules/Select";
import Button from "@/Components/Atoms/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

const Edit = () => {
    // Destructure props from usePage()
    const {
        auth,
        flash,
        errors,
        allComplainType,
        detailComplaint,
        subdistricts,
        defaultComplaintStatus,
    } = usePage().props;

    const {
        complaint_type,
        complaint_media_type,
        user,
        subdistrict,
        village,
        certificate_no,
        description,
        complaint_status,
        archives,
    } = detailComplaint;

    const [subdistrictSelected, setSubdistrictSelected] = useState(subdistrict);

    const [show, setShow] = useState(true);
    const [inputFiles, setInputFiles] = useState([]);
    // State for preview image
    const [previewImage, setPreviewImage] = useState([]);

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
        complainType: complaint_type.id || "",
        complainMediaType: complaint_media_type.id || "",
        userEmail: user.email,
        subdistricts: subdistrict.id || "",
        village: village.id || "",
        certificateNumber: certificate_no || "",
        description: description || "",
        complainStatus: complaint_status.id,
        inputFiles: [],
    });
    console.log(detailComplaint);

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

    const handleInputFileChange = (e) => {
        const { id, files } = e.target;
        let updateFileList = null;
        let updatePreviewValuesImg = [];

        if (data.inputFiles?.filter((file) => file.id === parseInt(id))) {
            const updateInputFileValues = data.inputFiles.filter(
                (file) => file.id !== parseInt(id)
            );
            updateFileList = updateInputFileValues.concat([
                { id: parseInt(id), file: files[0] },
            ]);
        } else {
            updateFileList = data.inputFiles.concat([
                { id: parseInt(id), file: files[0] },
            ]);
        }

        setData((data) => {
            const newData = {
                ...data,
                ["inputFiles"]: updateFileList,
            };

            return newData;
        });

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            if (previewImage.filter((file) => file.id === parseInt(id))) {
                const updatePreviewValues = previewImage.filter(
                    (file) => file.id !== parseInt(id)
                );
                updatePreviewValuesImg = updatePreviewValues.concat([
                    { id: parseInt(id), imageUrl },
                ]);
            } else {
                updatePreviewValuesImg = previewImage.concat([
                    { id: parseInt(id), imageUrl },
                ]);
            }
            setPreviewImage(updatePreviewValuesImg);
        };
        reader.readAsDataURL(files[0]);
    };

    const renderImagePreviewSrc = (id) => {
        let src = null;
        previewImage.forEach((data) => {
            if (data.id === id) {
                src = data.imageUrl;
            }
        });
        return src;
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

    const handleAdd = () => {
        setInputFiles([...inputFiles, { id: inputFiles.length + 1 }]);
    };

    const handleDeleteTodo = (id) => {
        const updateInputFiles = inputFiles.filter((file) => file.id !== id);
        const updateInputFileValues = data.inputFiles.filter(
            (file) => file.id !== id
        );
        const updatePreviewValue = previewImage.filter(
            (file) => file.id !== id
        );
        setData((data) => {
            const newData = {
                ...data,
                ["inputFiles"]: updateInputFileValues,
            };

            return newData;
        });
        setInputFiles(updateInputFiles);
        setPreviewImage(updatePreviewValue);
    };

    const handleDeleteImg = async (id) => {
        const res = await fetch(
            route("masyarakat.complaints-image-destroy", { id: id }),
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json()).catch((err) => console.log(err));
        if (res.status === 200) {
            router.reload()
        }
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

                        <div className="flex flex-wrap w-full gap-3 p-3">
                            {archives.length > 0 &&
                                archives.map((data, i) => {
                                    return (
                                        <div key={i} className="relative">
                                            <Input maxWidth="max">
                                                <Input.Label
                                                    htmlFor={"avatar"}
                                                    message={formErrors.avatar}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <div className="flex relative w-max bg-purple-500 rounded-lg hover:cursor-pointer overflow-hidden border-4 group">
                                                            <img
                                                                src={
                                                                    data.resource
                                                                }
                                                                alt="Preview"
                                                                className="w-40 h-40"
                                                            />
                                                        </div>
                                                    </div>
                                                </Input.Label>
                                                <Input.InputFile
                                                    id={data.id}
                                                    name={"avatar"}
                                                    disabled
                                                    accept=".jpg, .jpeg, .png, .gif"
                                                    onChange={
                                                        handleInputFileChange
                                                    }
                                                />
                                            </Input>
                                            <Button
                                                theme="primary"
                                                maxWidth="max"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteImg(data.id)
                                                }
                                                className="absolute !p-0 !rounded-full -right-3 -top-3"
                                            >
                                                <TiDeleteOutline className="w-8 h-8 text-white" />
                                            </Button>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="flex flex-wrap w-full gap-3 p-3">
                            {inputFiles.length > 0 &&
                                inputFiles.map((data, i) => {
                                    return (
                                        <div key={i} className="relative">
                                            <Input maxWidth="max">
                                                <Input.Label
                                                    htmlFor={"avatar"}
                                                    message={formErrors.avatar}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        {renderImagePreviewSrc(
                                                            data.id
                                                        ) || data.avatar ? (
                                                            <div className="flex relative w-max bg-purple-500 rounded-lg hover:cursor-pointer overflow-hidden border-4 group">
                                                                <img
                                                                    src={renderImagePreviewSrc(
                                                                        data.id
                                                                    )}
                                                                    alt="Preview"
                                                                    className="w-40 h-40"
                                                                />
                                                                <div className="flex justify-center items-center absolute bg-gray-600 w-40 h-20 translate-y-60 group-hover:translate-y-24 transition ease-in-out duration-300 rounded-b-lg opacity-80 text-white">
                                                                    Ubah Foto
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex py-3 relative w-max bg-purple-50 rounded-lg hover:cursor-pointer overflow-hidden group">
                                                                <FaFileImage className="text-purple-500 w-40 h-40" />
                                                                <div className="flex justify-center items-center absolute bg-gray-600 w-40 h-20 translate-y-60 group-hover:translate-y-24 transition ease-in-out duration-300 rounded-b-lg opacity-80 text-white">
                                                                    Tambahkan
                                                                    Foto
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Input.Label>
                                                <Input.InputFile
                                                    id={data.id}
                                                    name={"avatar"}
                                                    accept=".jpg, .jpeg, .png, .gif"
                                                    onChange={
                                                        handleInputFileChange
                                                    }
                                                />
                                            </Input>
                                            <Button
                                                theme="primary"
                                                maxWidth="max"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteTodo(data.id)
                                                }
                                                className="absolute !p-0 !rounded-full -right-3 -top-3"
                                            >
                                                <TiDeleteOutline className="w-8 h-8 text-white" />
                                            </Button>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="w-full">
                            <Button
                                theme={"primary"}
                                maxWidth="md"
                                height="lg"
                                className={"mt-5"}
                                type="button"
                                onClick={handleAdd}
                            >
                                <IoIosAddCircleOutline className="w-10 h-10" />
                                <Typography
                                    tag="h3"
                                    className="ml-5"
                                    children={
                                        inputFiles.length > 0
                                            ? "Tambahkan Gambar Lain"
                                            : "Upload Gambar"
                                    }
                                    theme="primary"
                                />
                            </Button>
                        </div>

                        <div className="w-full">
                            <Button
                                theme={"primary"}
                                maxWidth="md"
                                height="lg"
                                className={"mt-5"}
                                type="submit"
                                disabled={processing}
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

Edit.layout = (page) => (
    <AuthenticatedLayout2 title={`Buat Pengaduan`}>{page}</AuthenticatedLayout2>
);

export default Edit;
