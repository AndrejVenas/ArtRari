import { createSlice } from "@reduxjs/toolkit"

export const AuctionSlice = createSlice({
    name: 'auction',
    initialState: {
        tags: [],
        page: [],
        isLoading: false
    },
    reducers: {
        fetchLoading: (state) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action) => {
            state.isLoading = false
            state.tags = action.payload.tags
            state.page = action.payload.page
        },
        fetchError: (state) => {
            state.isError = 'Ошибка'
        },
    }
})
export default AuctionSlice.reducer