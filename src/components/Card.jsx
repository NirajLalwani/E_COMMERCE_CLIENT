import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Card(props) {
    return (
        <>
            <NavLink to={`/product/${props.productId}`}>
                <div className="card">
                    <figure className="img">
                        <img src={props.imgUrl} className='removeBG' width={props
                            .width} height={props.height} />
                    </figure>
                    <div className="price-name">
                        <p className='name'>{props.name}</p>
                        <p className='price'>₹{props.price}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}


Card.defaultProps = {
    width: "auto",
    height: 'auto'
}