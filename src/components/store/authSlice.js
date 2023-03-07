import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";


const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false,
    uid: localStorage.getItem("uid") ? localStorage.getItem("uid") : null,
    image: localStorage.getItem("image") ? localStorage.getItem("image") : null,
    name: localStorage.getItem("name") ? localStorage.getItem("name") : null,
    email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
    phone: localStorage.getItem("phone") ? localStorage.getItem("phone") : null,
    isVerified: localStorage.getItem("isVerified") === "true" ? true : false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { uid, image, isAuthenticated, name, email, phone, isVerified } = action.payload
            const newState = {
                uid,
                name,
                image,
                phone,
                email,
                isVerified,
                isAuthenticated,
            }

            localStorage.setItem("uid", uid)
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("image", image)
            localStorage.setItem("phone", phone)
            localStorage.setItem("isVerified", isVerified)
            localStorage.setItem("isAuthenticated", isAuthenticated)

            return newState
        },
        logout: (state, action) => {
            signOut(auth)
            localStorage.clear()
            state.isAuthenticated = false
        },
        verify: (state, action) => {
            const { phone, isVerified } = action.payload
            state.phone = phone
            state.isVerified = isVerified

            localStorage.setItem("phone", phone)
            localStorage.setItem("isVerified", isVerified)
        }
    }
})

export default authSlice.reducer

export const authActions = authSlice.actions