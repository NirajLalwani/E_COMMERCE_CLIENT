import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserContext'
const Logout = () => {
    const Navigate = useNavigate();
    const { setIsLogin, setToken, setUserData } = useUserContext()
    useEffect(() => {
        localStorage.removeItem('token');
        setIsLogin(false);
        setToken(false);
        setUserData({});
        Navigate('/');
    }, [])
    return (
        <div>
            Logouting...
        </div>
    )
}

export default Logout
