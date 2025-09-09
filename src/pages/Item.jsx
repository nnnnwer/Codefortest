import "../Styles/Item.css";
import { useCart } from "../context/CartContext";

export default function Item({ id, name, price, image }) {
  const { formatMoney, addToCart } = useCart();
  
  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="card-container">
        <p className="name">{name}</p>
        <p className="price">Price: {formatMoney(price)} Kip</p>
        <button
          className="b-7"
          onClick={() => addToCart({ id, name, price, image })}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
