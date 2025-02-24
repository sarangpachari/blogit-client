import { Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className="flex flex-col gap-5 w-1/3">
          {/* FORM TITLE */}
          <div className="">
            <h1 className="text-white text-4xl">Start Blogging</h1>
          </div>

          {/* LOGIN INPUTS */}
          <div className="flex flex-col gap-5">
            <TextField
              label="Email address"
              color="success"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "white",
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              color="success"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "white",
                },
              }}
            />
          </div>

          {/* LOGIN BUTTON */}
          <div className="">
            <Button variant="contained" color="inherit" fullWidth>
              Login
            </Button>
          </div>

          {/* NEW REGISTRATION */}
          <div className="">
            <p className="text-white">Don't have an account?<Link to={'/register'}><span className="hover:cursor-pointer hover:text-red-600"> Create Now !</span></Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
