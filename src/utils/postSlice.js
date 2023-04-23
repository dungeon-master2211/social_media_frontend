import {createSlice} from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name:'post',
    initialState:{
        isLoading:false,
        user:'',
        posts:[],
        message:'',
        error:'',
        comments:[]
    },
    reducers:{
        setPostLoading:(state)=>{
            state.isLoading=true
            state.message=''
            state.error=''
        },
        loadPostSuccess:(state,action)=>{
            state.isLoading=false
            state.user = action.payload.user
            state.posts = action.payload.posts
        },
        loadMyPost:(state,action)=>{
            state.posts = action.payload
        },
        loadPostFail:(state,action)=>{
            state.isLoading=false
            state.error = action.payload
        },
        loadComment:(state,action)=>{
            state.comments = action.payload
        }
    }
})

export const {loadMyPost,loadComment} = postSlice.actions
export default postSlice.reducer