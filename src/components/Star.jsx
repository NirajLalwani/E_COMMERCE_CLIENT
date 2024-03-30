import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Star = ({ stars, reviews }) => {

    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return <span key={index}>
            {
                stars >= index + 1 ? (<FaStar className='rating-icon' />) : stars >= number ? <FaRegStarHalfStroke className='rating-icon' /> :
                    (<FaRegStar className='rating-icon' />)
            }
        </span >
    })


    return (
        <div className='starComponent'>
            <div className='stars'>{ratingStar}</div>
            <div className='review'>{reviews} reviews</div>
        </div>
    )

}

export default Star
