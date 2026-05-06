import React, { useState, useEffect } from "react";
import Input from "../../UI/Input/Input";
import "./ProfileField.css";

const ProfileField = ({ label, name, value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSave = () => {
        setIsEditing(false);
        onSave(name, localValue);
    };

    return (
        <div className="profile-field">
            <Input
                label={label}
                name={name}
                value={localValue}
                readOnly={!isEditing}
                onChange={(e) => setLocalValue(e.target.value)}
            />

            <button
                className="profile-btn"
                onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                }
            >
                <img
                    src={
                        isEditing
                            ? "/images/icons/check.svg"
                            : "/images/icons/edit.svg"
                    }
                    alt="icon"
                />
            </button>
        </div>
    );
};

export default ProfileField;