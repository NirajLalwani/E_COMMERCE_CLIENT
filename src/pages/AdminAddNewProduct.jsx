import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL } from '../../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../Context/UserContext';
const AdminAddNewProduct = () => {


    const { userData } = useUserContext()

    const [data, setData] = useState(
        {

            images: [
            ],
            stock: 50,
            name: "",
            price: 0,
            description: "",
            isFeatured: false,
            category: "",
            company: "",
            ratings: 4.5,
            reviews: 32,
            isNewlyLaunched: false,
        }
    )

    const handleOnChange = (e) => {
        var { name, value } = e.target
        if (name == "price" || name == "stock" || name == "ratings" || name == "reviews") {
            value = +value
        }
        setData({
            ...data,
            [name]: value
        })
    }

    const deleteImage = (index) => {

    }

    const addImage = (e) => {
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
                    let temp = data.images
                    temp.push(resData.url)
                    setData({
                        ...data,
                        images: temp
                    })
                })
            }).catch(error => console.log("ERROR IN IMAGE UPLOAD" + error))
        })
    }


    return (
        <>
            <section className='section-edit-product'>
                <div className="container">

                    <div className="heading">
                        <h2 className='feature-Heading common-heading'>Add Product</h2>
                    </div>

                    <div className="data">
                        <div className="images_add_images">
                            <div className="images">
                                {
                                    data.images.map((curr, index) => {
                                        return (

                                            <div className="image" key={index}>
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
                            <input
                                name='name'
                                type="text" value={data.name} onChange={handleOnChange} />
                        </div>
                        <div className="data_div price">
                            <p>Price</p>
                            <input
                                name='price'
                                type="number" value={data.price} onChange={handleOnChange} />
                        </div>
                        <div className="data_div stock">
                            <p>Stock</p>
                            <input
                                name='stock'
                                type="number" value={data.stock} onChange={handleOnChange} />
                        </div>
                        <div className="data_div desc">
                            <p>Description</p>
                            <input
                                name='description'
                                type="text" value={data.description} onChange={handleOnChange} />
                        </div>
                        <div className="data_div category">
                            <p>Category</p>
                            <input
                                name='category'
                                type="text" value={data.category} onChange={handleOnChange} />
                        </div>
                        <div className="data_div company">
                            <p>Company</p>
                            <input
                                name='company'
                                type="text" value={data.company} onChange={handleOnChange} />
                        </div>
                        <div className="data_div ratings">
                            <p>Ratings</p>
                            <input
                                name='ratings'
                                type="number" value={data.ratings} onChange={handleOnChange} />
                        </div>
                        <div className="data_div reviews">
                            <p>Reviews</p>
                            <input
                                name='reviews'
                                type="number" value={data.reviews} onChange={handleOnChange} />
                        </div>
                        <div className="data_div isNewlyLaunched">
                            <div className='checkbox'>NewLaunched
                                <input
                                    name='isNewlyLaunched'
                                    type="checkbox" value={data.isNewlyLaunched} onChange={() => {
                                        setData({
                                            ...data,
                                            isNewlyLaunched: data.isNewlyLaunched ? false : true
                                        })
                                    }} />
                            </div>
                        </div>
                        <div className="data_div isFeatured">
                            <div className='checkbox'>Featured
                                <input
                                    name='isFeatured'
                                    type="checkbox" value={data.isFeatured} onChange={() => {
                                        setData({
                                            ...data,
                                            isFeatured: data.isFeatured ? false : true
                                        })
                                    }} className="" />
                            </div>
                        </div>

                        <div className="admin_btn" onClick={async () => {
                            const res = await fetch(`${BASE_URL}/api/products/data/add`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": 'application/json'
                                },
                                body: JSON.stringify({ data, _id: userData._id })
                            })
                            const data_ = await res.json()
                            if (res.ok) {
                                toast.success(data_.Message)
                                setData({
                                    images: [
                                    ],
                                    stock: 50,
                                    name: "",
                                    price: 0,
                                    description: "",
                                    isFeatured: false,
                                    category: "",
                                    company: "",
                                    ratings: 4.5,
                                    reviews: 32,
                                    isNewlyLaunched: false,

                                })
                                return true;
                            }
                            toast.error(data_.error)
                        }}>
                            Add Product
                        </div>

                    </div>
                </div>
            </section >
            <ToastContainer />
        </>
    )
}

export default AdminAddNewProduct
