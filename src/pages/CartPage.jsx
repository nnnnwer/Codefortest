import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../Styles/CartPage.css";
import ImageWithFallback from "../components/ImageWithFallback";

export default function CartPage() {
  const {
    cartItems,
    amount,
    total, 
    formatMoney,
    addQuantity,
    subTractQuantity,
    removeItem,
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
          <h1 style={{ textAlign: "center" }}>
            Total Price : {formatMoney(total)} kip
          </h1>

          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                 <ImageWithFallback
                src={`${import.meta.env.VITE_HTTP_URL}/image/${item.image}`}
                alt={item.name}
              />
                <div>
                  <p>{item.name}</p>
                  <p>{formatMoney(item.price)} kip</p>
                  <div className="quantity-control">
                    <button onClick={() => addQuantity(item.id)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => subTractQuantity(item.id)}>-</button>
                  </div>
                  <p>Total: {formatMoney(item.price * item.quantity)} kip</p>
                  <button className="remove-1" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <button  className="P-1" onClick={handlePay} >
            Pay
          </button>
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
