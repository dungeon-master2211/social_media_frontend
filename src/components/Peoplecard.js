import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendFriendRequest } from '../utils/action'
import {toast,ToastContainer} from "react-toastify"
import blank_avatar from "../assets/avatar_blank.webp"
import { clearMessage } from '../utils/requestSlice'
const Peoplecard = ({_id,name,profilePicUrl,}) => {
    const {message} = useSelector(store=>store.request)
    const user = useSelector(store=>store.login.user)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(store=>store.login.isAuthenticated)
    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuthenticated===false) navigate('/login')
    },[isAuthenticated])
    function handleSendRequest(){
        sendFriendRequest(dispatch,_id)
    }
    if(message) {toast(message,{
        toastId:'dgwegfucg'
    })
    dispatch(clearMessage())
    }
  return (
    <div className='people-card'>
        <div className='avatar'>
        {<img src={profilePicUrl?profilePicUrl:blank_avatar} alt="avatar"></img>}
        </div>
        
        <h2>{name}</h2>
        {!user?.friends?.includes(_id) && <button className="addfriend-btn" onClick={()=>handleSendRequest()}>Add Friend</button>}
        <ToastContainer/>
    </div>
  )
}

export default Peoplecard