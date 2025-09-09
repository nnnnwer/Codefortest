import React from 'react';
import Header from './Header'; 
import { Outlet, useLocation } from 'react-router-dom'; 
import { CartProvider } from '../context/CartContext'; 
import "../Styles/RootLayout.css"
const RootLayout = () => {

  const location = useLocation();
  const hideHeaderPaths = ['/signin', '/signup'];
  return (
    <CartProvider>
     {!hideHeaderPaths.includes(location.pathname) && <Header />}  
      <main>
        <Outlet /> 
      </main>
    </CartProvider>
  );
};

export default RootLayout;
