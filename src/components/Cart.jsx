import Item from "../pages/Item.jsx";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import CartPage from "../pages/CartPage";
import "../Styles/Cart.css";
export default function Cart() {
  const { product, total, formatMoney, amount } = useCart();
  const [showCart, setShowCart] = useState(false);
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
      <div className="cart-grid">
        {/* <h1 style={{textAlign:"center"}}>
                {product.length > 0 ? `TotalPrice: ${formatMoney(total)} kip` : "Don't have product"}
                
            </h1> */}
        {product.map((data) => {
          return <Item key={data.id} {...data} />;
        })}
      </div>{" "}
    </>
  );
}
