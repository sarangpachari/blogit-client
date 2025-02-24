import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/allAPI";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //HANDLES INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //VALIDATE PASSWORDS
  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Password doesn't match");
      console.log(formData.password);
      
      return false;
    }
    setError(null);
    return true;
  };

  //HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setLoading(true);
    setError(null);

    //API CALL TO SIGNUP
    try {
      const result = await registerAPI(formData);
      console.log(result);
      
      if (result.status == 201) {
        alert(`You can login now, Enjoy your blogging !`);
        navigate("/login");
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else if (result.status == 400) {
        setError(result.response.data.message);
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setError("Failed to signup");
      console.log(error);
    }
    
  };

  return (
    <>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className="flex flex-col gap-5 md:w-1/3">
          {/* FORM TITLE */}
          <div className="">
            <h1 className="text-white text-4xl">Create & Start Blogging</h1>
          </div>

          {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            color="success"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              },
              "& .MuiInputLabel-outlined": { color: "white" },
            }}
          />
          <TextField
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            color="success"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              },
              "& .MuiInputLabel-outlined": { color: "white" },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            color="success"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              },
              "& .MuiInputLabel-outlined": { color: "white" },
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            color="success"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              },
              "& .MuiInputLabel-outlined": { color: "white" },
            }}
          />

          {error && <p className="text-red-500">{error}</p>}

          {/* REGISTER BUTTON */}
          <Button variant="contained" color="inherit" fullWidth type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
        </form>

          {/* LOGIN */}
          <div className="">
            <p className="text-white">
              Already existing account ?
              <Link to={"/login"}>
                <span className="hover:cursor-pointer hover:text-green-600">
                  {" "}
                  Login Here !
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
