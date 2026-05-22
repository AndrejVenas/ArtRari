import api from "../api/axiosInstance"
import { ExhibitionSlice } from "../Redux/Slices/ExhibitionsSlice"

export const exhibitionAction = (page, tags) => {
    return async (dispatch) => {
        try {
            dispatch(ExhibitionSlice.actions.fetchLoading())
            const response = await api.get(`/exhibitions?page=${page}&tags=${tags}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('u-access')}`
                }
            })
            dispatch(ExhibitionSlice.actions.fetchSuccess({
                tagsForFilter: response.data.tagsForFilter,
                page: response.data.page
            }))
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}
