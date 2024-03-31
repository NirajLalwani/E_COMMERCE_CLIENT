import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useFilterContext } from '../Context/FilterContext'
const Filters = () => {
    const { getCategory, setFilters, filters, clearFilters } = useFilterContext();


    const category = getCategory()
    return (
        <>
            <div className="filters_container">
                <div className="close" onClick={() => {
                    let filter = document.querySelector('.filters_container');
                    filter.style.top = '-30rem'
                }}>
                    <IoMdClose />
                </div>
                <div>
                    <p>Price</p>
                    <select name="sortBy" id="" onChange={setFilters}  value={filters.sortBy}>
                        <option value={false}>Sort By</option>
                        <option value="low-high">low-high</option>
                        <option value="high-low">high-low</option>
                        <option value="a-z">a-z</option>
                        <option value="z-a">z-a</option>
                    </select>
                </div>
                <div>
                    <p>Category</p>
                    <select name="category" id="" onChange={setFilters}  value={filters.category}>
                        <option value={false}>All</option>
                        {
                            category.map(curr => {
                                return (<>
                                    <option value={curr}>{curr}</option>
                                </>)
                            })
                        }

                    </select>
                </div>
                <div>
                    <p>
                        Price Less Than :
                    </p>
                    <input type="number" onInput={setFilters} name="priceLessThan"
                        value={filters.priceLessThan}  />
                </div>
                <div>
                    <button className="btn red" onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
        </>
    )
}

export default Filters
