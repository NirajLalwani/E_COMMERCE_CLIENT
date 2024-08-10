import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import { AiOutlineDelete } from "react-icons/ai";
import { useAdminContext } from '../Context/AdminContext';
import { BASE_URL } from '../../services/baseurl';
import { useUserContext } from '../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
const AdminEditProducts = () => {

    const { setEditProductsData, EditProductsData, isEditLoading, setName,
        setPrice,
        setStock,
        setDescription,
        setCategory,
        setCompany,
        setRatings,
        setReviews,
        setNewlyLaunched,
        deleteImage,
        setFeatured,
        addImage

    } = useAdminContext();

    const { userData } = useUserContext();

    const { id } = useParams();
    useEffect(() => {
        setEditProductsData(id)
    }, [])

    if (isEditLoading) {
        return <Loading />
    }



    return (
        <>
            <section className='section-edit-product'>
                <div className="container">

                    <div className="heading">
                        <h2 className='feature-Heading common-heading'>Edit Product</h2>
                    </div>

                    <div className="data">
                        <div className="images_add_images">
                            <div className="images">
                                {
                                    EditProductsData.images.map((curr, index) => {
                                        return (

                                            <div className="image">
                                                <img src={curr} width={'100px'} alt="" />

                                                <AiOutlineDelete className='delete' onClick={() => { deleteImage(index) }} />

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className='admin_btn add_images'
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <input id='fileInput' type="file" multiple accept="image/*" onChange={addImage} />
                                Add Images</button>
                        </div>
                        <div className="data_div name">
                            <p>Name</p>
                            <input type="text" value={EditProductsData.name} onChange={setName} />
                        </div>
                        <div className="data_div price">
                            <p>Price</p>
                            <input type="number" value={EditProductsData.price} onChange={setPrice} />
                        </div>
                        <div className="data_div stock">
                            <p>Stock</p>
                            <input type="number" value={EditProductsData.stock} onChange={setStock} />
                        </div>
                        <div className="data_div desc">
                            <p>Description</p>
                            <input type="text" value={EditProductsData.description} onChange={setDescription} />
                        </div>
                        <div className="data_div category">
                            <p>Category</p>
                            <input type="text" value={EditProductsData.category} onChange={setCategory} />
                        </div>
                        <div className="data_div company">
                            <p>Company</p>
                            <input type="text" value={EditProductsData.company} onChange={setCompany} />
                        </div>
                        <div className="data_div ratings">
                            <p>Ratings</p>
                            <input type="number" value={EditProductsData.ratings} onChange={setRatings} />
                        </div>
                        <div className="data_div reviews">
                            <p>Reviews</p>
                            <input type="number" value={EditProductsData.reviews} onChange={setReviews} />
                        </div>
                        <div className="data_div isNewlyLaunched">
                            <div className='checkbox'>NewLaunched
                                <input type="checkbox" checked={EditProductsData.isNewlyLaunched} onChange={setNewlyLaunched} />
                            </div>
                        </div>
                        <div className="data_div isFeatured">
                            <div className='checkbox'>Featured
                                <input type="checkbox" checked={EditProductsData.isFeatured} onChange={setFeatured} className="" />
                            </div>
                        </div>

                        <div className="admin_btn" onClick={async () => {
                            const res = await fetch(`${BASE_URL}/api/products/data/update`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": 'application/json'
                                },
                                body: JSON.stringify({ data: EditProductsData, _id: userData._id })
                            })
                            const data_ = await res.json()
                            if (res.ok) {
                                toast.success(data_.Message)
                                return true;
                            }
                            toast.error(data_.error)
                        }}>
                            Save Changes
                        </div>

                    </div>
                </div>
            </section >
            <ToastContainer />
        </>
    )
}

export default AdminEditProducts
