// import React, { useState } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import { BASE_URL } from '../../services/baseurl';
// import Input from '../components/Input';
// import image from '../styles/images/register.png'

// const Register = () => {

//     const navigate = useNavigate();

//     const [data, setData] = useState({
//         name: "",
//         email: '',
//         password: '',
//         confirmPassword: ''
//     })

//     const handleInputChange = (e) => {
//         setData({
//             ...data,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = data;
//         if (name === '') {
//             toast.error("Enter Your Name")
//         } else if (email === '') {
//             toast.error("Enter Your Email")
//         } else if (!email.includes("@")) {
//             toast.error("Enter Valid Email")
//         } else if (password === '') {
//             toast.error("Enter Your Password")
//         } else if (password.length < 8) {
//             toast.error("Password Must Contain's 8 character")
//         } else {
//             const response = await fetch(`${BASE_URL}/api/users/register`,
//                 {
//                     method: "POST",
//                     body: JSON.stringify(data),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             )
//             const data_ = await response.json()
//             console.log(data)
//             if (response.status === 200) {
//                 toast.success(data_.message);
//             } else {
//                 toast.error(data_.error)
//             }
//         }
//     }


//     return (
//         <>
//             <section className='section-register '>
//                 <h1>Register Now</h1>
//                 <div className="container">
//                     <div className="left">
//                         <img src={image} alt="" width={"50%"} />
//                         <p>Already have an Account? <NavLink to='/login' >Log In</NavLink></p>
//                     </div>
//                     <div className="right">
//                         <Input onChange={handleInputChange} type='text' name='name' placeholder='Enter Your Name' value={data.name} />
//                         <Input onChange={handleInputChange} type='text' name='email' placeholder='Enter Your Email' value={data.email} />
//                         <Input onChange={handleInputChange} type='Password' name='password' placeholder='Enter Your Password' value={data.password} />
//                         <Input onChange={handleInputChange} type='Password' name='confirmPassword' placeholder='Confirm Your Password' value={data.confirmPassword} />
//                         <button className="btn" onClick={handleSubmit}>Register Now</button>
//                     </div>
//                 </div>

//             </section>
//             <ToastContainer />
//         </>
//     )
// }

// export default Register

import React from 'react'

const register = () => {
  return (
    <div>
      <h1>Email Verify Page</h1>
    </div>
  )
}

export default register
