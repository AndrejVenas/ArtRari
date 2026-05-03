import { createSlice } from "@reduxjs/toolkit"

export const AuctionSlice = createSlice({
    name: 'auction',
    initialState: {
        auctionPreviews: [],
        isLoading: false
    },
    reducers: {
        fetchLoading: (state) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action) => {
            state.isLoading = false
            state.auctionPreviews = action.payload.auctionPreviews
        },
        fetchError: (state) => {
            state.isError = 'Ошибка'
        },
    }
})
export default AuctionSlice.reducer