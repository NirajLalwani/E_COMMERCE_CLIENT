import React, { createContext, useContext, useEffect, useReducer } from 'react'
import Loading from '../components/Loading';
import reducer from '../Reducer/filterReducer';
import { useProductContext } from './ProductContext';
const filterContext = createContext();

const FilterContext = ({ children }) => {

    const { isLoading, products } = useProductContext();

    if (isLoading || !products) {
        return <Loading />
    }


    const initialState = {
        allProducts: products,
        filterProducts: products,
        adminFilterProducts: products,
        isFilterLoading: true,
        filters: {
            sortBy: false,
            search: false,
            priceLessThan: false,
            category: false,
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    if (!state) {
        return <Loading />
    }

    const getCategory = () => {
        const arrayWithDuplicates = [];
        state.allProducts.forEach(curr => arrayWithDuplicates.push(curr.category));
        const uniqueArray = [...new Set(arrayWithDuplicates)];

        return uniqueArray;
    }


    const setFilters = (e) => {
        dispatch({ type: "SET_FILTERS", payload: { value: e.target.value, name: e.target.name } })
    }


    const setSearchFilter = (e) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload: (e.target.value).trim() })
    }


    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }


    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS" })
    }, [state.filters])

    return (
        <filterContext.Provider value={{ ...state, setFilters, setSearchFilter, getCategory, clearFilters }}>
            {children}
        </filterContext.Provider>
    )
}

const useFilterContext = () => {
    return useContext(filterContext)
}

export default FilterContext
export { useFilterContext };