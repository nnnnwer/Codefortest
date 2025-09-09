import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { apiDelete } from "../Api/Api"; 
import { tokenLoader } from "../Api/Authen";
import Swal from 'sweetalert2';
import { redirect, useNavigate } from 'react-router-dom';

export default function Delete({ id }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    
    try {
      const token = tokenLoader();
      await apiDelete(`/api/v1/product/${id}`, token);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The item has been deleted.",
        confirmButtonText: "OK",
      });
      navigate('/product')
      // if (onDeleted) onDeleted(id);
    } catch (error) {
      console.error("Failed to delete:", error);

      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message || "An error occurred while deleting the item.",
        confirmButtonText: "try again",});

    }
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="error" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </Fab>
    </Box>
  );
}
