import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useProductContext } from './ProductContext'
import { useUserContext } from './UserContext'
import { BASE_URL } from '../../services/baseurl'
import AdminReducer from '../Reducer/adminReducer'



const AppContext = createContext()
const AdminContext = ({ children }) => {
    const { products } = useProductContext()
    const { userData } = useUserContext()


    const initialState = {
        products,
        adminFilterProducts: products,
        EditProductsData: false,
        allUsers: [],
        allMessages: [],
        isEditLoading: true,
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);

    const filterAdminProducts = (e) => {
        dispatch({ type: "ADMIN_SEARCH_FILTER", payload: (e.target.value).trim() })
    }


    const setEditProductsData = (_id) => {
        dispatch({ type: "SET_EDIT_LOADING" })
        dispatch({ type: "SET_EDIT_PRODUCT", payload: { products: state.products, _id } })
    }

    const getMessages = async () => {
        const response = await fetch(`${BASE_URL}/api/contacts/getMessages/${userData._id}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const data = await response.json();
        dispatch({ type: "SET_MESSAGES", payload: data.allMessages })
    }

    const getUsers = async () => {
        const response = await fetch(`${BASE_URL}/api/users/getUsers/${userData._id}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const data = await response.json();
        console.log(data.allUsers)
        dispatch({ type: "SET_USERS", payload: data.allUsers })
    }


    const setName = (e) => {
        dispatch({ type: "SET_NAME", payload: e.target.value })
    }

    const setPrice = (e) => {
        dispatch({ type: "SET_PRICE", payload: e.target.value })
    }

    const setStock = (e) => {
        dispatch({ type: "SET_STOCK", payload: e.target.value })
    }

    const setDescription = (e) => {
        dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
    }
    const setCategory = (e) => {
        dispatch({ type: "SET_CATEGORY", payload: e.target.value })
    }

    const setCompany = (e) => {
        dispatch({ type: "SET_COMPANY", payload: e.target.value })
    }

    const setRatings = (e) => {
        dispatch({ type: "SET_RATINGS", payload: e.target.value })
    }

    const setReviews = (e) => {
        dispatch({ type: "SET_REVIEWS", payload: e.target.value })
    }

    const setNewlyLaunched = (e) => {
        dispatch({ type: "SET_NEWLY_LAUNCHED", })
    }

    const setFeatured = (e) => {
        dispatch({ type: "SET_FEATURED" })
    }
    const deleteImage = (index) => {
        dispatch({ type: "REMOVE_IMAGE", payload: index })
    }

    const addImage = (e) => {
        dispatch({ type: "SET_EDIT_LOADING" })
        Array.from(e.target.files).map((curr) => {
            const Data = new FormData();
            Data.append("file", curr)
            Data.append("upload_preset", "Chat-App");
            Data.append("cloud-name", "dwxgjvnhc");
            fetch("https://api.cloudinary.com/v1_1/dwxgjvnhc/image/upload", {
                method: 'POST',
                body: Data
            }).then((res) => {
                res.json().then((resData) => {
                    dispatch({ type: "ADD_IMAGE", payload: resData.url })
                })
            }).catch(error => console.log("ERROR IN IMAGE UPLOAD"))
        })
        dispatch({ type: "SET_EDIT_NOT_LOADING" })
    }

    const Make_Remove_Admin = async (user, index) => {
        if (user._id !== userData._id) {
            let conf = confirm(`Are You Sure To ${user.isAdmin ? "Remove" : "Make"} ${user.name} As Admin`)
            if (conf) {
                dispatch({ type: "MAKE_REMOVE_ADMIN", payload: { user, index } })
                const res = await fetch(`${BASE_URL}/api/users/updateIsAdmin/${user._id}/${userData._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
        } else {
            alert("You Cannot Remove Yourself As Admin");
        }
    }
    const DeleteUser = async (user, index) => {
        if (user._id !== userData._id) {
            let conf = confirm(`Are You Sure To Delete ${user.name}'s Account`)
            if (conf) {
                dispatch({ type: "DELETE_USER", payload: { user, index } })
                await fetch(`${BASE_URL}/api/users/deleteUser/${user._id}/${userData._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
        } else {
            alert("You Cannot Delete Your Account");
        }
    }
    const DeleteMessage = async (message, index) => {
        let conf = confirm(`Are You Sure To Delete Message`);
        if (conf) {
            dispatch({ type: "DELETE_MESSAGE", payload: { message, index } })
            await fetch(`${BASE_URL}/api/contacts/deleteMessage/${message._id}/${userData._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }


    const DeleteProduct = (index) => {
        dispatch({ type: "DELETE_PRODUCT", payload: index })
    }

    useEffect(() => {
        if (userData._id) {
            getMessages();
            getUsers();
        }
    }, [userData])

    return <AppContext.Provider value={{
        ...state,
        filterAdminProducts,
        setEditProductsData,
        Make_Remove_Admin,
        DeleteUser,
        DeleteMessage,
        DeleteProduct,
        setName,
        setPrice,
        setStock,
        setDescription,
        setCategory,
        setCompany,
        setRatings,
        setReviews,
        setNewlyLaunched,
        setFeatured,
        deleteImage,
        addImage
    }}>
        {children}
    </AppContext.Provider>
}

const useAdminContext = () => {
    return useContext(AppContext);
}

export default AdminContext
export { useAdminContext }