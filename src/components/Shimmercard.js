import React from 'react'

const Shimmercard = () => {
  return (
    <div className='people-section'>
        {Array(9).fill(0).map((item,index)=><div className="card-shimmer" key={index}>

        </div>)}
    </div>
  )
}

export default Shimmercard