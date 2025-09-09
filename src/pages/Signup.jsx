import React, { useState, useEffect } from "react";
import "../Styles/Signup.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import UploadImage from "../components/UploadImage";
import { apiPost } from "../Api/Api";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = UserAuth();

  useEffect(() => {
    if (session) {
      console.log("User session:", session);
    }
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    console.log("UserName:", username);
    console.log("Name:", name);
    console.log("Telephone:", telephone);
    console.log("Email:", email);
    console.log("Password:", password);
    const fromData = new FormData(e.target);

    const body = {
      name: fromData.get("name"),
      password: fromData.get("password"),
      telephone: fromData.get("telephone"),
      username: fromData.get("username"),
      email: fromData.get("email"),
      image: fromData.get("image"),
    };
    console.log(body);
  };

  return (
    <div className="bg-1">
      <div className="Box-signup">
      <Form
        className="f-2"
        method="post"
        encType="multipart/form-data"
        action="/signup"
      >
        <h1 className="h-1">Register</h1>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
        <div className="up-1">
        <UploadImage  /> </div>
        <div className="d-2">
          {/* <input type="file" name="image" /> */}
          <input
            placeholder="UserName"
            name="username"
            className="i-1"
            type="text"
            // onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="Name"
            name="name"
            className="i-1"
            type="text"
            // onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Telephone"
            name="telephone"
            className="i-1"
            type="tel"
            // onChange={(e) => setTelephone(e.target.value)}
          />
          <input
            placeholder="Email"
            name="email"
            className="i-1"
            type="email"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            name="password"
            className="i-2"
            type="password"
            // onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="b-1"
            name="_action"
          >
            Register
          </button>


          <Link className="go-back-3"to="/signin">Go Back</Link>
        </div>
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
