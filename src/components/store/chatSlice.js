import { createSlice } from "@reduxjs/toolkit";
import getLocalStorageItem from "../functions/getLocalStorage";


const initialState = {
    activeChat: getLocalStorageItem("activeChat",true),
    // contactUser:{}
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addActiveChat: (state, { payload }) => {
            state.activeChat = payload.activeChatRoom

            localStorage.setItem("activeChat", JSON.stringify(state.activeChat))
        },
        // addToContactUser: (state, { payload }) => {
        //     state.contactUser = payload.contactUser
        // }
    }
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer