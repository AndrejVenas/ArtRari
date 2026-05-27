import React, { useEffect, useState } from "react";
import "./ItemsGrid.css";
import Title from "../UI/title/Title";
import Filters from "../UI/Filter/Filter";
import Pagination from "../UI/Pagination/Pagination";

const ItemsGrid = ({
                       title,
                       items,
                       filters,
                       renderCard,
                       setResult,
                       result
                   }) => {
    const [filtersState, setFiltersState] = useState({});
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(items)
    const handleFilterChange = (name, value) => {
        setResult((prev) => ({
            ...prev,
            [name]: value,
        }));
        setPage(1);
    };
    useEffect(() => {
        const regex = new RegExp(result.search, 'i')
        setFilter(items?.filter((item) => regex.test(item.title)))
    }, [items])

    return (
        <section className="items-section">
            <div className="container">

                <Title title={title} />

                <>
                <Filters
                    filters={filters}
                    values={result}
                    onChange={handleFilterChange}
                />
                {items?.length == 0 ? <p>Поки що {title == "Аукціони" ? "аукціонів" : (title ? "робіт" : "виставок")} немає</p> : 
                <div className="items-grid">
                    {filter?.map((item, index) =>
                        renderCard(item, index)
                    )}
                </div>
                }
                {/*<Pagination
                    currentPage={page}
                    totalPages={5}
                    onChange={setPage}
                />*/}
                </>
            </div>
        </section>
    );
};

export default ItemsGrid;