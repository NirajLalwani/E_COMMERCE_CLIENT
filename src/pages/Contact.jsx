import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Input from '../components/Input';
import image from '../styles/images/support.png'
import { BASE_URL } from '../../services/baseurl';

import { useUserContext } from '../Context/UserContext';
const Contact = () => {

    const navigate = useNavigate();
    var { isLogin, userData } = useUserContext()
    const [data, setData] = useState({
        name: userData.name,
        email: userData.email,
        message: ""
    })

    useEffect(() => {
        //?Setting username and email from the userData
        if (isLogin && userData) {
            setData({
                name: userData.name,
                email: userData.email,
                message: ""
            })
        }
    }, [isLogin, userData])

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const HandleInput = async (e) => {
        e.preventDefault();
        const { email, name, message } = data;
        if (name === '') {
            toast.error("Enter Your Name!")
        } else if (email === '') {
            toast.error("Enter Your Email!")

        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email!")
        }
        else if (message === '') {
            toast.error("Enter Your Message!")
        } else {
            const response = await fetch(`${BASE_URL}/api/contacts/contact`,
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
                setData({
                    ...data,
                    message: ""
                })
                toast.success(data_.message);
            } else {
                toast.error(data_.error);
            }
        }
    }
    return (
        <>

            <section className='section-register '>
                <h1>Contact Us</h1>
                <div className="container">
                    <div className="left">
                        <img src={image} alt="" width={"50%"} />
                    </div>
                    <div className="right">
                        <Input onChange={handleInputChange} type='text' name='name' placeholder='Enter Your Name' value={data.name} />

                        <Input onChange={handleInputChange} type='text' name='email' placeholder='Enter Your Email' value={data.email} />

                        <Input onChange={handleInputChange} type='text' name='message' placeholder='Enter Your Message' value={data.message} />


                        <button className="btn" onClick={HandleInput}>Send</button>
                    </div>
                </div>

            </section>
            <ToastContainer />
        </>
    )
}

export default Contact