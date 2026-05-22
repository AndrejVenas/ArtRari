import React from "react";
import "./Textarea.css";

const Textarea = ({
                      label,
                      name,
                      id,
                      value,
                      onChange,
                      placeholder,
                      rows = 5,
                  }) => {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label" htmlFor={id || name}>
                    {label}
                </label>
            )}

            <textarea
                className="input-field input-textarea"
                name={name}
                id={id || name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    );
};

export default Textarea;