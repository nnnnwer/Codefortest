import React, { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ImageWithFallback1 from "../../components/ImageWithFallback1";
import { Form, useActionData } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import UploadImage from './../../components/UploadImage';
import Swal from "sweetalert2";
import { apiPut } from "../../Api/Api";
import { tokenLoader } from "../../Api/Authen";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};
const MyAccount = ({ onOpen, onClose }) => {

  const { session,setSession } = UserAuth();
const actionData = useActionData();
  if (!session) {
    return <h1>Please Sign In</h1>;
  }
console.log('sesseion',session)
  useEffect(() => {
    if (actionData && actionData.success) {
      Swal.fire({ icon: "success", title: "Successfully!", text: "Update profile" })
      setSession(actionData.userData);
      onClose();
    }
  }, [actionData])
  return (
     <Modal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={Form} method="post" action='/' encType="multipart/form-data">
        {/* <Box sx={{ width: '500px', background: 'white', boxShadow: '0px 4px 10px rgba(0,0,0,0.25)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 3, mx: 'auto' }}> */}
        <h1 style={{ color: '#222222' }}>Edit Profile</h1>

        <Box>
          <Grid sx={{ Width: "100%" }}>
            <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <UploadImage defaultImage={session.image} />
              </Box>
              <TextField id="outlined-basic" label="Name" variant="outlined" name='name' size='small' required defaultValue={session.name || ''} />
              <TextField id="filled-basic" label="Tel" variant="outlined" name='telephone' size='small' required defaultValue={session.telephone || ''} />
              <TextField id="filled-basic" label="Email" variant="outlined" name='email' size='small' type="email" defaultValue={session.email || ''} />
              <input type="hidden" name='id' size='small' value={session.id} />
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button type='submit' variant='contained' color='primary' name="_action"> Save</Button>
                <Button variant='outlined' color='error' onClick={onClose} sx={{ marginLeft: '10px' }} >Cancel</Button>
              </Box> </Box>
          </Grid>
        </Box>
        {/* </Box> */}


      </Box>
    </Modal>
  );
};

export default MyAccount;


export async function actionProfile({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");
  const file = formData.get("image");
    const token = tokenLoader();
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
 
  const data = new FormData();
  data.append("name", formData.get("name"));

  if (file && file.size > 0) {
    data.append("image", file);
  }
  // data.append("image", formData.get("image"));
  data.append("telephone", formData.get("telephone"));
  data.append("email", formData.get("email"));
  try {
    const res =await apiPut(`/api/v1/user/${id}`, data, token); 
    console.log('reaaa',res.data)
    const userData = {
    name: res.data.name,
    image: res.data.image,
    telephone: res.data.telephone,
    email: res.data.email,
    id: res.data.id,
  };
    localStorage.setItem('session', JSON.stringify(userData))
    console.log(data)
    window
    return { success: true,userData };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: error.response?.data?.message || error.message,
    });
    return null;
  }
}
