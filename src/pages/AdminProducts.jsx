import React from 'react'
import { Link } from 'react-router-dom';
import { useAdminContext } from '../Context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../services/baseurl';
import { useUserContext } from '../Context/UserContext';
const AdminProducts = () => {
    const { adminFilterProducts, filterAdminProducts, DeleteProduct } = useAdminContext();
    const { userData } = useUserContext();


    return (

        <>
            <section className='Asection-admin-products mt-10'>
                <div className="container">
                    <div className="heading">
                        <h2 className='feature-Heading common-heading'>Products</h2>
                    </div>

                    <div className="Admin_Products_filters">
                        <div className="search">
                            <input type="text" placeholder='Search Products' onChange={filterAdminProducts} />
                        </div>
                        <div className="items_count display-none">
                            Total Products {adminFilterProducts.length}
                        </div>


                        <div>
                            <Link className='admin_btn' to='/admin/product/addNew'>Add New Product</Link>
                        </div>

                    </div>

                    <div className="table-container">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminFilterProducts.map((curr, index) => {
                                        return (

                                            <tr>
                                                <td>
                                                    <div className="td-img">
                                                        <img src={curr.images[0]} alt="Product Image" width={'55px'} className="product-image" />
                                                    </div>
                                                </td>
                                                <td>{curr.name}</td>
                                                <td>₹{curr.price}</td>
                                                <td><Link to={`/admin/product/edit/${curr._id}`} className="edit-button">Edit</Link></td>
                                                <td>
                                                    <button className="delete-button" onClick={async () => {
                                                        const res = await fetch(`${BASE_URL}/api/products/data/delete/${curr._id}/${userData._id}`, {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            },
                                                        })
                                                        const data_ = await res.json()
                                                        if (res.ok) {
                                                            DeleteProduct(index);
                                                            toast.success(data_.Message)
                                                            return true;
                                                        }
                                                        toast.error(data_.error)
                                                    }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default AdminProducts
