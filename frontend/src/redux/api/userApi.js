import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setIsAuthenticated, setUser} from "../features/userSlice"

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints: (builder)=>({
        getMe: builder.query({
            query: () => "/me",
            transformResponse:(result)=>result.user,
             async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data} =await queryFulfilled()
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))

                }

                catch(err){
                    console.log(err)
                }
             }
        }),

        forgotPassword: builder.mutation({
           query(body) {
            return {
                url:"/forget/password",
                method:"POST",
                body
            }
           }
        }),

        resetPassword: builder.mutation({
            query({token, body}){
                return {
                    url:`/password/reset/${token}`,
                    method:"PUT",
                    body
                }
            }
        
        })
        

    }),
})

export const { useForgotPasswordMutation, useGetMeQuery, useResetPasswordMutation} = userApi