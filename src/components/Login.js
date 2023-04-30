import { useEffect, useState } from "react"
import { Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from "../utils/action";
import { LineWave } from "react-loader-spinner"
const Login = () => {
    const [userid, setUserId] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('login')
    const { isAuthenticated, isLoading, message } = useSelector(store => store.login)
    useEffect(() => {
        if (isAuthenticated) navigate('/profile')
    }, [isAuthenticated])
    if (message) {
        toast(message)
       
    }


    return (

        <div className="login">
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {}
                    if (!values.email) errors.email = 'Required'
                    if (!values.password) errors.password = 'Required'
                    return errors
                }}
                onSubmit={(values) => {
                    
                    loginUser(dispatch, {
                        email: values.email,
                        password: values.password
                    })
                }}
            >
                {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="login-form">
                        <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email"></input>
                        <div className="form-error">{errors.email && touched.email && errors.email}</div>
                        <input type='password' name="password" value={values.password} onChange={handleChange} placeholder="Password"></input>
                        <div className="form-error">{errors.password && touched.password && errors.password}</div>
                        <button className="submit-btn" type="submit" disabled={isLoading}>Login <LineWave
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

export default Login