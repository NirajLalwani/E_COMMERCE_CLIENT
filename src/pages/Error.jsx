import React from 'react'
import { NavLink } from "react-router-dom"
const Error = () => {
  return (
    <div className='ErrorComponents'>
      <h1> <span> 404 </span> Page Not Found</h1>
      <NavLink to={'/'} className="btn">Back To Home</NavLink>
    </div>
  )
}

export default Error