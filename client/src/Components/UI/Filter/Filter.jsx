import React from "react";
import "./Filter.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import DateRangeFilter from "../DataRangeFilter/DateRangeFilter";

const Filters = ({ filters, values, onChange }) => {
    return (
        <div className="filters">
            {filters.map((filter) => {
                // SELECT
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

                // DATE RANGE (новое)
                if (filter.type === "dateRange") {
                    return (
                        <DateRangeFilter
                            key={filter.name}
                            filter={filter}
                            value={values[filter.name]}
                            onChange={onChange}
                        />
                    );
                }

                // BUTTON
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