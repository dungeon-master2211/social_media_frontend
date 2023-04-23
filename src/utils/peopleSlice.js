import { createSlice } from "@reduxjs/toolkit";

export const peopleSlice = createSlice({
    name:'people',
    initialState:{
        isLoading:false,
        people:[]
    },
    reducers:{
        setPeopleLoading:(state)=>{
            state.isLoading = true
        },
        setPeopleSuccess:(state,action)=>{
            state.isLoading=false
            state.people = action.payload
        }
    }
})


export const {setPeopleLoading,setPeopleSuccess} = peopleSlice.actions
export default peopleSlice.reducer