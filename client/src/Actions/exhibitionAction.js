import axios from "axios"
import { ExhibitionSlice } from "../Redux/Slices/ExhibitionsSlice"

export const exhibitionAction = () => {
    return async (dispatch) => {
        try {
            dispatch(ExhibitionSlice.actions.fetchLoading())
            const response = await axios.get('http://localhost:8080/exhibitions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('u-access')}`
                }
            })
            dispatch(ExhibitionSlice.actions.fetchSuccess({
                tags: response.data.tags,
                exhibitionPreviews: response.data.exhibitionPreviews
            }))
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}