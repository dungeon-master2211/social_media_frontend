import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { backend_url } from '../constants'
import { loadUserSuccess } from '../utils/loginSlice'
const Myfriends = () => {
  const [friends,setFriends] = useState([])
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(store=>store.login.isAuthenticated)
  const id = useSelector(store=>store.login.user._id)
  let getUserById = async()=>{
    try {
      const res = await fetch(backend_url+`/getUserById/${id}`,{
        method:'GET',
        credentials:'include'
      })
      const data = await res.json()
      setFriends(data?.user?.friends)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(isAuthenticated){
      getUserById()
    }
  },[isAuthenticated])

  async function removeFriend(fid){
    try {
      const res = await fetch(backend_url+`/remove/${fid}`,{
        method:'GET',
        credentials:'include'
      })
      const data = await res.json()
      if(data?.status==='success'){
        setFriends(data?.user?.friends)
        dispatch(loadUserSuccess(data?.user))
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className='myfriends-section'>
      {
        friends?.length?friends.map(item=><div className='myfriends-card' key={item._id}>
          <div className='avatar'>
            {item?.profilePicUrl && <img src={item?.profilePicUrl} alt="avatar"/> }
          </div>
          <h2>{item?.name}</h2>
          {/* <button className='view-profile-btn'>View Profile</button> */}
          <button className='unfriend-btn' onClick={()=>removeFriend(item._id)}>Unfriend</button>
        </div>):<h2>Make some friends 🎅 </h2>
      }
    </div>
  )
}

export default Myfriends