import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../utils/action'
import Postcard from './Postcard'
const Myposts = () => {
    const isAuthenticated = useSelector(store=>store.login.isAuthenticated)
    const myDetail = useSelector(store=>store.login.user)
    const myposts = useSelector(store=>store.post.posts)
    const dispatch = useDispatch()
    useEffect(()=>{
        
        if(isAuthenticated){
            getMyPosts(dispatch)
        }
    },[isAuthenticated])
  return (
    <div className='myallposts'>
        {myposts.map(item=>{
            const details = {
                ...item,
                author:{
                    ...myDetail
                }
            }
            return <Postcard key={item._id} {...details}/>
        })}
    </div>
  )
}

export default Myposts