
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";


const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1`}),
    tagTypes: ["Chat", "User"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url:'/chat/mychats',
                credentials: "include",
            }),
            providesTags: ["Chat"],
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"],
        })
        
    }),

   
});


export default api;

export const { useMyChatsQuery, useLazySearchUserQuery } = api;