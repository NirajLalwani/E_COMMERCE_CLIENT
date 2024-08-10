import React from 'react'
import { useUserContext } from '../Context/UserContext'
import { NavLink, Outlet } from 'react-router-dom';
import Error from '../pages/Error';

const AdminNavbar = () => {
    const { userData } = useUserContext();

    if (userData.isAdmin === false || userData.isAdmin === undefined) {
        return <Error />
    }

    return (<>
        <section className='section-admin-navbar'>
            <nav className='container'>
                <ul>
                    <NavLink activeclassname='active' to={'/admin/users'}>Users</NavLink>
                    <NavLink activeclassname='active' to={'/admin/products'}>Products</NavLink>
                    <NavLink activeclassname='active' to={'/admin/messages'}>Messages</NavLink>
                </ul>
            </nav>
        </section>
        <Outlet />
    </>
    )
}

export default AdminNavbar
