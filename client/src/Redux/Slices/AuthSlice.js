import { createSlice } from "@reduxjs/toolkit"

const TOKEN_KEY = 'u-access'
const FIRSTNAME_KEY = 'u-firstName'
const LASTNAME_KEY = 'u-lastName'
const EMAIL_KEY = 'u-email'
const PHONE_KEY = 'u-phone'
const ROLE_KEY = 'u-role'
const PASSWORD_KEY = 'u-password'
const PASSWORD_REPEAT_KEY = 'u-password_repeat'

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem(TOKEN_KEY) ?? '',
        email: localStorage.getItem(EMAIL_KEY) ?? '',
        password: localStorage.getItem(PASSWORD_KEY) ?? '',
        firstName: localStorage.getItem(FIRSTNAME_KEY) ?? '',
        lastName: localStorage.getItem(LASTNAME_KEY) ?? '',
        role: localStorage.getItem(ROLE_KEY) ?? '',
        phone: localStorage.getItem(PHONE_KEY) ?? '',
        isError: '',
        isAuth: Boolean(localStorage.getItem(TOKEN_KEY))

    },
    reducers: {
        logout: (state) => {
            state.token = ''
            state.firstName = ''
            state.lastName = ''
            state.email = ''
            state.phone = ''
            state.role = ''
            state.password = ''
            state.password_repeat = ''
            state.isAuth = false

            localStorage.removeItem(FIRSTNAME_KEY)
            localStorage.removeItem(LASTNAME_KEY)
            localStorage.removeItem(EMAIL_KEY)
            localStorage.removeItem(PHONE_KEY)
            localStorage.removeItem(ROLE_KEY)
            localStorage.removeItem(PASSWORD_KEY)
            localStorage.removeItem(PASSWORD_REPEAT_KEY)
            localStorage.removeItem(TOKEN_KEY)
        },
        login: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.role = action.payload.role
            state.password = action.payload.password
            state.token = action.payload.token
            state.isAuth = Boolean(action.payload.token)

            localStorage.setItem(FIRSTNAME_KEY, action.payload.firstName)
            localStorage.setItem(LASTNAME_KEY, action.payload.lastName)
            localStorage.setItem(EMAIL_KEY, action.payload.email)
            localStorage.setItem(PHONE_KEY, action.payload.phone)
            localStorage.setItem(ROLE_KEY, action.payload.role)
            localStorage.setItem(PASSWORD_KEY, action.payload.password)
            localStorage.setItem(PASSWORD_REPEAT_KEY, action.payload.password_repeat)
            localStorage.setItem(TOKEN_KEY, action.payload.token)
        }
    }
})
export default AuthSlice.reducer
