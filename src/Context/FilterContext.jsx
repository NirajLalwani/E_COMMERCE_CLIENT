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
        isFilterLoading: true,
        filters: {
            sortBy: '',
            search: ""
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)


    const setSortValue = (e) => {

        dispatch({ type: "SET_SORT_VALUE", payload: e.target.value })
    }


    const setSearchFilter = (e) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload: (e.target.value).trim() })
    }

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS" })
    }, [state.filters])

    return (
        <filterContext.Provider value={{ ...state, setSortValue, setSearchFilter }}>
            {children}
        </filterContext.Provider>
    )
}

const useFilterContext = () => {
    return useContext(filterContext)
}

export default FilterContext
export { useFilterContext };