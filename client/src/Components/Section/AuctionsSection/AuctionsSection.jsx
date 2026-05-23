import React, { useEffect, useState } from "react";
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
        name: "checkbox",
        label: "Теги",
        type: "checkbox",
        returnType: "names"
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

    const { page, tags } = useSelector(state => state.Auction)

    const [result, setResult] = useState({})

    useEffect(() => {

        if (Object.keys(result).length === 0) {

            dispatch(
                auctionAction(0, "")
            )

        } else {

            dispatch(
                auctionAction(
                    0,
                    result['checkbox']?.join(",") || ""
                )
            )

        }

    }, [dispatch, result])

    const navigate = useNavigate()

    return (
        <div className="auction-wrapper">

            <ItemsGrid
                title="Аукціони"
                items={page.items}
                filters={filtersConfig}
                setResult={setResult}
                result={result}
                renderCard={(item, index) => (
                    <AuctionCard
                        key={index}
                        item={item}
                        onClick={() =>
                            navigate(
                                AUCTIONS +
                                "/" +
                                item.title +
                                "/" +
                                item.id
                            )
                        }
                    />
                )}
            />

        </div>
    );
};

export default AuctionsPage;