import React, { useEffect } from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import ExhibitionCard from "../../ExhibitionCard/ExhibitionCard";
import { useDispatch, useSelector } from "react-redux";
import { exhibitionAction } from "../../../Actions/exhibitionAction";

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
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(exhibitionAction())
    }, [])
    const {exhibitionPreviews} = useSelector(state => state.Exhibitions)
    return (
        <ItemsGrid
            title="Виставки"
            items={exhibitionPreviews}
            filters={filtersConfig}
            renderCard={(item, index) => (
                <ExhibitionCard key={index} item={item} />
            )}
        />
    );
};

export default ExhibitionsPage;