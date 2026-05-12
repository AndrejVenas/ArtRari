import React, { useState } from 'react'
import './MeinWorksSection.css'
import MyWorkCard from "../../UI/MyWorkCard/MyWorkCard";
import Title from "../../UI/title/Title";
import Pagination from "../../UI/Pagination/Pagination";

const worksMock = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "Тиша, що пам’ятає світло",
    image: "/images/exhibition.png",
}));

const MeinWorksSection = () => {

    const [page, setPage] = useState(1);

    const handleEdit = (item) => {
        console.log("edit", item);
    };

    const handleDelete = (id) => {
        console.log("delete", id);
    };

    return (
        <section className="mein-works">
            <div className="container">

                <Title title={"Перегляд своїх робот"} />

                <div className="mein-works__grid">
                    {worksMock.map((item) => (
                        <MyWorkCard
                            key={item.id}
                            item={item}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={page}
                    onChange={setPage}
                    totalPages={2}
                />

            </div>
        </section>
    );
};

export default MeinWorksSection;