import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addComment } from '../utils/action'
import avatarBlank from "../assets/avatar_blank.webp"

const Comment = ({close,postid}) => {
    const [commentText,setCommentText] = useState('')
    const dispatch  =useDispatch()
    const postcomments = useSelector(store=>store.post.comments)
    const user = useSelector(store=>store.login.user)
  function handleAddClick(){
    if(commentText.length){
      addComment(dispatch,postid,user?._id,commentText)
      setCommentText('')
    }
  }
  return (
    <section className='comment-modal'>
        <textarea value={commentText} className="comment-textarea" onChange={(e)=>setCommentText(e.target.value)}></textarea>
        <div className='comment-btn-grp'>
            <button onClick={()=>handleAddClick()}>Add</button>
            <button onClick={()=>close(false)}>Discard</button>
        </div>
        <hr></hr>
        <div >
          All Comments:
          {postcomments.map(item=><div className='post-comments' key={item._id}>
            <section className='comment-imagewrapper'>
              <img src = {item?.user_id?.profilePicUrl ? item?.user_id?.profilePicUrl:avatarBlank} alt='avatar'></img>
            </section>
            <section className='comment-wrapper'>
                <h5>{item?.user_id?.name}</h5>
                <p>{item?.text}</p>
            </section>
            </div>)}
        </div>
        
    </section>
  )
}

export default Comment