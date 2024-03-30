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

            tempProducts = tempProducts.filter((curr) => curr.name.toUpperCase().includes(state.filters.search.toUpperCase()))

            return {
                ...state,
                filterProducts: tempProducts,
                isFilterLoading: false,
            }
        case "SET_SORT_VALUE":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortBy: action.payload
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
    }

    return state
}

export default reducer