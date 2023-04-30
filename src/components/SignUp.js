import {Formik} from "formik"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { signup,resetSignup } from "../utils/action"
import { ToastContainer, toast } from 'react-toastify';
import { LineWave } from "react-loader-spinner"
const SignUp = ()=>{
    const [avatar,setAvatar] = useState('')
    const dispatch = useDispatch()
    
    const {isLoading,message,error} = useSelector(store=>store.userSignup)
    
    if(message) {
        toast(message,{
        toastId: "customId1"
      })
      
    }
    if(error) {
        toast(error,{
        toastId: "customId2"
      })
      
    }
    return(
        <div className="signup-form">
            
            <Formik
            initialValues={{
                name:"",
                email:"",
                password:"",
                confirmPassword:"",
                profilePicUrl:""
            }}
            validate={values=>{
                const errors={}
                if(!values.email) errors.email = 'Required'
                if(!values.name) errors.name = "Required"
                if(!values.password) errors.password = 'Required'
                if(!values.confirmPassword) errors.confirmPassword = 'Required'

                return errors
            }}
            onSubmit={(values,{setSubmitting})=>{
                const formdata = new FormData()
                formdata.append('name',values.name)
                formdata.append('email',values.email)
                formdata.append('password',values.password)
                formdata.append('confirmPassword',values.confirmPassword)
                formdata.append('profilePicUrl',values.profilePicUrl)
                console.log(formdata)
                signup(dispatch,formdata)
                values.name=''
                values.email=''
                values.password=''
                values.confirmPassword=''
                values.profilePicUrl=''
                setAvatar('')
                
            }}
            >
                {({
                    values,handleChange,handleSubmit,isSubmitting,errors,touched,setFieldValue
                })=>(
                    <form onSubmit={handleSubmit} className="form-normal" encType="multipart/form-data">
                        <input value={values.name} type="text" name="name" onChange={handleChange} placeholder="Name"></input>
                        <div className="form-error">{errors.name && touched.name && errors.name}</div>
                        <input value={values.email} type="email" name="email" onChange={handleChange} placeholder="Email"></input>
                        <div className="form-error">{errors.email && touched.email && errors.email}</div>
                        <input value={values.password} type="password" name="password" onChange={handleChange} placeholder="Password"></input>
                        <div className="form-error">{errors.password && touched.password && errors.password}</div>
                        <input value={values.confirmPassword} type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password"></input>
                        <div className="form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</div>
                        <span>Choose Avatar:</span>
                        <input type="file" accept="image/*" name="profilePicUrl" onChange={(e)=>{
                            const image = e.currentTarget.files[0]
                            setFieldValue('profilePicUrl',image)
                            setAvatar(URL.createObjectURL(image))

                            }}></input>
                        {avatar && <img className="preview-img" src={avatar} alt="avatar"></img>}
                        <button type="submit" className="submit-btn" disabled={isLoading}>Submit <LineWave
                            height="30"
                            width="30"
                            color="#4fa94d"
                            ariaLabel="line-wave"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={isLoading}
                            firstLineColor="white"
                            middleLineColor="white"
                            lastLineColor="white"
                        /></button>
                    </form>
                )}
            </Formik>
            <ToastContainer />
        </div>
    )
}

export default SignUp