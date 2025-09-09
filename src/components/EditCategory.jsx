import Box from '@mui/material/Box';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import Fab from '@mui/material/Fab';

export default function EditCategory({id , onEditCategory}) {

  const navigate = useNavigate();
  const handleEditCategory = () => {
    navigate(`/category/${id}` , {state: {onEditCategory}});
  }

  return (
    <Box sx={{'& > :not(style)'  : { m: 1 }}}>
        <Fab color="primary" aria-label="edit">
        <EditIcon onClick={handleEditCategory}/>
      </Fab>
    </Box>
  );
}


