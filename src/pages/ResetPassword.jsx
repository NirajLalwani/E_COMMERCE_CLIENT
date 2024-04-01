import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Input from '../components/Input';
import image from '../styles/images/resetPassword.png'
import { useUserContext } from '../Context/UserContext';
import { BASE_URL } from '../../services/baseurl';
import Error from './Error';
const ForgotPassword = () => {
    const { isLogin } = useUserContext();


    const navigate = useNavigate();
    if (isLogin) {
        navigate('/404PageNotFound');
    }
    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })


    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const params = useParams();
    const HandleInput = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = data;

        if (password === '' || confirmPassword === '') {
            toast.error("Password and Confirm Password is required");
        }else if(password.length < 8 || confirmPassword.length <8){
            toast.error("Password Must Contain 8 Characters!");
        }
         else if (password !== confirmPassword) {
            toast.error("Password and Confirm Password must be same");
        }
        else {
            const response = await fetch(`${BASE_URL}/api/users/updatePassword`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ ...data, verificationToken: params.token }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data_ = await response.json()
            if (response.status === 200) {
                toast.success(data_.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000)
            } else {
                // navigate('/404PageNotFound');
                toast.error(data_.error);
            }
        }
    }
    return (
        <>

            <section className='section-register '>
                <h1>Reset Password</h1>
                <div className="container">
                    <div className="left">
                        <img src={image} alt="" width={"50%"} />
                        <p>Does't have an Account? <NavLink to='/register' >Sign Up</NavLink></p>
                    </div>
                    <div className="right">
                        <Input onChange={handleInputChange} type='password' name='password' placeholder='Enter Your Password' value={data.password} />
                        <Input onChange={handleInputChange} type='password' name='confirmPassword' placeholder='Enter Your Password' value={data.confirmPassword} />
                        <button className="btn" onClick={HandleInput}>Reset Password</button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default ForgotPassword