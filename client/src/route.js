import Auctions from "./Pages/Auctions/Auctions";
import CreateExhibition from "./Pages/CreateExhibition/CreateExhibition";
import Exhibitions from "./Pages/Exhibitions/Exhibitions";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import WorkDownload from "./Pages/WorkDownload/WorkDownload";
import Main from "./Pages/Main/Main";
import AboutUs from "./Pages/AboutUs/About";
import AuctionsTest from "./Pages/auctionTest/AuctionTest";
import lot from "./Pages/Lot/Lot";
import profilePage from "./Pages/ProfilePage/ProfilePage";
import MeinWork from "./Pages/MeinWorks/MeinWorks";

import {
    ABOUT_US, AUCTION_TEST, AUCTIONS, CREATE_EXHIBITION, EXHIBITIONS, LOGIN, MAIN, REGISTRATION, WORK_UPLOAD, LOT,
    PROFILE, MEIN_WORK, PAYMENT_SUCCESSFUL
} from "./constants";
import PaymentSuccessful from "./Pages/PaymenSuccessful/PaymentSuccessful";

export const authRoute = [
    {
        path: EXHIBITIONS,
        Element: Exhibitions
    },
    {
        path: AUCTIONS,
        Element: Auctions
    },
    {
        path: LOGIN,
        Element: Login
    },
    {
        path: REGISTRATION,
        Element: Registration
    },
    {
        path: CREATE_EXHIBITION,
        Element: CreateExhibition
    },
    {
        path: WORK_UPLOAD,
        Element: WorkDownload
    },
    {
        path: MAIN,
        Element: Main
    },
    {
        path: ABOUT_US,
        Element: AboutUs
    },
    {
        path: MEIN_WORK,
        Element: MeinWork
    },
    {
        path: AUCTIONS + '/:title' + '/:id',
        Element: AuctionsTest
    },
    {
        path: AUCTIONS + '/:title' + '/:id' + LOT + '/:idOfLot',
        Element: lot
    },
    {
        path: PROFILE,
        Element: profilePage
    },
    {
        path: PAYMENT_SUCCESSFUL,
        Element: PaymentSuccessful
    },
]

export const publicRoute = [
    {
        path: MAIN,
        Element: Main
    },
    {
        path: ABOUT_US,
        Element: AboutUs
    },
    {
        path: EXHIBITIONS,
        Element: Exhibitions
    },
    {
        path: AUCTIONS,
        Element: Auctions
    },
    {
        path: LOGIN,
        Element: Login
    },
    {
        path: REGISTRATION,
        Element: Registration
    },
]