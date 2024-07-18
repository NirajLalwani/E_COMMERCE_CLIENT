import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Input from '../components/Input';
import image from '../styles/images/login.png'
import { useUserContext } from '../Context/UserContext';
import { BASE_URL } from '../../services/baseurl';

const Login = () => {

 

    const { getUserData, setToken, isLogin } = useUserContext();
    const navigate = useNavigate();
    if (isLogin) {
        navigate('/404PageNotFound');
    }
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const HandleInput = async (e) => {
        e.preventDefault();
        const { email } = data;

        if (email === '') {
            toast.error("Enter Your Email!")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email!")
        } else {
            const response = await fetch(`${BASE_URL}/api/users/login`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data_ = await response.json()
            if (response.status === 200) {
                localStorage.setItem("token", data_.token)
                setToken(data_.token);
                getUserData();
                toast.success(data_.message);
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            } else {
                toast.error(data_.error);
            }
        }
    }
    return (
        <>

            <section className='section-register '>
                <h1>Login Now</h1>
                <div className="container">
                    <div className="left">
                        <img src={image} alt="" width={"50%"} />
                        <p>Does't have an Account? <NavLink to='/register' >Sign Up</NavLink></p>
                    </div>
                    <div className="right">
                        <Input onChange={handleInputChange} type='text' name='email' placeholder='Enter Your Email' value={data.email} />
                        <div className='login_password'>
                            <Input onChange={handleInputChange} type='password' name='password' placeholder='Enter Your Password' value={data.password}  />
                            <NavLink to={'/forgotpassword'}>Forgot Password?</NavLink>
                        </div>
                        <button className="btn" onClick={HandleInput}>Login</button>
                    </div>
                </div>

            </section>
            <ToastContainer />
        </>
    )
}

export default Login