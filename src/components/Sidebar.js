import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { backend_url } from '../constants'
import { setIsAuthenticated } from '../utils/loginSlice'
import {AiFillHome,CgProfile,MdPeopleAlt,IoMdNotifications,FiLogOut,AiFillMessage} from "react-icons/all"
const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userid = useSelector(store=>store.login.user?._id)
  async function logout(){
    const res = await fetch(backend_url+'/logout',{
      credentials:'include'
    })
    const data = await res.json()
    if(data.status==='success') {
      setIsAuthenticated(false)
      navigate('/login') 
    }
  }
  return (
    <div className='sidebar'>
        <div className='side-section'><span><AiFillHome/></span><Link className="side-link" to="/">Home</Link></div>
        <div className='side-section'><span><CgProfile/></span><Link className="side-link" to="/profile">Profile</Link></div>
        <div className='side-section'><span><MdPeopleAlt/></span><Link className="side-link" to="/people">People</Link></div>
        <div className='side-section'><span><IoMdNotifications/></span><Link className="side-link" to="/requests">Requests</Link></div>
        <div className='side-section'><span><AiFillMessage/></span><Link className="side-link" to={'/message'+`/${userid}`}>Messages</Link></div>
        <div className='side-section'><span><FiLogOut/></span><button className="side-link logout-btn" onClick={()=>logout()}>Logout</button></div>
        
        
    </div>
  )
}

export default Sidebar