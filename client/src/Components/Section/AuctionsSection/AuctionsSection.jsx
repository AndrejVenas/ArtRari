import React, { useEffect } from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import AuctionCard from "../../AuctionCard/AuctionCard";
import { useDispatch, useSelector } from "react-redux";
import { auctionAction } from "../../../Actions/auctionAction";
import { AUCTIONS } from "../../../constants";
import { useNavigate } from "react-router-dom";


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

const AuctionsPage = () => {
    const dispatch = useDispatch()
    const {auctionPreviews} = useSelector(state => state.Auction)
    useEffect(() => {
        dispatch(auctionAction())
    }, [])
    const navigate = useNavigate()
    return (
        <ItemsGrid
            title="Аукціони"
            items={auctionPreviews}
            filters={filtersConfig}
            renderCard={(item, index) => (
                <AuctionCard key={index} item={item} onClick={() => navigate(AUCTIONS + "/" + item.title + "/" + item.id)}/>
            )}
        />
    );
};

export default AuctionsPage;