import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { loadProfile } from "../utils/action"
import Myfriends from "./Myfriends"
import Myposts from "./Myposts"
const Profile = ()=>{
    const {isLoading,user,error,isAuthenticated} = useSelector(store=>store.login)
    const [isMyPostSelected,setMyPostVisible] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    console.log('pro')
    useEffect(()=>{
        loadProfile(dispatch)
    },[])
    useEffect(()=>{
        if(isAuthenticated===false) navigate('/login')
    },[isAuthenticated])
    if(isLoading) return null
    return(
        <>
            <div className="profile-tab">
                <div className="profile-image-wrapper">
                    <img src={user?.profilePicUrl} alt="profile pic"></img>
                </div>
                
                <h2>{user?.name}</h2>
            </div>
            <div className="profile-btn-group">
                <button onClick={()=>setMyPostVisible(true)}>Posts</button>
                <button onClick={()=>setMyPostVisible(false)}>Friends</button>
            </div>
            {isMyPostSelected && 
                <section className="myposts">
                    <Myposts/>
                </section>
            }
            {!isMyPostSelected && 
                <section className="myfriends">
                    <Myfriends/>
                </section>
            }
        </>
    )
}

export default Profile