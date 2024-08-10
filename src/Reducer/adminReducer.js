const reducer = (state, action) => {

    if (action.type === "SET_EDIT_LOADING") {
        return {
            ...state,
            isEditLoading: true
        };
    }
    if (action.type === "SET_EDIT_NOT_LOADING") {
        return {
            ...state,
            isEditLoading: false
        };
    }

    if (action.type === "ADMIN_SEARCH_FILTER") {

        let temp = state.products;
        temp = temp.filter((curr) => {
            return curr.name.toLowerCase().includes(action.payload.toLowerCase()) || curr.price.toString().includes(action.payload) || curr.category.toLowerCase().includes(action.payload.toLowerCase())
        })
        return {
            ...state,
            adminFilterProducts: temp
        }
    }

    if (action.type === "SET_EDIT_PRODUCT") {

        var SingleData = action.payload.products.find((currElem) => currElem._id === action.payload._id)
        return {
            ...state,
            EditProductsData: SingleData,
            isEditLoading: false
        };
    }

    if (action.type === "SET_NAME") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                name: action.payload
            }
        }
    }


    if (action.type === "SET_PRICE") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                price: action.payload
            }
        }
    }


    if (action.type === "SET_STOCK") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                stock: action.payload
            }
        }
    }


    if (action.type === "SET_DESCRIPTION") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                description: action.payload
            }
        }
    }


    if (action.type === "SET_CATEGORY") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                category: action.payload
            }
        }
    }


    if (action.type === "SET_COMPANY") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                company: action.payload
            }
        }
    }


    if (action.type === "SET_RATINGS") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                ratings: action.payload
            }
        }
    }


    if (action.type === "SET_REVIEWS") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                reviews: action.payload
            }
        }
    }


    if (action.type === "SET_NEWLY_LAUNCHED") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                isNewlyLaunched: state.EditProductsData.isNewlyLaunched ? false : true
            }
        }
    }


    if (action.type === "SET_FEATURED") {
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                isFeatured: state.EditProductsData.isFeatured ? false : true
            }
        }
    }
    if (action.type === "REMOVE_IMAGE") {
        let temp = state.EditProductsData.images;
        temp.splice(action.payload, 1);
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                images: temp
            }
        }
    }


    if (action.type === "ADD_IMAGE") {
        let temp = state.EditProductsData.images;
        temp.push(action.payload)
        return {
            ...state,
            EditProductsData: {
                ...state.EditProductsData,
                images: temp
            }
        }
    }


    if (action.type === "SET_MESSAGES") {
        return {
            ...state,
            allMessages: action.payload
        }
    }


    if (action.type === "SET_USERS") {
        return {
            ...state,
            allUsers: action.payload

        }
    }


    if (action.type === "MAKE_REMOVE_ADMIN") {
        let temp = state.allUsers;
        temp[action.payload.index].isAdmin = temp[action.payload.index].isAdmin ? false : true;
        return {
            ...state,
            allUsers: temp
        }
    }
    if (action.type === "DELETE_USER") {
        let temp = state.allUsers;
        temp.splice(action.payload.index, 1);
        return {
            ...state,
            allUsers: temp
        }
    }


    if (action.type === "DELETE_MESSAGE") {
        let temp = state.allMessages;
        temp.splice(action.payload.index, 1);
        return {
            ...state,
            allMessages: temp
        }
    }

    if (action.type === "DELETE_PRODUCT") {
        let temp = state.adminFilterProducts
        temp.splice(action.payload, 1)
        return {
            ...state,
            adminFilterProducts: temp
        }
    }











    return state;


}

export default reducer;