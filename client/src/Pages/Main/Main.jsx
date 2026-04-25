import React from 'react'
import Hero from "../../Components/Section/hero/Hero";
import Auctions from "../../Components/Section/Auctions/Auctions";
import CurrentExhibitions from "../../Components/Section/currentExhibitions/CurrentExhibitions";

const Main = () => {
    return (
        <>
            <Hero/>
            <Auctions/>
            <CurrentExhibitions/>
        </>
    )
}

export default Main