import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css"

const CustomSelect = ({ filter, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-select" ref={ref}>
            <div
                className="select-header"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{value || filter.label}</span>

                <span className={`arrow ${open ? "open" : ""}`}>
                    <img src={require("../../../Images/angle-down-45.svg").default} alt="arrow down on select button"/>
                </span>
            </div>

            {open && (
                <div className="select-dropdown">
                    {filter.options?.map((opt) => (
                        <div
                            key={opt}
                            className={`select-item ${
                                value === opt ? "active" : ""
                            }`}
                            onClick={() => {
                                onChange(filter.name, opt);
                                setOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;