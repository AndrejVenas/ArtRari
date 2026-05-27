import { AuthSlice } from "../Redux/Slices/AuthSlice"
import api from '../api/axiosInstance'

export const signup = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.post('/auth/signup', data)
            return {
                // message: response.data,
                message: "Успішна регестрація! Для користування увійдіть у свій новий аккаунт",
                status: response?.status
             }
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
            return {
                message: error.response.data.message,
                status: error.response.data.status
             }
        }
    }
}

export const signin = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.post('/auth/signin', data)
            console.log(response)
            // const {email, firstName, lastName, role, phone} = response.data
            const {role} = response.data
            dispatch(AuthSlice.actions.login({
                // email,
                // firstName,
                // lastName,
                role,
                // phone,
                token: response.data.jwtToken
            }))
            return {
                message: 'Вхід успішний',
                result: response.status
             }
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
            return {
                message: error?.response?.data?.message || 'Сталася помилка',
                result: error.response.status
             }
        }
    }
}
