const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_NEW_DATA":
            const newData = action.payload;
            newData.subTotal = newData.quantity * newData.price;

            const isPresentInCart = state.cart.find((current) => {
                return newData._id === current._id
            })

            if (isPresentInCart) {
                let index = state.cart.indexOf(isPresentInCart)
                let newQuantity = newData.quantity + state.cart[index].quantity
                if (newQuantity > newData.stock) {
                    newQuantity = newData.stock
                }
                state.cart[index].quantity = newQuantity;
                state.cart[index].subTotal = newQuantity * newData.price;
                return {
                    ...state
                }
            }

            return {
                ...state,
                cart: [
                    ...state.cart,
                    newData
                ]

            }

        case "INCREASE_QUANTITY":
            if (state.cart[action.payload].quantity < state.cart[action.payload].stock) {
                state.cart[action.payload].quantity += 1;
                state.cart[action.payload].subTotal = state.cart[action.payload].quantity * state.cart[action.payload].price;
            }
            return {
                ...state
            }
        case "DECREASE_QUANTITY":
            if (state.cart[action.payload].quantity > 1) {
                state.cart[action.payload].quantity -= 1;
                state.cart[action.payload].subTotal = state.cart[action.payload].quantity * state.cart[action.payload].price;
            }
            return {
                ...state
            }

        case "REMOVE_ITEM":

            state.cart.splice(action.payload, 1);
            localStorage.setItem("AddToCartData", JSON.stringify(state.cart))

            return {
                ...state
            }

        case "SET_TOTAL":
            let totalVal = 0;
            state.cart.forEach((current) => {
                totalVal += (+current.subTotal)
            })

            return {
                ...state,
                total: totalVal
            }
        case "CLEAR_CART":
            localStorage.setItem("AddToCartData", "[]")
            return {
                total: 0,
                cart: []
            }
    }
    return state;
}

export default reducer;