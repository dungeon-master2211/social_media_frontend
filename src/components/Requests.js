import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyRequest } from '../utils/action'
import Requestcard from './Requestcard'
const Requests = () => {
    const dispatch = useDispatch()
    const {isAuthenticated,user} = useSelector(store=>store.login)
    const requests = useSelector(store=>store.request.requests)
    const navigate = useNavigate()
    useEffect(()=>{
        getMyRequest(dispatch,user._id)
    },[])
    useEffect(()=>{
        if(isAuthenticated===false) navigate('/login')
    },[isAuthenticated])
  return (
    <div className='requests'>
        {requests?.length? requests.map(item=><Requestcard key={item._id} {...item}/>):
        <h2>No pending Requests! 🤹‍♀️</h2>
        }
    </div>
  )
}

export default Requests