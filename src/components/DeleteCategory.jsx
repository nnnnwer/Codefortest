import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { apiDelete } from "../Api/Api"; 
import { tokenLoader } from "../Api/Authen";
import Swal from 'sweetalert2';
import { redirect, useNavigate } from 'react-router-dom';




export default function DeleteCategory({ id }) {
  const navigate = useNavigate();
  const handleDeletecategory = async () => {
    try {
      const token = tokenLoader();
      await apiDelete(`/api/v1/category/${id}`, token);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The item has been deleted.",
        confirmButtonText: "OK",
      })
      navigate('/category') 
      
    } catch (error) {
      console.error("Failed to delete:", error);

      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message || "An error occurred while deleting the item.",
        confirmButtonText: "try again",});

    }
  };
// useEffect(()=>{
// navigate('/category') 
// },[id])
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="error" aria-label="delete" onClick={handleDeletecategory}>
        <DeleteIcon />
      </Fab>
    </Box>
  );
}
