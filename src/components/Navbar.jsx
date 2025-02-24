import { Button } from "@mui/material";
import React from "react";
import { IoFingerPrint } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-white px-16 py-5">
      <nav>
        <div className="flex justify-between">
          <div className="">
            <h1 className="font-bold tracking-widest text-2xl">BLOGIT</h1>
          </div>
          <div className="">
            <ul className="flex gap-5">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/all-blogs"}>All blogs</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </div>
          <div>
            <Link to={'/login'}>
              <Button color="inherit" className="flex gap-2" variant="outlined">
                Login <IoFingerPrint size={18} />{" "}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
