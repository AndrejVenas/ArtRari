import React, {useEffect, useState} from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import AuctionCard from "../../AuctionCard/AuctionCard";
import {useNavigate, useParams} from "react-router-dom";
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
        name: "checkbox",
        label: "Теги",
        type: "checkbox"
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
    const [result, setResult] = useState({})

    const getAuction = async (id, page, tags) => {
        const response = await axios.get(`http://localhost:8080/auctions/${id}?page=${page}&tags=${tags}`)
        response.data.lotPreviews.map(item => item['startDate'] = response.data.startDate)
        setAuction(response.data)
    }

    useEffect(() => {
        if (Object.keys(result).length == 0) {
            getAuction(id, 0, "")
        } else {
            getAuction(id, 0, result['checkbox'].map(item => item.name).join(","))
        }
    }, [id, result])
    const navigate = useNavigate()
    return (
        <div className="auction-wrapper">
            <ItemsGrid
                title={`Аукціон ${title}`}
                items={auction?.lotPreviews}
                filters={filtersConfig}
                setResult={setResult}
                result={result}
                renderCard={(item, index) => (
                    <AuctionCard key={index} item={item}
                                 onClick={() => navigate(AUCTIONS + '/' + title + '/' + id + '/lot' + '/' + item.id)}/>
                )}
            />
        </div>
    );
};

export default AuctionPage;