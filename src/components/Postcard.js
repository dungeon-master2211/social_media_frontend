import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPost,deletePost, viewPostComments } from '../utils/action'
import {AiOutlineLike,AiFillLike,FiEdit,ImBin,BiCommentDetail,AiOutlineShareAlt,BiLike} from 'react-icons/all';
import { backend_url } from '../constants';
import Comment from './Comment';
const Postcard = ({author,createdAt,post_text,post_img,_id}) => {
  const user = useSelector(store=>store.login.user)
  const dispatch = useDispatch()
  const [showModal,setShowModal] = useState(false)
  const [postText,setPostText] = useState(post_text)
  const [allUsersWhoLiked,setAllUsersWhoLiked] = useState([])
  const [like,setLike] = useState(allUsersWhoLiked.includes(user._id))
  const [noOfLikes,setNoOfLikes] = useState(-1)
  const [showComment,setShowComment] = useState(false)
  function saveEditedPost(){
    setShowModal(false)
    editPost(dispatch,_id,postText)
  }
  function deleteClickedPost(){
    deletePost(dispatch,_id)
  }
  async function getNoOfLikes(){
    try{
      const res = await fetch(backend_url+`/nooflikes/${_id}`,{
        method:'GET',
        credentials:'include'
      })
      const data = await res.json()
      if(data?.status==='success'){
        setNoOfLikes(data?.likes)
        setAllUsersWhoLiked(data?.allUsers)
        setLike(data?.allUsers?.includes(user._id))
      }
    }catch(error){
      console.log(error)
    }
    
  }
  async function likeThisPost(){
    
    try{
      const res = await fetch(backend_url+`/likepost`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          post_id:_id,
          user_id:user._id
        })
      })
      const data = await res.json()
      if(data?.status==='success'){
        setLike(true)
      }
    }catch(error){
      console.log(error)
    }
  }

  async function unlikeThisPost(){
    try{
      const res = await fetch(backend_url+`/unlikepost/${_id}/${user._id}`,{
        method:'GET',
        credentials:'include'
      })
      const data = await res.json()
      if(data?.status==='success'){
        setAllUsersWhoLiked(data?.allUsers)
        setNoOfLikes(data?.allUsers?.length)
        setLike(false)
      }
    }catch(error){
      console.log(error)
    }
  }
  const checkStatement = {
    user_id:user._id
  }

  function handleCommentClick(){
    setShowComment(true)
    viewPostComments(dispatch,_id)
  }

  useEffect(()=>{
    getNoOfLikes()
  },[like])
  return (
    <div>
    <div className='postcard'>
        <div className='authordetail'>
            <img src={author?.profilePicUrl}/>
            <div className='authorsubdetail'>
                <span>{author?.name}</span>
                <p>{new Date(createdAt).toLocaleString()}</p>
            </div>
            
        </div>
        <p className='post-text'>
            {post_text}
        </p>
        {post_img && <img src={post_img} className="post-img"></img>}
        <div className='post-actions'>
          {/* allUsersWhoLiked.includes(user._id) */}
        <span className="like-btn" onClick={like?()=>unlikeThisPost() :()=>likeThisPost()}>{like?<AiFillLike/>:<BiLike/>}{noOfLikes}</span>
        <span onClick={()=>handleCommentClick()}><BiCommentDetail/></span>
        
        {/* {author?._id!==user?._id && <span><AiOutlineShareAlt/></span>} */}
        {author?._id==user?._id && <div className='post-btn-grp'>
          
          <span onClick={()=>setShowModal(true)}><FiEdit/></span>
          <span onClick={()=>deleteClickedPost()}><ImBin/></span>
        </div>}
        </div>
        
        {showModal && <div className='edit-modal'>
          <textarea cols={50} rows={10} onChange={(e)=>setPostText(e.target.value)} value={postText}></textarea>
          <div className='modal-btn-grp'>
            <button onClick={()=>saveEditedPost()}>Save</button>
            <button onClick={()=>setShowModal(false)}>Cancel</button>
          </div>
        </div>}
    </div>
    {showComment && <Comment close={setShowComment} postid={_id}/>}
    </div>
  )
}

export default Postcard