import { AuthSlice } from "../Redux/Slices/AuthSlice"
import axios from 'axios'

export const signup = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', data)
            return true
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}

export const signin = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/signin', data)
            console.log(response)
            const {email, firstName, lastName, role, phone} = response.data.user
            dispatch(AuthSlice.actions.login({
                email,
                firstName,
                lastName,
                role,
                phone,
                token: response.data.jwtToken
            }))
            return true
        } catch (error) {
            console.log(error)   //  dispatch(CategorySlices.actions.fetchIsError())
        }
    }
}