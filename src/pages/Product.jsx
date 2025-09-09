import { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import "../Styles/Product.css";
import ImageWithFallback from "../components/ImageWithFallback";
import Pagination from "@mui/material/Pagination";
import { tokenLoader } from "../Api/Authen";
import { apiGet } from "../Api/Api";
import Box from "@mui/material/Box";
import { useCart } from "../context/CartContext";
import TextField from "@mui/material/TextField";

export default function Product({ productName }) {
  const { productdata, limit, page } = useRouteLoaderData("product");
  const [products, setProducts] = useState(productdata?.data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const { formatMoney } = useCart();

  console.log("productssss", products);
  const navigate = useNavigate();
  console.log("Productdata", productdata.data);
  console.log("Pagination", productdata.pagination);
  const handleChangePagination = (newpage) => {
    navigate(`/product?page=${newpage}&limit=${limit}`);
  };

  const filteredProducts = productdata.data.filter(
    (p) =>
      (!productName || p.category === productName) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">
      <h1>{productName || "All Products"}</h1>

      <div className="search-bar">
        <TextField type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} size="small"/>
        {/* <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        /> */}

        <Link to="/food" className="B-F">
          <Button variant="contained">Create Product</Button>
        </Link>
      </div>

      <div className="Tabs-1">
        <p></p>
        <p>name</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Description</p>
        <p>Category</p>
        <p></p>
      </div>

        <div className="card-list-horizontal">
     
       {filteredProducts.map((product) => (
          // <div key={product.id} className="card-horizontal">
          <div className="Tabs-2">
            <ImageWithFallback
            // className="tablist"      
              src={`${import.meta.env.VITE_HTTP_URL}/image/${product.image}`}
              alt={product.name}
            />
            {/* <div className="card-info"> */}
              <h4 className="tablist">{product.name}</h4>
              <p className="tablist">{formatMoney(product.price)} Kip</p>
              <p className="tablist"> {product.stock}</p>
              <p className="tablist">{product.description}</p>
              <p className="tablist">{product.category !== null ? product.category.name : ""}</p>
            {/* </div> */}
            <div className="tablist">
              <Delete
                id={product.id}
                // onDeleted={(deletedId) => setProducts(productdata.filter((p) => p.id !== deletedId))
                // }
              />
              <Edit id={product.id} onEdited={product} />
            </div>
           
            </div>
          // </div>
        ))}
      
      </div>

      {/* <div className="card-list-horizontal">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card-horizontal">
            <ImageWithFallback
              src={`${import.meta.env.VITE_HTTP_URL}/image/${product.image}`}
              alt={product.name}
            />
            <div className="card-info">
              <h4>{product.name}</h4>
              <p>{formatMoney(product.price)} Kip</p>
              <p> {product.stock}</p>
              <p>{product.description}</p>
              <p>{product.category !== null ? product.category.name : ""}</p>
            </div>
            <div className="card-buttons">
              <Delete
                id={product.id}
                // onDeleted={(deletedId) => setProducts(productdata.filter((p) => p.id !== deletedId))
                // }
              />
              <Edit id={product.id} onEdited={product} />
            </div>
          </div>
        ))}
      </div> */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={productdata.pagination.totalPages}
          page={Number(page) || 1}
          onChange={(e, value) => handleChangePagination(value)}
          color="primary"
        />
      </Box>
    </div>
  );
}

export async function loaderProductPage({ request }) {
  const token = tokenLoader();
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 10;
  try {
    const productdata = await apiGet(
      `/api/v1/product?page=${page}&limit=${limit}`,
      token
    );
    return { productdata, page, limit };
  } catch (error) {
    console.log("Failed to load products:", error);
  }
}
