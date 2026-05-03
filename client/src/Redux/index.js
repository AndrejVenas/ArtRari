import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./Slices/AuthSlice"
import ExhibitionSlice from './Slices/ExhibitionsSlice'
import AuctionSlice from "./Slices/AuctionSlice"
const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Exhibitions: ExhibitionSlice,
        Auction: AuctionSlice
    }
})

export default store