import React, { useState } from 'react'
import './MeinWorksSection.css'

import MyWorkCard from "../../UI/MyWorkCard/MyWorkCard";
import Title from "../../UI/title/Title";
import Pagination from "../../UI/Pagination/Pagination";
import ConfirmDeleteModal from "../../UI/ConfirmDeleteModal/ConfirmDeleteModal";

const worksMock = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "Тиша, що пам’ятає світло",
    image: "/images/exhibition.png",
}));

const MeinWorksSection = () => {

    const [page, setPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const handleEdit = (item) => {
        console.log("edit", item);
    };

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        console.log("delete", selectedId);

        setIsModalOpen(false);
        setSelectedId(null);
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
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>

                <div className="mein-works__pagination">
                    <Pagination
                        currentPage={page}
                        onChange={setPage}
                        totalPages={2}
                    />
                </div>

            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />

        </section>
    );
};

export default MeinWorksSection;