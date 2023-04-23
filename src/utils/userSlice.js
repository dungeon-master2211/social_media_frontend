import {createSlice} from "@reduxjs/toolkit"

export const userSignupSlice = createSlice({
    name:'user_signup',
    initialState:{
        isLoading:false,
        message:'',
        error:''
    },
    reducers:{
        setIsLoadingTrue:(state)=>{
            state.isLoading=true
            state.message=''
            state.error=''
        },
        setMessage:(state,action)=>{
            state.isLoading=false
            state.message = action.payload
        },
        setError:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        resetState:(state)=>{
            state.isLoading=false
            state.message=''
            state.error=''
        }
    }
})

export const {setIsLoadingTrue,setMessage,setError,resetState} = userSignupSlice.actions
export default userSignupSlice.reducer