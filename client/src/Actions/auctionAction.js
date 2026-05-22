import api from "../api/axiosInstance"
import { AuctionSlice } from "../Redux/Slices/AuctionSlice"

export const auctionAction = (page, tags) => {
    return async (dispatch) => {
        try {
            dispatch(AuctionSlice.actions.fetchLoading())
            const response = await api.get(`/auctions?page=${page}&tags=${tags}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('u-access')}`
                }
            })
            dispatch(AuctionSlice.actions.fetchSuccess({
                page: response.data.page,
                tags: response.data.tags
            }))
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}
