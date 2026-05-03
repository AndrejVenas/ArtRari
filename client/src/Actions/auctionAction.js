import axios from "axios"
import { AuctionSlice } from "../Redux/Slices/AuctionSlice"

export const auctionAction = () => {
    return async (dispatch) => {
        try {
            dispatch(AuctionSlice.actions.fetchLoading())
            const response = await axios.get('http://localhost:8080/auctions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('u-access')}`
                }
            })
            dispatch(AuctionSlice.actions.fetchSuccess({
                auctionPreviews: response.data.auctionPreviews
            }))
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}