import React from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import ExhibitionCard from "../../ExhibitionCard/ExhibitionCard";

const exhibitionsMock = Array.from({ length: 12 }, () => ({
    title: "Світло і тінь",
    country: "Франція",
    date: "2026-05-12",
    image: "/images/exhibition.png",
}));

const filtersConfig = [
    {
        name: "country",
        label: "Країна",
        type: "select",
        options: ["Франція", "Італія"],
    },
    {
        name: "dateRange",
        label: "Дата",
        type: "dateRange",
    },
];

const ExhibitionsPage = () => {
    return (
        <ItemsGrid
            title="Виставки"
            items={exhibitionsMock}
            filters={filtersConfig}
            renderCard={(item, index) => (
                <ExhibitionCard key={index} item={item} />
            )}
        />
    );
};

export default ExhibitionsPage;