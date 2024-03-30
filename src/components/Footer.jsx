import React from 'react'
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import image from '../styles/images/logo.png'

import { IoLogoInstagram } from "react-icons/io";
import { RiDiscordLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="top">

                        <div className="ContactUs">
                            <p>Contact Us</p>
                            <NavLink to="tel:+916353611361"><MdCall /> 6353611361</NavLink>
                            <NavLink to="mailto:nirajlalwani2810@gmail.com"> <MdEmail /> nirajlalwani2810@gmail.com</NavLink>
                            <NavLink to="https://maps.app.goo.gl/8YAAmvNpqNSEspJ77"> <IoLocationSharp /> Godhra-389001</NavLink>
                        </div>
                        <div className="quickLinks">
                            <p>Quick Links</p>
                            <NavLink to={'/'}><FaLongArrowAltRight className='center'/> Home</NavLink>
                            <NavLink to={'/products'}><FaLongArrowAltRight /> Product</NavLink>
                            <NavLink to={'/contact'}><FaLongArrowAltRight /> Contact Us</NavLink>
                            <NavLink to={'/register'}><FaLongArrowAltRight /> Register</NavLink>
                        </div>

                        <div className="social-links">
                            <p>Connect With Us</p>

                            <div className='f-logos'>
                                <a id='social-logo' href="https://www.instagram.com" target="_Niraj">

                                    <IoLogoInstagram className='footer-logo' />
                                </a>
                                <a id='social-logo' href="https://www.discord.com" target="_Niraj">

                                    <RiDiscordLine className='footer-logo' />
                                </a>
                                <a id='social-logo' href="https://www.youtube.com" target="_Niraj">

                                    <FaYoutube className='footer-logo' />
                                </a>
                            </div>
                            <div className="logo">
                                <img src={image} alt="" width={'170px'}/>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <p> Copyright &copy; 2024 All right reserved </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
