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
    const { isLogin, userData } = useUserContext()

    const [navopen, setNavopen] = useState(false);


    const navbarFunction = (e) => {
        const menu = document.querySelector('.menu');
        const navbar = document.getElementById("Navbar");
        let elementClicked = e.target;

        if (navopen) {

            if (elementClicked === menu || menu.contains(elementClicked)) {
                setNavopen(false);
            }
            if (elementClicked === navbar || navbar.contains(elementClicked)) {
                if (elementClicked.tagName == "UL") {
                    setNavopen(true)
                } else {
                    setNavopen(false)
                }
            }
        } else {
            if (elementClicked === menu || menu.contains(elementClicked)) {
                setNavopen(true);
            } else {
                setNavopen(false);
            }
        }
    }
    document.addEventListener('click', navbarFunction)
    document.addEventListener('scroll', navbarFunction)


    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="" width='170px' />
                </div>
                <nav className={`${navopen ? "OpenNav" : ''} navbar`} id='Navbar'>
                    <ul >
                        <IoCloseSharp className='close mobile_icon' />
                        <NavLink activeclassname='active' to='/'>Home</NavLink>
                        <NavLink activeclassname='active' to='/contact'>Contact</NavLink>
                        <NavLink activeclassname='active' to='/products'>Products</NavLink>
                        {
                            isLogin ? (<>
                                {userData.isAdmin && <NavLink activeclassname='active' to='/admin/products'>Admin</NavLink>}
                                <NavLink activeclassname='active' to='/logout'>Logout</NavLink>
                            </>
                            ) : (
                                <>
                                    <NavLink activeclassname='active' to='/login'>Login</NavLink>
                                    <NavLink activeclassname='active' to='/register'>Register</NavLink>
                                </>
                            )
                        }
                        <div className='cart-logo desktop_icon'>
                            <div className="total_items">{cart.length}</div>
                            <NavLink className='cart' to='/cart'><IoMdCart /></NavLink>
                        </div>
                    </ul>

                </nav>

                <div className="mobile_icon">
                    <div className='cart-logo'>
                        <div className="total_items">{cart.length}</div>
                        <NavLink className='cart' to='/cart' ><IoMdCart className='MenuIcon' /></NavLink>
                    </div>
                    <div className="menu">
                        <MdMenuOpen />
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Navbar
