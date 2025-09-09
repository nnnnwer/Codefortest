

import React from 'react';
import Item from './Item';
import { useCart } from '../context/CartContext';


export default function ProductList() {
    
    const { product  } = useCart();

    return (
        <div>
            <h2>Product List</h2>
            <div className="product-list-container">
                {product.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
           
        </div>
    );
}