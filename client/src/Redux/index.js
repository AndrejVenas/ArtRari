import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./Slices/AuthSlice"

const store = configureStore({
    reducer: {
        Auth: AuthSlice,
    }
})

export default store