import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import UserContext from './Context/UserContext.jsx'
import ProductContext from './Context/ProductContext.jsx'
import CartContext from './Context/CartContext.jsx'
import FilterContext from './Context/FilterContext.jsx'
import AdminContext from './Context/AdminContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <CartContext>
    <ProductContext>
      <FilterContext>
        <UserContext>
          <AdminContext >
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </AdminContext>
        </UserContext>
      </FilterContext>
    </ProductContext >
  </CartContext>
)
