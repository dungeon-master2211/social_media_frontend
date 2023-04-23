import {configureStore} from "@reduxjs/toolkit"
import loginSlice from "./loginSlice"
import peopleSlice from "./peopleSlice"
import postSlice from "./postSlice"
import profileSlice from "./profileSlice"
import requestSlice from "./requestSlice"
import  userSignupSlice  from "./userSlice"
const store = configureStore({
    reducer:{
        userSignup:userSignupSlice,
        login:loginSlice,
        profile:profileSlice,
        post:postSlice,
        people:peopleSlice,
        request:requestSlice
    }
})

export default store