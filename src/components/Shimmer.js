const Shimmer = ()=>{

    const shimmerStyle={
        height:"50px",
        width:"80%",
        backgroundColor:"lightgray",
        margin:"10px"
    }

    return <>
        {Array(5).fill(0).map((item,index)=><div style={shimmerStyle} key={index}>

        </div>)}
    </>
}

export default Shimmer