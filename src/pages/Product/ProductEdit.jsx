import React from "react";
import { useLocation, Form ,redirect, useParams, useNavigate, useLoaderData} from "react-router-dom";
import UploadImage from "../../components/UploadImage";
import { apiGet, apiPut } from "../../Api/Api";
import { UserAuth } from "../../context/AuthContext";
import { tokenLoader } from "../../Api/Authen";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Selectcategory from "../../components/Selectcategory"
function ProductEdit() {
  const location = useLocation();
  const product = location.state?.onEdited;
  console.log("product in edit page:", product);
  const {category} = useLoaderData();
  const handleEdit = (e) => {
    
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
      <h1 className="hp-1">Edit Product</h1>
      <Form className="f-2" method="PUT"  encType="multipart/form-data" >
          <div className="up-1">
          <UploadImage defaultImage={product.image? product.image:''}/>
          </div>
        
        
        <input
          className="F-1"
          type="text"
          name="name"
          defaultValue={product?.name || ""}
          placeholder="Name"
        />
        <input
          className="F-1"
          type="text"
          name="price"
          defaultValue={product?.price || ""}
          placeholder="Price"
        />
        <input
          className="F-1"
          type="text"
          name="stock"
          defaultValue={product?.stock || ""}
          placeholder="Stock"
        />
        <input
          className="F-2"
          type="text"
          name="description"
          defaultValue={product?.description || ""}
          placeholder="Description"
        />


        
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        /> */}
        <Selectcategory category={category.data}/>
        <button className="b-1" type="submit" name="_action"  >
          Save
        </button>
      </Form>
    </div>
  );
}

export default ProductEdit;
export async function loaderDropdown2({ request }) {
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

export async function actionProductEdit({ request, params }) {
  const formData = await request.formData();
  const data = new FormData();
  const file = formData.get("image");
  data.append("name", formData.get("name"));
  data.append("price", formData.get("price"));
  data.append("stock", formData.get("stock"));
  data.append("description", formData.get("description"));
  data.append("categoryId" , formData.get("categoryId"))
  if(file && file.size > 0){
    data.append("image", file);
  }

  try {
    const token = tokenLoader();
    const response = await apiPut(`/api/v1/product/${params.id}`, data, token);
    console.log(response);
    return redirect("/product");
  } catch (error) {
    console.error(error);
  }
}
