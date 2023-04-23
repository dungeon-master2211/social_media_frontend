import React,{useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from "../utils/action"
import {AiOutlineSend,BiImageAdd} from "react-icons/all"
import { removePostCreatedMessage } from '../utils/loginSlice'
import { ToastContainer, toast } from 'react-toastify';
const Writepost = () => {
    const {user,postCreatedMessage} = useSelector(store=>store.login)
    const [post,setPost] = useState('')
    const [postImg,setPostImg] = useState('')
    const [postImgUrl,setPostImgUrl] = useState('')
    const dispatch = useDispatch()
    function createNewPost(){
      if(post.length){
        const fdata = new FormData()
        fdata.append('author',user?._id)
        fdata.append('post_text',post)
        fdata.append('post_img',postImg)
        // console.log(fdata.get('author'))
        // console.log(fdata.get('post_text'))
        // console.log(fdata.get('post_img'))
        createPost(dispatch,fdata)
        setPost('')
      }
    }
    if(postCreatedMessage) {
      toast('post created successfully')
      dispatch(removePostCreatedMessage())
      setPostImg('')
      setPostImgUrl('')
    }
  return (
    <div className='writepost'>
      <div className='user-detail'>
        <img src={user?.profilePicUrl} alt="avatar"></img>
        <h3>{user?.name}</h3>
      </div>
      <textarea name="post_txt" value={post} onChange={e=>setPost(e.target.value)} className="writepost-text"></textarea>
      {postImgUrl && <img src={postImgUrl} className="post-img"/>}
      <div className='post-buttons'>
        <button onClick={()=>createNewPost()} className="writepost-send"><AiOutlineSend/></button>
        <label className="writepost-attach">
        <input type="file" accept='image/*' style={{display:'none'}} onChange={(e)=>{
          setPostImg(e.currentTarget.files[0])
          setPostImgUrl(URL.createObjectURL(e.target.files[0]))
        }}></input>
        <BiImageAdd/>
        </label>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Writepost