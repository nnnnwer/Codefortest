import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../../Styles/CartPage.css";
import ImageWithFallback from "../../components/ImageWithFallback";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
export default function CartPage() {
  const {
    cartItems,
    amount,
    total,
    formatMoney,
    addQuantity,
    subTractQuantity,
    removeItem,
    deleteAllCart
  } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handlePay = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="cart-page">
      <p>Items in Cart: {amount}</p>

      {cartItems.length > 0 ? (
        <>


          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <ImageWithFallback
                  cartList="28%"
                  src={`${import.meta.env.VITE_HTTP_URL}/image/${item.image}`}
                  alt={item.name}
                />
                <div>
                  <p>{item.name}</p>
                  <p>{formatMoney(item.price)} kip</p>
                  <div style={{ display: 'flex', }}>
                    <div className="quantity-control">
                      <button onClick={() => addQuantity(item.id)}>+</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => subTractQuantity(item.id)}>-</button>
                    </div>
                    {/* <p>Total: {formatMoney(item.price * item.quantity)} kip</p> */}
                    <div>
                      {/* <button className="remove-1" >Remove</button> */}
                      <IconButton color="error" aria-label="add to shopping cart" onClick={() => removeItem(item.id)} sx={{ marginLeft: '60px' }}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div style={{ display: 'flex', textAlign: "center", justifyContent: 'space-between' }}>
            <p>Total Price : </p>
            <p>{formatMoney(total)} kip</p>

          </div>
          <Box sx={{ '& button': { m: 1 }, display: 'flex', justifyContent: 'space-between' }}>
            <Button fullWidth variant="outlined" color="error" onClick={deleteAllCart} >
              Delete
            </Button>
            <Button fullWidth variant="contained" color="success" onClick={handlePay} >
              Pay
            </Button>

          </Box>

        </>
      ) : (
        <h1 style={{ textAlign: "center" }}>Don't have product</h1>
      )}

      {showPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">✅ Pay Success</div>
        </>
      )}

    </div>
  );
}
