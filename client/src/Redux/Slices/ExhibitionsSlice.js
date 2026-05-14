import { createSlice } from "@reduxjs/toolkit"

export const ExhibitionSlice = createSlice({
    name: 'exhibitions',
    initialState: {
        tagsForFilter: [],
        page: [],
        isLoading: false
    },
    reducers: {
        fetchLoading: (state) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action) => {
            state.isLoading = false
            state.tagsForFilter = action.payload.tagsForFilter
            state.page = action.payload.page
        },
        fetchError: (state) => {
            state.isError = 'Ошибка'
        },
    }
})
export default ExhibitionSlice.reducer