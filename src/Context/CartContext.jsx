import React, { useContext, createContext, useReducer, useCallback, useEffect } from 'react'
import reducer from '../Reducer/cartReducer';
const cartContext = createContext();
const CartContext = ({ children }) => {

    const initialState = {
        cart: (JSON.parse(localStorage.getItem("AddToCartData"))) ? (JSON.parse(localStorage.getItem("AddToCartData"))) : [],
        total: 0
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = ({ _id, name, quantity, price, images, stock }) => {
        const newData = { _id, name, quantity, price, images, stock };
        console.log(newData)
        dispatch({ type: "ADD_NEW_DATA", payload: newData })
        localStorage.setItem("AddToCartData", JSON.stringify(state.cart))
        dispatch({ type: "SET_TOTAL" })
    }

    const increaseQuantity = (index) => {
        dispatch({ type: "INCREASE_QUANTITY", payload: index })
        localStorage.setItem("AddToCartData", JSON.stringify(state.cart))
        dispatch({ type: "SET_TOTAL" })

    }
    const decreaseQuantity = (index) => {
        dispatch({ type: "DECREASE_QUANTITY", payload: index })
        localStorage.setItem("AddToCartData", JSON.stringify(state.cart))

        dispatch({ type: "SET_TOTAL" })
    }

    const removeItem = (index) => {
        dispatch({ type: "REMOVE_ITEM", payload: index })
        dispatch({ type: "SET_TOTAL" })

    }
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "SET_TOTAL" })
    }

    useEffect(() => {
        dispatch({ type: "SET_TOTAL" })
        localStorage.setItem("AddToCartData", JSON.stringify(state.cart))
    }, [state.cart])


    return (
        <cartContext.Provider value={{ ...state, addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart }}>
            {children}
        </cartContext.Provider>
    )

}

const useCart = () => {
    return useContext(cartContext)
}

export default CartContext
export { useCart };
