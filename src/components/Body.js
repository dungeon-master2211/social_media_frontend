import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import {loadPost} from "../utils/action"
const Body = ()=>{
    const {isAuthenticated} = useSelector(store=>store.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        loadPost(dispatch)
    },[])
    useEffect(()=>{
        if(isAuthenticated===false) navigate('/login')
    },[isAuthenticated])
    return(
        <>
            <div className="main-body">
                <Sidebar/>
                {/* Home
                    Profile
                    Friends
                    People
                */}
                <div className="content">
                    <Outlet/>
                </div>
                
            </div>
        </>
    )
}

export default Body