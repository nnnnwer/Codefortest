import React from "react";
import { useCart } from "../../context/CartContext"
import { useState, useEffect } from "react";
import "../../Styles/Order.css";
import CartPage from "./CartPage";
import { apiGet } from "../../Api/Api";
import { tokenLoader } from "../../Api/Authen";
import { redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ImageWithFallback1 from "../../components/ImageWithFallback1";
import Grid from "@mui/material/Grid";

 
export default function OrderPage() {
  const { addToCart, amount } = useCart();
  const [showCart, setShowCart] = useState(false);
  const { productdata,limit, page } = useLoaderData();

  const {formatMoney } = useCart();
  console.log('page',page)
  const navigate = useNavigate()
  console.log("product", productdata);
  console.log("Productdata", productdata.data);
  console.log("Pagination" , productdata.pagination)
  // const filteredProducts = Array.isArray(products)
  //   ? products.filter((p) => p.category === productName)
  //   : [];
  const handleChangePagination= (newpage)=>{
    navigate(`/order?page=${newpage}&limit=${limit}`);
  }
  return (
    <>
      <button className="cart-btn" onClick={() => setShowCart(true)}>
        Cart ({amount})
      </button>

      {showCart && (
        <div className="cart-modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowCart(false)}>
              X
            </button>

            <CartPage />
          </div>
        </div>
      )}

      <div className="productpage-page">
         <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={{ xs: 2, md: 3 }} className="card-list">
        {productdata.data.map((products,index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md:2 }}>
            <div key={products.id} className="product-card">
              <ImageWithFallback1         
                src={`${import.meta.env.VITE_HTTP_URL}/image/${products.image}`}
                alt={products.name}
              />

              <h2 className="product-cardsss">{products.name}</h2>
              <p>Price: {formatMoney(products.price)} Kip</p>
              {/* <p>{products.description}</p> */}
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(products)}
              >
                Add To Cart
              </button>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
        {/* <div className="card-list">
          {productdata.data.map((products) => (
            <div key={products.id} className="product-card">
              <ImageWithFallback1
                src={`${import.meta.env.VITE_HTTP_URL}/image/${products.image}`}
                alt={products.name}
              />

              <h2 className="product-cardsss">{products.name}</h2>
              <p>Price: {formatMoney(products.price)} Kip</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(products)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div> */}
        <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          className="paginationpage"
          count={productdata.pagination.totalPages}
          page={Number(page) || 1}
          onChange={(e,value)=> handleChangePagination(value)}
          color="primary" 
        />
         </Box>
        
      </div>
    </>
  );
}

// console.log("VITE_API_URL", tokenLoader());
export async function loaderOrderPage({request}) {
  const token = tokenLoader();
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 10

  try {
    // console.log("products", products);
    // if(!token){
    //   return redirect('/signin')
    // }
    const productdata = await apiGet(`/api/v1/product?page=${page}&limit=${limit}`, token);
    
    return { productdata, page , limit };
  } catch (error) {
    console.log(error);
  }
}
