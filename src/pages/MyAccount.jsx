import React from "react";
import { UserAuth } from "../context/AuthContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ImageWithFallback1 from "../components/ImageWithFallback1";
const MyAccount = () => {
  const { session } = UserAuth();

  if (!session) {
    return <h1>Please Sign In</h1>;
  }

  return (
    <div>
      <h1>Account</h1>
      <ImageWithFallback1         
                src={`${import.meta.env.VITE_HTTP_URL}/image/${session.image}`}
                alt={session.name}
              />
      <p>Username: {session.name}</p>
      <p>Email: {session.email}</p>

      
    </div>
  );
};

export default MyAccount;
