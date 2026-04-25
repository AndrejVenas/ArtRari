import React, { useState } from "react";
import "./AuctionsSection.css";
import Filters from "../../UI/Filter/Filter";
import Title from "../../UI/title/Title";
import Pagination from "../../UI/Pagination/Pagination";

const auctionsMock = Array(12).fill({
    title: "Грані реальності",
    category: "Живопис",
    country: "Італія",
    time: "7 днів",
    image: "/images/auctions/card.jpg",
});

const Auctions = () => {
    const [filtersState, setFiltersState] = useState({});
    const [page, setPage] = useState(1);

    const filtersConfig = [
        {
            name: "type",
            label: "Тип",
            type: "select",
            options: ["Живопис", "Скульптура"],
        },
        {
            name: "country",
            label: "Країна",
            type: "select",
            options: ["Італія", "Франція"],
        },
        {
            name: "time",
            label: "Час до завершення",
            type: "select",
            options: ["1 день", "7 днів"],
        },
    ];

    const handleFilterChange = (name, value) => {
        setFiltersState((prev) => ({
            ...prev,
            [name]: value,
        }));

        // сброс страницы при смене фильтра
        setPage(1);
    };

    return (
        <section className="auctions-section">
            <div className="container">

                <Title title="Аукціони" />

                <Filters
                    filters={filtersConfig}
                    values={filtersState}
                    onChange={handleFilterChange}
                />

                <div className="auctions-grid">
                    {auctionsMock.map((item, index) => (
                        <div className="card" key={index}>
                            <img src={item.image} alt={item.title} />

                            <div className="card-content">
                                <h3>{item.title}</h3>

                                <div className="tags">
                                    <span>{item.category}</span>
                                    <span>{item.country}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={5}
                    onChange={setPage}
                />
            </div>
        </section>
    );
};

export default Auctions;