import React, { useEffect } from "react";
import UploadImage from "../../components/UploadImage";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import "../../Styles/Food.css";
import { apiGet, apiPost } from "../../Api/Api";
import { UserAuth } from "../../context/AuthContext";
import Category from "../Category/Category";
import Selectcategory from "../../components/Selectcategory"
import { tokenLoader } from "../../Api/Authen";
const Food = () => {
  const {category} = useLoaderData();
  console.log('dropp',category)
  const { session } = UserAuth();
  useEffect(() => {
    if (session) {
      console.log("Food session:", session);
    }
  }, [session]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");

    const fromData = new FormData(e.target);
    const body = {
      name: fromData.get("name"),
      price: fromData.get("price"),
      stock: fromData.get("stock"),
      description: fromData.get("description"),
      image: fromData.get("image"),
    };
    console.log(body);
  };

  return (
    <div>
      <Form className="f-2" method="post" action="/food" encType="multipart/form-data">
        <h1 className="hp-1">Create Product</h1>
        <div className="up-1">
          <UploadImage />
        </div>
        <input className="F-1" type="text" placeholder="Name" name="name" required/>
        <input className="F-1" type="number" placeholder="Price" name="price" required />
        <input className="F-1" type="text" placeholder="Stock" name="stock" required />
        <input
          className="F-2"
          type="text"
          placeholder="Description"
          name="description"
          required
        />

        <Selectcategory category={category.data} style={{ marginTop: '10px' }}/>
        <button className="b-1" type="submit" name="_action">
          Save
        </button>
      </Form>
    </div>
  );
};

export default Food;
export async function loaderDropdown({ request }) {
  const token = tokenLoader();
  // const url = new URL(request.url);
  // const page = url.searchParams.get("page") || 1;
  // const limit = url.searchParams.get("limit") || 10;
  try {
    const category = await apiGet(
      `/api/v1/category`,
      token
    );
    return { category};
  } catch (error) {
    console.log("Failed to load products:", error);
  }
}

export async function actionFood({ request }) {
  const formData = await request.formData();
  const data = new FormData();
  const file = formData.get("image");
  console.log('fileeeeeee',file)
  data.append("name", formData.get("name"));
  data.append("price", formData.get("price"));
  data.append("stock", formData.get("stock"));
  data.append("description", formData.get("description"));
  data.append("categoryId" , formData.get("categoryId"))
  if (file && file.size > 0) {
    data.append("image", file);
  }
  

  try {
    const token = localStorage.getItem("token");
    
    const response = await apiPost("/api/v1/product", data, true, token);
    console.log(response);
    return redirect("/product");
  } catch (error) {
    console.error(error);
  }
}
