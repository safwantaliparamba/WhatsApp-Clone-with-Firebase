import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import getLocalStorageItem from "../functions/getLocalStorage";


const initialState = {
    isAuthenticated: getLocalStorageItem("isAuthenticated"),
    uid: getLocalStorageItem("uid"),
    image: getLocalStorageItem("image"),
    name: getLocalStorageItem("name"),
    email: getLocalStorageItem("email"),
    phone: getLocalStorageItem("phone"),
    isVerified: getLocalStorageItem("isVerified"),
    FCMToken: getLocalStorageItem("FCMToken"),
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
            const { phone, isVerified, token } = action.payload
            state.phone = phone
            state.isVerified = isVerified
            state.FCMToken = token

            localStorage.setItem("phone", phone)
            localStorage.setItem("isVerified", isVerified)
            localStorage.setItem("FCMToken", token)
        }
    }
})

export default authSlice.reducer

export const authActions = authSlice.actions