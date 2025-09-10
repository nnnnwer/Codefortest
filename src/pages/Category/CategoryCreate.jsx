import TextField from '@mui/material/TextField'
import React, { useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { Form, redirect } from 'react-router-dom'
import { apiPost } from '../../Api/Api'
import "../../Styles/Category.css"
const CategoryCreate = () => {
  
const handleSubmit = (e) => {
    e.preventDefault();

  const fromData = new FormData(e.target);
  const body = {
    name: fromData.get("name"),
  };
  console.log(body);   

}

  return (
    <div className="Create-cate">
    <Form method="post" action="/categorycreate">
    <h1>CreateCategory</h1>
      
    <div>
    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" required />
    {/* <TextField id="outlined-basic" label="ID" variant="outlined" name="id" required/> */}
    </div>   

    <button className="b-1" type="submit" name="_action">
          Save
    </button>
    </Form>
    </div>
  )
}

export default CategoryCreate

export async function actionCategoryCreate({ request }) {
    const formData = await request.formData();
    const data = new FormData();
    data.append("name" , formData.get("name"));

    try {
        const token = localStorage.getItem("token");
        const response = await apiPost("/api/v1/category" , data, false , token);
        console.log(response);
        return redirect("/category");
    }   catch (error) {
        console.error(error);
    }
}
