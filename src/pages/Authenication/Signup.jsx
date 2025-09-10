import React, { useState, useEffect } from "react";
import "../../Styles/Signup.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import UploadImage from "../../components/UploadImage";
import { apiPost } from "../../Api/Api";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import bg from "../../assets/image2.jpeg";
import Divider from '@mui/material/Divider';
const Signup = () => {
  // const [username, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [telephone, setTelephone] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const { session } = UserAuth();

  useEffect(() => {
    if (session) {
      console.log("User session:", session);
    }
  }, [session]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted!");
  //   console.log("UserName:", username);
  //   console.log("Name:", name);
  //   console.log("Telephone:", telephone);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   const fromData = new FormData(e.target);

  //   const body = {
  //     name: fromData.get("name"),
  //     password: fromData.get("password"),
  //     telephone: fromData.get("telephone"),
  //     username: fromData.get("username"),
  //     email: fromData.get("email"),
  //     image: fromData.get("image"),
  //   };
  //   console.log(body);
  // };

  return (
    // <div className="bg-1">
     <div style={{minHeight:'100vh',display:'flex',justifyContent:'center'}}>
          <img src={bg} alt="background" style={{objectFit:'cover',height:'100vh',width:'100vw',filter:'blur(3px)',position:'fixed',zIndex:-1}}/>
      <div className="Box-signup">
      <Form
        // className="pading-container"
        method="post"
        encType="multipart/form-data"
        action="/signup"
      >
        <h1 className="h-1">Register</h1>
      
        <div className="up-1">
        <UploadImage  /> </div>
                    <Box sx={{ '& > :not(style)': { m: 1 },display: 'flex', flexDirection: 'column'}}>
        
          {/* <TextField type="file" name="image" /> */}
          <TextField
          required
          InputProps={{
    style: { backgroundColor: 'white' }
  }}
           size="small"
            placeholder="UserName"
            name="username"
            className="i-1"
            type="text"
            // onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
          required
          InputProps={{
    style: { backgroundColor: 'white' }
  }}
           size="small"
            placeholder="Name"
            name="name"
            className="i-1"
            type="text"
            // onChange={(e) => setName(e.target.value)}
          />
          <TextField
          required
          InputProps={{
    style: { backgroundColor: 'white' }
  }}
           size="small"
            placeholder="Telephone"
            name="telephone"
            className="i-1"
            type="number"
            // onChange={(e) => setTelephone(e.target.value)}
          />
          <TextField
          required
          InputProps={{
    style: { backgroundColor: 'white' }
  }}
           size="small"
            placeholder="Email"
            name="email"
            className="i-1"
            type="email"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
          required
          InputProps={{
    style: { backgroundColor: 'white' }
  }}
           size="small"
            placeholder="Password"
            name="password"
            className="i-2"
            type="password"
            // onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            // disabled={loading}
            className="b-1"
            name="_action"
            variant="contained"
          >
            Register
          </Button>
          <Divider>or</Divider>
            <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
{/* 
          <Link className="go-back-3"to="/signin">Go Back</Link> */}
        </Box>
      </Form>
      </div>
    </div>
  );
};

export default Signup;
console.log("VITE_API_URL", import.meta.env.VITE_HTTP_URL);
export async function actionSignup({ request }) {
  const formData = await request.formData();
  const file = formData.get("image")
  const data = new FormData();
  data.append("name", formData.get("name"));
  data.append("telephone", formData.get("telephone"));
  data.append("username", formData.get("username"));
  data.append("email", formData.get("email"));
  data.append("password", formData.get("password"));
  if(file && file.size > 0){
    data.append("image", file);
  }
  // data.append("image", formData.get("image"));
try {
  console.log('data',data)
  const response = await apiPost("/api/v1/user", data, true);
  console.log(response);
} catch (error) {
  console.log(error)
}
 


  return redirect("/signin"); 
}
