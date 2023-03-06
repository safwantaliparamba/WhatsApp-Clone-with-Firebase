import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";


const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") ? localStorage.getItem("isAuthenticated") : false,
    uid: localStorage.getItem("uid") ? localStorage.getItem("uid") : null,
    image: localStorage.getItem("image") ? localStorage.getItem("image") : null,
    name: localStorage.getItem("name") ? localStorage.getItem("name") : null,
    email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { uid, image, isAuthenticated, name,email } = action.payload
            const newState = {
                uid,
                name,
                email,
                image,
                isAuthenticated,
            }

            localStorage.setItem("uid",uid)
            localStorage.setItem("name",name)
            localStorage.setItem("email",email)
            localStorage.setItem("image",image)
            localStorage.setItem("isAuthenticated",isAuthenticated)

            return newState
        },
        logout: (state, action) => {
            localStorage.clear()
            state.isAuthenticated = false
        },
    }
})

export default authSlice.reducer

export const authActions = authSlice.actions