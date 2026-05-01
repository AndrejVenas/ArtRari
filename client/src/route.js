import Auctions from "./Pages/Auctions/Auctions";
import CreateExhibition from "./Pages/CreateExhibition/CreateExhibition";
import Exhibitions from "./Pages/Exhibitions/Exhibitions";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import WorkDownload from "./Pages/WorkDownload/WorkDownload";
import Main from "./Pages/Main/Main";
import AboutUs from "./Pages/AboutUs/About";
import AuctionsTest from "./Pages/auctionTest/AuctionTest";
import { ABOUT_US, AUCTION_TEST, AUCTIONS, CREATE_EXHIBITION, EXHIBITIONS, LOGIN, MAIN, REGISTRATION, WORK_UPLOAD } from "./constants";

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
        path: AUCTION_TEST,
        Element: AuctionsTest
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