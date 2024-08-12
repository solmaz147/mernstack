import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"/api/v1"
    }),
    endpoints:(builder)=> ({
        register: builder.mutation({
            query(body){
                return {
                    url:"/register",
                    method:"POST",
                    body
}
            },

            async onQueryStarted(args,{dispatch, queryFulfilled}){
                try{
                    await queryFulfilled
                    await dispatch(userApi.endpoints.getMe.initiate(null))
                }
                catch(err){
                    console.log("unpredictable error")
                }
            }
        }),

        login: builder.mutation({
            query(body){
                return {
                    url:"/login",
                    method:"POST",
                    body
                }
            },
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                    await queryFulfilled
                    await dispatch(userApi.endpoints.getMe.initiate(null))


                }
                catch(err){
                    console.log("unpredictable error")
                }
            }

        }),

        logout:builder.mutation({
            query:() => ({
            url:"/logout",
            method: "GET"
        }),
        async onQueryStarted(arg,{dispatch,queryFulfilled}){
            try{
                await queryFulfilled;
                dispatch (clearUser());
            }
            catch(err){ console.error(err)}
        },
       
            
            
        
    }),
})
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi