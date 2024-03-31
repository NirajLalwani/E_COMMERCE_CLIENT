import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, } from 'react-router-dom';
import { useProductContext } from '../Context/ProductContext'
import Star from '../components/Star';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import ProductSections from '../components/ProductSections';
import { useCart } from '../Context/CartContext';
import Loading from '../components/Loading';
import { useRef } from 'react';
const SingleProduct = () => {


    const Navigate = useNavigate();
    const topRef = useRef(null);

    const { isSingleLoading, setSingleProduct, products, singleProduct, BigImage, next, previous, setBigImage } = useProductContext();


    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();


    const param = useParams()
    useEffect(() => {
        if (products) {
            setSingleProduct(param.id)
        }




        const scrollToTop = () => {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToTop()

    }, [products, param.id])

    if (isSingleLoading || !products) {
        return <Loading />
    }

    return (
        <>
            <div className="container singleProduct">
                <div className="left .images">

                    <figure className="bigImage">
                        <img src={BigImage} alt="" width={'300px'} />
                        <div className="previous" onClick={() => {
                            previous();
                        }}>
                            <GrFormPrevious />
                        </div>
                        <div className="next" onClick={() => {
                            next();
                        }}>
                            <MdOutlineNavigateNext />
                        </div>
                    </figure>
                    <div className="small_Images">

                        {
                            singleProduct.images.map((currImage) => {
                                return (
                                    <img src={currImage}
                                        className={`${currImage.trim() === BigImage.trim() ? "activeImage" : ""}`}
                                        onClick={() => {
                                            setBigImage(currImage)
                                        }} />
                                )
                            })
                        }
                    </div>

                </div>
                <div className="right content">
                    <p className="product-name">
                        {singleProduct.name}
                    </p>
                    <p className="ratings">
                        <Star stars={singleProduct.ratings} reviews={singleProduct.reviews} />
                    </p>
                    <div className='MRP'>
                        MRP <del>₹{singleProduct.price / 10 + singleProduct.price}</del>
                    </div>

                    <p className="price">
                        Deal of the Day: <span>₹{singleProduct.price}</span>
                    </p>
                    <p className="description">
                        {singleProduct.description}
                    </p>
                    <p className="stock">
                        Available : <span className='bold'>In Stock
                        </span>
                    </p>
                    <p className="brand">
                        Brand: <span className='bold'>
                            {singleProduct.company}
                        </span>
                    </p>
                    <div className="quantityToggler">
                        <div className=" quantitybtn" onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }}>
                            <FaMinus />
                        </div>
                        <p>{quantity}</p>
                        <div className=" quantitybtn" onClick={() => {
                            if (quantity < singleProduct.stock) {
                                setQuantity(quantity + 1);
                            }
                        }
                        }>
                            <FaPlus />
                        </div>
                    </div>

                    <button className="btn" onClick={() => {
                        addToCart({ ...singleProduct, quantity })
                        Navigate('/cart')
                    }}>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className="singleProducts_related_Data">

                {singleProduct.relatedData.length > 0 ?
                    <ProductSections height={"150px"} headingName='Related Data' Data={singleProduct.relatedData} showBtn={false} />
                    : ""
                }
            </div>
        </>
    )
}

export default SingleProduct
