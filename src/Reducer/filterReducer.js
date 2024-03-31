const reducer = (state, action) => {


    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            var tempProducts = state.allProducts;
            switch (state.filters.sortBy) {
                case 'low-high':
                    tempProducts.sort((a, b) => a.price - b.price)
                    break;
                case 'high-low':
                    tempProducts.sort((b, a) => a.price - b.price)
                    break;
                case 'a-z':
                    tempProducts.sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                case 'z-a':
                    tempProducts.sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return 1;
                        }
                        if (nameA > nameB) {
                            return -1;
                        }
                        return 0;
                    });
                    break;

            }

            if (state.filters.search) {
                tempProducts = tempProducts.filter((curr) => curr.name.toUpperCase().includes(state.filters.search.toUpperCase()))
            }
            if (state.filters.priceLessThan) {
                tempProducts = tempProducts.filter((curr) => curr.price < state.filters.priceLessThan);
            }
            if (state.filters.category) {
                tempProducts = tempProducts.filter((curr) => curr.category === state.filters.category);
            }



            return {
                ...state,
                filterProducts: tempProducts,
                isFilterLoading: false,
            }
        case "SET_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value
                }
            }

        case "SET_SEARCH_VALUE":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.payload
                }
            }
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortBy: false,
                    category: false,
                    priceLessThan: false
                }
            }
    }

    return state
}

export default reducer