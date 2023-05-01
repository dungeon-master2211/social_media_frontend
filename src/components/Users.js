import { useState,useEffect } from "react"
import ChatWindow from "./ChatWindow"
import { backend_url } from "../constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import {io} from "socket.io-client"
const socket = io('https://chat-backend-00et.onrender.com',{
    autoConnect:false
})
const Users = ()=>{
    const [loadingFriends,setLoadingFriends] = useState(false)
    const [userDetail,setUserDetail] = useState({})
    const [peopleTyping,setPepoleTyping] = useState([])
    const [friends,setFriends] = useState([])
    const [friendsMsgs,setFriendsMsgs] = useState({})
    const [selectedId,setSelectedId] = useState('')
    const {id} = useParams()
    const [showUsers,setShowUsers] = useState(true)
    const [showChats,setShowChats] = useState(false)
    useEffect(()=>{
        setLoadingFriends(true)
        getUserFriends()
        socket.auth = {myId:id}
        socket.connect()
    },[])
    
    // useEffect(()=>{
        socket.on('private message',(data)=>{
            console.log('msg received')
            console.log(userDetail)
            console.log(userDetail?._id===data?.from)
            setFriendsMsgs(prev=>{
                return {...prev,[data.from]:prev[`${data.from}`].includes(data)?prev[`${data.from}`]:[...prev[`${data.from}`],data]}
            })
            
        })
    // },[])
    let t;
    socket.on('typing',(data)=>{
        
        clearTimeout(t)
        console.log('typing',data)
        // setFriends(prev=>prev.map(item=>{
        //     console.log(item)
        //     data===item?._id?{...item,isTyping:true}:{...item}
        // }))
        setPepoleTyping(prev=>prev.includes(data)?prev:[...prev,data])
        t = setTimeout(()=>setPepoleTyping(prev=>prev.filter(item=>item!==data)),1000)
        
    })

    // socket.on('stoppedtyping',(data)=>{
    //     // setFriends(prev=>prev.map(item=>{
    //     //     data===item?._id?{...item,isTyping:false}:{...item}
    //     // }))
    //     console.log('stop typing for',data)
    //     setPepoleTyping()
    // })
    
    console.log(peopleTyping)

    function appendMyMsg(data,to){
        
        setFriendsMsgs(prev=>{
            return {...prev,[to]:[...prev[`${to}`],data]}
        })
    }

    async function getUserFriends(){
        
        const res = await fetch(backend_url+`/getUserById/${id}`)
        const data = await res.json()
        console.log(data)
        const fmsgs={}
        const friendsData = data?.user?.friends?.map(item=>{
            fmsgs[item._id] = []
            return {...item,isTyping:false}
        })
        setFriends(friendsData)
        setFriendsMsgs(fmsgs)
        setLoadingFriends(false)
    }
    console.log(friends)

    async function messageFromDB(data){
        const res = await fetch(backend_url+'/getmessagebyid',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
            
        })
        const msgs = await res.json()
        if(msgs.status==='success'){
            // setUserDetail(prev=>{
            //     return {...prev,newMessages:msgs.messages}
            // })
            setFriendsMsgs(prev=>{
                return {...prev,[data.to]:msgs.messages}
            })
        }
    }

    function clickBack(){
        setShowChats(false)
        setShowUsers(true)
    }
    if(loadingFriends) return <Shimmer/>
    return(
        <div className="chat-app">
            {showUsers&& <div className="userwindow">
                {friends?.length?
                friends?.map((item)=>{
                    return <div className='user' key={item?._id} onClick={()=>{
                        setShowChats(true)
                        setShowUsers(false)
                        setUserDetail({
                        ...item,
                        username:`${item?.name}`,
                    })
                    setSelectedId(item?._id)
                    messageFromDB({
                        from:id,
                        to:item._id
                    })
                    
                }}>
                    <div className="small-avatar-wrapper">
                        <img src={item?.profilePicUrl} className="small-avatar"/>
                    </div>
                    <div>
                        {item?.name} 
                        <span className="chat-typing">{peopleTyping.includes(item._id) && 'typing....'}</span>
                    </div>
                    
                </div>
                }):<h2>No friends to chat, make some! 😛</h2>}
            </div>}
            {showChats && <div>
                
                <ChatWindow {...userDetail} socket={socket} newMessages={friendsMsgs[selectedId]} myId={id} appendCurrentMsg={appendMyMsg} typingStatus={peopleTyping} backFn={()=>clickBack()}/>
            </div>
            }
        </div>
    )
}

export default Users