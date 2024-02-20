import Button from "../Atoms/Button";
import { IoClose, IoInformationCircle } from "react-icons/io5";

const Notif1 = ({ message, show, setShow }) => {
    const toggleShow = () => {
        setShow(false);
    };
    return (
        <>
            {/* <!-- CTA --> */}
            <div className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                <div className="flex items-center">
                    <IoInformationCircle className="w-8 h-8" />
                    <span>{message}</span>
                </div>
                <Button onClick={toggleShow} theme={"white"}>
                    <IoClose className="w-5 h-5" />
                </Button>
            </div>
        </>
    );
};

export default Notif1;
