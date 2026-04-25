import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => onChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;