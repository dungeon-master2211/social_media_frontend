import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name:'profile',
    initialState:{
        error:'',
        user:'',
        isLoading:false,
        isAuth:''
    },
    reducers:{
        setLoadUser:(state)=>{
            state.isLoading = true
            state.user=''
            state.error=''
            
        },
        loadUserSuccess:(state,action)=>{
            state.isLoading=false
            state.user=action.payload
            state.isAuth=true
            
        },
        loadUserFail:(state,action)=>{
            state.isLoading=false
            state.error = action.payload
            state.isAuth=false
        }
    }
})

export const {setLoadUser,loadUserSuccess,loadUserFail} = profileSlice.actions
export default profileSlice.reducer