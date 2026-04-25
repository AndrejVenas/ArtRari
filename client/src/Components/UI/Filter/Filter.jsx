import React from "react";
import "./Filter.css";

const Filters = ({ filters, values, onChange }) => {
    return (
        <div className="filters">
            {filters.map((filter) => {
                if (filter.type === "select") {
                    return (
                        <select
                            key={filter.name}
                            value={values[filter.name] || ""}
                            onChange={(e) =>
                                onChange(filter.name, e.target.value)
                            }
                        >
                            <option value="">{filter.label}</option>

                            {filter.options.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    );
                }

                if (filter.type === "button") {
                    return (
                        <button
                            key={filter.name}
                            className="filter-btn"
                            onClick={() => onChange(filter.name, true)}
                        >
                            {filter.label}
                        </button>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default Filters;