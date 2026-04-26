import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onChange }) => {
    return (
        <div className="pagination">
            <div className="pagination-box">
                <button
                    onClick={() => onChange(1)}
                    disabled={currentPage === 1}
                >
                    <img src="/images/icons/first-prev.svg" alt="first page button"/>
                </button>

                <button
                    onClick={() => onChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <img src="/images/icons/prev.svg" alt="prev page button"/>
                </button>
            </div>

            <div className="pagination-current">
                {currentPage}
            </div>

            <div className="pagination-box">
                <button
                    onClick={() => onChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <img src="/images/icons/next.svg" alt="last page button"/>
                </button>

                <button
                    onClick={() => onChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <img src="/images/icons/last-next.svg" alt="last page button"/>
                </button>
            </div>
        </div>
    );
};

export default Pagination;