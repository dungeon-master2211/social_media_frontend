import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import Banner from "../assets/banner.jpg"
const UserLoginSignup = ()=>{
    const [component,setComponent] = useState('login')
    const loginBtnClassName = (component==='login')?'selected':''
    const signupBtnClassName = (component==='signup')?'selected':''
    return(
        <div className="banner">
            <div className="banner-graphics">
                <img src={Banner} alt="banner image" className="banner-image"></img>
            </div>
            <div className="modal">
                <div className="selection-group">
                    <button className={`selector-btn ${loginBtnClassName}`} onClick={() => setComponent('login')}>Login</button>
                    <button className={`selector-btn ${signupBtnClassName}`} onClick={() => setComponent('signup')}>SignUp</button>
                </div>
                <div className="show-selected-comp">
                    {(component === 'login') && <Login />}
                    {(component === 'signup') && <SignUp />}
                </div>
            </div>
        </div>
    )
}

export default UserLoginSignup