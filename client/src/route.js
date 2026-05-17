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
import EditWork from "./Pages/WorkEdit/WorkEdit";
import LotPayment from "./Pages/LotPayment/LotPayment";
import HistoryBuy from "./Pages/HistoryBuy/HistoryBuy";

import {
    ABOUT_US, AUCTION_TEST, AUCTIONS, CREATE_EXHIBITION, EXHIBITIONS, LOGIN, MAIN, REGISTRATION, WORK_UPLOAD, LOT,
    PROFILE, MY_WORK, PAYMENT_SUCCESSFUL,
    EXHIBITIONWORK,
    MY_EXHIBITIONS,
    MY_AUCTIONS,
    EDIT_WORK,
    LOT_PAYMENT,
    HISTORY_BUY
} from "./constants";
import PaymentSuccessful from "./Pages/PaymenSuccessful/PaymentSuccessful";
import ExhibitionWork from "./Pages/ExhibitionWork.jsx/ExhibitionWork";

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
        path: MY_WORK,
        Element: MeinWork
    },
    {
        path: AUCTIONS + '/:title' + '/:id',
        Element: AuctionsTest
    },
    {
        path: AUCTIONS + '/:title' + '/:id' + LOT + '/:idOfLot?',
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
    {
        path: EXHIBITIONWORK,
        Element: ExhibitionWork
    },
    {
        path: EXHIBITIONS + '/:title' + '/:id' + '/work' + '/:idOfWork?',
        Element: lot
    },
    {
        path: MY_EXHIBITIONS,
        Element: MeinWork
    },
    {
        path: EDIT_WORK,
        Element: EditWork
    },
    {
        path: LOT_PAYMENT,
        Element: LotPayment
    },
    {
        path: HISTORY_BUY,
        Element: HistoryBuy
    },
    {
        path: MY_AUCTIONS,
        Element: MeinWork
    }
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