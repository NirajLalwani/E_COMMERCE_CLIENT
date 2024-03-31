import React from 'react'
import { useProductContext } from '../Context/ProductContext'
import Card from '../components/Card'
import { useFilterContext } from '../Context/FilterContext'
import Loading from '../components/Loading'
const Products = () => {

  const { isLoading } = useProductContext();

  if (isLoading) {
    return <Loading />
  }

  const { filterProducts, setSortValue, setSearchFilter } = useFilterContext();

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
            <div className="sort_by">
              <select name="" id="" onChange={(e) => {

                setSortValue(e)
              }}>
                <option value="">Sort By</option>
                <option value="low-high">low-high</option>
                <option value="high-low">high-low</option>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
              </select>
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
