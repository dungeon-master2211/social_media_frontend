import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name:'request',
    initialState:{
        message:'',
        requests:[]
    },
    reducers:{
        sendRequest:(state)=>{
            state.message=''
        },
        sendRequestSuccess:(state,action)=>{
            state.message = action.payload
        },
        sendRequestFail:(state,action)=>{
            state.message = action.payload
        },
        getAllRequests:(state,action)=>{
            state.requests=action.payload
        },
        clearMessage:(state)=>{
            state.message=''
        }
    }
})

export const {sendRequest,sendRequestSuccess,sendRequestFail,getAllRequests,clearMessage} = requestSlice.actions

export default requestSlice.reducer