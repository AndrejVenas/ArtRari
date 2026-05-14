import { AuthSlice } from "../Redux/Slices/AuthSlice"
import axios from 'axios'

export const signup = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', data)
            return {
                message: response.data,
                result: response.status
             }
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
            return {
                message: error.response.data.message,
                result: error.response.data.status
             }
        }
    }
}

export const signin = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/signin', data)
            console.log(response)
            const {email, firstName, lastName, role, phone} = response.data
            dispatch(AuthSlice.actions.login({
                email,
                firstName,
                lastName,
                role,
                phone,
                token: response.data.jwtToken
            }))
            return {
                message: 'Вхід успішний',
                result: response.status
             }
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
            return {
                message: 'Перевірте дані',
                result: error.response.status
             }
        }
    }
}