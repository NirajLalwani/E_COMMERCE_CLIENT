import React from 'react'
import { NavLink } from 'react-router-dom'

import Card from './Card'
const ProductSections = ({ height, width, headingName, Data, showBtn }) => {

    return (
        <>
            <div className="feature-container container">
                <div className="heading">
                    <h2 className='feature-Heading common-heading'>{headingName}</h2>
                    {
                        showBtn ?
                            <div>
                                <NavLink className='btn btnGrandient' to='/products'>View All</NavLink>
                            </div> : ""
                    }


                </div>
                <div className="feature-cards">
                    {Data.map((currentProduct) => {
                        return (<>
                            <Card height={height} name={currentProduct.name} price={currentProduct.price} imgUrl={currentProduct.images[0]} productId={currentProduct._id} width={width} />
                        </>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
ProductSections.defaultProps = {
    height: 'auto',
    width: "auto",
    showBtn: 'true'
}

export default ProductSections
