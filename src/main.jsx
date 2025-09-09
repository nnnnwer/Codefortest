import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import {router} from './router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Header from './components/Header.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    
   
    
    
    
    
    <AuthContextProvider>   
      
      <RouterProvider router={router}/>
       
    </AuthContextProvider>

      
    
    

    </>
    
    
  </StrictMode>,
)
