import React, { useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadPeople } from '../utils/action'
import Peoplecard from './Peoplecard'

import Shimmercard from './Shimmercard'
const People = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading,people} = useSelector(store=>store.people)
  const {isAuthenticated,user} = useSelector(store=>store.login)
  const [peopleName,setPeopleName] = useState('')
  useEffect(()=>{
    loadPeople(dispatch,peopleName)
  },[])
  useEffect(()=>{
    if(isAuthenticated===false) navigate('/login')
  },[isAuthenticated])

  if(isLoading) return <Shimmercard/>
  return (
    <div className='people'>
      <div className='searchbar'>
        <input type="text" className='search-text' value={peopleName} onChange={(e)=>setPeopleName(e.target.value)}></input>
        <button className='search-btn' onClick={()=>loadPeople(dispatch,peopleName)}>🔍</button>
      </div>
      <div className='people-section'>
        {people?.length? people.map(item=> {
          if(user?._id!==item._id) return <Peoplecard key={item._id} {...item}/>
      }):<div>
          No people found!
        </div>}
      </div>
      
    </div>
  )
}

export default People