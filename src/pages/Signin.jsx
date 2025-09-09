import React, { useState, useEffect } from "react";
import "../Styles/Signin.css";
import { Form, Link, redirect } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { apiPost } from "../Api/Api";
import Swal from "sweetalert2";
import bgImage from "../assets/bg.png";
import bg from "../assets/image2.jpeg";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { session } = UserAuth();

  useEffect(() => {
    if (session) {
      console.log("User session:", session);
    }
  }, [session]);

  return (
    // <div className="split-container">
    <div style={{minHeight:'100vh',display:'flex',justifyContent:'center'}}>
      <img src={bg} alt="background" style={{objectFit:'cover',height:'100vh',width:'100vw',filter:'blur(3px)',position:'fixed',zIndex:-1}}/>
      {/* <div className="left-panel">
        <div className="panel-content">
          <h2>Welcome Back!</h2>
          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div> */}
      
      
        <div className="form-container">
          <Form className="f-1" method="post" action="/signin">
            <h1 className="h-1">Sign In</h1>

            <div className="d-1">
              
              <input
                name="username"
                placeholder="Username"
                className="i-1"
                type="text"
              />
              <input
                name="password"
                placeholder="Password"
                className="i-2"
                type="password"
              />
              <button type="submit" className="b-1" name="_action">
                Sign in
              </button>
            </div>

            {/* OR separator */}
            <div className="or-separator">
              <span>OR</span>
            </div>

            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </Form>
        </div>
     
    </div>
  );
};

export default Signin;

console.log("VITE_API_URL", import.meta.env.VITE_HTTP_URL);

export async function actionSignin({ request }) {
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    console.log("data", data);
    const response = await apiPost("/api/v1/user/login", data, false);
    console.log(response);
    localStorage.setItem("token", response.token);
    localStorage.setItem("session", JSON.stringify(response.user));

    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome ${data.username}!`,
      confirmButtonText: "OK",
    });
    return redirect("/");
  } catch (error) {
    console.log(error);
    await Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.response?.data?.message || "Invalid username or password",
      confirmButtonText: "Try Again",
    });
    return null;
  }
}
