import Writepost from "./Writepost"
import AllPosts from "./AllPosts"
const Home = ()=>{
    return(
        <div className="home-section">
            <Writepost/>
            <hr></hr>
            <AllPosts/>
        </div>
    )
}

export default Home