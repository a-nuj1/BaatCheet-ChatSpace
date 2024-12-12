import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import api from './api/api';
import extraSlice from './reducers/extra';
import chatSlice from './reducers/chat';

const store = configureStore({
    reducer:{
        [authSlice.name]: authSlice.reducer,
        [extraSlice.name]: extraSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware:(mid)=>[...mid(), api.middleware],
});


export default store;