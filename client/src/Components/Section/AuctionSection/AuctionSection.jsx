import React, { useEffect, useState } from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import AuctionCard from "../../AuctionCard/AuctionCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {AUCTIONS} from '../../../constants'

const auctionsMock = Array(12).fill({
    title: "Грані реальності",
    category: "Живопис",
    country: "Італія",
    time: "7 днів",
    image: "/images/auctions/card.jpg",
});

const filtersConfig = [
    {
        name: "tags",
        label: "Теги",
        type: "select",
        options: [],
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
    const [auction, setAuction] = useState({})
    const {title, id} = useParams()

    const getAuction = async (id) => {
        const response = await axios.get(`http://localhost:8080/auctions/${id}`)
        response.data.lotPreviews.map(item => item['startDate'] = response.data.startDate)
        filtersConfig[0]['options'] = response.data.lotPreviews[0]?.tags
        setAuction(response.data)
    }

    useEffect(() => {
        getAuction(id)
        console.log(filtersConfig)
    }, [id])
    const navigate = useNavigate()
    return (
        <ItemsGrid
            title={`Аукціон ${title}`}
            items={auction?.lotPreviews}
            filters={filtersConfig}
            renderCard={(item, index) => (
                <AuctionCard key={index} item={item} onClick={() => navigate(AUCTIONS + '/' + title + '/' + id + '/lot' + '/' + item.id)}/>
            )}
        />
    );
};

export default AuctionPage;