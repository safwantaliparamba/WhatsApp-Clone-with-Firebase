import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false,
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null,
    image: localStorage.getItem('image') ? localStorage.getItem('image') : null,
    name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
    email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { access, image, isAuthenticated, name,email } = action.payload
            const newState = {
                isAuthenticated,
                accessToken: access,
                image: image,
                name,
                email,
            }

            localStorage.setItem('isAuthenticated', isAuthenticated)
            localStorage.setItem('accessToken', access)
            localStorage.setItem('image', image)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)

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