import React from "react";
import { MdEmail } from "react-icons/md";

const TextInput = ({title, type}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{title}</span>
            </div>
            <MdEmail />
            <input
                type={type}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
                <span className="label-text-alt">Bottom Left label</span>
            </div>
        </label>
    );
};

export default TextInput;
