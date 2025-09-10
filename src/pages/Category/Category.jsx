import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import "../../Styles/Category.css";
import { apiGet } from "../../Api/Api";
import { tokenLoader } from "../../Api/Authen";
import React, {  useState } from "react";
import Delete from "../../components/Delete";
import Edit from "../../components/Edit";
import Button from "@mui/material/Button";
import EditCategory from "../../components/EditCategory";
import DeleteCategory from "../../components/DeleteCategory";

export default function Category() {
  const { productdata } = useRouteLoaderData("category");
  // const [categories ] = useState(productdata.data || []);
  const categories = productdata.data;
  console.log("Categories:", categories);
  
  return (
    <div className="category-new-page">
      <h1>Categories </h1>
      <Link to="/categorycreate" className="B-C">
        <Button variant="contained">Create</Button>
      </Link>
      <div className="category-new-list">
        {categories.map((category) => (
          <div key={category.id} className="category-new-card">
            <h4 className="category-new-title">{category.name}</h4>
            <p>ID: {category.id}</p>

            <div className="card-buttons1">
            <DeleteCategory id={category.id}/>
            <EditCategory id={category.id} onEditCategory={category}/>
            </div> 

         </div>
        ))}
      </div>
    </div>
  );
}

export async function loaderCategoryPage() {
  const token = tokenLoader();
  try {
    const productdata = await apiGet("/api/v1/category", token);
    return { productdata };
  } catch (error) {
    console.error("Failed ",error);
    // return { productdata: { data: [] } };
  }
}
