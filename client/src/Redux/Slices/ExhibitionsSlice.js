import { createSlice } from "@reduxjs/toolkit"

export const ExhibitionSlice = createSlice({
    name: 'exhibitions',
    initialState: {
        tags: [],
        exhibitionPreviews: [],
        isLoading: false
    },
    reducers: {
        fetchLoading: (state) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action) => {
            state.isLoading = false
            state.tags = action.payload.tags
            state.exhibitionPreviews = action.payload.exhibitionPreviews
        },
        fetchError: (state) => {
            state.isError = 'Ошибка'
        },
    }
})
export default ExhibitionSlice.reducer