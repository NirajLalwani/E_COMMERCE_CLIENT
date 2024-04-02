import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
const AppContext = createContext()
import { BASE_URL } from '../../services/baseurl';

import ProductReducer from "../Reducer/productReducer"

const ProductContext = ({ children }) => {

    const API = `${BASE_URL}/api/products/data`;
    
    const initialState = {
        isLoading: true,
        isError: false,
        products: false,
        featureProducts: [],
        newlyLaunchedProducts: [],
        isSingleLoading: true,
        singleProduct: false,
        BigImage: ""
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const getProducts = async (URL) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await fetch(URL);
            const products = await res.json();
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (err) {
            console.log("ProductContext.jsx", err)
            dispatch({ type: "API_ERROR" })
        }
    }

    const setSingleProduct = (_id) => {
        dispatch({ type: "SET_SINGLE_LOADING", payload: state.products })
        dispatch({ type: "SET_SINGLE_PRODUCT", payload: { products: state.products, _id } })

        return state.singleProduct
    }

    const next = () => {
        dispatch({ type: "SET_NEXT_IMAGE" })
    }
    const previous = () => {
        dispatch({ type: "SET_PREVIOUS_IMAGE" })
    }
    const setBigImage = (url) => {
        dispatch({ type: "SET_BIG_IMAGE", payload: url })

    }
    useEffect(() => {
        const fetchData = async () => {
           
            await getProducts(API);
        };
        fetchData();
    }, [])






    return <AppContext.Provider value={{ ...state, setSingleProduct, setBigImage, next, previous, }}>
        {children}
    </AppContext.Provider>
}

const useProductContext = () => {
    return useContext(AppContext);
}

export default ProductContext
export { useProductContext };



