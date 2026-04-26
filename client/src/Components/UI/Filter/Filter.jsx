import React from "react";
import "./Filter.css";
import CustomSelect from "../CustomSelect/CustomSelect";

const Filters = ({ filters, values, onChange }) => {
    return (
        <div className="filters">
            {filters.map((filter) => {
                if (filter.type === "select") {
                    return (
                        <CustomSelect
                            key={filter.name}
                            filter={filter}
                            value={values[filter.name]}
                            onChange={onChange}
                        />
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