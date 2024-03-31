import React from 'react'
import { useCart } from '../Context/CartContext'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
const AddToCart = () => {


    const { cart, increaseQuantity, decreaseQuantity, removeItem, total, clearCart } = useCart();
    return (
        <>
            <div className="container">
                <div className="table-container">

                    <table>
                        <tr>
                            <th>ITEM</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
                            <th>Remove</th>
                        </tr>
                        {
                            cart.map((currelement, index) => {
                                return (

                                    <tr key={index}>
                                        <td>
                                            <div>

                                                <img src={currelement.images[0]} alt="" width={"40px"} />
                                                <p>{currelement.name}</p>
                                            </div>
                                        </td>
                                        <td>₹{currelement.price}</td>
                                        <td className='quantity'>
                                            <div className="quantityWrapper">
                                                <div className="quantityBtn" onClick={() => {
                                                    increaseQuantity(index);
                                                }}>
                                                    <FaPlus />
                                                </div>
                                                <span>{currelement.quantity}</span>
                                                <div className="quantityBtn" onClick={() => decreaseQuantity(index)} >
                                                    <FaMinus />
                                                </div>
                                            </div>
                                        </td>

                                        <td>₹{currelement.subTotal}</td>
                                        <td>
                                            <button className="btn" onClick={() => removeItem(index)}>remove</button>
                                        </td>
                                    </tr>
                                )

                            })
                        }

                    </table>
                    <div className="btns">
                        <NavLink className='btn' to='/products'>CONTINUE SHOPPING</NavLink>
                        <button className='red' onClick={clearCart}>CLEAR CART</button>
                    </div>
                    {
                        cart.length > 0 ?
                            <div className="total">
                                <p> SubTotal: <span className='bold'>₹{total}</span> </p>
                                <p> ShippingFee: <span className='bold'>₹{50}</span> </p>
                                <p> Total: <span className='bold'>₹{total + 50}</span> </p>
                            </div> : ''
                    }
                </div>
            </div>

        </>
    )
}

export default AddToCart
