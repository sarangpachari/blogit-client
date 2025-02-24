import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IoFingerPrint } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../contexts/TokenAuth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [user, setUser] = useState(null)
  const navigate=useNavigate()
  
  //GET USER DETAILS
  const userDetails = ()=>{
    const storedUser=localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser)) 
    }
    return null
  }
  
  //ANCHOR MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //LOGOUT
  const handleLogout = ()=>{
    handleClose()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setAuthorisedUser(false)
  }

  useEffect(()=>{
    userDetails()
  },[authorisedUser])
  return (
    <div className="text-white md:px-16 py-5">
      <nav>
        <div className="flex justify-between">
          <div className="">
            <h1 className="font-bold tracking-widest text-2xl">BLOGIT</h1>
          </div>
          <div className="">
            <ul className="md:flex gap-5 hidden">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/all-blog"}>All blogs</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </div>
          <div>
            {authorisedUser ? (
              <>
                <Button
                  color="inherit"
                  variant="outlined"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Hi,<span>{user?.fullname}</span>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <Link to={"/dashboard"}><MenuItem onClick={handleClose}>My account</MenuItem></Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to={"/login"}>
                <Button
                  color="inherit"
                  className="flex gap-2"
                  variant="outlined"
                >
                  Login <IoFingerPrint size={18} />{" "}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
