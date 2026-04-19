import React from "react";
import "./Button.css";

const Button = ({
                    type = "button",
                    children,
                    onClick,
                    disabled = false,
                }) => {
    return (
        <button
            className="btn"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;