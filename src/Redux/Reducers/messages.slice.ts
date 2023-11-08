import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MessageModel from "../../Models/MessageModel";

export class MessagesState {
    public messages: MessageModel[];
}


const initialState: MessagesState = {
    messages: []
}

const messagesReducer = createSlice({
    name: "messagesReducer",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessageModel[]>) => {
            state.messages = action.payload;
        },
        updateMessage: (state, action: PayloadAction<MessageModel>) => {
            const index = state.messages.findIndex(m=>m._id===action.payload._id);
            const newState = [...state.messages];
            newState[index] = action.payload;
            state.messages = newState;
        },

    }
});

export const { setMessages,updateMessage } = messagesReducer.actions;

export default messagesReducer.reducer;