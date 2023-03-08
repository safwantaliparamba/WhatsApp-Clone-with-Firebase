import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    activeChat: {},
    contactUser:{}
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addActiveChat: (state, { payload }) => {
            state.activeChat = payload.activeChatRoom
        },
        addToContactUser: (state, { payload }) => {
            state.contactUser = payload.contactUser
        }
    }
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer