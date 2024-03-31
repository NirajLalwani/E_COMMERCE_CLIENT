import React from 'react'
import ScrollToTop from './ScrollToTop'
import { FaArrowUp } from "react-icons/fa";
const ScrollToTopArrow = () => {
    return (
        <div className='scrollToTop' onClick={() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
        }}>
            <FaArrowUp />
        </div>
    )
}

export default ScrollToTopArrow
