import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom'
import { MdMenuOpen } from "react-icons/md";

import logo from '../styles/images/logo.png'
import { IoMdCart } from "react-icons/io";
import { useUserContext } from '../Context/UserContext'
import { useCart } from '../Context/CartContext';
const Navbar = () => {
    const { cart } = useCart();
    const { isLogin } = useUserContext()

    const [navopen, setNavopen] = useState(false);
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="" width='170px' />
                </div>
                <div className={`${navopen ? "OpenNav" : ''} navbar`}>
                    <ul >
                        <IoCloseSharp className='close mobile_icon' onClick={() => setNavopen(false)} />
                        <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/'>Home</NavLink>
                        <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/niraj/verify/lasdk'>Verify</NavLink>
                        <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/contact'>Contact</NavLink>
                        <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/products'>Products</NavLink>
                        {
                            isLogin ? (
                                <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/logout'>Logout</NavLink>
                            ) : (
                                <>
                                    <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/login'>Login</NavLink>
                                    <NavLink onClick={() => setNavopen(false)} activeclassname='active' to='/register'>Register</NavLink>
                                </>
                            )
                        }
                        <div className='cart-logo desktop_icon'>
                            <div className="total_items">{cart.length}</div>
                            <NavLink className='cart' to='/cart'><IoMdCart /></NavLink>
                        </div>
                    </ul>

                </div>

                <div className="mobile_icon">
                    <div className='cart-logo'>
                        <div className="total_items">{cart.length}</div>
                        <NavLink className='cart' to='/cart'><IoMdCart /></NavLink>
                    </div>
                    <div className="menu" onClick={() => {
                        if (navopen === true) {
                            setNavopen(false)
                        } else {
                            setNavopen(true)
                        }
                    }}>
                        <MdMenuOpen />
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Navbar
