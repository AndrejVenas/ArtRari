import React from 'react'
import Hero from "../../Components/hero/Hero";
import Auctions from "../../Components/Auctions/Auctions";
import CurrentExhibitions from "../../Components/currentExhibitions/CurrentExhibitions";

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