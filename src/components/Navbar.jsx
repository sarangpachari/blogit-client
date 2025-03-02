import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IoFingerPrint } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../contexts/TokenAuth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { motion } from "motion/react";

const Navbar = () => {
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //GET USER DETAILS
  const userDetails = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return null;
  };

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
  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthorisedUser(false);
    navigate("/");
    window.location.href = "/";
    window.location.reload();
  };

  useEffect(() => {
    userDetails();
  }, [authorisedUser]);
  return (
    <div className="text-white md:px-16 py-5">
      <nav>
        <div className="flex justify-between">
          <div className="">
            <h1 className="font-bold tracking-widest text-2xl">BLOGIT</h1>
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
                  <motion.span
                    whileInView={{ opacity: 1, z: 0 }}
                    initial={{ opacity: 0, z: -5 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Hi,
                  </motion.span>
                  <motion.span
                    whileInView={{ opacity: 1, z: 0 }}
                    initial={{ opacity: 0, z: -5 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    {user?.fullname}
                  </motion.span>
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
                  <Link to={"/dashboard"}>
                    <MenuItem onClick={handleClose}>
                     
                      Dashboard
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                   
                    Logout
                  </MenuItem>
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
        {authorisedUser && (
          <div className="mt-5">
            <div className="">
              <motion.ul animate={{ opacity: 1 }} className="flex gap-5">
                <motion.li
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link className="underline text-gray-300" to={"/"}>
                    Home
                  </Link>
                </motion.li>
                <motion.li
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link className="underline text-gray-300" to={"/all-blog"}>
                    All blogs
                  </Link>
                </motion.li>
              </motion.ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
