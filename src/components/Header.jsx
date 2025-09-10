import "../Styles/Header.css";
import { Link, NavLink } from "react-router-dom";
import AccountMenu from "./Profile"; 
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBarComponent from './MenuBarComponent';
export default function Header() {
  const token = localStorage.getItem("token"); 
  const isSmall = useMediaQuery('(min-width:900px)');
  return (
    <>
    <header>  
      <nav>
        {isSmall?(
          <>
         <div className="logo">Shopping Web</div>
        <div className="nav-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Order</NavLink>
          <NavLink to="/product" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Product</NavLink>
          <NavLink to="/category" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Category</NavLink>
        </div>
        <div className="nav-right">
          {!token ? (
            <NavLink to="/signin" className="signin">Sign in</NavLink>
          ) : (
            <AccountMenu />
          )}
        </div>
          </>
        ):(
          <>
          <MenuBarComponent/>
            <div className="logo">Shopping Web</div>
            <div className="nav-right">
          {!token ? (
            <NavLink to="/signin" className="signin">Sign in</NavLink>
          ) : (
            <AccountMenu />
          )}
        </div>
          </>
        )}
        
      </nav>
    </header>
           <div className="header-spacer"></div>
    </>
  );
}
 