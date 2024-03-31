import React from 'react'
import { useProductContext } from '../Context/ProductContext'
import Card from '../components/Card'
import { useFilterContext } from '../Context/FilterContext'
import Loading from '../components/Loading'
import { MdOutlineExpandMore } from "react-icons/md";
import Filters from '../components/Filters'
const Products = () => {

  const { isLoading } = useProductContext();

  if (isLoading) {
    return <Loading />
  }

  const { filterProducts, setSearchFilter } = useFilterContext();

  return (
    <>
      <div className="section-products">
        <div className="container">
          <h2 className="common-heading">Our Products</h2>

          <div className="filters">
            <div className="search">
              <input type="text" placeholder='Search Products' onInput={setSearchFilter} />
            </div>
            <div className="items_count">
              Total Items {filterProducts.length}
            </div>

            <Filters />
            <div className="sort_by" onClick={() => {
              let filter = document.querySelector('.filters_container');
              filter.style.top = '10rem'
            }}>
              More Filters <MdOutlineExpandMore />
            </div>
          </div>

          <div className="products">
            {
              filterProducts.map(curr => {
                return (
                  <Card productId={curr._id} imgUrl={curr.images[0]} height="150px" name={curr.name} price={curr.price} />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
