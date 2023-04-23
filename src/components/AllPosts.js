import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { loadPost } from '../utils/action'
import Postcard from './Postcard'
const AllPosts = () => {
  const {posts} = useSelector(store=>store.login)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    console.log('hhhhhh')
    loadPost(dispatch)
  },[])
  return (
    <div className='allposts'>
      <h2 style={{padding:'1rem',textAlign:"center"}}>Feed</h2>
      {posts.map(item=><Postcard key={item._id} {...item}/>)}
    </div>
  )
}

export default AllPosts