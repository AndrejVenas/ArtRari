import React, { useRef } from "react";
import "./CodeInput.css";

const CodeInput = ({ length = 6, value, onChange }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/g, ""); // только цифры
        if (!val) return;

        const newCode = value.split("");

        newCode[index] = val[0];

        const updated = newCode.join("").slice(0, length);
        onChange(updated);

        // перейти к следующему инпуту
        if (index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newCode = value.split("");

            if (!newCode[index]) {
                if (index > 0) {
                    inputsRef.current[index - 1].focus();
                }
                return;
            }

            newCode[index] = "";
            onChange(newCode.join(""));
        }
    };

    return (
        <div className="code-inputs">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="code-input"
                    type="text"
                    maxLength="1"
                    value={value[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
};

export default CodeInput;