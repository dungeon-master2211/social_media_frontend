import ReactDOM from "react-dom/client"
import {createBrowserRouter,Outlet, RouterProvider} from "react-router-dom"
import Users from "./components/Users";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import UserLoginSignup from "./components/UserLoginSignup";
import {Provider} from "react-redux"
import store from "./utils/store"
import Profile from "./components/Profile";
import Body from "./components/Body";
import Home from "./components/Home";
import People from "./components/People";
import Requests from "./components/Requests";
const App = () =>{
    
    return(
        <>
            {/* <div>{msg}</div>
            <input type="text" value={chat} onChange={(e)=>setChat(e.target.value)}></input>
            <button onClick={()=>sendMsg()}>Send</button> */}
            <Provider store={store}>
            <div className="home">
                <Outlet/>
            </div>
            </Provider>
            
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Body/>,
                children:[
                    {
                        path:'/',
                        element:<Home/>
                    },
                    {
                        path:'profile',
                        element:<Profile/>
                    },
                    {
                        path:'people',
                        element:<People/>
                    },
                    {
                        path:'requests',
                        element:<Requests/>
                    },
                    {
                        path:'/message/:id',
                        element:<Users/>
                    },
                ]
            },
            {
                path:'/login',
                element:<UserLoginSignup/>
            },
            
            
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter}/>)