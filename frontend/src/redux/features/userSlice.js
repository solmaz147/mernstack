import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated:false,
    loading: true,
}

export const userSlice = createSlice({
    initialState,
    name:"userSlice",
    reducers: {
        setUser(state,action){
            state.user = action.payload;
            state.isAuthenticated=true;
            state.loading=false;
        },
        setIsAuthenticated(state,action){
            state.isAuthenticated = action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        clearUser(state){
            state.user= null;
            state.isAuthenticated=false;
            state.loading=false;
        }
    },
})


export default userSlice.reducer
export const { setUser,setIsAuthenticated , setLoading, clearUser} = userSlice.actions



