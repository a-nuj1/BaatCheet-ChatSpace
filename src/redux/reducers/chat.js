import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";


const initialState = {
    notificationCnt: 0,
    newMessagesAlert:getOrSaveFromLocalStorage({key:NEW_MESSAGE_ALERT, get:true}) || [
        {
            chatId: "",
            count: 0,
        },
    ],

}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        incrementNotificationCnt: (state)=>{
            state.notificationCnt += 1;
        },
        resetNotificationCnt: (state)=>{
            state.notificationCnt = 0;
        },

        setNewMessagesAlert: (state, action)=>{
            const index = state.newMessagesAlert.findIndex((alert)=>alert.chatId === action.payload.chatId);

            if(index !== -1){
                state.newMessagesAlert[index].count += 1;
            }
            else{
                state.newMessagesAlert.push({
                    chatId: action.payload.chatId,
                    count: 1,
                });
            }
        },

        removeNewMessagesAlert:(state, action)=>{
            state.newMessagesAlert = state.newMessagesAlert.filter((alert)=>alert.chatId !== action.payload);
        }
    },
});


export default chatSlice;
export const {
    incrementNotificationCnt,
    resetNotificationCnt,
    setNewMessagesAlert,
    removeNewMessagesAlert
} = chatSlice.actions;