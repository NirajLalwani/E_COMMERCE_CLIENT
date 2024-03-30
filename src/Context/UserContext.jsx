import React, { createContext, useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../services/baseurl';
const context = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  const [token, setToken] = useState(localStorage.getItem('token'));

  const [isLogin, setIsLogin] = useState(false);

  const getUserData = async () => {
    const response = await fetch(`${BASE_URL}/api/users/getdata`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    const data = await response.json()
    if (response.status === 200) {
      setUserData(data.data);
      setIsLogin(true);
    } else {
      setUserData({});
      setIsLogin(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [localStorage.getItem('token')])



  return (
    <context.Provider value={{ getUserData, isLogin, userData, setIsLogin, setToken, setUserData }}>
      {children}
    </context.Provider>
  )
}


export const useUserContext = () => {
  return useContext(context)
}

export default UserContext