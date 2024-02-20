import { useForm, usePage } from "@inertiajs/react";
import Input from "../../Input/Input";
import Button from "../../Atoms/Button";
import { FaKey } from "react-icons/fa6";

const FormEditPassword = () => {
    // Destructure errors, and auth from usePage.props
    const { errors, auth, ziggy, ...props } = usePage().props;

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
    } = useForm({
        oldPassword: "",
        password: "",
        confirmNewPassword: "",
    });

    // Handler for input changes
    const handlerDataChange = async (e) => {
        const { id, value } = e.target;

        // Logic for handling other inputs
        setData((data) => {
            const newData = {
                ...data,
                [id]: value,
            };

            // Update state with new values
            const { password, confirmNewPassword } = newData;

            // Check if passwords match
            password !== confirmNewPassword
                ? setError({
                      confirmNewPassword: "Passwords do not match.",
                      password: "Passwords do not match.",
                  })
                : clearErrors("confirmNewPassword", "password");

            id === "oldPassword" && value !== ""
                ? clearErrors("oldPassword")
                : null;
            // id === "password" && value !== ""
            //     ? clearErrors("password")
            //     : null;
            // id === "confirmNewPassword" && value !== ""
            //     ? clearErrors("confirmNewPassword")
            //     : null;

            return newData;
        });
    };

    console.log(formErrors);

    // Handler for saving password
    const HandlerSavePassword = async (e) => {
        e.preventDefault();
        // // Perform patch request
        patch(`${ziggy.url}/profile/change-password/${auth.user.id}`, {
            onSuccess: () => reset(),
            onError: () => setError(errors),
        });
    };

    return (
        <form
            className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
            onSubmit={HandlerSavePassword}
        >
            <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                Bio
            </h4>

            <Input>
                <Input.Label
                    htmlFor={"oldPassword"}
                    labelName={"Password lama"}
                    message={formErrors.oldPassword}
                    children={
                        <Input.InputPassword
                            id={"oldPassword"}
                            inputSize="md"
                            theme={formErrors.oldPassword ? "error" : "primary"}
                            leftIcon={
                                <FaKey
                                    className={`${
                                        formErrors.oldPassword
                                            ? "text-error"
                                            : "text-primary"
                                    } w-5 h-5 opacity-70`}
                                />
                            }
                            value={data.oldPassword}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>
            <Input>
                <Input.Label
                    htmlFor={"password"}
                    labelName={"Password Baru"}
                    message={formErrors.password}
                    children={
                        <Input.InputPassword
                            id={"password"}
                            inputSize="md"
                            theme={formErrors.password ? "error" : "primary"}
                            leftIcon={
                                <FaKey
                                    className={`${
                                        formErrors.password
                                            ? "text-error"
                                            : "text-primary"
                                    } w-5 h-5 opacity-70`}
                                />
                            }
                            value={data.password}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>
            <Input>
                <Input.Label
                    htmlFor={"confirmNewPassword"}
                    labelName={"Konfirmasi Password Baru"}
                    message={formErrors.confirmNewPassword}
                    children={
                        <Input.InputPassword
                            id={"confirmNewPassword"}
                            inputSize="md"
                            theme={
                                formErrors.confirmNewPassword
                                    ? "error"
                                    : "primary"
                            }
                            leftIcon={
                                <FaKey
                                    className={`${
                                        formErrors.confirmNewPassword
                                            ? "text-error"
                                            : "text-primary"
                                    } w-5 h-5 opacity-70`}
                                />
                            }
                            value={data.confirmNewPassword}
                            onChange={handlerDataChange}
                        />
                    }
                />
            </Input>

            <Button
                className={"mt-4"}
                maxWidth="max"
                disabled={!isDirty || processing}
                type="submit"
            >
                Ubah Password
            </Button>
        </form>
    );
};

export default FormEditPassword;
