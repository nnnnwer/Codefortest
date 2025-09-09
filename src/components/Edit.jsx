import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButtons({id , onEdited}) {
  // console.log('id in edit:', id);
  // console.log('onEdited in edit:', onEdited);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/product/${id}`, { state: { onEdited } });

  }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
       
      <Fab color="primary" aria-label="edit">
        <EditIcon onClick={handleEdit}/>
      </Fab>
    </Box>
  );
}
