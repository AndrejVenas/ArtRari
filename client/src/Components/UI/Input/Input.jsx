import React from "react";
import "./Input.css";

const Input = ({
                   label,
                   type = "text",
                   name,
                   id,
                   value,
                   onChange,
                   placeholder,
                   error = false,
               }) => {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label" htmlFor={id || name}>
                    {label}
                </label>
            )}

            <input
                className={`input-field ${error ? "input-error" : ""}`}
                type={type}
                name={name}
                id={id || name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;