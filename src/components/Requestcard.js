import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {acceptRequest,rejectRequest} from "../utils/action" 
const Requestcard = ({from,_id}) => {
  const dispatch = useDispatch()
  const myid = useSelector(store=>store.login.user._id)
  const friendId = from?._id
  return (
    <div className='request-card'>
        <div className='avatar'>
          <img src={from?.profilePicUrl} alt="avatar"/>
        </div>
        
        <h2>{from?.name}</h2>
        <section className='request-action-btns'>
          <button onClick={()=>acceptRequest(dispatch,myid,friendId)} className="accept-btn">Accept</button> 
          <button onClick={()=>rejectRequest(dispatch,myid,friendId)} className="reject-btn">Reject</button>
        </section>
    </div>
  )
}

export default Requestcard