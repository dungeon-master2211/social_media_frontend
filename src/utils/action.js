import {setIsLoadingTrue,setMessage,setError,resetState} from "./userSlice"
import { setLoading,loginUserSuccess,loginUserFailed,setIsAuthenticated,
    loadUserSuccess,loadUserFail,setPostLoading,loadPostSuccess,loadPostFail,
    setCurrentPost,
    postAuthenticationError,setCurrentPostFail, removePostCreatedMessage} from "./loginSlice"
// import {setLoadUser,loadUserSuccess,loadUserFail} from "./profileSlice"
// import {setPostLoading,loadPostSuccess,loadPostFail} from "./postSlice"
import {backend_url} from "../constants"
import { setPeopleLoading, setPeopleSuccess } from "./peopleSlice"
import { sendRequest,sendRequestSuccess,sendRequestFail,getAllRequests } from "./requestSlice"
import { loadComment, loadMyPost } from "./postSlice"
export const signup = async (dispatch,data)=>{
    try{
        dispatch(setIsLoadingTrue())
        const res = await fetch(backend_url+'/register',{
            method:'POST',
            // headers:{
            //     'Content-Type':'application/json'
            // },
            body:data
        })
        
        // if(await !(res.status>=200 && res.status<=209)) dispatch(setError(res.statusText))
        const json = await res.json()
        console.log(json,'json')
        if(json.status==='fail') dispatch(setError(json.message))
        if(json.status==='success') dispatch(setMessage(json.message))
    }
    catch(err){
        console.log(err)
        dispatch(setError('Internal Error'))
    }
    // dispatch(setMessage(''))
    // dispatch(setError(''))
}

export const loginUser = async(dispatch,body)=>{
    try {
        
        dispatch(setLoading())
        const res = await fetch(backend_url+'/login',{
            method:'POST',
            credentials: 'include',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                "Access-Control-Allow-Credentials": true,
            },
            body:JSON.stringify(body)
        })
        const data = await res.json()
        if(data.status==='success'){
            dispatch(loginUserSuccess({
                message:data.message,
                user:data.user
            }))
        }
        else{
            dispatch(loginUserFailed(data.message))
        }
    } catch (error) {
        console.log(error)
        dispatch(loginUserFailed('Internal Server Error'))
    }
}

export const loadProfile = async(dispatch)=>{
    try{
        const res = await fetch(backend_url+'/profile',{
            method:'GET',
            credentials:"include",
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                "Access-Control-Allow-Credentials": true,

            }
        })

        const data = await res.json()
        console.log(data)
        if(data.status==='success'){ 
            
            dispatch(loadUserSuccess(data.user))
        }
        else if(data.status==='fail') dispatch(loadUserFail(data.message))
    }catch(error){
        console.log(error)
        dispatch(loadUserFail('Internal Server Error'))
    }
}

export const loadPost = async(dispatch)=>{
    try {
        dispatch(setPostLoading())
        const res = await fetch(backend_url+'/getpost',{
            method:'GET',
            credentials:'include'
        })
        const data = await res.json()
        if(data.status==='success'){
            dispatch(loadPostSuccess({
                user:data.user,
                posts:data.posts
            }))
        }
        if(data.status==='fail'){
            dispatch(loadPostFail(data.message))
        }
    } catch (error) {
        console.log(error)
        dispatch(loadPostFail('Internal Server Error'))
    }
}

export const createPost = async(dispatch,postdata)=>{
    try {
        const res = await fetch(backend_url+'/createpost',{
            method:'POST',
            credentials:'include',
            // headers:{
            //     'Content-Type':'application/json'
            // },
            body:postdata
        })
        const data = await res.json()
        if(data.status==='success') {
            dispatch(setCurrentPost({
            post:data.post,
            message:data.message
        }))
        
    }
        if(data?.isAuthenticated===false) dispatch(postAuthenticationError())
        else if(data.status==='fail') dispatch(setCurrentPostFail(data.message))

    } catch (error) {
        console.log(error)
        dispatch(setCurrentPostFail('Internal Server Error'))
    }
}
export const getMyPosts = async(dispatch)=>{
    try{
        const res = await fetch(backend_url+'/myposts',{
            method:'GET',
            credentials:'include',
            
        })
        const data = await res.json()
        if(data?.status==='success'){
            dispatch(loadMyPost(data?.posts))
        }
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
    
}
export const deletePost = async(dispatch,postid)=>{
    try {
        const res = await fetch(backend_url+`/deletePost/${postid}`,{
            method:'GET',
            credentials:'include'
        })
        const data = await res.json()
        if(data?.status==='success'){
            loadPost(dispatch)
            getMyPosts(dispatch)
        }
    } catch (error) {
        console.log(error)
    }
}

export const editPost = async(dispatch,postid,postbody)=>{
    try {
        const res = await fetch(backend_url+`/editPost/${postid}`,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({postText:postbody})
        })
        const data = await res.json()
        if(data?.status==='success'){
            loadPost(dispatch)
            getMyPosts(dispatch)
        }
    } catch (error) {
        console.log(error)
    }
}

export const viewPostComments = async(dispatch,postid)=>{
    try {
        const res = await fetch(backend_url+`/viewcomment/${postid}`,{
            method:'GET',
            credentials:'include'
        })
        const data = await res.json()
        if(data?.status==='success'){
            dispatch(loadComment(data?.comments))
        }
    } catch (error) {
        console.log(error)
    }
}

export const addComment = async(dispatch,postid,userid,text)=>{
    try {
        const res = await fetch(backend_url+'/comment',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                postid,userid,text
            })
        })

        const data= await res.json()
        if(data?.status==='success'){
            viewPostComments(dispatch,postid)
        }
    } catch (error) {
        console.log(error)
    }
}


export const loadPeople = async(dispatch,queryP)=>{
    try {
        dispatch(setPeopleLoading())
        const apiUrl = backend_url + `/getUsers?people=${queryP}`
        const res = await fetch(apiUrl,{
            method:'GET',
            credentials:"include",
        })
        const data = await res.json()
        console.log(data)
        if(data.status==='success'){
            dispatch(setPeopleSuccess(data.users))
            dispatch(setIsAuthenticated(true))
        }
        if(data?.isAuthenticated===false) dispatch(setIsAuthenticated(false))
    } catch (error) {
        console.log(error)
    }
}

export const sendFriendRequest = async(dispatch,id)=>{
    try {
        dispatch(sendRequest())
        const res= await fetch(backend_url+`/sendrequest/${id}`,{
            method:'POST',
            credentials:"include"
        })
        const data = await res.json()
        if(data.status==='success') dispatch(sendRequestSuccess(data.message))
        else if(data?.isAuthenticated===false){
            dispatch(sendRequestFail(data.message))
            dispatch(setIsAuthenticated(false))
        }
        else if(data.status==='fail') dispatch(sendRequestFail(data.message))
    } catch (error) {
        console.log(error)
    }
}

export const getMyRequest = async(dispatch,id)=>{
    try {
        const res = await fetch(backend_url+`/getrequests/${id}`,{
            method:'GET',
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        if(data.status==='success') dispatch(getAllRequests(data.requests))
        if(data?.isAuthenticated===false) setIsAuthenticated(false)
    } catch (error) {
        console.log(error)
    }
}

export const acceptRequest = async(dispatch,myId,friendId)=>{
    try {
       const res = await fetch(backend_url+'/addFriend',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            myId:myId,
            friendId:friendId
        })
        
       })
       const data = await res.json()
       if(data?.status==='success') getMyRequest(dispatch,myId) 
    } catch (error) {
        console.log(error)
    }
}

export const rejectRequest = async(dispatch,myId,friendId)=>{
    try {
        console.log(myId,friendId)
       const res = await fetch(backend_url+'/deleterequest',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            myId,friendId
        })
        
       })
       const data = await res.json()
       if(data?.status==='success') getMyRequest(dispatch,myId) 
    } catch (error) {
        console.log(error)
    }
}

export const resetSignup = (dispatch)=>{
    dispatch(resetState())
}
