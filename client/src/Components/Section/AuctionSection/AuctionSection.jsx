import React from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import AuctionCard from "../../AuctionCard/AuctionCard";


const auctionsMock = Array(12).fill({
    title: "Грані реальності",
    category: "Живопис",
    country: "Італія",
    time: "7 днів",
    image: "/images/auctions/card.jpg",
});

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

const AuctionPage = () => {
    return (
        <ItemsGrid
            title="Аукціон “Назва аукціону”"
            items={auctionsMock}
            filters={filtersConfig}
            renderCard={(item, index) => (
                <AuctionCard key={index} item={item} />
            )}
        />
    );
};

export default AuctionPage;