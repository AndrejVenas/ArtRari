import React from "react";
import "./DateRangeFilter.css";

const DateRangeFilter = ({ filter, value = {}, onChange }) => {
    const handleChange = (type, val) => {
        onChange(filter.name, {
            ...value,
            [type]: val,
        });
    };

    return (
        <div className="date-range-filter">
            <div className="data-range-box">
                <label htmlFor={`${filter.name}-from`}>Від:</label>
                <input
                    id={`${filter.name}-from`}
                    type="date"
                    value={value.from || ""}
                    onChange={(e) => handleChange("from", e.target.value)}
                />
            </div>

            <div className="data-range-box">
                <label htmlFor={`${filter.name}-to`}>До:</label>
                <input
                    id={`${filter.name}-to`}
                    type="date"
                    value={value.to || ""}
                    onChange={(e) => handleChange("to", e.target.value)}
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;