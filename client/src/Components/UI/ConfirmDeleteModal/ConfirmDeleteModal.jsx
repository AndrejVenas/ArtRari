import React from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({
                                isOpen,
                                onClose,
                                onConfirm,
                            }) => {

    if (!isOpen) return null;

    return (
        <div className="confirm-modal__overlay">
            <div className="confirm-modal">

                <h2 className="confirm-modal__title">
                    Підтвердити дію
                </h2>

                <p className="confirm-modal__text">
                    Ви впевнені, що хочете видати роботу?
                </p>

                <div className="confirm-modal__actions">

                    <button
                        className="confirm-modal__button confirm-modal__button--dark"
                        onClick={onClose}
                    >
                        Ні
                    </button>

                    <button
                        className="confirm-modal__button confirm-modal__button--gold"
                        onClick={onConfirm}
                    >
                        Так
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;