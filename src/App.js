import { lazy,Suspense } from "react";
import ReactDOM from "react-dom/client"
import {createBrowserRouter,Outlet, RouterProvider} from "react-router-dom"
// import Users from "./components/Users";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import UserLoginSignup from "./components/UserLoginSignup";
import {Provider} from "react-redux"
import store from "./utils/store"
import Profile from "./components/Profile";
import Body from "./components/Body";
// import Home from "./components/Home";
// import People from "./components/People";
// import Requests from "./components/Requests";
import Shimmercard from "./components/Shimmercard";

const People = lazy(()=>import('./components/People'))
const Home = lazy(()=>import('./components/Home'))
const Requests = lazy(()=>import('./components/Requests'))
const Users = lazy(()=>import('./components/Users'))
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
                        element:<Suspense fallback={<Shimmercard/>}>
                        <Home/>
                    </Suspense>
                    },
                    {
                        path:'profile',
                        element:<Profile/>
                    },
                    {
                        path:'people',
                        element:<Suspense fallback={<Shimmercard/>}>
                            <People/>
                        </Suspense>
                    },
                    {
                        path:'requests',
                        element:<Suspense fallback={<Shimmercard/>}>
                        <Requests/>
                    </Suspense>
                    },
                    {
                        path:'/message/:id',
                        element:<Suspense fallback={<Shimmercard/>}>
                        <Users/>
                    </Suspense>
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