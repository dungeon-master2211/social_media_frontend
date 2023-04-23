import { useEffect, useRef, useState } from "react"
import {BiArrowBack,AiOutlineSend} from "react-icons/all"
const ChatWindow = ({username,_id,profilePicUrl,newMessages,socket,myId,appendCurrentMsg,typingStatus,backFn})=>{
    // const [currentMsg,setCurrentMsg] = useState(newMessages)
    const [chat,setChat] = useState('')
    const bottomref = useRef(null)
    console.log(newMessages)
    
    useEffect(()=>{
        bottomref.current?.scrollIntoView({behavior:'smooth'})
    },[newMessages])

    

    
    function sendMessage(){
        if (chat.length){
            appendCurrentMsg({from:myId,msg:chat},_id)
            socket.emit('private message',{
                from : myId,
                msg: chat,
                to:_id
            })
            setChat('')
        }
        
    }
    function chatType(e){
        // clearTimeout(t)
        setChat(e.target.value)
        // setIsTyping(true)
        
        socket.emit('typing',{
            from : myId,
            to:_id
        })
        
    }
    return(
       
        <div className="chatwindow">
            <div className="chatwindow-header">
                <BiArrowBack onClick={()=>backFn()} className="back-btn"/>
                <div className="small-avatar-wrapper">
                    <img src={profilePicUrl} className="small-avatar"/>
                </div>
                <div >
                    <h5 className="chatwindow-username">{username}</h5>
                    <span className="chat-typing-2">{typingStatus.includes(_id) && 'typing....'}</span>
                </div>
                
            </div>
            
            <div className="userchats">
                {newMessages?.map(m=>{
                    if(m.from===myId){
                        return <div key={m?._id} className="each-chat" style={{width:"100%"}}><div className="mymsg">{m.msg}</div></div>
                    }else{
                        return <div key={m?._id} className="each-chat-friend" style={{width:"100%"}}><div className="friendmsg">{m.msg}</div></div>
                    }
                })}
                <div ref={bottomref}></div>
            </div>
            <div className="msgtextbox">
                <textarea value={chat} onChange={(e)=>chatType(e)}></textarea>
                <button onClick={()=>sendMessage()}><AiOutlineSend/></button>
            </div>
        </div>
    )
}

export default ChatWindow