import {createSlice} from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name:'loginSlice',
    initialState:{
        isLoading:false,
        message:'',
        user:'',
        isAuthenticated:false,
        posts:[],
        isPostLoading:false,
        postCreatedMessage:''
    },
    reducers:{
        setLoading:(state)=>{
            state.isLoading = true
            state.message=''
            state.user=''
            
        },
        loginUserSuccess:(state,action)=>{
            state.isLoading=false
            state.message = action.payload.message
            state.user = action.payload.user
            state.isAuthenticated=true
        },
        loginUserFailed:(state,action)=>{
            state.message = action.payload
            state.isLoading=false
            state.isAuthenticated=false
        },
        loadUserSuccess:(state,action)=>{
            state.isLoading=false
            state.user=action.payload
            state.isAuthenticated=true
            
        },
        loadUserFail:(state,action)=>{
            state.isLoading=false
            state.error = action.payload
            state.isAuthenticated=false
        },
        setPostLoading:(state)=>{
            state.isPostLoading=true
            state.message=''
            state.error=''
        },
        loadPostSuccess:(state,action)=>{
            state.isPostLoading=false
            state.user = action.payload.user
            state.posts = action.payload.posts
            state.isAuthenticated = true
        },
        loadPostFail:(state,action)=>{
            state.isPostLoading=false
            state.error = action.payload
            state.isAuthenticated=false
        },
        setCurrentPost:(state,action)=>{
            state.posts.unshift(action.payload.post)
            state.postCreatedMessage = action.payload.message
        },
        removePostCreatedMessage:(state)=>{
            state.postCreatedMessage=''
        },
        setCurrentPostFail:(state,action)=>{
            state.error=action.payload
        },
        postAuthenticationError:(state)=>{
            state.isAuthenticated = false
        },
        setIsAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload
        }
    }
})

export const {setLoading,loginUserSuccess,loginUserFailed,loadUserSuccess,loadUserFail,setPostLoading,
    loadPostSuccess,loadPostFail,setCurrentPost,setCurrentPostFail,postAuthenticationError,setIsAuthenticated,
    removePostCreatedMessage} = loginSlice.actions
export default loginSlice.reducer