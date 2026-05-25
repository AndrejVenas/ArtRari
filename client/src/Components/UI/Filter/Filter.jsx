import React, { useEffect } from "react";
import "./Filter.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import DateRangeFilter from "../DataRangeFilter/DateRangeFilter";
import Search from "../Search/Search";
import CheckBoxComponent from "../../CheckBoxComponent/CheckBoxComponent";

const Filters = ({ filters, values, onChange}) => {
    useEffect(() => {
        console.log(values)
    })
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
                } else if(filter.type === "search") {
                    return <Search onChange={onChange}/>
                }
                if(filter.type === "checkbox") {
                    return (
                        <CheckBoxComponent
                            onChange={onChange}
                            returnType={filter.returnType}
                        />
                    )
                }

                return null;
            })}
        </div>
    );
};

export default Filters;