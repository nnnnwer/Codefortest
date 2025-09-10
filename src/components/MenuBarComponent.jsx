import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import Logout from "@mui/icons-material/Logout";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BallotIcon from '@mui/icons-material/Ballot';
import Divider from '@mui/material/Divider';
import '../Styles/menuBar.css'
const MenuBarComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        try {
          localStorage.removeItem("token");
          await Swal.fire({
            icon: "success",
            title: "Logout!",
            text: "Logout Complete.",
            confirmButtonText: "OK",
          });
          window.location.href = "/signin";
          // return redirect("/signin")
        } catch (error) {
          console.error("Failed to Logout", error);
    
          await Swal.fire({
            icon: "error",
            title: "Logout Failed",
            text: error.message || "An error occurred while Logout.",
            confirmButtonText: "try again",
          });
        }
      };
      
    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="white"
                sx={{ mr: 2, color: 'white' }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                <NavLink to="/" className={({ isActive }) => isActive ? "menu-bar active" : "menu-bar"}>
                <ListItemIcon>
            <AddShoppingCartIcon fontSize="small" />
          </ListItemIcon>Order</NavLink>
                </MenuItem>
              
                <MenuItem onClick={handleClose}>         
                 <NavLink to="/product" className={({ isActive }) => isActive ? "menu-bar active" : "menu-bar"}><ListItemIcon>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>Product</NavLink>
                </MenuItem>
              
                <MenuItem onClick={handleClose}>
                    <NavLink to="/category" className={({ isActive }) => isActive ? "menu-bar active" : "menu-bar"}><ListItemIcon>
            <BallotIcon fontSize="small" />
          </ListItemIcon>Category</NavLink>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
            </Menu>
        </div>
    )
}
export default MenuBarComponent;