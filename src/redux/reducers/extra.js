import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isNewGrp: false,
    isAddmemb: false,
    isNotification: false,
    isMobileMenu: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    selectedDelChats: {
        chatId: "",
        groupChat: false,
    },

}

const extraSlice = createSlice({
    name: 'extra',
    initialState,
    reducers:{
        setIsNewGrp: (state, action)=>{
            state.isNewGrp = action.payload;
        },
        setIsAddMember: (state, action)=>{
            state.isAddmemb = action.payload;
        },
        setIsNotification: (state, action)=>{
            state.isNotification = action.payload;
        },
        setIsMobileMenu: (state, action)=>{
            state.isMobileMenu = action.payload;
        },
        setIsSearch: (state, action)=>{
            state.isSearch = action.payload;
        },
        setIsFileMenu: (state, action)=>{
            state.isFileMenu = action.payload;
        },
        setIsDeleteMenu: (state, action)=>{
            state.isDeleteMenu = action.payload;
        },
        setUploadingLoader: (state, action)=>{
            state.uploadingLoader = action.payload;
        },
        setSelectedDelChats: (state, action)=>{
            state.selectedDelChats = action.payload;
        }

    }
});


export default extraSlice;
export const {
    setIsNewGrp,
    setIsAddMember,
    setIsNotification,
    setIsMobileMenu,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteMenu,
    setUploadingLoader,
    setSelectedDelChats,
} = extraSlice.actions;