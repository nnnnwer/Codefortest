import React from "react";
import { Form, redirect, useLocation } from "react-router-dom";
import { tokenLoader } from "../Api/Authen";
import TextField from "@mui/material/TextField";
import { apiPut } from "../Api/Api";

function CategoryChange() {
  const location = useLocation();
  const categories = location.state?.onEditCategory;
  // const { productdata } = useLoaderData();
  // const categories = productdata.data || [];
  console.log("Categories:", categories);

  const handleEditCategory = (e) => {
  const fromData = new FormData(e.target);
  const body = {
    name: fromData.get("name"),
  };
  console.log(body);
}

  return (
    <div>
      <Form method="PUT">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          defaultValue={categories?.name || ""}
          required
        />
        <button className="b-1" type="submit" name="_action">
          Save
        </button>
      </Form>
    </div>
  );
}

export default CategoryChange;

export async function actionCategoryChange({request , params}) {
  const formData = await request.formData();
  const data = new FormData();

  data.append("name", formData.get("name"));

  try {
    const token = tokenLoader();
    const response = await apiPut(`/api/v1/category/${params.id}` ,data , token);
    console.log(response);
    return redirect("/category");
  } catch (error) {
    console.error(error);
  }


}
