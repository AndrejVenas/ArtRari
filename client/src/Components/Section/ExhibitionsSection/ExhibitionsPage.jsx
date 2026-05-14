import React, { useEffect, useMemo, useState } from "react";
import ItemsGrid from "../../ItemsGrid/ItemsGrid";
import ExhibitionCard from "../../ExhibitionCard/ExhibitionCard";
import { useDispatch, useSelector } from "react-redux";
import { exhibitionAction } from "../../../Actions/exhibitionAction";
import { useNavigate } from "react-router-dom";
import { EXHIBITIONS } from "../../../constants";

const exhibitionsMock = Array.from({ length: 12 }, () => ({
    title: "Світло і тінь",
    country: "Франція",
    date: "2026-05-12",
    image: "/images/exhibition.png",
}));

const filtersConfig = [
    {
        name: "checkbox",
        label: "Теги",
        type: "checkbox",
        options: [],
    },
    {
        name: "search",
        label: "Пошук",
        type: "search",
    }
];

const ExhibitionsPage = () => {
    const [result, setResult] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(Object.keys(result).length == 0) {
            dispatch(exhibitionAction(0, ""))
        } else {
            dispatch(exhibitionAction(0, result['checkbox'].map(item => item.name).join(",")))
        }
    }, [result])

    useEffect(() => {
        console.log(result)
    }, [result])
    const {tagsForFilter, page} = useSelector(state => state.Exhibitions)
    const newFiltersConfig = useMemo(() => {
            return filtersConfig.map((item) => {
                if(item.name == "type") {
                    return {
                        ...item,
                        options: tagsForFilter
                    }
                }
                return item
            })
    }, [tagsForFilter])
    return (
        <ItemsGrid
            title="Виставки"
            items={page.items}
            filters={filtersConfig}
            setResult={setResult}
            result={result}
            renderCard={(item, index) => (
                <ExhibitionCard key={index} item={item} onClick={() => navigate(EXHIBITIONS + '/' + item.title + '/' + item.id)}/>
            )}
        />
    );
};

export default ExhibitionsPage;